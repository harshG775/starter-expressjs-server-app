import { config } from "../../config/index.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
const health = async (_req, res, next) => {
    try {
        res.status(StatusCodes.OK).json({
            success: true,
            message: ReasonPhrases.OK,
            status: StatusCodes.OK,
            environment: config.nodeEnv,
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        next(error);
    }
};
export const healthController = { health };
