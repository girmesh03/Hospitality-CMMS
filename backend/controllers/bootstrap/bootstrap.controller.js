import * as bootstrapService from "../../services/bootstrap/bootstrap.service.js";
import { successResponse } from "../../utils/http.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const getBootstrapStatus = async (req, res, next) => {
  try {
    const status = await bootstrapService.checkBootstrapStatus();
    res.status(200).json(successResponse(status));
  } catch (error) {
    next(error);
  }
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
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
