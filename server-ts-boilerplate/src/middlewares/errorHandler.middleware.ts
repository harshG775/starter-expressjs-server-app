import { ResponseError } from "../exception/index";
import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(err: ResponseError, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ResponseError) {
        const { statusCode, errors, logging } = err;
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

        res.status(statusCode).send({ errors });
    } else {
        console.error(JSON.stringify(err, null, 2));
        res.status(500).send({ errors: [{ message: "Something went wrong" }] });
    }
}
