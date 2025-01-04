// imports
import express, { Express } from "express";
import { corsMiddleware, errorHandlerMiddleware, notFoundMiddleware } from "./middlewares/index";
import { router } from "./routes/index";

// variables
const app: Express = express();

// Middlewares
app.use(corsMiddleware); // Allow cross-origin requests
app.use(express.json({ limit: "10mb" })); // Parse JSON body
app.use(express.urlencoded({ limit: "10mb", extended: true })); // Parse URL-encoded body

// Routes
app.use(router); // Application routes

// Error Handling
app.use(notFoundMiddleware); // Handle unmatched routes
app.use(errorHandlerMiddleware); // Handle errors


// exports
export default app;
