"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const exception_1 = require("../exception");
const http_status_codes_1 = require("http-status-codes");
const register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new exception_1.ResponseError({
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: http_status_codes_1.ReasonPhrases.BAD_REQUEST,
            context: {
                required: ["email", "password"],
            },
        });
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: http_status_codes_1.ReasonPhrases.OK,
        status: http_status_codes_1.StatusCodes.OK,
        data: { email, password },
    });
};
const verificationSend = async (_req, _res) => { };
const verificationVerify = async (_req, _res) => { };
const login = async (_req, _res) => { };
const getProfile = async (_req, _res) => { };
const updateProfile = async (_req, _res) => { };
const deleteProfile = async (_req, _res) => { };
exports.usersController = {
    register,
    verificationSend,
    verificationVerify,
    login,
    getProfile,
    updateProfile,
    deleteProfile,
};
