"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
const catchAsync_1 = require("../../exception/catchAsync");
exports.healthController = {
    health: (0, catchAsync_1.catchAsync)(async (_req, res) => {
        res.status(200).json({ message: "Server is running" });
    }),
};
