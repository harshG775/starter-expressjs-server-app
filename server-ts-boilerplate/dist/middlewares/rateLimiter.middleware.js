import { config } from "../config/index.js";
import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
export const rateLimiterMiddleware = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.maxRequest,
    message: {
        success: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        message: config.rateLimit.message,
    },
    standardHeaders: true,
    legacyHeaders: false,
});
