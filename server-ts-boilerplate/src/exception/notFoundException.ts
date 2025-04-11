import { HttpException, httpExceptionErrors } from "./httpException.js";

/**
 * NotFoundException - Used for handling 404 errors (route or resource not found)
 *
 * @example
 * ```ts
 * throw new NotFoundException("User not found");
 * ```
 */
export class NotFoundException extends HttpException {
    constructor(message = "Resource not found", errors: httpExceptionErrors) {
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
