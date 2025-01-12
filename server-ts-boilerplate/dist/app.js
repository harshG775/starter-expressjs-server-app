"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./middlewares/index");
const index_2 = require("./routes/index");
const constants_1 = require("./constants");
const app = (0, express_1.default)();
app.use(index_1.corsMiddleware);
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true }));
app.use(index_1.morganMiddleware);
app.use(`/api/${constants_1.config.server.version}`, index_2.router);
app.use(index_1.notFoundMiddleware);
app.use(index_1.errorHandlerMiddleware);
exports.default = app;
