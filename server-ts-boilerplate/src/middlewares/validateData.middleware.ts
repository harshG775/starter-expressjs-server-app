import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { ResponseError } from "@/exception";
/**
 * https://dev.to/osalumense/validating-request-data-in-expressjs-using-zod-a-comprehensive-guide-3a0j
 */
export function validateDataMiddleware(schema: z.ZodObject<any, any>) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const validationResult = schema.safeParse(req.body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.errors.map((issue: any) => ({
                message: `${issue.path.join(".")} is ${issue.message}`,
            }));
            throw new ResponseError({
                statusCode: StatusCodes.BAD_REQUEST,
                message: `${ReasonPhrases.BAD_REQUEST} Invalid data`,
                context: errorMessages,
            });
        }

        next();
    };
}
