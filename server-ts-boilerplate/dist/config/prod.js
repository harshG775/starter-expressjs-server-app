export const prod = {
    allowedCorsOrigins: process.env.ALLOWED_CORS_ORIGINS?.split(",") || [],
};
