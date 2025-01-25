import { config } from "@/constants";
import { handlePrismaError, ResponseError } from "@/exception";
import { generateOTP } from "@/services";
import { createHash } from "@/utils";
import { otp, PrismaClient, User } from "@prisma/client";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

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

const findUserByEmail = async (email: string): Promise<User | undefined> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return user;
        }
        if (!user) {
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
    } catch (err) {
        throw new ResponseError({
            statusCode: StatusCodes.NOT_FOUND,
            message: ReasonPhrases.NOT_FOUND,
            errors: [
                {
                    message: "user with this email address does not exist",
                },
            ],
        });
        console.log(err);
        
        handlePrismaError(err);
    }
};

const createAndSaveOtp = async (email: string): Promise<otp | undefined> => {
    const user = await findUserByEmail(email);
    if (!user) {
        return undefined;
    }
    try {
        // get user by email
        // Generate a random OTP
        const generatedOTP = generateOTP();

        // Calculate expiration time based on config
        const expiresAt = new Date(Date.now() + config.mailer.optExpiresIn_minutes * 60 * 1000); // Configurable expiration time

        // Save the OTP in the database
        const otp_DB = await prisma.otp.create({
            data: {
                otp: generatedOTP,
                expiresAt,
                userId: user.id,
            },
        });
        return otp_DB;
    } catch (error) {
        console.error("Error", error);
        return undefined;
    }
};
export { prisma, createUser, findUserByEmail, createAndSaveOtp };
