"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const health_router_1 = require("./health.router");
const router = (0, express_1.Router)();
exports.router = router;
router.use("/health", health_router_1.healthRouter);
