"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const lib_1 = require("../lib");
const constants_1 = require("../constants");
const stream = {
    write: (message) => lib_1.logger.http(message),
};
const skip = () => {
    const env = constants_1.config.server.nodeEnv || "development";
    return env !== "development";
};
exports.morganMiddleware = (0, morgan_1.default)(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });
