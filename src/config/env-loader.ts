import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";

(() => {
  // Detecta el entorno desde la variable de entorno o usa 'development' por defecto
  const env = process.env.NODE_ENV || "development";
  // Define la ruta del archivo .env basado en el entorno
  const envFilePath = resolve(process.cwd(), `.env.${env}`);

  // Verifica si el archivo .env para el entorno existe
  if (existsSync(envFilePath)) {
    console.log(`Cargando las variables de entorno desde ${envFilePath}`);
    config({ path: envFilePath }); // Cargar variables de entorno desde el archivo correspondiente
  } else {
    console.warn(
      `No se encontró un archivo .env específico para el entorno: ${env}. Usando el archivo .env por defecto`
    );
    config(); // Cargar el archivo .env por defecto si existe
  }
})();
