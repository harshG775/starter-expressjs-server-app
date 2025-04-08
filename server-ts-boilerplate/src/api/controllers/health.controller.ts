import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const health = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(StatusCodes.OK).json({
            success: true,
            message: ReasonPhrases.OK,
            status: StatusCodes.OK,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        next(error);
    }
};

export const healthController = { health };
