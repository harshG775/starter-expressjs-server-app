"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundMiddleware = exports.errorHandlerMiddleware = void 0;
var errorHandler_middleware_1 = require("./errorHandler.middleware");
Object.defineProperty(exports, "errorHandlerMiddleware", { enumerable: true, get: function () { return errorHandler_middleware_1.errorHandlerMiddleware; } });
var notFound_middleware_1 = require("./notFound.middleware");
Object.defineProperty(exports, "notFoundMiddleware", { enumerable: true, get: function () { return notFound_middleware_1.notFoundMiddleware; } });
