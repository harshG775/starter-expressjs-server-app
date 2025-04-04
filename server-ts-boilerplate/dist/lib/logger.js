"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const constants_1 = require("../constants");
const winston_1 = __importDefault(require("winston"));
const path_1 = require("path");
const isDevelopment = constants_1.config.server.nodeEnv === "development";
const logDir = isDevelopment ? (0, path_1.join)(process.cwd(), "/tmp", "logs") : (0, path_1.join)("/tmp", "logs");
const defaultMeta = { service: "express-server" };
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
};
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "black",
};
const level = () => {
    return isDevelopment ? "debug" : "warn";
};
winston_1.default.addColors(colors);
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.colorize({ all: true }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({ filename: (0, path_1.join)(logDir, "/error.log"), level: "error" }),
    new winston_1.default.transports.File({ filename: (0, path_1.join)(logDir, "/all.log") }),
];
exports.logger = winston_1.default.createLogger({
    defaultMeta,
    level: level(),
    levels,
    format,
    transports,
});
exports.logger.info("Logger initialized");
