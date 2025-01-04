import { CustomError, CustomErrorContent } from "./CustomError";

type ParamsType = {
    message?: string;
    statusCode?: number;
    errors?: CustomErrorContent[];
    logging?: boolean;
    context?: { [key: string]: any };
};
export class ResponseError extends CustomError {
    private readonly _statusCode: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor({ message = "internal server error", statusCode = 500, logging = false, context = {} }: ParamsType) {
        super(message);
        this._statusCode = statusCode;
        this._logging = logging;
        this._context = context;
        // Only because we are extending a built-in class
        Object.setPrototypeOf(this, ResponseError.prototype);
    }
    get statusCode(): number {
        return this._statusCode;
    }
    get errors(): CustomErrorContent[] {
        return [{ message: this.message, context: this._context }];
    }
    get logging(): boolean {
        return this._logging;
    }
}
