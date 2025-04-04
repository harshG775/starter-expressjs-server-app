"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const health_routes_1 = require("./health.routes");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/health", health_routes_1.healthRouter);
