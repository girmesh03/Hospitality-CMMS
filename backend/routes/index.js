import { Router } from "express";
import healthRoutes from "./health.routes.js";
import bootstrapRoutes from "./bootstrap.routes.js";
import authRoutes from "./auth.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/bootstrap", bootstrapRoutes);
router.use("/auth", authRoutes);

export default router;
