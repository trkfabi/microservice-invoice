import { TipoEvento } from "../../../types/enums";
/**
 * EventoTipo
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/EventosSIF.xsd`
 */
export interface EventoTipo {
  TipoEvento: TipoEvento;
  NumeroDeEventos: string;
}
