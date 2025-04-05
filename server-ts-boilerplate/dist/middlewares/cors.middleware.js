"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const cors_1 = __importDefault(require("cors"));
const constants_1 = require("../constants");
const exception_1 = require("../exception");
exports.corsMiddleware = (0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        const isAllowed = constants_1.config.server.allowedOrigins.some((allowedOrigin) => new URL(allowedOrigin).origin === new URL(origin).origin);
        if (isAllowed) {
            callback(null, true);
        }
        else {
            callback(new exception_1.CustomError({
                statusCode: http_status_codes_1.StatusCodes.FORBIDDEN,
                message: `Origin ${origin} not allowed by CORS`,
                logging: true,
            }));
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: http_status_codes_1.StatusCodes.NO_CONTENT,
});
