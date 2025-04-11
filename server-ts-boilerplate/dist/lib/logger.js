import winston from "winston";
import "winston-daily-rotate-file";
import { join } from "path";
import { config } from "../config/index.js";
const cwd = process.cwd();
const format = winston.format.combine(winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston.format.colorize({ all: true }), winston.format.prettyPrint({
    depth: 5,
}), winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`));
const transports = [
    new winston.transports.Console({}),
    new winston.transports.DailyRotateFile({
        level: "error",
        dirname: join(cwd, "/tmp/logs"),
        filename: "%DATE%_error.log",
        datePattern: "YYYY-MM-DD",
        maxSize: "20m",
        maxFiles: "14d",
    }),
    new winston.transports.DailyRotateFile({
        dirname: join(cwd, "/tmp/logs"),
        filename: "%DATE%_combined.log",
        datePattern: "YYYY-MM-DD",
        maxSize: "20m",
        maxFiles: "14d",
    }),
    new winston.transports.Http({
        format: winston.format.json(),
        host: "localhost",
        port: 4000,
        path: "/logs",
        ssl: false,
        batch: true,
        batchCount: 10,
        batchInterval: 10000,
    }),
];
export const logger = winston.createLogger({
    level: config.logLevel,
    transports,
    format: format,
});
