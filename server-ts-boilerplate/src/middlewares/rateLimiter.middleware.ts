import rateLimit from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
export const rateLimiterMiddleware = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        statusCode: StatusCodes.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later.",
    },
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
