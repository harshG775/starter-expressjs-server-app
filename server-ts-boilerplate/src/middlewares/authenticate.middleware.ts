import { ResponseError } from "@/exception";
import { getAccessTokenFromHeaders } from "@/utils";
import { Request, Response, NextFunction } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

export async function authenticateMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    // const token = req.headers['authorization'];
    const { token } = getAccessTokenFromHeaders({ authorization: req.headers.authorization });
    if (!token) {
        throw new ResponseError({
            statusCode: StatusCodes.UNAUTHORIZED,
            message: ReasonPhrases.UNAUTHORIZED,
            context: { message: "Access denied. No token provided." },
        });
    }

    try {
        // Verify the token
        const decoded = {}; //jwt.verify(token, SECRET_KEY);
        req.context.user = decoded; // Attach user info to the request object
        next(); // Continue to the next middleware or route
    } catch (err) {
        console.error("authenticateMiddleware error:", err);
        res.status(403).json({ message: "Invalid token." });
        return;
    }
}
