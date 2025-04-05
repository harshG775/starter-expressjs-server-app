"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = errorHandlerMiddleware;
const http_status_codes_1 = require("http-status-codes");
const exception_1 = require("../exception");
function errorHandlerMiddleware(err, _req, res, _next) {
    if (err instanceof exception_1.BaseError) {
        const { statusCode, details, logging } = err;
        if (logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }
        res.status(statusCode).send(details);
    }
    else {
        console.error(err);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR }],
        });
    }
}
