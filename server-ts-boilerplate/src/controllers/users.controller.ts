import { createUser } from "@/db/prisma.db";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    const user = await createUser({ username, email, password });

    if (user) {
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.CREATED,
            status: StatusCodes.CREATED,
            data: user,
        });
    }
};
const verificationSend = async (_req: Request, _res: Response): Promise<void> => {
    // const { email } = req.body;
};
const verificationVerify = async (_req: Request, _res: Response): Promise<void> => {};
const login = async (_req: Request, _res: Response): Promise<void> => {};
//
const getProfile = async (_req: Request, _res: Response): Promise<void> => {};
const updateProfile = async (_req: Request, _res: Response): Promise<void> => {};
const deleteProfile = async (_req: Request, _res: Response): Promise<void> => {};
export const usersController = {
    register,
    verificationSend,
    verificationVerify,
    login,
    //
    getProfile,
    updateProfile,
    deleteProfile,
};
