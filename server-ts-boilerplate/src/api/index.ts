import express from "express";
import { router } from "./router/index.js";
import { errorHandler } from "@/exception/index.js";
const app = express();

app.use("/api", router);

app.use(errorHandler);

export { app };
