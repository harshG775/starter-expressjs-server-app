"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = void 0;
const exception_1 = require("../exception");
const http_status_codes_1 = require("http-status-codes");
const notFoundMiddleware = (req, _res) => {
    throw new exception_1.ResponseError({
        statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
        message: http_status_codes_1.ReasonPhrases.NOT_FOUND,
        context: { route: req.originalUrl },
    });
};
exports.notFoundMiddleware = notFoundMiddleware;
