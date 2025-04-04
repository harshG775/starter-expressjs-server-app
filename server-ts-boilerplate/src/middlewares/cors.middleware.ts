import { StatusCodes } from "http-status-codes";
import cors from "cors";
import { config } from "@/constants";
import { CustomError } from "@/exception";

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin) {
            // Allow requests with no origin (e.g., mobile apps, server-to-server)
            return callback(null, true);
        }

        // Allow only origins in the whitelist
        const isAllowed = config.server.allowedOrigins.some(
            (allowedOrigin) => new URL(allowedOrigin).origin === new URL(origin).origin,
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(
                new CustomError({
                    statusCode: StatusCodes.FORBIDDEN,
                    message: `Origin ${origin} not allowed by CORS`,
                    logging: true,
                }),
            );
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true,
    preflightContinue: false,
    maxAge: 600,
    optionsSuccessStatus: StatusCodes.NO_CONTENT,
});
