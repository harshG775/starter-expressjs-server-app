import { config } from "@/config/index.js";
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
export const rateLimiterMiddleware = rateLimit({
    windowMs: config.rateLimit.windowMs, // 5 minutes
    max: config.rateLimit.maxRequest, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        message: config.rateLimit.message,
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
