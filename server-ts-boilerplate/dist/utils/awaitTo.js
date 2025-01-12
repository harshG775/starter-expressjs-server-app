"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.to = to;
function to(promise) {
    return promise
        .then((result) => {
        return [undefined, result];
    })
        .catch((error) => {
        return [error instanceof Error ? error : new Error(String(error)), undefined];
    });
}
