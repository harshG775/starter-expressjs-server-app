import { Router, Request, Response } from "express";
const healthRouter = Router();
healthRouter.route("/").get((req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "healthy",
    });
});
export { healthRouter };
