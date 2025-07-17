export enum EstadoEnvioAEAT {
  PENDIENTE = "P",
  ACEPTADO = "A",
  RECHAZADO = "R",
}

// L1 - Tipos de Impuesto
export enum TipoImpuesto {
  IVA = "01",
  IPSI = "02",
  IGIC = "03",
  OTROS = "05",
}

// L2 - Tipos de Factura
export enum TipoFactura {
  FACTURA = "F1",
  FACTURA_SIMPLIFICADA = "F2",
  FACTURA_SUSTITUCION = "F3",
  RECTIFICATIVA_ERROR = "R1",
  RECTIFICATIVA_ART80_3 = "R2",
  RECTIFICATIVA_ART80_4 = "R3",
  RECTIFICATIVA_RESTO = "R4",
  RECTIFICATIVA_SIMPLIFICADA = "R5",
}

// L3 - Tipo de Rectificación
export enum TipoRectificacion {
  SUSTITUCION = "S",
  DIFERENCIAS = "I",
}

// L4, L5, L3E - Indicador S/N
export enum IndicadorSN {
  SI = "S",
  NO = "N",
}

// L6, L4E - Tipo Emisor
export enum TipoEmisor {
  DESTINATARIO = "D",
  TERCERO = "T",
}

// L7 - Tipos de Identificación
export enum TipoIdentificacion {
  NIF_IVA = "02",
  PASAPORTE = "03",
  DOC_OFICIAL = "04",
  CERTIFICADO_RESIDENCIA = "05",
  OTRO_DOCUMENTO = "06",
  NO_CENSADO = "07",
}

// L8A - Claves de Régimen IVA
export enum ClaveRegimenIVA {
  GENERAL = "01",
  EXPORTACION = "02",
  BIENES_USADOS = "03",
  ORO_INVERSION = "04",
  AGENCIAS_VIAJES = "05",
  GRUPO_ENTIDADES = "06",
  CRITERIO_CAJA = "07",
  IPSI_IGIC = "08",
  AGENCIAS_VIAJE_MEDIACION = "09",
  COBROS_TERCEROS = "10",
  ARRENDAMIENTO = "11",
  IVA_PENDIENTE_DEVENGO_OBRA = "14",
  IVA_PENDIENTE_DEVENGO_TRACTO = "15",
  OSS_IOSS = "17",
  RECARGO_EQUIVALENCIA = "18",
  REAGYP = "19",
  SIMPLIFICADO = "20",
}

// L8B - Claves de Régimen IGIC
export enum ClaveRegimenIGIC {
  GENERAL = "01",
  EXPORTACION = "02",
  BIENES_USADOS = "03",
  ORO_INVERSION = "04",
  AGENCIAS_VIAJES = "05",
  GRUPO_ENTIDADES = "06",
  CRITERIO_CAJA = "07",
  IPSI_IVA = "08",
  AGENCIAS_VIAJE_MEDIACION = "09",
  COBROS_TERCEROS = "10",
  ARRENDAMIENTO = "11",
  IGIC_PENDIENTE_DEVENGO_OBRA = "14",
  IGIC_PENDIENTE_DEVENGO_TRACTO = "15",
  COMERCIANTE_MINORISTA = "17",
  PEQUENO_EMPRESARIO = "18",
  OPERACIONES_INTERIORES_EXENTAS = "19",
}

// L9 - Calificación de Operación
export enum CalificacionOperacion {
  SUJETA_NO_EXENTA = "S1",
  SUJETA_NO_EXENTA_INVERSION = "S2",
  NO_SUJETA_ART7_14 = "N1",
  NO_SUJETA_LOCALIZACION = "N2",
}

// L10 - Tipos de Exención
export enum TipoExencion {
  ART_20 = "E1",
  ART_21 = "E2",
  ART_22 = "E3",
  ART_23_24 = "E4",
  ART_25 = "E5",
  OTROS = "E6",
}

// L12 - Tipos de Huella
export enum TipoHuella {
  SHA_256 = "01",
}

// L15 - Versiones
export enum Version {
  V1_0 = "1.0",
}

// L16 - Tipos de Generador
export enum TipoGenerador {
  EXPEDIDOR = "E",
  DESTINATARIO = "D",
  TERCERO = "T",
}

// L17 - Estados de Rechazo
export enum EstadoRechazo {
  NO_RECHAZO = "N",
  RECHAZO_AEAT = "S",
  NO_EXISTE_AEAT = "X",
}

// L1E - Tipos de Anomalías
export enum TipoAnomalia {
  INTEGRIDAD_HUELLA = "01",
  INTEGRIDAD_FIRMA = "02",
  INTEGRIDAD_OTROS = "03",
  TRAZABILIDAD_CADENA_NO_PRIMERO = "04",
  TRAZABILIDAD_CADENA_NO_ULTIMO = "05",
  TRAZABILIDAD_CADENA_OTROS = "06",
  TRAZABILIDAD_HUELLA_NO_CORRESPONDE = "07",
  TRAZABILIDAD_HUELLA_ANTERIOR_NO_CORRESPONDE = "08",
  TRAZABILIDAD_HUELLA_OTROS = "09",
  TRAZABILIDAD_CADENA_OTROS_GENERAL = "10",
  TRAZABILIDAD_FECHAS_ANTERIOR = "11",
  TRAZABILIDAD_FECHAS_POSTERIOR = "12",
  TRAZABILIDAD_FECHAS_SISTEMA = "13",
  TRAZABILIDAD_FECHAS_OTROS = "14",
  TRAZABILIDAD_OTROS = "15",
  OTROS = "90",
}

// L2E - Tipos de Eventos
export enum TipoEvento {
  INICIO_NO_VERIFACTU = "01",
  FIN_NO_VERIFACTU = "02",
  INICIO_DETECCION_ANOMALIAS = "03",
  DETECCION_ANOMALIAS = "04",
  INICIO_DETECCION_ANOMALIAS_EVENTO = "05",
  DETECCION_ANOMALIAS_EVENTO = "06",
  RESTAURACION_COPIA = "07",
  EXPORTACION_REGISTROS = "08",
  EXPORTACION_EVENTOS = "09",
  RESUMEN_EVENTOS = "10",
  OTROS = "90",
}
