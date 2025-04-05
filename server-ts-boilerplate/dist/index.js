"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const constants_1 = require("./constants");
const run = async () => {
    try {
        app_1.default.listen(constants_1.config.server.port, () => console.info(`Server running at http://localhost:${constants_1.config.server.port}`));
    }
    catch (error) {
        console.error("Failed to start server", { error });
        process.exit(1);
    }
};
run();
