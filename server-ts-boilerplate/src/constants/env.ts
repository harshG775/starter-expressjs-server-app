export const env = {
    server: {
        port: parseInt(process.env.APP_PORT || "8000"),
        corsWhitelist: process.env.CORS_WHITELIST?.split(",")?.map((origin) => origin.trim()) || [],
        nodeEnv: process?.env?.NODE_ENV,
    },
};
