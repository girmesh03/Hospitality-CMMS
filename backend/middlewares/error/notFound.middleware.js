import { ERROR_CODES } from "../../utils/constants.js";
import { NotFoundError } from "../../utils/errors.js";

/**
 * Converts unmatched routes into the shared 404 error shape.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const notFoundHandler = (req, _res, next) => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`, ERROR_CODES.ROUTE_NOT_FOUND));
};

export default notFoundHandler;
