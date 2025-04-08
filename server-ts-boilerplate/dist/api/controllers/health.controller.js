import { StatusCodes, ReasonPhrases } from "http-status-codes";
const health = async (_req, res, _next) => {
    res.status(StatusCodes.OK).json({ message: ReasonPhrases.OK, status: StatusCodes.OK });
};
export const healthController = { health };
