import { Router } from "express";
import { healthRouter } from "./health.router.js";
import { generateOpenApiSpec } from "@/api-docs/index.js";

const router = Router();
router.use("/health", healthRouter);
router.get("/api-docs.json", (_req, res) => {res.json(generateOpenApiSpec())});


export { router };
