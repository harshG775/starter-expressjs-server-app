//config/index.ts
import dotenv from "dotenv";
import path from "path";
const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8000,
    host: process.env.HOST || "localhost",
    version: process.env.VERSION || "1.0.0",
    allowedCorsOrigins: JSON.parse(process.env.ALLOWED_CORS_ORIGINS || '["http://localhost:8000"]'),
};
export { config };

