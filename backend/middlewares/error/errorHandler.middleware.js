import { envFlags } from "../../config/env.js";
import logger from "../../config/logger.js";
import { ERROR_CODES, HTTP_HEADERS } from "../../utils/constants.js";
import { AppError, isAppError } from "../../utils/errors.js";
import { createErrorResponse } from "../../utils/http.js";
import { createLogContext } from "../../utils/logger.js";

/**
 * Normalizes unknown errors into the shared API error envelope.
 *
 * @param {unknown} error - Unknown thrown error.
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} _next - Express next callback.
 * @returns {import("express").Response} Express response.
 */
export const errorHandler = (error, req, res, _next) => {
  const normalizedError = isAppError(error)
    ? error
    : new AppError("An unexpected error occurred", 500, ERROR_CODES.INTERNAL_ERROR);

  const requestId = req.id || res.getHeader(HTTP_HEADERS.REQUEST_ID) || null;
  const safeMessage =
    normalizedError.statusCode >= 500 && envFlags.IS_PRODUCTION
      ? "An unexpected error occurred"
      : normalizedError.message;
  const fieldErrors =
    normalizedError.code === ERROR_CODES.VALIDATION_ERROR && normalizedError.details
      ? normalizedError.details
      : undefined;

  logger.error(normalizedError.message, {
    ...createLogContext({
      requestId: typeof requestId === "string" ? requestId : null,
      userId: req.user?.userId || null,
      route: req.originalUrl,
      method: req.method,
      sourceChannel: req.user?.sourceChannel || null,
    }),
    statusCode: normalizedError.statusCode,
    code: normalizedError.code,
    stack: normalizedError.stack,
  });

  return res.status(normalizedError.statusCode).json(
    createErrorResponse(
      {
        code: normalizedError.code,
        message: safeMessage,
        ...(fieldErrors ? { fieldErrors } : {}),
      },
      typeof requestId === "string" ? requestId : null,
    ),
  );
};

export default errorHandler;
