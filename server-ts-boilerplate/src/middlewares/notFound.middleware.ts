import { ResponseError } from "../exception";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const notFoundMiddleware = (req: Request, _res: Response) => {
    throw new ResponseError({
        statusCode: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
        context: { route: req.originalUrl },
    });
};
