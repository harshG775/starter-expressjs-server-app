import { config } from "../constants";
import winston from "winston";
import { join } from "path";
const isDevelopment = config.server.nodeEnv === "development";
const logDir = isDevelopment ? join(process.cwd(), "/tmp", "logs") : join("/tmp", "logs");
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
winston.addColors(colors);
const format = winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston.format.colorize({ all: true }), winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: join(logDir, "/error.log"), level: "error" }),
    new winston.transports.File({ filename: join(logDir, "/all.log") }),
];
export const logger = winston.createLogger({
    defaultMeta,
    level: level(),
    levels,
    format,
    transports,
});
