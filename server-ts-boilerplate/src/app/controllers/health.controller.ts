import { config } from "@/config/index.js";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const health = async (_req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        success: true,
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        environment: config.nodeEnv,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
};

export const healthController = { health };
