import { createAndSaveOtp, createUser, findUserByEmail } from "@/db";
import { ResponseError } from "@/exception";
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
    const [findUserByEmailError, user] = await findUserByEmail(email);
    if (!user || findUserByEmailError) {
        throw new ResponseError({
            statusCode: StatusCodes.NOT_FOUND,
            message: ReasonPhrases.NOT_FOUND,
            errors: [
                {
                    message: "user with this email address does not exist",
                },
            ],
        });
    }
    const [err, generatedOTP] = await createAndSaveOtp(user);
    if (!generatedOTP || err) {
        throw new ResponseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            errors: [
                {
                    message: "error while generating OTP",
                },
            ],
        });
    }

    const resp = await sendOTP([email], parseInt(generatedOTP?.otp));
    console.log(resp);
    
    
    res.status(StatusCodes.OK).json({
        status: StatusCodes.OK,
        message: ReasonPhrases.OK,
        data: {
            otp: generatedOTP.otp,
            otpId: generatedOTP.id,
        },
    });
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
