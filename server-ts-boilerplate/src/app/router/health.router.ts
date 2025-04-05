// single router
import { Router } from "express";
import { healthController } from "@/app/controllers";
const healthRouter = Router();

healthRouter.route("/").get(healthController.health);

export { healthRouter };
