"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
const CustomError_1 = require("./CustomError");
class ResponseError extends CustomError_1.CustomError {
    _statusCode;
    _logging;
    _context;
    constructor({ message = "internal server error", statusCode = 500, logging = false, context = {} }) {
        super(message);
        this._statusCode = statusCode;
        this._logging = logging;
        this._context = context;
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    get statusCode() {
        return this._statusCode;
    }
    get errors() {
        return [{ message: this.message, context: this._context }];
    }
    get logging() {
        return this._logging;
    }
}
exports.ResponseError = ResponseError;
