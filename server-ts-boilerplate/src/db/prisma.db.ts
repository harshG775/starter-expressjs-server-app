import { config } from "@/constants";
import { handlePrismaError } from "@/exception";
import { generateOTP } from "@/services";
import { createHash, to } from "@/utils";
import { PrismaClient, User } from "@prisma/client";

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

const findUserByEmail = async (email: string) => {
    return to(
        prisma.user.findUnique({
            where: {
                email: email,
            },
        })
    );
};

const createAndSaveOtp = async (user: User) => {
    const generatedOTP = generateOTP();
    const expiresAt = new Date(Date.now() + config.mailer.optExpiresIn_minutes * 60 * 1000); // Configurable expiration time

    return to(
        prisma.otp.create({
            data: {
                otp: generatedOTP,
                expiresAt,
                userId: user.id,
            },
        })
    );
};
export { prisma, createUser, findUserByEmail, createAndSaveOtp };
