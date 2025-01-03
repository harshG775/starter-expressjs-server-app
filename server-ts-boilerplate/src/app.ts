// imports
import express, { Express } from "express";
import { corsMiddleware } from "./middlewares/index";
import { router } from "./routes/index";

// variables
const app: Express = express();

app.use(
    // middlewares
    corsMiddleware,
    express.json({ limit: "10mb" }),
    express.urlencoded({ extended: true }),
    
    // routes 
    router
);

// exports
export default app;
