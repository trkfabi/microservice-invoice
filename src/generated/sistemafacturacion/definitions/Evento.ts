import { Tercero } from "./Tercero";
import { SistemaInformatico } from "./SistemaInformatico";
import { ObligadoEmision } from "./ObligadoEmision";
import {
  TipoGenerador,
  TipoHuella,
  TipoEvento,
  IndicadorSN,
} from "../../../types/enums";
import { DatosPropiosEvento } from "./DatosPropiosEvento";
/**
 * Evento
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/EventosSIF.xsd`
 */
export interface Evento {
  /** SistemaInformatico */
  SistemaInformatico: SistemaInformatico;
  /** ObligadoEmision */
  ObligadoEmision: ObligadoEmision;
  EmitidoPorTerceroODestinatario?: TipoGenerador;
  TerceroODestinatario?: Tercero;
  FechaHoraHusoGenEvento: string;
  TipoEvento: TipoEvento;
  DatosPropiosEvento?: DatosPropiosEvento;
  OtrosDatosDelEvento?: string;
  Encadenamiento: {
    PrimerEvento?: IndicadorSN;
    EventoAnterior: {
      TipoEvento: TipoEvento;
      FechaHoraHusoGenEvento: string;
      HuellaEvento: string;
    };
  };
  TipoHuella: TipoHuella;
  HuellaEvento: string;
  Signature?: string;
}
