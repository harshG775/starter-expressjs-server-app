import { Request, Response } from "express";
const health = async (_: Request, res: Response) => {
    res.status(200).json({
        message: "ok",
    });
};
export const healthController = { health };
