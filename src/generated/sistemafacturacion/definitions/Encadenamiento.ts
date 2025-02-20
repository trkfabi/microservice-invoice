import { RegistroAnterior } from "./RegistroAnterior";

// It is used to make at least one of the two fields required
interface BaseEncadenamiento {}

interface PrimerRegistro extends BaseEncadenamiento {
  PrimerRegistro: string;
}

interface RegistroAnulacionRequired extends BaseEncadenamiento {
  RegistroAnterior: RegistroAnterior;
}

export type Encadenamiento = PrimerRegistro | RegistroAnulacionRequired;

// /** Encadenamiento */
// export interface Encadenamiento {
//   /** PrimerRegistroCadenaType|string|S */
//   PrimerRegistro?: string;
//   /** RegistroAnterior */
//   RegistroAnterior?: RegistroAnterior;
// }
