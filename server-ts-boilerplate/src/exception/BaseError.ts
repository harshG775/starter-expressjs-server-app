export type BaseErrorErrors = { [key: string]: any }[] | undefined;
export abstract class BaseError extends Error {
    abstract readonly statusCode: number;
    abstract readonly logging: boolean;
    abstract readonly errors: BaseErrorErrors;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype); // Maintain prototype chain
    }
}
