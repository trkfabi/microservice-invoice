import { IdFactura1 } from "./IdFactura1";
import { Tercero } from "./Tercero";
//import { Encadenamiento1 } from "./Encadenamiento1";
import { Encadenamiento } from "./Encadenamiento";
import { SistemaInformatico } from "./SistemaInformatico";
import { Signature } from "./Signature";
import {
  IndicadorSN,
  Version,
  TipoGenerador,
  TipoHuella,
} from "../../../types/enums";
/**
 * RegistroAnulacion
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface RegistroAnulacion {
  /** VersionType|string|1.0 */
  IDVersion: Version;
  /** IDFactura */
  IDFactura: IdFactura1;
  /** TextMax60Type|string|maxLength */
  RefExterna?: string;
  /** SinRegistroPrevioType|string|S,N */
  SinRegistroPrevio?: IndicadorSN;
  /** RechazoPrevioAnulacionType|string|S,N */
  RechazoPrevio?: IndicadorSN;
  /** GeneradoPorType|string|E,D,T */
  GeneradoPor?: TipoGenerador;
  /** Generador */
  Generador?: Tercero;
  /** Encadenamiento */
  Encadenamiento: Encadenamiento;
  /** SistemaInformatico */
  SistemaInformatico: SistemaInformatico;
  /** dateTime */
  FechaHoraHusoGenRegistro: string;
  /** TipoHuellaType|string|01 */
  TipoHuella: TipoHuella;
  /** TextMax64Type|string|maxLength */
  Huella?: string;
  /** Signature */
  Signature?: Signature;
}
