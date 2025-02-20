import { IdFactura } from "./IdFactura";
import { FacturasRectificadas } from "./FacturasRectificadas";
import { FacturasSustituidas } from "./FacturasSustituidas";
import { ImporteRectificacion } from "./ImporteRectificacion";
import { Tercero } from "./Tercero";
import { Destinatarios } from "./Destinatarios";
import { Desglose } from "./Desglose";
import { Encadenamiento } from "./Encadenamiento";
import { SistemaInformatico } from "./SistemaInformatico";
import { Signature } from "./Signature";
import {
  IndicadorSN,
  EstadoRechazo,
  TipoFactura,
  TipoRectificacion,
  TipoEmisor,
  TipoHuella,
  Version,
} from "../../../types/enums";
/**
 * RegistroAlta
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd`
 */
export interface RegistroAlta {
  /** VersionType|string|1.0 */
  IDVersion: Version;
  /** IDFactura */
  IDFactura: IdFactura;
  /** TextMax60Type|string|maxLength */
  RefExterna?: string;
  /** TextMax120Type|string|maxLength */
  NombreRazonEmisor: string;
  /** SubsanacionType|string|S,N */
  Subsanacion?: IndicadorSN;
  /** RechazoPrevioType|string|N,S,X */
  RechazoPrevio?: EstadoRechazo;
  /** ClaveTipoFacturaType|string|F1,F2,R1,R2,R3,R4,R5,F3 */
  TipoFactura: TipoFactura;
  /** ClaveTipoRectificativaType|string|S,I */
  TipoRectificativa?: TipoRectificacion;
  /** FacturasRectificadas */
  FacturasRectificadas?: FacturasRectificadas;
  /** FacturasSustituidas */
  FacturasSustituidas?: FacturasSustituidas;
  /** ImporteRectificacion */
  ImporteRectificacion?: ImporteRectificacion;
  /** fecha|string|length,pattern */
  FechaOperacion?: string;
  /** TextMax500Type|string|maxLength */
  DescripcionOperacion: string;
  /** SimplificadaCualificadaType|string|S,N */
  FacturaSimplificadaArt7273?: IndicadorSN;
  /** CompletaSinDestinatarioType|string|S,N */
  FacturaSinIdentifDestinatarioArt61d?: IndicadorSN;
  /** MacrodatoType|string|S,N */
  Macrodato?: IndicadorSN;
  /** TercerosODestinatarioType|string|D,T */
  EmitidaPorTerceroODestinatario?: TipoEmisor;
  /** Tercero */
  Tercero?: Tercero;
  /** Destinatarios */
  Destinatarios?: Destinatarios;
  /** CuponType|string|S,N */
  Cupon?: IndicadorSN;
  /** Desglose */
  Desglose: Desglose;
  /** ImporteSgn12.2Type|string|pattern */
  CuotaTotal: string;
  /** ImporteSgn12.2Type|string|pattern */
  ImporteTotal: string;
  /** Encadenamiento */
  Encadenamiento: Encadenamiento;
  /** SistemaInformatico */
  SistemaInformatico: SistemaInformatico;
  /** dateTime */
  FechaHoraHusoGenRegistro: string;
  /** TextMax15Type|string|maxLength */
  NumRegistroAcuerdoFacturacion?: string;
  /** TextMax16Type|string|maxLength */
  IdAcuerdoSistemaInformatico?: string;
  /** TipoHuellaType|string|01 */
  TipoHuella: TipoHuella;
  /** TextMax64Type|string|maxLength */
  Huella?: string;
  /** Signature */
  Signature?: Signature;
}
