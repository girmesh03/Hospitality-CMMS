import { UnauthorizedError } from "../../utils/errors.js";

export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return next(new UnauthorizedError());
  }
  next();
};
