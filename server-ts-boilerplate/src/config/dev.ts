//config/dev.ts
export const dev = {
    allowedCorsOrigins: process.env.ALLOWED_CORS_ORIGINS?.split(",") || ["http://localhost:8000"],
};
