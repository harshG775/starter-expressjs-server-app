import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { HttpException } from "./httpException.js";
export function errorHandler(err, _req, res, _next) {
    if (err instanceof HttpException) {
        if (err.logging) {
            console.error(JSON.stringify({
                code: err.statusCode,
                errors: err.errors,
                stack: err.stack,
            }, null, 2));
        }
        res.status(err.statusCode).send(err.details);
    }
    else {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
        });
    }
}
