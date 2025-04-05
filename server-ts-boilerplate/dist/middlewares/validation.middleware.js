import { StatusCodes } from "http-status-codes";
import { CustomError } from "../exception";
export function validationMiddleware(schema, source = "body") {
    return (req, _res, next) => {
        const dataToValidate = req[source];
        const validationResult = schema.safeParse(dataToValidate);
        if (!validationResult.success) {
            return next(new CustomError({
                statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
                message: "Validation failed",
                errors: validationResult.error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            }));
        }
        next();
    };
}
