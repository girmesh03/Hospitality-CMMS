import { validationResult } from "express-validator";
import { ValidationAppError } from "../../utils/errors.js";

/**
 * Converts `express-validator` results into the shared error format.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const handleValidationResults = (req, _res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }

  const fieldErrors = result.array().reduce((errors, item) => {
    const key = item.path || "_error";
    const existingErrors = errors[key] || [];

    return {
      ...errors,
      [key]: [...existingErrors, item.msg],
    };
  }, {});

  next(new ValidationAppError("Validation failed", fieldErrors));
};

export default handleValidationResults;
