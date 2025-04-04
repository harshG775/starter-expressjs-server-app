// Controller
import { catchAsync } from "@/exception/catchAsync";
import { Request, Response } from "express";

export const healthController = {
    health: catchAsync(async (_req: Request, res: Response) => {
        res.status(200).json({ success: true, message: "Server is running" });
    }),
};
