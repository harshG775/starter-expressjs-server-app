export class HttpException extends Error {
    statusCode;
    logging;
    errors;
    constructor({ message = "Something went wrong on the server", statusCode = 500, logging = false, errors, }) {
        super(message);
        this.statusCode = statusCode;
        this.logging = logging;
        this.errors = errors && errors.length ? errors : undefined;
        this.name = "HttpException ";
        Object.setPrototypeOf(this, HttpException.prototype);
    }
    get details() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            ...(this.errors ? { errors: this.errors } : {}),
        };
    }
}
