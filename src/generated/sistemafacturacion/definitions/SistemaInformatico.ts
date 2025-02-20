import { IndicadorSN } from "../../../types/enums";
import { IdOtro } from "./IdOtro";

/**
 * SistemaInformatico
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface SistemaInformatico {
  /** TextMax120Type|string|maxLength */
  NombreRazon: string;
  /** NIFType|string|length */
  NIF: string;
  /** IDOtro */
  IDOtro?: IdOtro; // ESTE DA ERROR AL ENVIARLO. Quizas mal parsing de la AEAT
  /** TextMax30Type|string|maxLength */
  NombreSistemaInformatico?: string;
  /** TextMax2Type|string|maxLength */
  IdSistemaInformatico: string;
  /** TextMax50Type|string|maxLength */
  Version: string;
  /** TextMax100Type|string|maxLength */
  NumeroInstalacion: string;
  /** SiNoType|string|S,N */
  TipoUsoPosibleSoloVerifactu?: IndicadorSN;
  /** SiNoType|string|S,N */
  TipoUsoPosibleMultiOT?: IndicadorSN;
  /** SiNoType|string|S,N */
  IndicadorMultiplesOT?: IndicadorSN;
}
