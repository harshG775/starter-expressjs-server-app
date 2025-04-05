import { apiReference } from "@scalar/express-api-reference";
const configureOpenAPI = apiReference({
    theme: "kepler",
    defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
    },
    pageTitle: "Awesome API",
    url: `/public/docs/openapi.yaml`,
});
export { configureOpenAPI };
