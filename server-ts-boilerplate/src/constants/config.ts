export const config = {
    server: {
        version: process.env.APP_VERSION || "v1",
        port: parseInt(process.env.APP_PORT || "8000"),
        originsWhitelist: process.env.ORIGINS_WHITELIST?.split(",")?.map((origin) => origin.trim()) || [],
        nodeEnv: process?.env?.NODE_ENV,
    },
};
