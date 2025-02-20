import { RegistroAlta } from "./RegistroAlta";
import { RegistroAnulacion } from "./RegistroAnulacion";

/**
 * RegistroFactura
 * @targetNSAlias `sfLR`
 * @targetNamespace `https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroLR.xsd`
 */

// This is a union type that represents the two possible shapes of RegistroFactura
// It is used to make at least one of the two fields required
interface BaseRegistroFactura {}

interface RegistroAltaRequired extends BaseRegistroFactura {
  RegistroAlta: RegistroAlta;
  RegistroAnulacion?: undefined; // Asegura que no esté presente si RegistroAlta está definido
}

interface RegistroAnulacionRequired extends BaseRegistroFactura {
  RegistroAlta?: undefined; // Asegura que no esté presente si RegistroAnulacion está definido
  RegistroAnulacion: RegistroAnulacion;
}

export type RegistroFactura = RegistroAltaRequired | RegistroAnulacionRequired;

// export interface RegistroFactura {
//   /** RegistroAlta */
//   RegistroAlta?: RegistroAlta;
//   /** RegistroAnulacion */
//   RegistroAnulacion?: RegistroAnulacion;
// }
