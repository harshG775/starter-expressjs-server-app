import express from "express";
import { router } from "./router";

const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api", router);

// Error handling

export default app;
