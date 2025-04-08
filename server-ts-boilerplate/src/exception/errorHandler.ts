import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ResponseError } from "./ResponseError.js";
import { BaseError } from "./BaseError.js";

export function errorHandler(err: ResponseError, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof BaseError) {
        const { _statusCode, _details, _logging } = err;
        if (_logging) {
            console.error(
                JSON.stringify(
                    {
                        code: err._statusCode,
                        errors: err._errors,
                        stack: err._stack,
                    },
                    null,
                    2
                )
            );
        }
        res.status(_statusCode).send({
            statusCode: err._statusCode,
            message: err.message,
            ...(err._errors ? { errors: err._errors } : {}),
        });
    } else {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
        });
    }
}
