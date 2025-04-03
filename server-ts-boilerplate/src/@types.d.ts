export declare global {
    namespace Express {
        interface Request {
            context: undefined;
        }
    }

    namespace NodeJS {
        interface ProcessEnv {
            APP_VERSION: string | undefined;
            APP_PORT: string | undefined;
            ALLOWED_ORIGINS: string | undefined;
            NODE_ENV: string | undefined;
            DATABASE_URL: string | undefined;
        }
    }
}
