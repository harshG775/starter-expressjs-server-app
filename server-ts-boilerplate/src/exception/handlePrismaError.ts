import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { ResponseError } from "./ResponseError";
import { Prisma } from "@prisma/client";

export const handlePrismaError = (err: unknown) => {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        const meta = err.meta as { target?: string[] } | undefined; // Safely access meta

        switch (err.code) {
            case "P2002":
                // Handling duplicate key errors
                throw new ResponseError({
                    statusCode: StatusCodes.CONFLICT,
                    message: `${ReasonPhrases.CONFLICT}. duplicate key`,
                    errors: [
                        {
                            message: `Duplicate field value: ${meta?.target?.join(", ") || "unknown"}`,
                        },
                    ],
                });

            case "P2014":
                // Handling invalid ID errors
                throw new ResponseError({
                    statusCode: StatusCodes.CONFLICT,
                    message: `${ReasonPhrases.CONFLICT}. invalid ID`,
                    errors: [
                        {
                            message: `Invalid ID: ${meta?.target?.join(", ") || "unknown"}`,
                        },
                    ],
                });

            case "P2003":
                // Handling invalid data errors
                throw new ResponseError({
                    statusCode: StatusCodes.CONFLICT,
                    message: `${ReasonPhrases.CONFLICT}. invalid data`,
                    errors: [
                        {
                            message: `Invalid input data: ${meta?.target?.join(", ") || "unknown"}`,
                        },
                    ],
                });
            default:
                // Handling unknown Prisma error codes
                throw new ResponseError({
                    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                    message: `${ReasonPhrases.INTERNAL_SERVER_ERROR}. unknown Prisma`,
                    errors: [
                        {
                            message: `Unhandled Prisma error: ${err.message}`,
                        },
                    ],
                });
        }
    }

    // Fallback for non-Prisma errors
    throw new ResponseError({
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: ReasonPhrases.INTERNAL_SERVER_ERROR,
        errors: [
            {
                message: "An unexpected error occurred.",
            },
        ],
    });
};
