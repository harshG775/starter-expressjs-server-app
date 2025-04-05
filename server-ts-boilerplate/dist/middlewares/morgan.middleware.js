import morgan from "morgan";
import { logger } from "../lib";
import { config } from "../constants";
const stream = {
    write: (message) => logger.http(message),
};
const skip = () => {
    const env = config.server.nodeEnv || "development";
    return env !== "development";
};
export const morganMiddleware = morgan(":remote-addr :method :url :status :res[content-length] - :response-time ms", { stream, skip });
