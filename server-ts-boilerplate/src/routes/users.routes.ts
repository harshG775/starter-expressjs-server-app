import { asyncHandler } from "@/utils";
import { usersController } from "@/controllers";
import { Router } from "express";
import { authenticateMiddleware } from "@/middlewares";

export const users = (router: Router): void => {
    // Public Auth routes
    router.route("/auth/register").post(asyncHandler(usersController.register));
    router.route("/auth/verification/send").post(asyncHandler(usersController.verificationSend));
    router.route("/auth/verification/verify").post(asyncHandler(usersController.verificationVerify));
    router.route("/auth/login").post(asyncHandler(usersController.login));

    // Protected routes
    router
        .route("/profile")
        .get(asyncHandler(authenticateMiddleware), asyncHandler(usersController.getProfile)) // Fetch user profile
        .put(asyncHandler(authenticateMiddleware), asyncHandler(usersController.updateProfile)) // Update user profile
        .delete(asyncHandler(authenticateMiddleware), asyncHandler(usersController.deleteProfile)); // Delete user profile
};
