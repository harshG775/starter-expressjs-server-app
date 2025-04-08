import { BaseError } from "./BaseError.js";
import type { BaseErrorErrors } from "./BaseError.js";

export type ParamsType = {
    message?: string;
    statusCode?: number;
    logging?: boolean;
    errors?: BaseErrorErrors;
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
export class ResponseError extends BaseError {
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _errors?: BaseErrorErrors;

    constructor({ message = "Internal Server Error", statusCode = 500, logging = false, errors }: ParamsType) {
        super(message);
        this._statusCode = statusCode;
        this._logging = logging;
        this._errors = errors && errors.length ? errors : undefined;
        this.name = "ResponseError";

        Object.setPrototypeOf(this, BaseError.prototype);
    }

    get statusCode(): number {
        return this._statusCode;
    }

    get errors(): BaseErrorErrors {
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
