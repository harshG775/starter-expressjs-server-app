import { createAndSaveOtp, createUser, findUserByEmail, getOtpById, verifyUser } from "@/db";
import { sendOTP } from "@/services";
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
const verificationSend = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    const generatedOTP = await createAndSaveOtp(user.id);

    await sendOTP([email], parseInt(generatedOTP?.otp));

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: {
            otpId: generatedOTP.id,
        },
    });
};
const verificationVerify = async (req: Request, res: Response): Promise<void> => {
    const { otp, otpId, email } = req.body;
    const [_error, _otpInDB] = await getOtpById(otpId, otp);

    const user = await findUserByEmail(email);

    const isVerified = await verifyUser(user);

    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: {
            verified: isVerified,
        },
    });
};
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
