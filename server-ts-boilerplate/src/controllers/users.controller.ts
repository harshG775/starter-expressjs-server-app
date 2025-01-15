// import { createHash } from "@/utils";
import { ResponseError } from "@/exception";
import { Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

const register = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    // validate fields

    res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        status: StatusCodes.OK,
        data: { username, email, password },
    });
};
const verificationSend = async (_req: Request, _res: Response): Promise<void> => {};
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
