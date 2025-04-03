export type BaseErrorContent = { [key: string]: any };

export abstract class BaseError extends Error {
    abstract readonly statusCode: number;
    abstract readonly logging: boolean;
    abstract readonly errors?: BaseErrorContent[];

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BaseError.prototype); // Maintain prototype chain
    }
}
