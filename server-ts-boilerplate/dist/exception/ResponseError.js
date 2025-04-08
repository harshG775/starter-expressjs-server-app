export class ResponseError extends Error {
    statusCode;
    logging;
    errors;
    constructor({ message = "Internal Server Error", statusCode = 500, logging = false, errors }) {
        super(message);
        this.statusCode = statusCode;
        this.logging = logging;
        this.errors = errors && errors.length ? errors : undefined;
        this.name = "ResponseError";
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    get details() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            ...(this.errors ? { errors: this.errors } : {}),
        };
    }
}
