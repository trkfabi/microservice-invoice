import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import YAML from "yamljs";
import pkg from "lodash";
const { merge } = pkg;

function loadYamlFiles(directory: string): object {
  const files = fs.readdirSync(directory); // Leer todos los archivos en la carpeta
  const yamlFiles = files.filter((file) => file.endsWith(".yaml")); // Filtrar archivos .yaml

  const specs = yamlFiles.map((file) => {
    const filePath = path.join(directory, file);
    return YAML.load(filePath); // Cargar cada archivo YAML
  });

  // Combinar todas las especificaciones YAML en un solo objeto
  return merge({}, ...specs);
}

function swaggerDocs(app: Express, port: number) {
  // Ruta de la carpeta que contiene los archivos YAML
  const docsDirectory = path.resolve("./src/docs/swagger");

  // Cargar y combinar las especificaciones desde los YAML
  const swaggerSpec = loadYamlFiles(docsDirectory);

  // Configuración personalizada para Swagger UI
  const swaggerUiOptions = {
    explorer: true, // Habilita la barra de búsqueda
    customCss: ".swagger-ui .model-title { font-size: 1.25em; }",
    customSiteTitle: "API Documentation",
    customfavIcon: "https://example.com/favicon.ico",
  };

  // Configuración adicional para expandir esquemas
  const customOptions = {
    swaggerOptions: {
      defaultModelsExpandDepth: -1, // Expande todos los modelos completamente
      defaultModelExpandDepth: 6, // Profundidad de las propiedades
      docExpansion: "none", // Opciones: 'list', 'full', 'none'
    },
  };

  // Configurar Swagger UI
  app.use(
    "/api",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { ...swaggerUiOptions, ...customOptions })
  );

  // Endpoint para obtener el archivo JSON de la documentación
  app.get("/docs.json", (_: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`📄 Swagger docs available at http://localhost:${port}/api`);
}

export default swaggerDocs;

// import { Express, Request, Response } from "express";
// import swaggerJsDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";

// // Definir las opciones de Swagger
// const swaggerOptions: swaggerJsDoc.Options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Invoice API",
//       version: "1.0.0",
//       description: "API documentation for the invoice api",
//     },
//     components: {
//       securitySchemes: {
//         BearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT", // Especifica que se usará un token JWT
//         },
//       },
//     },
//     security: [
//       {
//         BearerAuth: [], // Aplica la seguridad a todos los endpoints
//       },
//     ],
//   },
//   apis: ["./src/controllers/*.ts"], // Ruta a los archivos de las rutas y controladores
// };

// // Crear el espec de Swagger
// const swaggerSpec = swaggerJsDoc(swaggerOptions);
// console.log(JSON.stringify(swaggerSpec));

// function swaggerDocs(app: Express, port: number) {
//   app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   app.get("/docs.json", (_: Request, res: Response) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
//   });
// }
// export default swaggerDocs;
