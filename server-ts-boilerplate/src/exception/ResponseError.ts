import { CustomError, CustomErrorContent } from "./CustomError";

export type ParamsType = {
    message?: string;
    errors?: CustomErrorContent[];
    logging?: boolean;
    statusCode?: number;
};

export class ResponseError extends CustomError {
    private readonly _statusCode: number;
    private readonly _errors: CustomErrorContent[];
    private readonly _logging: boolean;

    constructor({ message, errors, logging, statusCode }: ParamsType) {
        super(message || "Internal server error");
        this._errors = errors || [];
        this._logging = logging || false;
        this._statusCode = statusCode || 500;
        this.name = "ResponseError";

        // Maintain prototype chain
        Object.setPrototypeOf(this, ResponseError.prototype);
    }

    get errors(): CustomErrorContent[] {
        return this._errors;
    }

    get errorDetails(): { status: number; message: string; errors: CustomErrorContent[] } {
        return {
            status: this._statusCode,
            message: this.message,
            errors: this._errors,
        };
    }

    get logging(): boolean {
        return this._logging;
    }

    get statusCode(): number {
        return this._statusCode;
    }
}
