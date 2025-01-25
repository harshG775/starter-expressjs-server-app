export const config = {
    server: {
        version: process.env.APP_VERSION || "v1",
        port: parseInt(process.env.APP_PORT || "8000"),
        originsWhitelist: process.env.ORIGINS_WHITELIST?.split(",")?.map((origin) => origin.trim()) || [],
        nodeEnv: process?.env?.NODE_ENV,
    },
    mailer: {
        optExpiresIn_minutes: parseInt(process.env.OPT_EXPIRES_IN_MINUTES || "6"),
        senderEmail: process.env.SENDER_EMAIL,
        googlePass: process.env.GOOGLE_PASS,
    },
};
