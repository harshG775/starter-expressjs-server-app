import { NotFoundException } from "@/exception/notFoundException.js";
import { Request, Response, NextFunction } from "express";

export const notFoundMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundException("Route not found", [{ method: req.method, path: req.path }]));
};
