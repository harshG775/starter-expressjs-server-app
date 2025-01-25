import { config } from "@/constants";
import { handlePrismaError, ResponseError } from "@/exception";
import { generateOTP } from "@/services";
import { createHash, to } from "@/utils";
import { otp, PrismaClient, User } from "@prisma/client";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

type CreateUserInput = Pick<User, "username" | "email" | "password">;

const createUser = async ({ username, email, password }: CreateUserInput): Promise<User | undefined> => {
    try {
        // Hash the password
        const hashedPassword = await createHash(password);

        // Create the user
        const user = await prisma.user.create({
            data: {
                username: username, // Handle optional username
                email,
                password: hashedPassword,
            },
        });

        return user;
    } catch (err) {
        handlePrismaError(err);
    }
};

const findUserByEmail = async (email: string): Promise<User> => {
    const [error, response] = await to(
        prisma.user.findUnique({
            where: {
                email: email,
            },
        })
    );
    if (error || !response) {
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
    return response;
};

const createAndSaveOtp = async (userId: string): Promise<otp> => {
    const generatedOTP = generateOTP();
    const expiresAt = new Date(Date.now() + config.mailer.optExpiresIn_minutes * 60 * 1000); // Configurable expiration time

    const [error, response] = await to(
        prisma.otp.create({
            data: {
                otp: generatedOTP,
                expiresAt,
                userId,
            },
        })
    );
    if (error || !response) {
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
    return response;
};

// otp verify route
const getOtpById = async (id: string, otp: string): Promise<[Error | null, any | null]> => {
    const [error, response] = await to(
        prisma.otp.findUnique({
            where: { id },
        })
    );

    if (error) {
        console.error("Database error:", error); // Optional: Log database errors
        return [error, null];
    }

    if (!response) {
        return [
            new ResponseError({
                statusCode: StatusCodes.NOT_FOUND,
                message: ReasonPhrases.NOT_FOUND,
                errors: [
                    {
                        message: "OTP not found",
                    },
                ],
            }),
            null,
        ];
    }

    // Check if the OTP matches
    if (response.otp !== otp) {
        return [
            new ResponseError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "Invalid OTP",
                errors: [
                    {
                        message: "The provided OTP is invalid.",
                    },
                ],
            }),
            null,
        ];
    }

    // Check if the OTP has expired
    const now = new Date();
    if (response.expiresAt < now) {
        return [
            new ResponseError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: "OTP Expired",
                errors: [
                    {
                        message: "The OTP has expired. Please request a new one.",
                    },
                ],
            }),
            null,
        ];
    }

    return [null, response];
};

const verifyUser = async (user: User): Promise<boolean> => {
    // Check if the user is already verified
    if (user.verified) {
        throw new ResponseError({
            statusCode: StatusCodes.BAD_REQUEST,
            message: "User Already Verified",
            errors: [
                {
                    message: "The user has already been verified.",
                },
            ],
        });
    }

    // Update the user's verified status to true
    const [updateError, updatedUser] = await to(
        prisma.user.update({
            where: { email: user.email },
            data: { verified: true },
        })
    );

    if (updateError || !updatedUser) {
        throw new ResponseError({
            statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
            message: ReasonPhrases.INTERNAL_SERVER_ERROR,
            errors: [
                {
                    message: "error while updating user",
                },
            ],
            logging: true,
        });
    }

    return true;
};

export { prisma, createUser, findUserByEmail, createAndSaveOtp, getOtpById, verifyUser };
