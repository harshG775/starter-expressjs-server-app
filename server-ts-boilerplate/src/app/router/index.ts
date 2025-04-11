import { Router } from "express";
import { docsRouter } from "./docs.router.js";
import { healthRouter } from "./health.router.js";
import { usersRouter } from "./users.router.js";

const router = Router();
export const createRouter = () => {
    router.use("/docs", docsRouter);
    router.use("/health", healthRouter);
    router.use("/users", usersRouter);
    return router;
};
