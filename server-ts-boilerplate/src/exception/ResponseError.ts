export type ErrorErrorsType = { [key: string]: any }[] | undefined;

export type ParamsType = {
    message?: string;
    statusCode?: number;
    logging?: boolean;
    errors?: ErrorErrorsType;
};

/**
 * Custom error class that extends BaseError
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @param logging - Whether to log the error
 * @param errors - Array of error details
 * @example
 * ```typescript
 * const validationError = new CustomError({
 *     message: "Invalid input",
 *     statusCode: 400,
 *     errors: [
 *         { field: "username", message: "Username is required" },
 *         { field: "email", message: "Email is required" },
 *         { field: "password", message: "Password is required" },
 *     ],
 * });
 * ```
 */
export class ResponseError extends Error {
    statusCode: number;
    logging: boolean;
    errors?: ErrorErrorsType;

    constructor({ message = "Something went wrong on the server", statusCode = 500, logging = false, errors, }: ParamsType) {
        super(message);
        this.statusCode = statusCode;
        this.logging = logging;
        this.errors = errors && errors.length ? errors : undefined;
        this.name = "ResponseError";

        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    get details(): Record<string, unknown> {
        return {
            statusCode: this.statusCode,
            message: this.message,
            ...(this.errors ? { errors: this.errors } : {}),
        };
    }
}
