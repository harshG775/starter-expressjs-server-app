import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ResponseError } from "./ResponseError.js";
import { BaseError } from "./BaseError.js";

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ResponseError) {
        if (err.logging) {
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
        res.status(err.statusCode).send(err.details);
    } else {
        console.error(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR }],
        });
    }
}
