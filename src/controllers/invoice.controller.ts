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
import generateQRCode from "../utils/qrcode.util.js";

import { getTipoFacturaFromValue } from "../utils/parser.util.js";
import { config, SISTEMA_INFORMATICO } from "../config/config.js";

class InvoiceController {
  async createInvoiceHandler(req: Request, res: Response): Promise<void> {
    try {
      const { payload } = req.body;

      console.log("createInvoiceHandler payload:", payload);

      const sistemaInformatico: SistemaInformatico = SISTEMA_INFORMATICO;

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

      console.log(qrUrl);
      const qrCodeBase64 = await generateQRCode(qrUrl, invoiceRecordUUID);

      res.status(200).json({
        success: true,
        message: "",
        results: {
          uuid: invoiceRecordUUID,
          estado: EstadoEnvioAEAT.PENDIENTE,
          url: qrUrl,
          qr: qrCodeBase64,
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
