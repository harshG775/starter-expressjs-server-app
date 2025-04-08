import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";
const healthRouter = Router();
healthRouter.route("/").get(healthController.health);
export { healthRouter };
