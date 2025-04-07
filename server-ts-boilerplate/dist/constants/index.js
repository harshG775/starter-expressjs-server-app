import dotEnv from "dotenv";
dotEnv.config({});
const config = {
    server: {
        nodeEnv: process.env.NODE_ENV || "development",
        port: process.env.PORT || 8000,
        host: process.env.HOST || "localhost",
        allowedCorsOrigins: process.env.ALLOWED_CORS_ORIGINS || ["http://localhost:8000"],
    },
};
export { config };
