import { Express } from "express";
import { apiReference } from "@scalar/express-api-reference";

const configureOpenAPI = (prefix: string="api", app: Express) => {
    app.use(
        `${prefix}/docs/reference`,
        apiReference({
            theme: "kepler",
            defaultHttpClient: {
                targetKey: "js",
                clientKey: "fetch",
            },
            pageTitle: "Awesome API",
            url: `/public/docs/openapi.yaml`,
        }),
    );
};

export { configureOpenAPI };
