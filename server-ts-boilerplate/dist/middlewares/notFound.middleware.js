import { NotFoundException } from "../exception/notFoundException.js";
export const notFoundMiddleware = (req, _res, next) => {
    next(new NotFoundException("Route not found", [{ method: req.method, path: req.path }]));
};
