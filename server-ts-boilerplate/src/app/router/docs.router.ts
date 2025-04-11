import { Router } from "express";
import type { Response } from "express";
const docsRouter = Router();

import { config } from "@/config/index.js";
import { apiReference } from "@scalar/express-api-reference";
import { generateOpenApiSpec } from "@/api-docs/index.js";
const { version } = config;

docsRouter.route("/api-docs.json").get((_, res: Response) => {
    res.json(generateOpenApiSpec());
});
docsRouter.use(
    "/docs",
    apiReference({
        favicon: "path-to-favicon.svg",
        theme: "default",
        url: `/api/v${version}/api-docs.json`,
    })
);

export { docsRouter };
