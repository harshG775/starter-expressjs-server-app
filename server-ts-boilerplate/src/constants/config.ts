export const config = {
    server: {
        version: process.env.VERSION || "v1",
        port: parseInt(process.env.PORT || "8000"),
        allowedOrigins: JSON?.parse(process.env.ALLOWED_ORIGINS || "[]") as string[],
        nodeEnv: process?.env?.NODE_ENV || "development",
    },
    database: {
        url: process.env.DATABASE_URL,
    },
};
