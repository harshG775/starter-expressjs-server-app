"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const health = async (_req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: http_status_codes_1.ReasonPhrases.OK, status: http_status_codes_1.StatusCodes.OK });
};
exports.healthController = { health };
