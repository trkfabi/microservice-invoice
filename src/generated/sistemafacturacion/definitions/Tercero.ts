import { IdOtro } from "./IdOtro";

/**
 * Tercero
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface Tercero {
  /** TextMax120Type|string|maxLength */
  NombreRazon: string;
  /** NIFType|string|length */
  NIF: string;
  /** IDOtro */
  IDOtro?: IdOtro; // ESTE DA ERROR AL ENVIARLO. Quizas mal parsing de la AEAT
}
