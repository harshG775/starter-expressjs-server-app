"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    server: {
        version: process.env.APP_VERSION || "v1",
        port: parseInt(process.env.APP_PORT || "8000"),
        allowedOrigins: JSON?.parse(process.env.ALLOWED_ORIGINS || "[]"),
        nodeEnv: process?.env?.NODE_ENV || "development",
    },
    database: {
        url: process.env.DATABASE_URL,
    },
};
