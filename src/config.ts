import path from "path";
import { IndicadorSN, Version } from "./types/enums.js";
import { SistemaInformatico } from "./generated/sistemafacturacion";

export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  certificatePath: path.join(
    path.resolve("./src/"),
    "certificates",
    "re_encrypted_tlc.p12"
  ),
  certificatePassword: process.env.CERTIFICATE_PASSPHRASE || "1",
  soapTestUrl:
    "https://prewww2.aeat.es/static_files/common/internet/dep/aplicaciones/es/aeat/tikeV1.0/cont/ws/SistemaFacturacion.wsdl",
  soapTestWdslVerify:
    "https://prewww10.aeat.es/wlpl/TIKE-CONT/ws/SistemaFacturacion/VerifactuSOAP",
  soapProdUrl:
    "https://www2.aeat.es/static_files/common/internet/dep/aplicaciones/es/aeat/tikeV1.0/cont/ws/SistemaFacturacion.wsdl",
  soapProdWdslVerify:
    "https://www10.aeat.es/wlpl/TIKE-CONT/ws/SistemaFacturacion/VerifactuSOAP",
  validarQRTestUrl: "https://prewww2.aeat.es/wlpl/TIKE-CONT/ValidarQR",
  validarQRProdUrl: "https://www2.aeat.es/wlpl/TIKE-CONT/ValidarQR",
  delay: 60000,
  maxBatchSize: 1000,
  redisHost: "127.0.0.1",
  redisPort: 6379,
  queueName: process.env.QUEUE_NAME || "AEATProcessingQueueANY",
  sistemaInformatico: {
    nombreRazon:
      process.env.SISTEMA_INFORMATICO_NOMBRE_RAZON || "PEPITO SOFTWARE SL",
    nif: process.env.SISTEMA_INFORMATICO_NIF || "B99999999",
    nombreSistemaInformatico:
      process.env.SISTEMA_INFORMATICO_NOMBRE || "Mi Verifactu Test",
    idSistemaInformatico: process.env.SISTEMA_INFORMATICO_ID || "M1",
    version: Version.V1_0,
    numeroInstalacion:
      process.env.SISTEMA_INFORMATICO_NUMERO_INSTALACION || "INST001",
    tipoUsoPosibleSoloVerifactu:
      process.env.SISTEMA_INFORMATICO_SOLO_VF || IndicadorSN.SI,
    tipoUsoPosibleMultiOT:
      process.env.SISTEMA_INFORMATICO_MULTI_OT || IndicadorSN.SI,
    indicadorMultiplesOT:
      process.env.SISTEMA_INFORMATICO_MULTIPLES_OT || IndicadorSN.SI,
  },
};

export const SISTEMA_INFORMATICO: SistemaInformatico = {
  NombreRazon: config.sistemaInformatico.nombreRazon,
  NIF: config.sistemaInformatico.nif,
  NombreSistemaInformatico: config.sistemaInformatico.nombreSistemaInformatico,
  IdSistemaInformatico: config.sistemaInformatico.idSistemaInformatico,
  Version: config.sistemaInformatico.version,
  NumeroInstalacion: config.sistemaInformatico.numeroInstalacion,
  TipoUsoPosibleSoloVerifactu: IndicadorSN.SI,
  TipoUsoPosibleMultiOT: IndicadorSN.SI,
  IndicadorMultiplesOT: IndicadorSN.SI,
};
