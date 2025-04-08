import { ResponseError } from "@/exception/index.js";
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const health = async (_req: Request, res: Response, next: NextFunction) => {
    next(new ResponseError({ message: "testing ResponseError", statusCode: 400, logging: true }));
    return;
    // res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, status: StatusCodes.OK });
};
export const healthController = { health };
