//config/index.ts
import dotenv from "dotenv";
dotenv.config();
const config = {
    nodeEnv: process.env.NODE_ENV || "node environment not set",
    port: Number(process.env.PORT) || 8000,
    host: process.env.HOST || "localhost",
    version: process.env.VERSION || "1.0.0",
    allowedCorsOrigins: JSON.parse(process.env.ALLOWED_CORS_ORIGINS || '["http://localhost:8000"]'),
};
export { config };
console.log(config);


