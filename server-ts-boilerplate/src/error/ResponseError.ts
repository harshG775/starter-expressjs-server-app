import { CustomError, CustomErrorContent } from "./CustomError";

type ParamsType = {
    message?: string;
    statusCode?: number;
    errors?: CustomErrorContent[];
    logging?: boolean;
    context?: { [key: string]: any };
};
export class ResponseError extends CustomError {
    readonly statusCode: number;
    readonly errors: CustomErrorContent[];
    readonly logging: boolean;
    readonly context: { [key: string]: any };

    constructor({ message = "Bad request", statusCode = 400, logging = false, context = {} }: ParamsType) {
        super(message);
        this.statusCode = statusCode;
        this.errors = [{ message: message || "Bad request" }];
        this.logging = logging;
        this.context = context;

        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
}
