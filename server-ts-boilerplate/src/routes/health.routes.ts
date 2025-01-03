import { healthController } from "../controllers/index";
import { Router } from "express";
export const health = (router: Router): void => {
    router.route("/health").get(healthController.health);
};
