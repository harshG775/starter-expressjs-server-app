import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./constants/config";
import { notFound } from "./middleware/error/errorHandling";
import cookieParser from "cookie-parser";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

// routes import
import healthRoutes from "./routes/health.routes";

const app = express();

// Middleware
app.use(cors({ origin: config.server.corsOrigins, credentials: false }));
app.use(helmet());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(loggerMiddleware);

app.use("/health", healthRoutes);
app.use("*", notFound);

export default app;
