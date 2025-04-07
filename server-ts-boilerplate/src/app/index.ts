import express from "express";
import { router } from "./router";
import {
    corsMiddleware,
    errorHandlerMiddleware,
    morganMiddleware,
    notFoundMiddleware,
    rateLimiterMiddleware,
} from "@/middlewares";
import { configureOpenAPI } from "@/docs/configure-open-api";
import path from "path";
import { cwd } from "process";

const app = express();
// Middlewares
app.use(rateLimiterMiddleware);
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(morganMiddleware);
app.use("/public", express.static(path.join(cwd(), "/public")));
console.log(`path.join(cwd(), "/public")`);
console.log(path.join(cwd(), "/public"));



// Routes
app.use("/api/docs/reference", configureOpenAPI);
app.use("/api", router);

// Error handling
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
