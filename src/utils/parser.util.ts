import { parseStringPromise } from "xml2js";
import * as fs from "fs";
import { promisify } from "util";
import * as libxmljs from "libxmljs2";
import { TipoFactura } from "../types/enums.js"; // Adjust the import path as necessary

export const getTipoFacturaFromValue = function (value: string): TipoFactura {
  const key = Object.keys(TipoFactura).find(
    (key) => TipoFactura[key as keyof typeof TipoFactura] === value
  );
  return TipoFactura[key as keyof typeof TipoFactura];
};

export const showSoapFaultError = (error: any) => {
  if (error && error.Fault) {
    const fault = error.Fault;
    let stringError = "";
    stringError += `Fault Code: ${fault.faultcode} \n`;
    stringError += `Fault String: ${fault.faultstring} \n`;
    if (fault.faultactor) {
      stringError += `Fault Actor: stringError += `;
    }
    if (fault.detail) {
      stringError += `Fault Detail: ${fault.detail} \n`;
    }
    if (fault.statusCode) {
      stringError += `Status Code: ${fault.statusCode}\n`;
    }
    console.error(stringError);
  } else {
    console.log("Unknown error format:", error);
  }
};

export async function parseSoapFault(
  xml: string
): Promise<{ faultCode?: string; faultString?: string }> {
  try {
    const result = await parseStringPromise(xml, {
      trim: true,
      explicitArray: false,
    });

    const fault = result["env:Envelope"]?.["env:Body"]?.["env:Fault"];

    if (fault) {
      return {
        faultCode: fault.faultcode,
        faultString: fault.faultstring,
      };
    }

    return {}; // Si no hay env:Fault, retornar objeto vacío
  } catch (error) {
    console.error("Error parsing XML:", error);
    throw new Error("Invalid XML format");
  }
}

export async function xmlValidator(
  xml: string,
  xsdPaths: string[]
): Promise<boolean> {
  try {
    const readFileAsync = promisify(fs.readFile);

    // Load XSD files and create schema
    const schemas = await Promise.all(
      xsdPaths.map(async (xsdPath) => {
        const xsdContent = await readFileAsync(xsdPath, "utf8");
        //("XSD Content:", xsdContent);
        return libxmljs.parseXml(xsdContent);
      })
    );

    // Parse XML content
    const xmlDoc = libxmljs.parseXml(xml);

    // Validate XML against each schema
    let isValid = true;
    let validationErrors: string[] = [];

    schemas.forEach((schema) => {
      if (!xmlDoc.validate(schema)) {
        isValid = false;
        validationErrors = [
          ...validationErrors,
          ...xmlDoc.validationErrors.map((err: Error) => err.message),
        ];
      }
    });

    // Log validation errors
    if (!isValid) {
      validationErrors.forEach((error) => {
        console.error(`Validation Error: ${error}`);
      });
    }

    return isValid;
  } catch (error) {
    console.error(`Error during XML validation: ${error}`);
    return false;
  }
}
