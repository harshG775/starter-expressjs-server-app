import { Router } from "express";
import { usersController } from "../../app/controllers/users.controller.js";
const usersRouter = Router();
usersRouter.route("/").post(usersController.create);
usersRouter.route("/").get(usersController.findMany);
usersRouter.route("/:id").get(usersController.findUnique);
usersRouter.route("/").put(usersController.update);
usersRouter.route("/:id").delete(usersController.delete);
export { usersRouter };
