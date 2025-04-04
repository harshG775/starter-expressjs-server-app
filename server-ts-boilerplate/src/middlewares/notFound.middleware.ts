import { CustomError } from "@/exception";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const notFoundMiddleware = (req: Request, _res: Response) => {
    throw new CustomError({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Endpoint Not Found",
        errors: [{ message: req.originalUrl }],
    });
};
