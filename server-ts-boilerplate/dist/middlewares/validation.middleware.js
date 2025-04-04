"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = validationMiddleware;
const http_status_codes_1 = require("http-status-codes");
const exception_1 = require("../exception");
function validationMiddleware(schema, source = "body") {
    return (req, _res, next) => {
        const dataToValidate = req[source];
        const validationResult = schema.safeParse(dataToValidate);
        if (!validationResult.success) {
            return next(new exception_1.CustomError({
                statusCode: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
                message: "Validation failed",
                errors: validationResult.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            }));
        }
        next();
    };
}
