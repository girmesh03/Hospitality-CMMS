import { UnauthorizedError } from "../../utils/errors.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError());
  }
  next();
};
