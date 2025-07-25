import "./config/env-loader.js";
import express from "express";
import invoiceRoutes from "./routes/invoice.route.js";
import cors from "cors";
import swaggerDocs from "./config/swagger.config.js";

const app = express();

app.use(express.json());
app.use("/api/invoice", invoiceRoutes);

interface CorsOptions {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => void;
  methods: string[];
  credentials: boolean;
  exposedHeaders: string[];
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Si no hay origen (como en herramientas como Postman), permitir la solicitud
    if (!origin) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ["x-auth-token", "x-refresh-token"],
};

app.use(cors(corsOptions));

app.listen(process.env.PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || "N/A"} mode on port ${
      process.env.PORT
    }`
  );
  swaggerDocs(app, Number(process.env.PORT));
});

export default app;
