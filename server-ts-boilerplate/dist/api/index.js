import express from "express";
import { router } from "./router/index.js";
const app = express();
app.use("/api", router);
export { app };
