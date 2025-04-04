"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const BaseError_1 = require("./BaseError");
class CustomError extends BaseError_1.BaseError {
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
exports.CustomError = CustomError;
