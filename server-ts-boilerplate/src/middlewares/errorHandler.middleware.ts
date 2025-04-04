import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { CustomError } from "@/exception";
import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(err: CustomError, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof CustomError) {
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
                    2,
                ),
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
