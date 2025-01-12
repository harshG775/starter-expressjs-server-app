import { Router } from "express";
import { health } from "./health.routes";
import { users } from "./users.routes";

const router: Router = Router();

// Define route modules with base paths
const routeModules = [
    { path: "/health", handler: health },
    { path: "/users", handler: users },
];

// Register each route module with its base path
routeModules.forEach(({ path, handler }) => {
    const moduleRouter = Router(); // Create a new Router instance for the module
    handler(moduleRouter); // Apply the module's routes to the moduleRouter
    router.use(path, moduleRouter); // Mount the moduleRouter at the base path
});

export { router };
