import { Router } from "express";
import { getApiDescriptor, getApiHealth } from "../controllers/dashboard/health.controller.js";
import decodeAuthToken from "../middlewares/auth/decodeAuthToken.middleware.js";
import validateRequest from "../middlewares/validation/validateRequest.middleware.js";
import { getApiDescriptorValidators, getApiHealthValidators } from "../validators/dashboard/health.validators.js";

/**
 * Router for backend infrastructure and dashboard-adjacent system endpoints.
 */
const dashboardRouter = Router();

dashboardRouter.get("/", decodeAuthToken, ...validateRequest(getApiDescriptorValidators), getApiDescriptor);
dashboardRouter.get("/health", decodeAuthToken, ...validateRequest(getApiHealthValidators), getApiHealth);

export default dashboardRouter;
