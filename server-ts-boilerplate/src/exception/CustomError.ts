import { BaseError, BaseErrorContent } from "./BaseError";

export type ParamsType = {
    message?: string;
    statusCode?: number;
    logging?: boolean;
    errors?: BaseErrorContent[];
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
export class CustomError extends BaseError {
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _errors?: BaseErrorContent[];

    constructor({ message = "Internal Server Error", statusCode = 500, logging = false, errors }: ParamsType) {
        super(message);
        this._statusCode = statusCode;
        this._logging = logging;
        this._errors = errors && errors.length ? errors : undefined;
        this.name = "CustomError";

        Object.setPrototypeOf(this, CustomError.prototype); // Maintain prototype chain
    }

    get statusCode(): number {
        return this._statusCode;
    }

    get errors(): BaseErrorContent[] | undefined {
        return this._errors;
    }

    get logging(): boolean {
        return this._logging;
    }

    get details(): Record<string, unknown> {
        return {
            statusCode: this._statusCode,
            message: this.message,
            ...(this._errors ? { errors: this._errors } : {}),
        };
    }
}