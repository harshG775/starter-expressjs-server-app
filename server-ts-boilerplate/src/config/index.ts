//config/index.ts
import dotenv from "dotenv";
dotenv.config();
const config = {
    nodeEnv: process.env.NODE_ENV || "node environment not set",
    port: Number(process.env.PORT) || 8000,
    host: process.env.HOST || "localhost",
    version: process.env.VERSION || "1.0.0",
    allowedCorsOrigins: JSON.parse(process.env.ALLOWED_CORS_ORIGINS || '["http://localhost:8000"]'),

    rateLimit: {
        windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MS) || 5) * 60 * 1000, // Time window (default 5 minutes)
        maxRequest: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
        message: process.env.RATE_LIMIT_MESSAGE || "Too many requests, please try again later.",
    },
};
export { config };
console.log(config);
