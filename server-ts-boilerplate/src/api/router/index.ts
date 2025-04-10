import { Router } from "express";
import { docsRouter } from "./docs.router.js";
import { healthRouter } from "./health.router.js";
import { usersRouter } from "./users.router.js";

const router = Router();

router.use("/", docsRouter);
router.use("/health", healthRouter);
router.use("/users", usersRouter);

export { router };
