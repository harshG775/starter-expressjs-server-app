import { Request, Response, NextFunction } from "express";
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<void>;

/**
 * Catch async errors without try/catch blocks
 */
export const catchAsync = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};
