export const config = {
    server: {
        version: process.env.APP_VERSION || "v1",
        port: parseInt(process.env.APP_PORT || "8000"),
        allowedOrigins: JSON?.parse(process.env.ALLOWED_ORIGINS || "[]") as string[],
        nodeEnv: process?.env?.NODE_ENV || "development",
    },
    database: {
        url: process.env.DATABASE_URL,
    },
};
