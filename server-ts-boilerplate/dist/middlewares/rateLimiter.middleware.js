import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
export const rateLimiterMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
