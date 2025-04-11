import express from "express";
import { notFoundMiddleware } from "@/middlewares/notFound.middleware.js";
import { errorHandler } from "@/exception/errorHandler.js";
import { createRouter } from "./router/index.js";
import { config } from "@/config/index.js";
import { morganMiddleware } from "@/middlewares/morgan.middleware.js";
import { corsMiddleware } from "@/middlewares/cors.middleware.js";
const app = express();

app.use(corsMiddleware);
app.use(morganMiddleware);
// 
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(`/api/v${config.version}`, createRouter());
app.use(notFoundMiddleware);
app.use(errorHandler);

export { app };
