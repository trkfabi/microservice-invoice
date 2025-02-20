import { Evento } from "./Evento";
import { Version } from "../../../types/enums";
/**
 * RegistroEvento
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/EventosSIF.xsd`
 */
export interface RegistroAnulacion {
  /** VersionType|string|1.0 */
  IDVersion: Version;

  Evento: Evento;
}
