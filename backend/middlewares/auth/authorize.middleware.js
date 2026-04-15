import { ForbiddenError, UnauthorizedError } from "../../utils/errors.js";

/**
 * Requires an authenticated actor.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const requireAuth = (req, _res, next) => {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }

  next();
};

/**
 * Creates a permission-gating middleware shell.
 *
 * @param {string[]} [requiredPermissions=[]] - Required permission keys.
 * @returns {import("express").RequestHandler} Express middleware.
 */
export const authorize = (requiredPermissions = []) => (req, _res, next) => {
  if (!req.user) {
    next(new UnauthorizedError());
    return;
  }

  if (requiredPermissions.length === 0) {
    next();
    return;
  }

  const permissionSet = new Set(req.user.permissions || []);
  const hasAllPermissions = requiredPermissions.every((permissionKey) => permissionSet.has(permissionKey));

  if (!hasAllPermissions) {
    next(new ForbiddenError());
    return;
  }

  next();
};

export default authorize;
