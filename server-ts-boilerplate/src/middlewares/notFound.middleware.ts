import { ResponseError } from "../exception";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export const notFoundMiddleware = (req: Request, res: Response) => {
    // res.status(StatusCodes.NOT_FOUND).json({ message: ReasonPhrases.NOT_FOUND, status: StatusCodes.NOT_FOUND });
    throw new ResponseError({
        statusCode: StatusCodes.NOT_FOUND,
        message: ReasonPhrases.NOT_FOUND,
        context: { route: req.originalUrl },
    });
};
