import { healthController } from "@/controllers";
import { asyncHandler } from "@/utils";
import { Router } from "express";
export const health = (router: Router): void => {
    router.route("/").get(asyncHandler(healthController.health));
};
