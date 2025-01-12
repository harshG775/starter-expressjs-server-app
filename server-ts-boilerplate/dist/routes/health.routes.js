"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const controllers_1 = require("../controllers");
const health = (router) => {
    router.route("/health").get(controllers_1.healthController.health);
};
exports.health = health;
