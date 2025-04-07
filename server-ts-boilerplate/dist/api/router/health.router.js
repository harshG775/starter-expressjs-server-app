import { Router } from "express";
const healthRouter = Router();
healthRouter.route("/").get((req, res) => {
    res.status(200).json({
        success: true,
        message: "healthy",
    });
});
export { healthRouter };
//# sourceMappingURL=health.router.js.map