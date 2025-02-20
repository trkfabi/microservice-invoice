import { IndicadorSN, TipoAnomalia, TipoEvento } from "../../../types/enums";
import { IdFactura } from "./IdFactura";
import { EventoTipo } from "./EventoTipo";
/**
 * DatosPropiosEvento
 * @targetNSAlias `sf`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/EventosSIF.xsd`
 */
export interface DatosPropiosEvento {
  LanzamientoProcesoDeteccionAnomaliasRegFacturacion: {
    RealizadoProcesoSobreIntegridadHuellasRegFacturacion: IndicadorSN;
    NumeroDeRegistrosFacturacionProcesadosSobreIntegridadHuellas?: string;
    RealizadoProcesoSobreIntegridadFirmasRegFacturacion: IndicadorSN;
    NumeroDeRegistrosFacturacionProcesadosSobreIntegridadFirmas?: string;
    RealizadoProcesoSobreTrazabilidadCadenaRegFacturacion: IndicadorSN;
    NumeroDeRegistrosFacturacionProcesadosSobreTrazabilidadCadena?: string;
    RealizadoProcesoSobreTrazabilidadFechasRegFacturacion: IndicadorSN;
    NumeroDeRegistrosFacturacionProcesadosSobreTrazabilidadFechas?: string;
  };
  DeteccionAnomaliasRegFacturacion1: {
    TipoAnomalia: TipoAnomalia;
    OtrosDatosAnomalia?: string;
    RegistroFacturacionAnomalo?: IdFactura;
  };
  LanzamientoProcesoDeteccionAnomaliasRegEvento: {
    RealizadoProcesoSobreIntegridadHuellasRegEvento: IndicadorSN;
    NumeroDeRegistrosEventoProcesadosSobreIntegridadHuellas?: string;
    RealizadoProcesoSobreIntegridadFirmasRegEvento: IndicadorSN;
    NumeroDeRegistrosEventoProcesadosSobreIntegridadFirmas?: string;
    RealizadoProcesoSobreTrazabilidadCadenaRegEvento: IndicadorSN;
    NumeroDeRegistrosEventoProcesadosSobreTrazabilidadCadena?: string;
    RealizadoProcesoSobreTrazabilidadFechasRegEvento: IndicadorSN;
    NumeroDeRegistrosEventoProcesadosSobreTrazabilidadFechas?: string;
  };
  DeteccionAnomaliasRegEvento: {
    TipoAnomalia: TipoAnomalia;
    OtrosDatosAnomalia?: string;
    RegistroEventoAnomalo?: IdFactura;
  };
  ExportacionRegFacturacionPeriodo: {
    FechaHoraHusoInicioPeriodoExport: string;
    FechaHoraHusoFinPeriodoExport: string;
    RegistroFacturacionInicialPeriodo: {
      /** NIFType|string|length */
      IDEmisorFactura: string;
      /** TextoIDFacturaType|string|minLength,maxLength */
      NumSerieFactura: string;
      /** fecha|string|length,pattern */
      FechaExpedicionFactura: string;
      Huella: string;
    };
    RegistroFacturacionFinalPeriodo: {
      /** NIFType|string|length */
      IDEmisorFactura: string;
      /** TextoIDFacturaType|string|minLength,maxLength */
      NumSerieFactura: string;
      /** fecha|string|length,pattern */
      FechaExpedicionFactura: string;
      Huella: string;
    };
    NumeroDeRegistrosFacturacionAltaExportados: string;
    SumaCuotaTotalAlta: string;
    SumaImporteTotalAlta: string;
    NumeroDeRegistrosFacturacionAnulacionExportados: string;
    RegistrosFacturacionExportadosDejanDeConservarse: IndicadorSN;
  };
  ExportacionRegEventoPeriodo: {
    FechaHoraHusoInicioPeriodoExport: string;
    FechaHoraHusoFinPeriodoExport: string;
    RegistroEventoInicialPeriodo: {
      TipoEvento: TipoEvento;
      FechaHoraHusoEvento: string;
      HuellaEvento: string;
    };
    RegistroEventoFinalPeriodo: {
      TipoEvento: TipoEvento;
      FechaHoraHusoEvento: string;
      HuellaEvento: string;
    };
    NumeroDeRegEventoExportados: string;
    RegEventoExportadosDejanDeConservarse: IndicadorSN;
  };
  ResumenEventos: {
    TipoEvento: Array<EventoTipo>;
    RegistroFacturacionInicialPeriodo?: {
      /** NIFType|string|length */
      IDEmisorFactura: string;
      /** TextoIDFacturaType|string|minLength,maxLength */
      NumSerieFactura: string;
      /** fecha|string|length,pattern */
      FechaExpedicionFactura: string;
      Huella: string;
    };
    RegistroFacturacionFinalPeriodo?: {
      /** NIFType|string|length */
      IDEmisorFactura: string;
      /** TextoIDFacturaType|string|minLength,maxLength */
      NumSerieFactura: string;
      /** fecha|string|length,pattern */
      FechaExpedicionFactura: string;
      Huella: string;
    };
    NumeroDeRegistrosFacturacionAltaGenerados: string;
    SumaCuotaTotalAlta: string;
    SumaImporteTotalAlta: string;
    NumeroDeRegistrosFacturacionAnulacionGenerados: string;
  };
}
