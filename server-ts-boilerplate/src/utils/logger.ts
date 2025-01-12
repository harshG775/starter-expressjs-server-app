import { config } from "../constants";
import winston from "winston";
import { join } from "path";

const isDevelopment = config.server.nodeEnv === "development";
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
// black, red, green, yellow, blue, magenta, cyan, white, gray
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

const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: join("/tmp", "logs/error.log"), level: "error" }),
    new winston.transports.File({ filename: join("/tmp", "logs/all.log") }),
];
export const logger = winston.createLogger({
    defaultMeta,
    level: level(),
    levels,
    format,
    transports,
});
