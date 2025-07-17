import {
  RegistroAlta,
  RegistroAnulacion,
} from "../generated/sistemafacturacion";

export interface InvoiceQueueItem {
  payload: {
    registroAlta?: RegistroAlta;
    registroAnulacion?: RegistroAnulacion;
  };
  uuid: string;
}

export interface commonResponseJson {
  success: boolean;
  message?: string;
  result?: any;
}
