import { RegFactuSistemaFacturacion } from "../generated/sistemafacturacion/definitions/RegFactuSistemaFacturacion";
import { createClientAsync } from "../generated/sistemafacturacion/client.js";
import { ClientSSLSecurityPFX } from "soap";
import { config } from "../config/config.js";
import fs from "fs";
import xmlFormat from "xml-formatter";
import path from "path";
import { parseStringPromise } from "xml2js";
import {
  RegistroAlta,
  RegistroAnulacion,
} from "../generated/sistemafacturacion";
import { InvoiceQueueItem, commonResponseJson } from "../types/interfaces";

export const sendRecordToAEAT = async (batch: InvoiceQueueItem[]) => {
  const CERT_PATH = config.certificatePath || "certificate.p12";
  const CERT_PASSPHRASE = config.certificatePassword || "123456";

  console.log("sendRecordToAEAT batch:", JSON.stringify(batch));

  const payloadSF: RegFactuSistemaFacturacion = {
    Cabecera: {
      ObligadoEmision: {
        NombreRazon: "THE LOOP CLOSET SL",
        NIF: "B70847835",
      },
    },
    RegistroFactura: [],
  };

  // Recorremos el batch y agregamos los registros de acuerdo a su tipo
  for (const record of batch) {
    if ("registroAlta" in record.payload) {
      console.log("es un RegistroAlta");
      // Si es RegistroAlta, lo agregamos a RegistroFactura
      payloadSF.RegistroFactura.push({
        RegistroAlta: record.payload.registroAlta as RegistroAlta,
      });
    } else if ("registroAnulacion" in record.payload) {
      console.log("es un RegistroAnulacion");
      // Si es RegistroAnulacion, lo agregamos a RegistroFactura
      payloadSF.RegistroFactura.push({
        RegistroAnulacion: record.payload
          .registroAnulacion as RegistroAnulacion,
      });
    }
  }

  // FOR TESTING WE WILL EXIT HERE w/o CALLING SOAP service
  console.log("aeat service payloadSF", payloadSF);

  return <commonResponseJson>{
    success: true,
    message: "Sent to AEAT",
    result: {},
  };

  interface WsdlOptions {
    envelopeKey: string;
    disableCache: boolean;
    namespaces: Record<string, string>;
  }

  interface Options {
    wsdl_options: WsdlOptions;
  }

  const options: Options = {
    wsdl_options: {
      envelopeKey: "soapenv",
      disableCache: true,
      namespaces: {
        "http://schemas.xmlsoap.org/soap/envelope/": "soapenv",
      },
    },
  };

  const client = await createClientAsync(
    config.environment === "production"
      ? config.soapProdUrl
      : config.soapTestUrl,
    options,
    config.environment === "production"
      ? config.soapProdWdslVerify
      : config.soapTestWdslVerify
  );

  const clientSSLSecurityPFX = new ClientSSLSecurityPFX(
    CERT_PATH,
    CERT_PASSPHRASE
  );
  client.setSecurity(clientSSLSecurityPFX);

  // client.on("request", (xml: string) => {
  //   console.log("SOAP Request:", xml);
  // });

  client.on("response", async (responseXml: string) => {
    try {
      console.log("Response received");
      const result = await parseStringPromise(responseXml, {
        trim: true,
        explicitArray: false,
      });

      const fault = result["env:Envelope"]?.["env:Body"]?.["env:Fault"];
      if (fault) {
        const faultDetails = {
          faultCode: fault.faultcode,
          faultString: fault.faultstring,
        };
        console.log("Fault detected:", faultDetails);

        return <commonResponseJson>{
          success: false,
          message: `${fault.faultcode} - ${fault.faultstring}`,
          result: faultDetails,
        };
      } else {
        console.log("Response received:", result);
        return <commonResponseJson>{
          success: true,
          message: "",
          result: result,
        };
      }
    } catch (error) {
      console.error("Error parsing response XML:");
      return <commonResponseJson>{
        success: false,
        message: "Error parsing response XML",
        result: error,
      };
    } finally {
      const outputDir = path.resolve("./testfiles");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
      }

      fs.writeFileSync(
        `${outputDir}/createInvoicerequest.xml`,
        client.lastRequest || ""
      );
      fs.writeFileSync(
        `${outputDir}/createInvoiceresponse.xml`,
        client.lastResponse || ""
      );
    }
  });

  //const [result, rawResponse, soapHeader, rawRequest] =
  //await client.RegFactuSistemaFacturacionAsync(payload, {
  await client.RegFactuSistemaFacturacionAsync(payloadSF, {
    postProcess: (xml: string) => {
      const formattedXml = xmlFormat(xml);
      return formattedXml;
    },
  });

  console.log(" termino de ejecutar el metodo");

  // console.log("createInvoice Result:", result);
  // console.log("createInvoice Raw Response:", rawResponse);
  // console.log("createInvoice Soap Header:", soapHeader);
  // console.log("createInvoice Raw Request:", rawRequest);

  // // Procesar el resultado como JSON
  // const formattedResult = {
  //   obligorName: result?.Cabecera?.ObligadoEmision?.NombreRazon,
  //   obligorNIF: result?.Cabecera?.ObligadoEmision?.NIF,
  //   responseStatus: result?.EstadoEnvio,
  //   responseLines: result?.RespuestaLinea,
  // };

  // console.log("Formatted Response:", formattedResult);

  // Mostrar el objeto de respuesta
  //console.log("Response Object:", JSON.stringify(responseObject, null, 2));

  // Mostrar el XML de respuesta
  //console.log("Response XML:", responseXml);
  //   } catch (error) {
  //     if ((error as any).body) {
  //       //console.error("Response Body:", (error as any).body);
  //       const soapErrorXml = (error as any).body;
  //       const errorObject = await parseSoapFault(soapErrorXml);

  //       console.error("Formatted SOAP Error:", errorObject);
  //     }
  //   } finally {
  //     const outputDir = path.resolve("./testfiles");
  //     if (!fs.existsSync(outputDir)) {
  //       fs.mkdirSync(outputDir);
  //     }

  //     fs.writeFileSync(
  //       `${outputDir}/createInvoicerequest.xml`,
  //       client.lastRequest || ""
  //     );
  //     fs.writeFileSync(
  //       `${outputDir}/createInvoiceresponse.xml`,
  //       client.lastResponse || ""
  //     );
  //   }
};

// export const createInvoice = async (batchInvoices: []) => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";

//   console.log("createInvoice Payload:", JSON.stringify(payload));

//   let payload: RegFactuSistemaFacturacion;

//   interface WsdlOptions {
//     envelopeKey: string;
//     disableCache: boolean;
//     namespaces: Record<string, string>;
//   }

//   interface Options {
//     wsdl_options: WsdlOptions;
//   }

//   const options: Options = {
//     wsdl_options: {
//       envelopeKey: "soapenv",
//       disableCache: true,
//       namespaces: {
//         "http://schemas.xmlsoap.org/soap/envelope/": "soapenv",
//       },
//     },
//   };

//   const client = await createClientAsync(
//     config.environment === "production"
//       ? config.soapProdUrl
//       : config.soapTestUrl,
//     options,
//     config.environment === "production"
//       ? config.soapProdWdslVerify
//       : config.soapTestWdslVerify
//   );

//   //try {
//   const clientSSLSecurityPFX = new ClientSSLSecurityPFX(
//     CERT_PATH,
//     CERT_PASSPHRASE
//   );
//   client.setSecurity(clientSSLSecurityPFX);

//   // client.on("request", (xml: string) => {
//   //   console.log("SOAP Request:", xml);
//   // });

//   client.on("response", async (responseXml: string) => {
//     try {
//       console.log("Response received:");
//       const result = await parseStringPromise(responseXml, {
//         trim: true,
//         explicitArray: false,
//       });

//       const fault = result["env:Envelope"]?.["env:Body"]?.["env:Fault"];
//       if (fault) {
//         const faultDetails = {
//           faultCode: fault.faultcode,
//           faultString: fault.faultstring,
//         };
//         console.log("Fault detected:", faultDetails);
//       } else {
//         console.log("Response received:", result);
//       }
//     } catch (error) {
//       console.error("Error parsing response XML:");
//     } finally {
//       const outputDir = path.resolve("./testfiles");
//       if (!fs.existsSync(outputDir)) {
//         fs.mkdirSync(outputDir);
//       }

//       fs.writeFileSync(
//         `${outputDir}/createInvoicerequest.xml`,
//         client.lastRequest || ""
//       );
//       fs.writeFileSync(
//         `${outputDir}/createInvoiceresponse.xml`,
//         client.lastResponse || ""
//       );
//     }
//   });

//   //const [result, rawResponse, soapHeader, rawRequest] =
//   //await client.RegFactuSistemaFacturacionAsync(payload, {
//   await client.RegFactuSistemaFacturacionAsync(payload, {
//     postProcess: (xml: string) => {
//       const formattedXml = xmlFormat(xml);
//       return formattedXml;
//     },
//   });

//   console.log(" termino de ejecutar el metodo");

//   // console.log("createInvoice Result:", result);
//   // console.log("createInvoice Raw Response:", rawResponse);
//   // console.log("createInvoice Soap Header:", soapHeader);
//   // console.log("createInvoice Raw Request:", rawRequest);

//   // // Procesar el resultado como JSON
//   // const formattedResult = {
//   //   obligorName: result?.Cabecera?.ObligadoEmision?.NombreRazon,
//   //   obligorNIF: result?.Cabecera?.ObligadoEmision?.NIF,
//   //   responseStatus: result?.EstadoEnvio,
//   //   responseLines: result?.RespuestaLinea,
//   // };

//   // console.log("Formatted Response:", formattedResult);

//   // Mostrar el objeto de respuesta
//   //console.log("Response Object:", JSON.stringify(responseObject, null, 2));

//   // Mostrar el XML de respuesta
//   //console.log("Response XML:", responseXml);
//   //   } catch (error) {
//   //     if ((error as any).body) {
//   //       //console.error("Response Body:", (error as any).body);
//   //       const soapErrorXml = (error as any).body;
//   //       const errorObject = await parseSoapFault(soapErrorXml);

//   //       console.error("Formatted SOAP Error:", errorObject);
//   //     }
//   //   } finally {
//   //     const outputDir = path.resolve("./testfiles");
//   //     if (!fs.existsSync(outputDir)) {
//   //       fs.mkdirSync(outputDir);
//   //     }

//   //     fs.writeFileSync(
//   //       `${outputDir}/createInvoicerequest.xml`,
//   //       client.lastRequest || ""
//   //     );
//   //     fs.writeFileSync(
//   //       `${outputDir}/createInvoiceresponse.xml`,
//   //       client.lastResponse || ""
//   //     );
//   //   }
// };

// export const cancelInvoice = async (payload: RegFactuSistemaFacturacion) => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";

//   const options = {
//     wsdl_options: {
//       disableCache: true,
//     },
//   };

//   const client = await createClientAsync(
//     config.environment === "production"
//       ? config.soapProdUrl
//       : config.soapTestUrl,
//     options,
//     config.environment === "production"
//       ? config.soapProdWdslVerify
//       : config.soapTestWdslVerify
//   );

//   client.setSecurity(new ClientSSLSecurityPFX(CERT_PATH, CERT_PASSPHRASE));

//   try {
//     console.log("cancelInvoice Payload:", payload);
//     const result = await client.RegFactuSistemaFacturacionAsync(payload, {
//       postProcess: (xml: string) => xmlFormat(xml),
//     });

//     console.log("cancelInvoice Result:", result);
//   } catch (error) {
//     console.error("cancelInvoice Error:", error);
//   } finally {
//     const outputDir = path.resolve("./testfiles");
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir);
//     }

//     fs.writeFileSync(
//       `${outputDir}/cancelInvoicerequest.xml`,
//       client.lastRequest || ""
//     );
//     fs.writeFileSync(
//       `${outputDir}/cancelInvoiceresponse.xml`,
//       client.lastResponse || ""
//     );
//   }
// };
// export const downloadInvoice = async () => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";
//   try {
//     console.log("downloadInvoice Result:", result);
//   } catch (error) {
//     console.error("downloadInvoice Error:", error);
//   } finally {
//   }
// };

// export const invoiceStatus = async () => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";
//   try {
//     console.log("invoiceStatus Result:", result);
//   } catch (error) {
//     console.error("invoiceStatus Error:", error);
//   } finally {
//   }
// };
// export const invoiceRecordStatus = async () => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";
//   try {
//     console.log("invoiceRecordStatus Result:", result);
//   } catch (error) {
//     console.error("invoiceRecordStatus Error:", error);
//   } finally {
//   }
// };

// export const modifyInvoice = async () => {
//   const CERT_PATH = config.certificatePath || "certificate.p12";
//   const CERT_PASSPHRASE = config.certificatePassword || "123456";
//   try {
//     console.log("modifyInvoice Result:", result);
//   } catch (error) {
//     console.error("modifyInvoice Error:", error);
//   } finally {
//   }
// };
