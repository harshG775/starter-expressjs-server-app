import { Router } from "express";
import { healthRouter } from "./health.router.js";
import { docsRouter } from "./docs.router.js";
const router = Router();
router.use("/health", healthRouter);
router.use("/", docsRouter);
export { router };
