import { HttpException } from "./httpException.js";
export class NotFoundException extends HttpException {
    constructor(message = "Resource not found", errors) {
        super({
            message,
            statusCode: 404,
            logging: false,
            errors,
        });
        this.errors = errors && errors.length ? errors : undefined;
        this.name = "NotFoundException";
        Object.setPrototypeOf(this, NotFoundException.prototype);
    }
}
