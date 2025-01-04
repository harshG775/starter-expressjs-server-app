import { asyncHandler } from "../utils";
import { usersController } from "../controllers";
import { Router } from "express";
export const users = (router: Router): void => {
    router.route("/users/register").post(asyncHandler(usersController.register));
    router.route("/users/verification/send").post(usersController.verificationSend);
    router.route("/users/verification/verify").post(usersController.verificationVerify);
    router.route("/users/login").post(usersController.login);

    // protected
    router.route("/users/profile").get(usersController.deleteProfile);
    router.route("/users/profile").put(usersController.updateProfile);
    router.route("/users/profile").delete(usersController.getProfile);
};
