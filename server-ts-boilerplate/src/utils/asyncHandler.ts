import { ResponseError } from "@/exception";
import { Request, Response, NextFunction } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const asyncHandler = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch((err) => {
            if (err instanceof ResponseError) {
                // Handle custom errors
                return res.status(err.statusCode).json(err.errorDetails);
            }

            // Handle unexpected errors
            console.error("Unexpected Error:", err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: [{ message: ReasonPhrases.INTERNAL_SERVER_ERROR}],
            });
        });
    };
};
