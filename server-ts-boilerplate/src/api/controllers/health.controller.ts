import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const health = async (_req: Request, res: Response, _next: NextFunction) => {
    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, status: StatusCodes.OK });
};
export const healthController = { health };
