import { CustomError, CustomErrorContent } from "./CustomError";

export class ResponseError extends CustomError {
    readonly statusCode: number;
    readonly errors: CustomErrorContent[];
    readonly logging: boolean;

    constructor(
        message: string,
        statusCode: number = 400, // Default status code is 400 (Bad Request)
        errors: CustomErrorContent[] = [],
        logging: boolean = true // Default logging behavior
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors.length > 0 ? errors : [{ message }];
        this.logging = logging;

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}
