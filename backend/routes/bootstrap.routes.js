import { Router } from "express";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { normalizeValidated } from "../middlewares/validation/normalizeValidated.js";
import { bootstrapLimiter } from "../middlewares/security/rateLimiter.js";
import { initializeValidator } from "../validators/bootstrap/initialize.validator.js";
import { getBootstrapStatus, initializeSystem } from "../controllers/bootstrap/bootstrap.controller.js";

const router = Router();

router.get("/status", getBootstrapStatus);
router.post("/initialize", bootstrapLimiter, initializeValidator, validateRequest, normalizeValidated, initializeSystem);

export default router;
