import express, { Express } from "express";
import path from "path";
import { apiReference } from "@scalar/express-api-reference";

const configureOpenAPI = (prefix: string="api", app: Express) => {
    app.use(`${prefix}/docs/openapi.yaml`, express.static(path.join(__dirname, "openapi.yaml")));
    app.use(
        `${prefix}/docs/reference`,
        apiReference({
            theme: "kepler",
            defaultHttpClient: {
                targetKey: "js",
                clientKey: "fetch",
            },
            pageTitle: "Awesome API",
            url: `${prefix}/docs/openapi.yaml`,
        }),
    );
};

export { configureOpenAPI };
