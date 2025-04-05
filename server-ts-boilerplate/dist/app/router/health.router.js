"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../app/controllers");
const healthRouter = (0, express_1.Router)();
exports.healthRouter = healthRouter;
healthRouter.route("/").get(controllers_1.healthController.health);
