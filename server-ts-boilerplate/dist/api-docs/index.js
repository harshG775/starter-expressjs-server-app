import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
export const registry = new OpenAPIRegistry();
export const openApiConfig = {
    openapi: "3.0.3",
    info: {
        title: "Your API",
        version: "1.0.0",
    },
    externalDocs: {
        description: "View the raw OpenAPI Specification in JSON format",
        url: "/openapi.json",
    },
};
export function generateOpenApiSpec() {
    const generator = new OpenApiGeneratorV3(registry.definitions);
    return generator.generateDocument(openApiConfig);
}
