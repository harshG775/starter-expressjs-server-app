"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const health_routes_1 = require("./health.routes");
const users_routes_1 = require("./users.routes");
const router = (0, express_1.Router)();
exports.router = router;
const routes = {
    health: health_routes_1.health,
    users: users_routes_1.users,
};
for (const route in routes) {
    routes[route](router);
}
