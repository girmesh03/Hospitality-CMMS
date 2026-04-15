import { sendSuccess } from "../../utils/http.js";
import { getApiDescriptorPayload, getHealthStatus } from "../../services/dashboard/health.service.js";

/**
 * Returns the base API descriptor under `/api/v1`.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} res - Express response.
 * @returns {import("express").Response} JSON response.
 */
export const getApiDescriptor = (req, res) =>
  sendSuccess(
    res,
    getApiDescriptorPayload({
      requestId: req.id || null,
    }),
    200,
  );

/**
 * Returns a basic API health response.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} res - Express response.
 * @returns {import("express").Response} JSON response.
 */
export const getApiHealth = (req, res) =>
  sendSuccess(
    res,
    getHealthStatus({
      requestId: req.id || null,
      actor: req.user,
    }),
    200,
  );
