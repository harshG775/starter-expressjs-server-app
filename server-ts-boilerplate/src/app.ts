// imports
import express, { Express } from "express";
import { corsMiddleware, errorHandlerMiddleware, notFoundMiddleware } from "./middlewares/index";
import { router } from "./routes/index";

// variables
const app: Express = express();

// middlewares
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.use(router); // routes
// exports
export default app;
