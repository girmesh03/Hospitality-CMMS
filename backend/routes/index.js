import { Router } from "express";
import dashboardRouter from "./dashboard.routes.js";

/**
 * Root API router mounted under the shared backend base path.
 */
const apiRouter = Router();

apiRouter.use("/", dashboardRouter);

export default apiRouter;
