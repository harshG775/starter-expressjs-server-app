import { Router } from "express";
import { health } from "@/routes/health.routes";

const router: Router = Router();

type RoutesType = { [key: string]: (router: Router) => void };

const routes: RoutesType = {
    health,
};

for (const route in routes) {
    routes[route](router);
}

export { router };
