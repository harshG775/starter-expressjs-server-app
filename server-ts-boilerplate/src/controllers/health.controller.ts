import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const health = async (_: Request, res: Response) => {
    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK });
};
export const healthController = { health };
