import { handlePrismaError } from "@/exception";
import { createHash } from "@/utils";
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

export { prisma, createUser };
