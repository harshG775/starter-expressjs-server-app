import { CustomError } from "../exception";
import { StatusCodes } from "http-status-codes";
export const notFoundMiddleware = (req, _res) => {
    throw new CustomError({
        statusCode: StatusCodes.NOT_FOUND,
        message: "Endpoint Not Found",
        errors: [{ endpoint: req.originalUrl }],
        logging: true,
    });
};
