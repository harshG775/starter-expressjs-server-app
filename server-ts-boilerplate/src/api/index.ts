import express from "express";
import { router } from "./router/index.js";
import { errorHandler } from "@/exception/index.js";
import { notFoundMiddleware } from "@/middlewares/index.js";
import { config } from "@/config/index.js";
const app = express();
const { version } = config;

app.use(`/api/v${version}`, router);
app.use(notFoundMiddleware);
app.use(errorHandler);

export { app };
