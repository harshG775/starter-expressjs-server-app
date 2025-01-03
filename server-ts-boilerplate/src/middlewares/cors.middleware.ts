import { StatusCodes } from "http-status-codes";
import cors from "cors";
import { env } from "@/constants";

export const corsMiddleware = cors({
    origin: (origin, callback) => {
        if (!origin) {
            // Allow requests with no origin (e.g., mobile apps, server-to-server)
            return callback(null, true);
        }

        // Allow only origins in the whitelist
        const isAllowed = env.server.corsWhitelist.some(
            (allowedOrigin) => new URL(allowedOrigin).origin === new URL(origin).origin
        );

        if (isAllowed) {
            callback(null, true);
        } else {
            console.error(`Blocked CORS request from origin: ${origin}`);
            callback(new Error(`Origin ${origin} not allowed by CORS`));
        }
    },
    optionsSuccessStatus: StatusCodes.OK,
});
