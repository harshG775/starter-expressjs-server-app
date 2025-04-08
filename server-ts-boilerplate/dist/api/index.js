import express from "express";
import { router } from "./router/index.js";
import { errorHandler } from "../exception/index.js";
import { notFoundMiddleware } from "../middlewares/index.js";
const app = express();
app.use("/api", router);
app.use(notFoundMiddleware);
app.use(errorHandler);
export { app };
