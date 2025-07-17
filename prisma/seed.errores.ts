import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const errores = [
    // ********* Listado de códigos de error que provocan el rechazo del envío completo *********
    {
      codigo: 3500,
      descripcion:
        "Error técnico de base de datos: error en la integridad de la información.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 3501,
      descripcion: "Error técnico de base de datos.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 3502,
      descripcion:
        "La factura consultada para el suministro de pagos/cobros/inmuebles no existe.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 3503,
      descripcion:
        "La factura especificada no pertenece al titular registrado en el sistema.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4102,
      descripcion:
        "El XML no cumple el esquema. Falta informar campo obligatorio.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4103,
      descripcion: "Se ha producido un error inesperado al parsear el XML.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4104,
      descripcion:
        "Error en la cabecera: el valor del campo NIF del bloque ObligadoEmision no está identificado.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4105,
      descripcion:
        "Error en la cabecera: el valor del campo NIF del bloque Representante no está identificado.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4106,
      descripcion: "El formato de fecha es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4107,
      descripcion: "El NIF no está identificado en el censo de la AEAT.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4108,
      descripcion: "Error técnico al obtener el certificado.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4109,
      descripcion: "El formato del NIF es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4110,
      descripcion: "Error técnico al comprobar los apoderamientos.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4111,
      descripcion: "Error técnico al crear el trámite.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4112,
      descripcion:
        "El titular del certificado debe ser Obligado Emisión, Colaborador Social, Apoderado o Sucesor.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4113,
      descripcion:
        "El XML no cumple con el esquema: se ha superado el límite permitido de registros para el bloque.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4114,
      descripcion:
        "El XML no cumple con el esquema: se ha superado el límite máximo permitido de facturas a registrar.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4115,
      descripcion:
        "El valor del campo NIF del bloque ObligadoEmision es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4116,
      descripcion:
        "Error en la cabecera: el campo NIF del bloque ObligadoEmision tiene un formato incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4117,
      descripcion:
        "Error en la cabecera: el campo NIF del bloque Representante tiene un formato incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4118,
      descripcion:
        "Error técnico: la dirección no se corresponde con el fichero de entrada.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4119,
      descripcion:
        "Error al informar caracteres cuya codificación no es UTF-8.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4120,
      descripcion:
        "Error en la cabecera: el valor del campo FechaFinVeriFactu es incorrecto, debe ser 31-12-20XX, donde XX corresponde con el año actual o el anterior.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4121,
      descripcion:
        "Error en la cabecera: el valor del campo Incidencia es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4122,
      descripcion:
        "Error en la cabecera: el valor del campo RefRequerimiento es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4123,
      descripcion:
        "Error en la cabecera: el valor del campo NIF del bloque Representante no está identificado en el censo de la AEAT.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4124,
      descripcion:
        "Error en la cabecera: el valor del campo Nombre del bloque Representante no está identificado en el censo de la AEAT",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4125,
      descripcion:
        "Error en la cabecera: Si el envío es por requerimiento el campo RefRequerimiento es obligatorio.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4126,
      descripcion:
        "Error en la cabecera: el campo RefRequerimiento solo debe informarse en sistemas No VERIFACTU.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4127,
      descripcion:
        "Error en la cabecera: la remisión voluntaria solo debe informarse en sistemas VERIFACTU.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4128,
      descripcion:
        "Error técnico en la recuperación del valor del Gestor de Tablas.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4129,
      descripcion:
        "Error en la cabecera: el campo FinRequerimiento es obligatorio.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4130,
      descripcion:
        "Error en la cabecera: el campo FinRequerimiento solo debe informarse en sistemas No VERIFACTU.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4131,
      descripcion:
        "Error en la cabecera: el valor del campo FinRequerimiento es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4132,
      descripcion:
        "El titular del certificado debe ser el destinatario que realiza la consulta, un Apoderado o Sucesor",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4133,
      descripcion: "Servicio no activo.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4134,
      descripcion:
        "Error en los registros: el valor del campo PeriodoLiquidacion es incorrecto.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4135,
      descripcion: "Esta URL no puede ser utilizada mediante GET.",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4136,
      descripcion:
        "No se ha enviado el nodo RegistroAlta o el anterior al nodo RegistroAlta no es correcto",
      tipo: "Rechazo completo",
    },
    {
      codigo: 4137,
      descripcion:
        "No se ha enviado el nodo RegistroAnulacion o el anterior al nodo RegistroAnulacion no es correcto ",
      tipo: "Rechazo completo",
    },

    //********* Listado de códigos de error que provocan el rechazo de la factura (o de la petición completa si el error se produce en la cabecera) *********
    {
      codigo: 1100,
      descripcion: "Valor o tipo incorrecto del campo.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1101,
      descripcion: "El valor del campo CodigoPais es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1102,
      descripcion: "El valor del campo IDType es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1103,
      descripcion: "El valor del campo ID es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1104,
      descripcion: "El valor del campo NumSerieFactura es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1105,
      descripcion: "El valor del campo FechaExpedicionFactura es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1106,
      descripcion:
        "El valor del campo TipoFactura no está incluido en la lista de valores permitidos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1107,
      descripcion: "El valor del campo TipoRectificativa es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1108,
      descripcion:
        "El NIF del IDEmisorFactura debe ser el mismo que el NIF del ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1109,
      descripcion: "El NIF no está identificado en el censo de la AEAT.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1110,
      descripcion: "El NIF no está identificado en el censo de la AEAT.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1111,
      descripcion:
        "El campo CodigoPais es obligatorio cuando IDType es distinto de 02.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1112,
      descripcion:
        "El campo FechaExpedicionFactura es superior a la fecha actual.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1114,
      descripcion:
        "Si la factura es de tipo rectificativa, el campo TipoRectificativa debe tener valor.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1115,
      descripcion:
        "Si la factura no es de tipo rectificativa, el campo TipoRectificativa no debe tener valor.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1116,
      descripcion:
        "Debe informarse el campo FacturasSustituidas sólo si la factura es de tipo F3.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1117,
      descripcion:
        "Si la factura no es de tipo rectificativa, el bloque FacturasRectificadas no podrá venir informado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1118,
      descripcion:
        "Si la factura es de tipo rectificativa por sustitución el bloque ImporteRectificacion es obligatorio.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1119,
      descripcion:
        "Si la factura no es de tipo rectificativa por sustitución el bloque ImporteRectificacion no debe tener valor.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1120,
      descripcion:
        "Valor de campo IDEmisorFactura del bloque IDFactura con tipo incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1121,
      descripcion: "El campo ID no está identificado en el censo de la AEAT.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1122,
      descripcion:
        "El campo CodigoPais indicado no coincide con los dos primeros dígitos del identificador.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1123,
      descripcion: "El formato del NIF es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1124,
      descripcion:
        "El valor del campo TipoImpositivo no está incluido en la lista de valores permitidos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1125,
      descripcion:
        "El valor del campo FechaOperacion tiene una fecha superior a la permitida.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1126,
      descripcion:
        "El valor del CodigoPais solo puede ser ES cuando el IDType sea Pasaporte (03) o No Censado (07). Si IDType es No Censado (07) el CodigoPais debe ser ES.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1127,
      descripcion:
        "El valor del campo TipoRecargoEquivalencia no está incluido en la lista de valores permitidos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1128,
      descripcion: "No existe acuerdo de facturación.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1129,
      descripcion: "Error técnico al obtener el acuerdo de facturación.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1130,
      descripcion:
        "El campo NumSerieFactura contiene caracteres no permitidos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1131,
      descripcion:
        "El valor del campo ID ha de ser el NIF de una persona física cuando el campo IDType tiene valor No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1132,
      descripcion:
        "El valor del campo TipoImpositivo es incorrecto, el valor informado solo es permitido para FechaOperacion o FechaExpedicionFactura inferior o igual al año 2012.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1133,
      descripcion:
        "El valor del campo FechaExpedicionFactura no debe ser inferior a la fecha actual menos veinte años.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1134,
      descripcion:
        "El valor del campo FechaOperacion no debe ser inferior a la fecha actual menos veinte años.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1135,
      descripcion:
        "El valor del campo TipoRecargoEquivalencia es incorrecto, el valor informado solo es permitido para FechaOperacion o FechaExpedicionFactura inferior o igual al año 2012.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1136,
      descripcion:
        "El campo FacturaSimplificadaArticulos7273 solo acepta valores N o S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1137,
      descripcion: "El campo Macrodato solo acepta valores N o S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1138,
      descripcion:
        "El campo Macrodato solo debe ser informado con valor S si el valor de ImporteTotal es igual o superior a +-100.000.000.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1139,
      descripcion:
        "Si el campo ImporteTotal está informado y es igual o superior a +-100.000.000 el campo Macrodato debe estar informado con valor S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1140,
      descripcion:
        "Los campos CuotaRepercutida y BaseImponibleACoste deben tener el mismo signo.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1142,
      descripcion:
        "El campo CuotaRepercutida tiene un valor incorrecto para el valor de los campos BaseImponibleOimporteNoSujeto y TipoImpositivo suministrados.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1143,
      descripcion:
        "Los campos CuotaRepercutida y BaseImponibleOimporteNoSujeto deben tener el mismo signo.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1144,
      descripcion:
        "El campo CuotaRepercutida tiene un valor incorrecto para el valor de los campos BaseImponibleACoste y TipoImpositivo suministrados.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1145,
      descripcion: "Formato de fecha incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1146,
      descripcion:
        "Sólo se permite que la fecha de expedicion de la factura sea anterior a la fecha operación si los detalles del desglose son ClaveRegimen 14 o 15 e Impuesto 01, 03 o vacío.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1147,
      descripcion:
        "Si ClaveRegimen es 14, FechaOperacion es obligatoria y debe ser posterior a la FechaExpedicionFactura.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1148,
      descripcion:
        "Si la ClaveRegimen es 14, el campo TipoFactura debe ser F1, R1, R2, R3 o R4.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1149,
      descripcion:
        "Si ClaveRegimen es 14, el NIF de Destinatarios debe estar identificado en el censo de la AEAT y comenzar por P, Q, S o V.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1150,
      descripcion:
        "Cuando TipoFactura sea F2 y no este informado NumRegistroAcuerdoFacturacion o FacturaSinIdentifDestinatarioArt61d no sea S el sumatorio de BaseImponibleOimporteNoSujeto y CuotaRepercutida de todas las líneas de detalle no podrá ser superior a 3.000.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1151,
      descripcion:
        "El campo EmitidaPorTerceroODestinatario solo acepta valores T o D.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1152,
      descripcion:
        "La fecha de expedición, no puede ser inferior a la fecha de activación del sistema VERI*FACTU.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1153,
      descripcion:
        "Valor del campo RechazoPrevio no válido, solo podrá incluirse el campo RechazoPrevio con valor X si se ha informado el campo Subsanacion y tiene el valor S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1154,
      descripcion:
        "El NIF del emisor de la factura rectificada/sustitutiva no se ha podido identificar en el censo de la AEAT.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1155,
      descripcion:
        "Se está informando el bloque Tercero sin estar informado el campo EmitidaPorTerceroODestinatario.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1156,
      descripcion:
        "Para el bloque IDOtro y IDType 02, el valor de TipoFactura es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1157,
      descripcion:
        "El valor de cupón solo puede ser S o N si está informado. El valor de cupón sólo puede ser S si el tipo de factura es R1 o R5.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1158,
      descripcion:
        "Se está informando EmitidaPorTerceroODestinatario, pero no se informa el bloque correspondiente.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1159,
      descripcion:
        "Se está informando del bloque Tercero cuando se indica que se va a informar de Destinatario.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1160,
      descripcion:
        "Si el TipoImpositivo es 5%, sólo se admite TipoRecargoEquivalencia 0,5 o 0,62.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1161,
      descripcion:
        "El valor del campo RechazoPrevio no es válido, no podrá incluirse el campo RechazoPrevio con valor S si no se ha informado del campo Subsanacion o tiene el valor N.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1162,
      descripcion:
        "Si el TipoImpositivo es 21%, sólo se admite TipoRecargoEquivalencia 5,2 ó 1,75.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1163,
      descripcion:
        "Si el TipoImpositivo es 10%, sólo se admite TipoRecargoEquivalencia 1,4.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1164,
      descripcion:
        "Si el TipoImpositivo es 4%, sólo se admite TipoRecargoEquivalencia 0,5.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1165,
      descripcion:
        "Si el TipoImpositivo es 0% entre el 1 de enero de 2023 y el 30 de septiembre de 2024, sólo se admite TipoRecargoEquivalencia 0.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1166,
      descripcion:
        "Si el TipoImpositivo es 2% entre el 1 de octubre de 2024 y el 31 de diciembre de 2024, sólo se admite TipoRecargoEquivalencia 0,26.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1167,
      descripcion:
        "Si el TipoImpositivo es 5% sólo se admite TipoRecargoEquivalencia 0,5 si Fecha Operacion (Fecha Expedicion Factura si no se informa FechaOperacion) es mayor o igual que el 1 de julio de 2022 y el 31 de diciembre de 2022.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1168,
      descripcion:
        "Si el TipoImpositivo es 5% sólo se admite TipoRecargoEquivalencia 0,62 si Fecha Operacion (Fecha Expedicion Factura si no se informa FechaOperacion) es mayor o igual que el 1 de enero de 2023 y el 30 de septiembre de 2024.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1169,
      descripcion:
        "Si el TipoImpositivo es 7,5% entre el 1 de octubre de 2024 y el 31 de diciembre de 2024, sólo se admite TipoRecargoEquivalencia 1.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1170,
      descripcion:
        "Si el TipoImpositivo es 0%, desde el 1 de octubre del 2024, sólo se admite TipoRecargoEquivalencia 0,26.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1171,
      descripcion:
        "El valor del campo Subsanacion o RechazoPrevio no se encuentra en los valores permitidos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1172,
      descripcion: "El valor del campo NIF u ObligadoEmision son nulos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1173,
      descripcion:
        "Sólo se permite que la fecha de operación sea superior a la fecha actual si los detalles del desglose son ClaveRegimen 14 o 15 e Impuesto 01, 03 o vacío.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1174,
      descripcion:
        "El valor del campo FechaExpedicionFactura del bloque RegistroAnteriores incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1175,
      descripcion:
        "El valor del campo NumSerieFactura del bloque RegistroAnterior es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1176,
      descripcion:
        "El valor de campo NIF del bloque SistemaInformatico es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1177,
      descripcion:
        "El valor de campo IdSistemaInformatico del bloque SistemaInformatico es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1178,
      descripcion: "Error en el bloque de Tercero.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1179,
      descripcion: "Error en el bloque de SistemaInformatico.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1180,
      descripcion: "Error en el bloque de Encadenamiento.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1181,
      descripcion: "El valor del campo CalificacionOperacion es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1182,
      descripcion: "El valor del campo OperacionExenta es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1183,
      descripcion:
        "El campo FacturaSimplificadaArticulos7273 solo se podrá rellenar con S si TipoFactura es de tipo F1 o F3 o R1 o R2 o R3 o R4.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1184,
      descripcion:
        "El campo FacturaSinIdentifDestinatarioArt61d solo acepta valores S o N.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1185,
      descripcion:
        "El campo FacturaSinIdentifDestinatarioArt61d solo se podrá rellenar con S si TipoFactura es de tipo F2 o R5.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1186,
      descripcion:
        "Si EmitidaPorTercerosODestinatario es igual a T el bloque Tercero será de cumplimentación obligatoria.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1187,
      descripcion:
        "Sólo se podrá cumplimentarse el bloque Tercero si el valor de EmitidaPorTercerosODestinatario es T.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1188,
      descripcion:
        "El NIF del bloque Tercero debe ser diferente al NIF del ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1189,
      descripcion:
        "Si TipoFactura es F1 o F3 o R1 o R2 o R3 o R4 el bloque Destinatarios tiene que estar cumplimentado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1190,
      descripcion:
        "Si TipoFactura es F2 o R5 el bloque Destinatarios no puede estar cumplimentado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1191,
      descripcion:
        "Si TipoFactura es R3 sólo se admitirá NIF o IDType = No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1192,
      descripcion:
        "Si TipoFactura es R2 sólo se admitirá NIF o IDType = No Censado (07) o NIF-IVA (02).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1193,
      descripcion:
        "En el bloque Destinatarios si se identifica mediante NIF, el NIF debe estar identificado y ser distinto del NIF ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1194,
      descripcion:
        "El valor del campo TipoImpositivo es incorrecto, el valor informado solo es permitido para FechaOperacion o FechaExpedisionFactura posterior o igual a 1 de julio de 2022 e inferior o igual a 30 de septiembre de 2024.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1195,
      descripcion:
        "Al menos uno de los dos campos OperacionExenta o CalificacionOperacion deben estar informados.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1196,
      descripcion:
        "OperacionExenta o CalificacionOperacion no pueden ser ambos informados ya que son excluyentes entre sí.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1197,
      descripcion:
        "Si CalificacionOperacion es S2 TipoFactura solo puede ser F1, F3, R1, R2, R3 y R4.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1198,
      descripcion:
        "Si CalificacionOperacion es S2 TipoImpositivo y CuotaRepercutida deberan tener valor 0.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1199,
      descripcion:
        "Si Impuesto es '01' (IVA), '03' (IGIC) o no se cumplimenta y ClaveRegimen es 01 no pueden marcarse las OperacionExenta E2, E3.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1200,
      descripcion:
        "Si ClaveRegimen es 03 CalificacionOperacion sólo puede ser S1.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1201,
      descripcion:
        "Si ClaveRegimen es 04 CalificacionOperacion sólo puede ser S2 o bien OperacionExenta.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1202,
      descripcion:
        "Si ClaveRegimen es 06 TipoFactura no puede ser F2, F3, R5 y BaseImponibleACoste debe estar cumplimentado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1203,
      descripcion:
        "Si ClaveRegimen es 07 OperacionExenta no puede ser E2, E3, E4 y E5 o CalificacionOperacion no puede ser S2, N1, N2.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1205,
      descripcion:
        "Si ClaveRegimen es 10 CalificacionOperacion tiene que ser N1, TipoFactura F1 y Destinatarios estar identificada mediante NIF.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1206,
      descripcion: "Si ClaveRegimen es 11 TipoImpositivo ha de ser 21%.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1207,
      descripcion:
        "La CuotaRepercutida solo podrá ser distinta de 0 si CalificacionOperacion es S1.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1208,
      descripcion:
        "Si CalificacionOperacion es S1 y BaseImponibleACoste no está cumplimentada, TipoImpositivo y CuotaRepercutida son obligatorios.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1209,
      descripcion:
        "Si CalificacionOperacion es S1 y ClaveRegimen es 06, TipoImpositivo y CuotaRepercutida son obligatorios.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1210,
      descripcion:
        "El campo ImporteTotal tiene un valor incorrecto para el valor de los campos BaseImponibleOimporteNoSujeto, CuotaRepercutida y CuotaRecargoEquivalencia suministrados.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1211,
      descripcion:
        "El bloque Tercero no puede estar identificado con IDType=No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1212,
      descripcion:
        "El campo TipoUsoPosibleSoloVerifactu solo acepta valores N o S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1213,
      descripcion: "El campo TipoUsoPosibleMultiOT solo acepta valores N o S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1214,
      descripcion:
        "El campo NumeroOTAlta debe ser numérico positivo de 4 posiciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1215,
      descripcion: "Error en el bloque de ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1216,
      descripcion:
        "El campo CuotaTotal tiene un valor incorrecto para el valor de los campos CuotaRepercutida y CuotaRecargoEquivalencia suministrados.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1217,
      descripcion: "Error identificando el IDEmisorFactura.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1218,
      descripcion: "El valor del campo Impuesto es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1219,
      descripcion: "El valor del campo IDEmisorFactura es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1220,
      descripcion: "El valor del campo NombreSistemaInformatico es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1221,
      descripcion:
        "El valor del campo IDType del sistema informático es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1222,
      descripcion: "El valor del campo ID del bloque IDOtro es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1223,
      descripcion:
        "En el bloque SistemaInformatico si se cumplimenta NIF, no deberá existir la agrupación IDOtro y viceversa, pero es obligatorio que se cumplimente uno de los dos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1224,
      descripcion:
        "Si se informa el campo GeneradoPor deberá existir la agrupación Generador y viceversa.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1225,
      descripcion: "El valor del campo GeneradoPor es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1226,
      descripcion: "El campo IndicadorMultiplesOT solo acepta valores N o S.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1227,
      descripcion:
        "Si el campo GeneradoPor es igual a E debe estar relleno el campo NIF del bloque Generador.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1228,
      descripcion:
        "En el bloque Generador si se cumplimenta NIF, no deberá existir la agrupación IDOtro y viceversa, pero es obligatorio que se cumplimente uno de los dos.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1229,
      descripcion:
        "Si el valor de GeneradoPor es igual a T el valor del campo IDType del bloque Generador no debe ser No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1230,
      descripcion:
        "Si el valor de GeneradoPor es igual a D y el CodigoPais tiene valor ES, el valor del campo IDType del bloque Generador debe ser Pasaporte (03) o No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1231,
      descripcion:
        "El valor del campo IDType del bloque Generador es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1232,
      descripcion:
        "Si se identifica a través de la agrupación IDOtro y CodigoPais tiene valor ES, el campo IDType debe valer Pasaporte (03).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1233,
      descripcion:
        "Si se identifica a través de la agrupación IDOtro y CodigoPais tiene valor ES, el campo IDType debe valer No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1234,
      descripcion:
        "Si se identifica a través de la agrupación IDOtro y CodigoPais tiene valor ES, el campo IDType debe valer Pasaporte (03) o No Censado (07).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1235,
      descripcion:
        "El valor del campo TipoImpositivo es incorrecto, el valor informado sólo es permitido para FechaOperacion o FechaExpedicionFactura posterior o igual a 1 de octubre de 2024 e inferior o igual a 31 de diciembre de 2024.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1236,
      descripcion:
        "El valor del campo TipoImpositivo es incorrecto, el valor informado solo es permitido para FechaOperacion o FechaExpedicionFactura posterior o igual a 1 de octubre de 2024 e inferior o igual a 31 de diciembre de 2024.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1237,
      descripcion:
        "El valor del campo CalificacionOperacion está informado como N1 o N2 y el impuesto es IVA. No se puede informar de los campos TipoImpositivo (excepto con ClaveRegimen 17), CuotaRepercutida (excepto con ClaveRegimen 17), TipoRecargoEquivalencia y CuotaRecargoEquivalencia.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1238,
      descripcion:
        "Si la operacion es exenta no se puede informar ninguno de los campos TipoImpositivo, CuotaRepercutida, TipoRecargoEquivalencia y CuotaRecargoEquivalencia.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1239,
      descripcion: "Error en el bloque Destinatario.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1240,
      descripcion: "Error en el bloque de IdEmisorFactura.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1241,
      descripcion: "Error técnico al obtener el SistemaInformatico.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1242,
      descripcion: "No existe el sistema informático.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1243,
      descripcion:
        "Error técnico al obtener el cálculo de la fecha del huso horario.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1244,
      descripcion:
        "El campo FechaHoraHusoGenRegistro tiene un formato incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1245,
      descripcion:
        "Si el campo Impuesto está vacío o tiene valor 01 o 03 el campo ClaveRegimen debe de estar cumplimentado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1246,
      descripcion: "El valor del campo ClaveRegimen es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1247,
      descripcion: "El valor del campo TipoHuella es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1248,
      descripcion: "El valor del campo Periodo es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1249,
      descripcion:
        "El valor del campo IndicadorRepresentante tiene un valor incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1250,
      descripcion:
        "El valor de fecha desde debe ser menor que el valor de fecha hasta en RangoFechaExpedicion.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1251,
      descripcion: "El valor del campo IdVersion tiene un valor incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1252,
      descripcion:
        "Si ClaveRegimen es 08 el campo CalificacionOperacion tiene que ser N2 e ir siempre informado.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1253,
      descripcion: "El valor del campo RefExterna tiene un valor incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1254,
      descripcion:
        "Si FechaOperacion (FechaExpedicionFactura si no se informa FechaOperacion) es anterior a 01/01/2021 no se permite el valor 'XI' para Identificaciones NIF-IVA.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1255,
      descripcion:
        "Si FechaOperacion (FechaExpedicionFactura si no se informa FechaOperacion) es mayor o igual que 01/02/2021 no se permite el valor 'GB' para Identificaciones NIF-IVA.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1256,
      descripcion:
        "Error técnico al obtener el límite de la fecha de expedición.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1257,
      descripcion:
        "El campo BaseImponibleACoste solo puede estar cumplimentado si la ClaveRegimen es = '06' o Impuesto = '02' (IPSI) o Impuesto = '05' (Otros).",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1258,
      descripcion: "El valor de campo NIF del bloque Generador es incorrecto.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1259,
      descripcion:
        "En el bloque Generador si se identifica mediante NIF, el NIF debe estar identificado y ser distinto del NIF ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1260,
      descripcion:
        "El campo ClaveRegimen solo debe de estar cumplimentado si el campo Impuesto está vacío o tiene valor 01 o 03.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1261,
      descripcion:
        "El campo IndicadorRepresentante solo debe de estar cumplimentado si se consulta por ObligadoEmision.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1262,
      descripcion: "La longitud de huella no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1263,
      descripcion:
        "La longitud del tipo de huella no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1264,
      descripcion:
        "La longitud del campo primer Registro no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1265,
      descripcion:
        "La longitud del campo tipo factura no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1266,
      descripcion:
        "La longitud del campo cuota total no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1267,
      descripcion:
        "La longitud del campo importe total no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1268,
      descripcion:
        "La longitud del campo FechaHoraHusoGenRegistro no cumple con las especificaciones.",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1269,
      descripcion:
        "El bloque Registro Anterior no esta informado correctamente",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1270,
      descripcion:
        "El valor del campo MostrarNombreRazonEmisor tiene un valor incorrecto",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1271,
      descripcion:
        "El valor del campo MostrarSistemaInformatico tiene un valor incorrecto",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1272,
      descripcion:
        "Si se consulta por Destinatario el valor del campo MostrarSistemaInformatico debe valer 'N' o no estar cumplimentado",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1273,
      descripcion: "Error en el bloque de Generador",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1274,
      descripcion: "Valor incorrecto campo primer registro",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1275,
      descripcion: "Valor incorrecto campo RechazoPrevio",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 1276,
      descripcion: "Valor incorrecto campo Sinregistroprevio",
      tipo: "Rechazo parcial",
    },
    {
      codigo: 3000,
      descripcion: "Registro de facturación duplicado",
      tipo: "Rechazo total",
    },
    {
      codigo: 3001,
      descripcion: "El registro de facturación ya ha sido dado de baja",
      tipo: "Rechazo total",
    },
    {
      codigo: 3002,
      descripcion: "No existe el registro de facturación",
      tipo: "Rechazo total",
    },
    {
      codigo: 3003,
      descripcion:
        "El presentador no tiene los permisos necesarios para actualizar este registro de facturación",
      tipo: "Rechazo total",
    },

    //********* Listado de códigos de error que producen la aceptación del registro de facturación en el sistema (posteriormente deben ser subsanados) *********
    {
      codigo: 2000,
      descripcion: "El cálculo de la huella suministrada es incorrecta.",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2001,
      descripcion:
        "El NIF del bloque Destinatarios no está identificado en el censo de la AEAT.",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2002,
      descripcion:
        "La longitud de huella del registro anterior no cumple con las especificaciones.",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2003,
      descripcion:
        "El contenido de la huella del registro anterior no cumple con las especificaciones.",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2004,
      descripcion:
        "El valor del campo FechaHoraHusoGenRegistro debe ser la fecha actual del sistema de la AEAT, admitiéndose un margen de error de:",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2005,
      descripcion:
        "El campo ImporteTotal tiene un valor incorrecto para el valor de los campos BaseImponibleOimporteNoSujeto, CuotaRepercutida y CuotaRecargoEquivalencia suministrados.",
      tipo: "Aceptado con errores",
    },
    {
      codigo: 2006,
      descripcion:
        "El campo CuotaTotal tiene un valor incorrecto para el valor de los campos CuotaRepercutida y CuotaRecargoEquivalencia suministrados.",
      tipo: "Aceptado con errores",
    },
  ];

  for (const error of errores) {
    await prisma.erroresAEAT.upsert({
      where: { codigo: error.codigo },
      update: {},
      create: error,
    });
  }

  console.log("Datos de errores AEAT cargados correctamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
