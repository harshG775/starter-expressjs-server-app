import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./constants/config";
import { errorHandler, notFound } from "./middleware/error/errorHandling";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

// routes import
import welcomeRoute from "./routes/welcome.routes";

const app = express();

// Middleware
app.use(cors({ origin: config.server.corsOrigins, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(loggerMiddleware);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.use("/api/", welcomeRoute);

export default app;
