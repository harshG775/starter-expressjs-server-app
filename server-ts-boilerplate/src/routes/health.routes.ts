import { healthController } from "@/controllers";
import { Router } from "express";
export const health = (router: Router): void => {
    router.route("/").get(healthController.health);
};
