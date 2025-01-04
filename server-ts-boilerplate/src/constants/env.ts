export const env = {
    server: {
        port: parseInt(process.env.APP_PORT || "8000"),
        originsWhitelist: process.env.ORIGINS_WHITELIST?.split(",")?.map((origin) => origin.trim()) || [],
        nodeEnv: process?.env?.NODE_ENV,
    },
};
