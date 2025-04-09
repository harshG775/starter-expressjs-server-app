import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";
const healthRouter = Router();

import { z } from "zod";
import { registry } from "@/api-docs/index.js";
registry.registerPath({
    path: "/health",
    method: "get",
    summary: "Health check endpoint",
    responses: {
        200: {
            description: "System health status",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean(),
                        message: z.string(),
                        status: z.number(),
                        environment: z.string(),
                        uptime: z.number(),
                        timestamp: z.string(),
                    }),
                },
            },
        },
    },
});

healthRouter.route("/").get(healthController.health);

export { healthRouter };
