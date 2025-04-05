import { BaseError } from "./BaseError";
export class CustomError extends BaseError {
    _statusCode;
    _logging;
    _errors;
    constructor({ message = "Internal Server Error", statusCode = 500, logging = false, errors }) {
        super(message);
        this._statusCode = statusCode;
        this._logging = logging;
        this._errors = errors && errors.length ? errors : undefined;
        this.name = "CustomError";
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    get statusCode() {
        return this._statusCode;
    }
    get errors() {
        return this._errors;
    }
    get logging() {
        return this._logging;
    }
    get details() {
        return {
            success: false,
            statusCode: this._statusCode,
            message: this.message,
            ...(this._errors ? { errors: this._errors } : {}),
        };
    }
}
