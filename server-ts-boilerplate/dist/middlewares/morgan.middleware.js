import { config } from "../config/index.js";
import { logger } from "../lib/logger.js";
import morgan from "morgan";
const stream = {
    write: (message) => logger.http(message),
};
const skip = () => {
    const env = config.nodeEnv || "development";
    return env !== "development";
};
export const morganMiddleware = morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });
