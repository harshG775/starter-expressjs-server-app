import { catchAsync } from "../../exception/catchAsync";
export const healthController = {
    health: catchAsync(async (_req, res) => {
        res.status(200).json({ success: true, message: "Server is running" });
    }),
};
