import * as bootstrapService from "../../services/bootstrap/bootstrap.service.js";
import { successResponse } from "../../utils/http.js";

export const getBootstrapStatus = async (req, res, next) => {
  try {
    const status = await bootstrapService.checkBootstrapStatus();
    res.status(200).json(successResponse(status));
  } catch (error) {
    next(error);
  }
};

export const initializeSystem = async (req, res, next) => {
  try {
    const result = await bootstrapService.initializeSystem(req.validated.body);
    res.status(201).json(
      successResponse({
        message: "System initialized successfully",
        organizationId: result.organization._id,
      })
    );
  } catch (error) {
    next(error);
  }
};
