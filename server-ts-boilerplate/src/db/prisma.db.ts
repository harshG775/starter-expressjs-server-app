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
export { prisma, createUser, findUserByEmail, createAndSaveOtp };
