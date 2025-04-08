import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ResponseError } from "./ResponseError.js";
import { BaseError } from "./BaseError.js";

export function errorHandler(err: ResponseError, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof BaseError) {
        const { statusCode, details, logging } = err;
        if (logging) {
            console.error(
                JSON.stringify(
                    {
                        code: err.statusCode,
                        errors: err.errors,
                        stack: err.stack,
                    },
                    null,
                    2
                )
            );
        }
        res.status(statusCode).send(details);
    } else {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
        });
    }
}
