"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiterMiddleware = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_codes_1 = require("http-status-codes");
exports.rateLimiterMiddleware = (0, express_rate_limit_1.default)({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: {
        success: false,
        statusCode: http_status_codes_1.StatusCodes.TOO_MANY_REQUESTS,
        message: "Too many requests, please try again later.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});
