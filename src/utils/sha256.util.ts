import crypto from "crypto";

const flattenObject = (
  obj: any,
  parentKey = "",
  result: Record<string, any> = {}
): Record<string, any> => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        obj[key] !== null
      ) {
        flattenObject(obj[key], newKey, result);
      } else if (Array.isArray(obj[key])) {
        // Maneja arreglos serializando su contenido.
        result[newKey] = JSON.stringify(obj[key]);
      } else {
        result[newKey] = obj[key];
      }
    }
  }
  return result;
};

const generateHashString = (data: any, fields: string[]): string => {
  return fields.map((field) => `${field}=${data[field] || ""}`).join("&");
};

export const generateSHA256 = (
  data: any,
  type: "alta" | "anulacion" | "evento"
) => {
  let hashString = "";

  if (type === "alta") {
    hashString = `IDEmisorFactura=${
      data.IDFactura.IDEmisorFactura
    }&NumSerieFactura=${
      data.IDFactura.NumSerieFactura
    }&FechaExpedicionFactura=${
      data.IDFactura.FechaExpedicionFactura
    }&TipoFactura=${data.TipoFactura}&CuotaTotal=${
      data.CuotaTotal
    }&ImporteTotal=${data.ImporteTotal}&Huella=${
      data.Huella || ""
    }&FechaHoraHusoGenRegistro=${data.FechaHoraHusoGenRegistro}`;
  } else if (type === "anulacion") {
    hashString = `IDEmisorFacturaAnulada=${
      data.IDFactura.IDEmisorFacturaAnulada
    }&NumSerieFacturaAnulada=${
      data.IDFactura.NumSerieFacturaAnulada
    }&FechaExpedicionFacturaAnulada=${
      data.IDFactura.FechaExpedicionFacturaAnulada
    }  &Huella=${data.Huella || ""}&FechaHoraHusoGenRegistro=${
      data.FechaHoraHusoGenRegistro
    }`;
  } else if (type === "evento") {
    hashString = `NIF=${data.NIF}&ID=${data.ID}&IdSistemaInformatico=${data.SistemaInformatico.IdSistemaInformatico}&Version=${data.SistemaInformatico.Version}&NumeroInstalacion=${data.SistemaInformatico.NumeroInstalacion}&TipoEvento=${data.TipoEvento}&HuellaEvento=${data.HuellaEvento}&FechaHoraHusoGenEvento=${data.FechaHoraHusoGenEvento}`;
  }
  return crypto
    .createHash("sha256")
    .update(hashString)
    .digest("hex")
    .toUpperCase();
};
