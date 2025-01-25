export declare global {
    namespace Express {
        interface Request {
            context?: any;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            APP_VERSION: string | undefined;
            APP_PORT: string | undefined;
            CORS_WHITELISTS: string | undefined;
            NODE_ENV: string | undefined;
            // 
            OPT_EXPIRES_IN_MINUTES: string | undefined;
            SENDER_EMAIL: string | undefined;
            GOOGLE_PASS: string | undefined;
        }
    }
}