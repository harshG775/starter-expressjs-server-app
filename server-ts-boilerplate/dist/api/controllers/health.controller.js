import { ResponseError } from "../../exception/index.js";
const health = async (_req, res, next) => {
    next(new ResponseError({ message: "testing ResponseError", statusCode: 400, logging: true }));
    return;
};
export const healthController = { health };
