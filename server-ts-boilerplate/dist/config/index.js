import dotenv from "dotenv";
import path from "path";
import { dev } from "./dev.js";
import { prod } from "./prod.js";
const envFile = process.env.NODE_ENV === "development" ? ".env.dev" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
const config = {
    nodeEnv: process.env.NODE_ENV || "development",
    port: Number(process.env.PORT) || 8000,
    host: process.env.HOST || "localhost",
    ...(process.env.NODE_ENV === "production" ? prod : dev),
};
export { config };
