import { Router } from "express";
const healthRouter = Router();
import { z } from "zod";
import { registry } from "../../api-docs/index.js";
import { healthController } from "../../app/controllers/health.controller.js";
const HealthCheckResponseSchema = z.object({
    success: z.boolean(),
    message: z.string(),
    status: z.number(),
    environment: z.string(),
    uptime: z.number(),
    timestamp: z.string(),
});
registry.registerPath({
    path: "/api/v1.0.0/health",
    method: "get",
    summary: "Health check endpoint",
    responses: {
        200: {
            description: "System health status",
            content: {
                "application/json": {
                    schema: HealthCheckResponseSchema,
                },
            },
        },
    },
});
healthRouter.route("/").get(healthController.health);
export { healthRouter };
