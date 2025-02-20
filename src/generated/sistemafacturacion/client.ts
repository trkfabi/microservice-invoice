import {
  Client as SoapClient,
  createClientAsync as soapCreateClientAsync,
  IExOptions as ISoapExOptions,
} from "soap";
import { RegFactuSistemaFacturacion } from "./definitions/RegFactuSistemaFacturacion";
import { SfRrespuestaRegFactuSistemaFacturacionType } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType";
// import { SfRrespuestaRegFactuSistemaFacturacionType1 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType1";
// import { SfRrespuestaRegFactuSistemaFacturacionType2 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType2";
// import { SfRrespuestaRegFactuSistemaFacturacionType3 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType3";
// import { SfRrespuestaRegFactuSistemaFacturacionType4 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType4";
// import { SfRrespuestaRegFactuSistemaFacturacionType5 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType5";
// import { SfRrespuestaRegFactuSistemaFacturacionType6 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType6";
// import { SfRrespuestaRegFactuSistemaFacturacionType7 } from "./definitions/SfRrespuestaRegFactuSistemaFacturacionType7";
import { SfVerifactu } from "./services/SfVerifactu";
import { SfRequerimiento } from "./services/SfRequerimiento";

export interface SistemaFacturacionClient extends SoapClient {
  SfVerifactu: SfVerifactu;
  SfRequerimiento: SfRequerimiento;
  RegFactuSistemaFacturacionAsync(
    regFactuSistemaFacturacion: RegFactuSistemaFacturacion,
    options?: ISoapExOptions
  ): Promise<
    [
      result: SfRrespuestaRegFactuSistemaFacturacionType,
      rawResponse: any,
      soapHeader: any,
      rawRequest: any
    ]
  >;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType4, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType5, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType6, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType7, rawResponse: any, soapHeader: any, rawRequest: any]>;
  //RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType1, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType2, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType3, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType4, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType5, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType6, rawResponse: any, soapHeader: any, rawRequest: any]>;
  // RegFactuSistemaFacturacionAsync(regFactuSistemaFacturacion: RegFactuSistemaFacturacion, options?: ISoapExOptions): Promise<[result: SfRrespuestaRegFactuSistemaFacturacionType7, rawResponse: any, soapHeader: any, rawRequest: any]>;
}

/**
 * Creates a SOAP client for the SistemaFacturacion service.
 * @param wsdlUrl - The URL of the WSDL file.
 * @param options - SOAP client options.
 * @param callback - Optional callback function (if not using promises).
 * @returns A promise that resolves to a SistemaFacturacionClient.
 */
export function createClientAsync(
  ...args: Parameters<typeof soapCreateClientAsync>
): Promise<SistemaFacturacionClient> {
  return soapCreateClientAsync(
    args[0],
    args[1],
    args[2]
  ) as Promise<SistemaFacturacionClient>;
}
