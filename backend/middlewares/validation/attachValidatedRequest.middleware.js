import { matchedData } from "express-validator";

/**
 * Attaches the mandatory validated-request contract to the request object.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const attachValidatedRequest = (req, _res, next) => {
  req.validated = {
    body: matchedData(req, { locations: ["body"] }) || {},
    params: matchedData(req, { locations: ["params"] }) || {},
    query: matchedData(req, { locations: ["query"] }) || {},
  };

  next();
};

export default attachValidatedRequest;
