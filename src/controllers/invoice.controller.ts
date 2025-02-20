import { Request, Response } from "express";
import { getFormattedDate, getFormattedDateTime } from "../utils/date.util.js";
import { generateUUID } from "../utils/helper.util.js";
import { generateSHA256 } from "../utils/sha256.util.js";
import {
  RegistroAlta,
  SistemaInformatico,
  DetalleDesglose,
} from "../generated/sistemafacturacion";
import {
  CalificacionOperacion,
  IndicadorSN,
  Version,
  TipoHuella,
  TipoImpuesto,
  EstadoEnvioAEAT,
} from "../types/enums.js";
import { QueueProcessor } from "../queues/processor.queue.js";

import { getTipoFacturaFromValue } from "../utils/parser.util.js";
import { config, SISTEMA_INFORMATICO } from "../config.js";

class InvoiceController {
  /**
   * @swagger
   * /api/invoices/create:
   *   post:
   *     tags:
   *       - Invoices
   *     summary: Crea una nueva factura
   *     description: Crea una nueva factura y queda pendiente de envio a la AEAT
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *                - serie
   *                - numero
   *                - fecha_expedicion
   *                - tipo_factura
   *                - descripcion
   *                - lineas
   *                - importe_total
   *             properties:
   *               serie:
   *                 type: string
   *                 description: Serie de la factura
   *               numero:
   *                 numero: string
   *                 description: Numero de la factura
   *               fecha_expedicion:
   *                 type: string
   *                 pattern: "\d{2,2}-\d{2,2}-\d{4,4}"
   *                 description: Fecha de emisión de la factura. No puede ser una fecha posterior a la actual.
   *               tipo_factura:
   *                 type: string
   *                 description: |
   *                   Los diferentes tipos de factura son:
   *                   - F1: Factura (Art. 6, 7.2 Y 7.3 del RD 1619/2012)
   *                   - F2: Factura simplificada y facturas sin identificación del destinatario (Art. 6.1.D RD 1619/2012)
   *                   - R1: Factura rectificativa (Art 80.1 y 80.2 y error fundado en derecho)
   *                   - R2: Factura rectificativa (Art. 80.3)
   *                   - R3: Factura rectificativa (Art. 80.4)
   *                   - R4: Factura rectificativa (Resto)
   *                   - R5: Factura rectificativa en facturas simplificadas (Art. 80.3)
   *                   - F3: Factura emitida en sustitución de facturas simplificadas facturadas y declaradas
   *                 enum:
   *                   - F1
   *                   - F2
   *                   - R1
   *                   - R2
   *                   - R3
   *                   - R4
   *                   - R5
   *                   - F3
   *               descripcion:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 500
   *                 description: Descripcion de la operacion
   *               importe_total:
   *                 importe_total: string
   *                 pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                 description: Importe total de la factura. La AEAT validará que sea igual a la suma de (base_imponible + cuota_repercutida + cuota_recargo_equivalencia) de todas las líneas admitiéndose un margen de error de +/- 10,00€. Esta validación no se aplicará cuando clave_regimen sea 03, 05, 06 o 09.
   *               fecha_operacion:
   *                 type: string
   *                 pattern: "\d{2,2}-\d{2,2}-\d{4,4}"
   *                 description: Fecha de la operacion.
   *               nif:
   *                 type: string
   *                 description: NIF del cliente al que se le emite la factura. Necesario salvo para facturas simplificadas (F2, R5) o cuando se incluya el campo id_otro. En caso de incluir tanto nif como id_otro, se utilizará nif.
   *               id_otro:
   *                 type: object
   *                 description: Identificador de persona física o jurídica distinto del NIF. Necesario salvo para facturas simplificadas (F2, R5) o cuando se incluya el campo nif. En caso de incluir tanto nif como id_otro, se utilizará nif.
   *                 properties:
   *                    codigo_pais:
   *                       type: string
   *                       description: Código del país de la persona física o jurídica en formato ISO 3166-1 alpha-2.
   *                    id_type:
   *                       type: string
   *                       description: |
   *                          Tipo de identificador de la persona física o jurídica. Los diferentes tipos de identificador son:
   *                          02: NIF-IVA
   *                          03: Pasaporte
   *                          04: IDEnPaisResidencia
   *                          05: Certificado Residencia
   *                          06: Otro documento Probatorio
   *                          07: No Censado
   *                       enum:
   *                          - 02
   *                          - 03
   *                          - 04
   *                          - 05
   *                          - 06
   *                          - 07
   *                    id:
   *                       type: string
   *                       maxLength: 20
   *                       description: Identificador de la persona física o jurídica. Se permite hasta un máximo de 20 caracteres.
   *               nombre:
   *                 type: string
   *                 maxLength: 120
   *                 description: Nombre y apellidos o razón social del cliente al que se le emite la factura. Necesario salvo para facturas simplificadas (F2, R5).
   *               tipo_rectificativa:
   *                 type: string
   *                 description: |
   *                   Requerido y permitido únicamente para facturas rectificativas (R1, R2, R3, R4, R5). Indica si la rectificativa es por sustitución (S) o por diferencia (I).
   *                 enum:
   *                   - S
   *                   - I
   *               importe_rectificativa:
   *                 type: object
   *                 description: Requerido y permitido únicamente si tipo_rectificativa es igual a S.
   *                 properties:
   *                    base_rectificada:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Base imponible de la rectificada.
   *                    cuota_rectificada:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Cuota repercutida de la rectificada.
   *                    cuota_recargo_rectificada:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Cuota recargo de equivalencia de la rectificada.
   *               facturas_rectificadas:
   *                 type: array
   *                 descritpion: Facturas rectificadas. Permitido (aunque no obligatorio) para facturas rectificativas (R1, R2, R3, R4, R5).
   *                 items:
   *                   type: object
   *                   properties:
   *                     serie:
   *                       type: string
   *                       description: Serie de la factura rectificada.
   *                     numero:
   *                       type: string
   *                       description: Numero de la factura rectificada.
   *                     fecha_expedicion:
   *                       type: string
   *                       pattern: "\d{2,2}-\d{2,2}-\d{4,4}"
   *                       description: Fecha de expedición de la factura rectificada.
   *               facturas_sustituidas:
   *                 type: array
   *                 descritpion: Facturas sustituidas. Permitido (aunque no obligatorio) para facturas de tipo F3.
   *                 items:
   *                   type: object
   *                   properties:
   *                     serie:
   *                       type: string
   *                       description: Serie de la factura sustituida.
   *                     numero:
   *                       type: string
   *                       description: Numero de la factura sustituida.
   *                     fecha_expedicion:
   *                       type: string
   *                       pattern: "\d{2,2}-\d{2,2}-\d{4,4}"
   *                       description: Fecha de expedición de la factura sustituida.
   *               especial:
   *                 type: object
   *                 description: Datos adicionales para facturas.
   *                 properties:
   *                    cupon:
   *                       type: string
   *                       enum:
   *                          - S
   *                       description: Sólo se podrá rellenar con S si el tipo de factura no es R1 ni R5. No es obligatorio.
   *                    factura_simplificada_art_7273:
   *                       type: string
   *                       enum:
   *                          - S
   *                       description: Sólo se podrá rellenar con S si el tipo de factura es F1, F3, R1, R2, R3 o R4.
   *                    factura_sin_identif_destinatario_art_61d:
   *                       type: string
   *                       enum:
   *                          - S
   *                       description: Sólo se podrá rellenar con S si el tipo de factura es F2 o R5.
   *                    emitida_por_tercero_o_destinatario:
   *                       type: string
   *                       enum:
   *                          - T
   *                          - D
   *                       description: Indica si la factura ha sido emitida por un tercero o por el destinatario.
   *                    nombre_tercero:
   *                       type: string
   *                       maxLength: 120
   *                       description: Requerido y permitido únicamente si emitida_por_tercero_o_destinatario es igual a T.
   *                    nif_tercero:
   *                       type: string
   *                       description: Requerido y permitido únicamente si emitida_por_tercero_o_destinatario es igual a T.
   *               lineas:
   *                 type: array
   *                 minLength: 1
   *                 maxLength: 12
   *                 description: Líneas de la factura. Admite hasta un máximo de 12 líneas, restricción impuesta por la API de la Agencia Tributaria. Cada línea puede tener un tipo de IVA diferente, por lo tanto, se espera que se agrupen los diferentes elementos de una factura con el mismo tipo de IVA en una sola línea. De lo contrario, sería frecuente exceder el límite de 12 líneas.
   *                 items:
   *                   type: object
   *                   required:
   *                      - base_imponible
   *                   properties:
   *                     base_imponible:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Base imponible o importe no sujeto de la linea
   *                     tipo_impositivo:
   *                       type: string
   *                       pattern: "\d{1,3}(\.\d{0,2})?"
   *                       description: Tipo impositivo de la línea. Obligatorio si calificacion_operacion es S1 y base_imponible_a_coste no está cumplimentado.
   *                     cuota_repercutida:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Cuota repercutida de la línea. Solo podrá ser distinta de cero (positivo o negativo) si calificacion_operacion es S1.
   *                     impuesto:
   *                       type: string
   *                       enum:
   *                          - 01
   *                          - 02
   *                          - 03
   *                          - 05
   *                       default: "01"
   *                       description: |
   *                          Tipo de impuesto. Los valores permitidos son:
   *                          - 01: Impuesto sobre el Valor Añadido (IVA)
   *                          - 02: Impuesto sobre la Producción, los Servicios y la Importación (IPSI) de Ceuta y Melilla
   *                          - 03: Impuesto General Indirecto Canario (IGIC)
   *                          - 05: Otros
   *                     calificacion_operacion:
   *                       type: string
   *                       enum:
   *                          - S1
   *                          - S2
   *                          - N1
   *                          - N2
   *                       default: "S1"
   *                       description: |
   *                          Calificación de la operación.
   *                          S1: Operación sujeta y no exenta - sin inversión del sujeto pasivo.
   *                          S2: Operación sujeta y no exenta - con inversión del sujeto pasivo.
   *                          N1: Operación no sujeta (art. 7, 14, otros).
   *                          N2: Operación no sujeta por reglas de localización.
   *                     clave_regimen:
   *                       type: string
   *                       enum:
   *                          - 01
   *                          - 02
   *                          - 03
   *                          - 04
   *                          - 05
   *                          - 06
   *                          - 07
   *                          - 08
   *                          - 09
   *                          - 10
   *                          - 11
   *                          - 14
   *                          - 15
   *                          - 17
   *                          - 18
   *                          - 19
   *                          - 20
   *                       default: "S1"
   *                       description: |
   *                          Clave que identifica el tipo de régimen del IVA/IGIC. Permitido únicamente cuando impuesto = 01 (IVA) o impuesto = 03 (IGIC). En estos casos el valor por defecto es 01.
   *                          01: GENERAL
   *                          02: EXPORTACION
   *                          03: BIENES_USADOS
   *                          04: ORO_INVERSION
   *                          05: AGENCIAS_VIAJES
   *                          06: GRUPO_ENTIDADES
   *                          07: CRITERIO_CAJA
   *                          08: IPSI_IGIC
   *                          09: AGENCIAS_VIAJE_MEDIACION
   *                          10: COBROS_TERCEROS
   *                          11: ARRENDAMIENTO
   *                          14: IVA_PENDIENTE_DEVENGO_OBRA
   *                          15: IVA_PENDIENTE_DEVENGO_TRACTO
   *                          17: OSS_IOSS
   *                          18: RECARGO_EQUIVALENCIA
   *                          19: REAGYP
   *                          20: SIMPLIFICADO
   *                     operacion_exenta:
   *                       type: string
   *                       enum:
   *                          - E1
   *                          - E2
   *                          - E3
   *                          - E4
   *                          - E5
   *                          - E6
   *                       default: "S1"
   *                       description: |
   *                          Tipo de operación exenta. En caso de estar cumplimentado, no podrá informarse de los campos tipo_impositivo, cuota_repercutida, tipo_recargo_equivalencia y cuota_recargo_equivalencia. Los valores permitidos son (BOE-A-1992-28740):
   *                          E1: Exenta por artículo 20
   *                          E2: Exenta por artículo 21
   *                          E3: Exenta por artículo 22
   *                          E4: Exenta por artículo 24
   *                          E5: Exenta por artículo 25
   *                          E6: Otros
   *                     base_imponible_a_coste:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Base imponible a coste de la linea. Este campo solo puede estar cumplimentado si la clave_regimen es = 06 o impuesto = 02 (IPSI) o impuesto = 05 (Otros)
   *                     tipo_recargo_equivalencia:
   *                       type: string
   *                       pattern: "\d{1,3}(\.\d{0,2})?"
   *                       description: Tipo de recargo de equivalencia.
   *                     cuota_recargo_equivalencia:
   *                       type: string
   *                       pattern: "(\+|-)?\d{1,12}(\.\d{0,2})?"
   *                       description: Cuota recargo de equivalencia.
   *     responses:
   *       200:
   *         description: Factura creada
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                 message:
   *                   type: string
   *                 results:
   *                   type: object
   *                   properties:
   *                     uuid:
   *                       type: string
   *                       description: Identificador único del registro para poder consultar su estado.
   *                     estado:
   *                       type: string
   *                       description: Estado del registro. Siempre será igual a "Pendiente" como respuesta a una creación. Dicho estado se puede consultar posteriormente con el endpoint /status.
   *                     url:
   *                       type: string
   *                       description: URL de verification del QR
   *                     qr:
   *                       type: string
   *                       description: QR en base 64
   *       500:
   *         description: Error del servidor
   */
  async createInvoiceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;

      console.log("createInvoiceHandler payload:", payload);

      const sistemaInformatico: SistemaInformatico = SISTEMA_INFORMATICO;

      console.log("sistemaInformatico: ", sistemaInformatico);

      const lineasDetalle: DetalleDesglose[] = payload.lineas.map(
        (linea: any) => {
          return {
            Impuesto: TipoImpuesto.IVA,
            CalificacionOperacion: CalificacionOperacion.SUJETA_NO_EXENTA,
            BaseImponibleOimporteNoSujeto: linea.base_imponible,
            CuotaRepercutida: linea.cuota_repercutida,
            TipoImpositivo: linea.tipo_impositivo,
          };
        }
      );

      //test - datos de la base de datos tabla empresa emisor
      const nifEmisor = "B70847835";
      const nombreEmisor = "THE LOOP CLOSET SL";

      const registroAlta: RegistroAlta = {
        IDVersion: Version.V1_0,
        IDFactura: {
          IDEmisorFactura: nifEmisor,
          NumSerieFactura: `${payload.serie}${payload.numero}`,
          FechaExpedicionFactura: getFormattedDate(payload.fecha_expedicion),
        },
        NombreRazonEmisor: nombreEmisor,
        TipoFactura: getTipoFacturaFromValue(payload.tipo_factura),
        DescripcionOperacion: payload.descripcion,
        Destinatarios: {
          IDDestinatario: [
            {
              NombreRazon: "Test Socieda SL",
              NIF: "B75777847",
              // Esto da error de parsing en la AEAT
              // IDOtro: {
              //   IDType: TipoIdentificacion.NIF_IVA,
              //   ID: "B87654321",
              // },
            },
          ],
        },
        Desglose: {
          DetalleDesglose: lineasDetalle,
        },
        CuotaTotal: payload.cuota_repercutida,
        ImporteTotal: payload.importe_total,
        Encadenamiento: { PrimerRegistro: "S" },
        SistemaInformatico: sistemaInformatico,
        FechaHoraHusoGenRegistro: getFormattedDateTime(),
        TipoHuella: TipoHuella.SHA_256,
      };
      console.log("registroAlta: ", registroAlta);

      registroAlta.Huella = generateSHA256(registroAlta, "alta");

      console.log("registroAlta.Huella: ", registroAlta.Huella);

      // Crea el registro en la base de datos
      // simulamos que se crea el registro en la base de datos
      const invoiceRecordUUID = generateUUID();

      // agrega a la queue de procesamiento de AEAT
      QueueProcessor.addToQueue({
        payload: {
          registroAlta: registroAlta,
        },
        uuid: invoiceRecordUUID,
      });

      let qrUrl =
        config.environment === "production"
          ? config.validarQRProdUrl
          : config.validarQRTestUrl;
      qrUrl += `?nif=${nifEmisor}&numserie=${payload.serie}${
        payload.numero
      }&fecha=${getFormattedDate(payload.fecha_expedicion)}&importe=${
        payload.importe_total
      }`;

      res.status(200).json({
        success: true,
        message: "",
        results: {
          uuid: invoiceRecordUUID,
          estado: EstadoEnvioAEAT.PENDIENTE,
          url: "url",
          qr: "qr",
        },
      });
    } catch (error) {
      //console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }

  async cancelInvoiceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;

      console.log("cancelInvoiceHandler Payload:", payload);

      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }

  async invoiceStatusHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      console.log("invoiceStatusHandler Payload:", payload);
      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }

  async invoiceRecordStatusHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      console.log("invoiceRecordStatusHandler Payload:", payload);
      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }

  async modifyInvoiceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      console.log("modifyInvoiceHandler Payload:", payload);
      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }
  async listInvoicesHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      console.log("listInvoicesHandler Payload:", payload);
      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }

  async downloadInvoiceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;
      console.log("downloadInvoiceHandler Payload:", payload);
      res.status(200).json({
        success: true,
        message: "",
        results: {},
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        results: null,
      });
    }
  }
}
export default new InvoiceController();

// export const createInvoiceHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;

//     console.log("createInvoiceHandler payload:", payload);

//     // esto traerlo de los datos en env
//     const sistemaInformatico: SistemaInformatico = {
//       NombreRazon: config.sistemaInformatico.nombreRazon,
//       NIF: config.sistemaInformatico.nif,
//       NombreSistemaInformatico:
//         config.sistemaInformatico.nombreSistemaInformatico,
//       IdSistemaInformatico: config.sistemaInformatico.idSistemaInformatico,
//       Version: config.sistemaInformatico.version,
//       NumeroInstalacion: config.sistemaInformatico.numeroInstalacion,
//       TipoUsoPosibleSoloVerifactu: IndicadorSN.SI,
//       TipoUsoPosibleMultiOT: IndicadorSN.SI,
//       IndicadorMultiplesOT: IndicadorSN.SI,
//     };
//     console.log("sistemaInformatico: ", sistemaInformatico);

//     const lineasDetalle: DetalleDesglose[] = payload.lineas.map(
//       (linea: any) => {
//         return {
//           Impuesto: TipoImpuesto.IVA,
//           CalificacionOperacion: CalificacionOperacion.SUJETA_NO_EXENTA,
//           BaseImponibleOimporteNoSujeto: linea.base_imponible,
//           CuotaRepercutida: linea.cuota_repercutida,
//           TipoImpositivo: linea.tipo_impositivo,
//         };
//       }
//     );

//     //test - datos de la base de datos tabla empresa emisor
//     const nifEmisor = "B70847835";
//     const nombreEmisor = "THE LOOP CLOSET SL";

//     const registroAlta: RegistroAlta = {
//       IDVersion: Version.V1_0,
//       IDFactura: {
//         IDEmisorFactura: nifEmisor,
//         NumSerieFactura: `${payload.serie}${payload.numero}`,
//         FechaExpedicionFactura: getFormattedDate(payload.fecha_expedicion),
//       },
//       NombreRazonEmisor: nombreEmisor,
//       TipoFactura: getTipoFacturaFromValue(payload.tipo_factura),
//       DescripcionOperacion: payload.descripcion,
//       Destinatarios: {
//         IDDestinatario: [
//           {
//             NombreRazon: "Test Socieda SL",
//             NIF: "B75777847",
//             // Esto da error de parsing en la AEAT
//             // IDOtro: {
//             //   IDType: TipoIdentificacion.NIF_IVA,
//             //   ID: "B87654321",
//             // },
//           },
//         ],
//       },
//       Desglose: {
//         DetalleDesglose: lineasDetalle,
//       },
//       CuotaTotal: payload.cuota_repercutida,
//       ImporteTotal: payload.importe_total,
//       Encadenamiento: { PrimerRegistro: "S" },
//       SistemaInformatico: sistemaInformatico,
//       FechaHoraHusoGenRegistro: getFormattedDateTime(),
//       TipoHuella: TipoHuella.SHA_256,
//     };
//     console.log("registroAlta: ", registroAlta);

//     registroAlta.Huella = generateSHA256(registroAlta, "alta");

//     console.log("registroAlta.Huella: ", registroAlta.Huella);

//     // Crea el registro en la base de datos
//     // simulamos que se crea el registro en la base de datos
//     const invoiceRecordUUID = generateUUID();

//     // agrega a la queue de procesamiento de AEAT
//     QueueProcessor.addToQueue({
//       payload: registroAlta,
//       uuid: invoiceRecordUUID,
//     });

//     let qrUrl =
//       config.environment === "production"
//         ? config.validarQRProdUrl
//         : config.validarQRTestUrl;
//     qrUrl += `?nif=${nifEmisor}&numserie=${payload.serie}${
//       payload.numero
//     }&fecha=${getFormattedDate(payload.fecha_expedicion)}&importe=${
//       payload.importe_total
//     }`;

//     res.status(200).json({
//       success: true,
//       message: "",
//       results: {
//         uuid: invoiceRecordUUID,
//         estado: EstadoEnvioAEAT.PENDIENTE,
//         url: "url",
//         qr: "qr",
//       },
//     });
//   } catch (error) {
//     //console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const cancelInvoiceHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     console.log("cancelInvoiceHandler Payload:", payload);
//     const result = await cancelInvoice(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const invoiceStatusHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     console.log("invoiceStatusHandler Payload:", payload);
//     const result = await invoiceStatus(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const invoiceRecordStatusHandler = async (
//   req: Request,
//   res: Response
// ) => {
//   try {
//     const { payload } = req.body;
//     console.log("invoiceRecordStatusHandler Payload:", payload);
//     const result = await invoiceRecordStatus(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const modifyInvoiceHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     console.log("modifyInvoiceHandler Payload:", payload);
//     const result = await modifyInvoice(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const listInvoicesHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     console.log("listInvoicesHandler Payload:", payload);
//     const result = await listInvoices(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };

// export const downloadInvoiceHandler = async (req: Request, res: Response) => {
//   try {
//     const { payload } = req.body;
//     console.log("downloadInvoiceHandler Payload:", payload);
//     const result = await downloadInvoice(payload);
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       results: null,
//     });
//   }
// };
