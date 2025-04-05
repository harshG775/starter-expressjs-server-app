"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAPI = void 0;
const express_api_reference_1 = require("@scalar/express-api-reference");
const configureOpenAPI = (0, express_api_reference_1.apiReference)({
    theme: "kepler",
    defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
    },
    pageTitle: "Awesome API",
    url: `/public/docs/openapi.yaml`,
});
exports.configureOpenAPI = configureOpenAPI;
