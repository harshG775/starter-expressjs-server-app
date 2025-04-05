import { Express } from "express";
const configureOpenAPI = async (prefix: string = "api", app: Express) => {
    const { apiReference } = await import("@scalar/express-api-reference");
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
