import { ForbiddenError } from "../../utils/errors.js";

const MUTATING_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

export const csrfProtection = (req, res, next) => {
  if (!MUTATING_METHODS.includes(req.method)) {
    return next();
  }

  const csrfCookie = req.cookies?.["x-csrf-token"];
  const csrfHeader = req.headers["x-csrf-token"];

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return next(new ForbiddenError("Invalid CSRF token"));
  }

  next();
};
