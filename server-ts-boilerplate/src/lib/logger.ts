import winston from "winston";
import "winston-daily-rotate-file";
import { join } from "path";
import { config } from "@/config/index.js";

const cwd = process.cwd();

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.prettyPrint({ depth: 5 }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
);
const transports = [new winston.transports.Console({})];
export const logger = winston.createLogger({
    level: config.logLevel,
    transports,
    format: format,
});
console.log(join(cwd, "/tmp/logs"));
