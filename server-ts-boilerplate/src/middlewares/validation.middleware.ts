import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "@/exception";

/**
 * Middleware to validate request data using a Zod schema.
 * Supports validation for body, query params, and headers.
 */
export function validationMiddleware(schema: ZodSchema<any>, source: "body" | "query" | "params" = "body") {
    return (req: Request, _res: Response, next: NextFunction) => {
        const dataToValidate = req[source]; // Validate body, query, or params
        const validationResult = schema.safeParse(dataToValidate);

        if (!validationResult.success) {
            return next(
                new CustomError({
                    statusCode: StatusCodes.BAD_REQUEST,
                    message: "Validation failed",
                    errors: validationResult.error.errors.map((err) => ({
                        field: err.path.join("."),
                        message: err.message,
                    })),
                }),
            );
        }

        next();
    };
}
