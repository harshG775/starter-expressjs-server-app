import { ResponseError } from "@/exception";
import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

// Middleware to authorize the user
export async function authorizeMiddleware(requiredRoles: string[] = []) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.context?.user;

        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: "Unauthorized. User not authenticated.",
            });
        }

        const userRoles = user.roles || [];
        const hasPermission = requiredRoles.length === 0 || requiredRoles.some((role) => userRoles.includes(role));

        if (!hasPermission) {
            throw new ResponseError({
                statusCode: StatusCodes.FORBIDDEN,
                message: ReasonPhrases.FORBIDDEN,
                errors: [
                    {
                        message: "Insufficient permissions.",
                        userId: user.id,
                        requiredRoles,
                        userRoles,
                    },
                ],
            });
        }

        next();
    };
}
