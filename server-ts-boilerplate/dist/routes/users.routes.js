"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const utils_1 = require("../utils");
const controllers_1 = require("../controllers");
const users = (router) => {
    router.route("/users/register").post((0, utils_1.asyncHandler)(controllers_1.usersController.register));
    router.route("/users/verification/send").post(controllers_1.usersController.verificationSend);
    router.route("/users/verification/verify").post(controllers_1.usersController.verificationVerify);
    router.route("/users/login").post(controllers_1.usersController.login);
    router.route("/users/profile").get(controllers_1.usersController.deleteProfile);
    router.route("/users/profile").put(controllers_1.usersController.updateProfile);
    router.route("/users/profile").delete(controllers_1.usersController.getProfile);
};
exports.users = users;
