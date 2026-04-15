import { ERROR_CODES } from "./constants.js";

/**
 * Shared error utilities for the backend.
 */

/**
 * Application-level error with optional metadata.
 */
export class AppError extends Error {
  /**
   * @param {string} message - Human-readable message.
   * @param {number} [statusCode=500] - HTTP status code.
   * @param {string} [code=ERROR_CODES.INTERNAL_ERROR] - Machine-readable error code.
   * @param {Record<string, unknown> | null} [details=null] - Structured error details.
   */
  constructor(message, statusCode = 500, code = ERROR_CODES.INTERNAL_ERROR, details = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

/**
 * Type guard for application errors.
 *
 * @param {unknown} error - Unknown error value.
 * @returns {error is AppError} `true` when the error is an `AppError`.
 */
export const isAppError = (error) => error instanceof AppError;

/**
 * Validation-layer application error.
 */
export class ValidationAppError extends AppError {
  /**
   * @param {string} message - Human-readable message.
   * @param {Record<string, string[]> | null} [details=null] - Field-level validation errors.
   */
  constructor(message = "Validation failed", details = null) {
    super(message, 422, ERROR_CODES.VALIDATION_ERROR, details);
    this.name = "ValidationAppError";
  }
}

/**
 * Unauthorized application error.
 */
export class UnauthorizedError extends AppError {
  /**
   * @param {string} [message="Authentication is required"] - Error message.
   * @param {string} [code=ERROR_CODES.UNAUTHORIZED] - Error code.
   */
  constructor(message = "Authentication is required", code = ERROR_CODES.UNAUTHORIZED) {
    super(message, 401, code);
    this.name = "UnauthorizedError";
  }
}

/**
 * Forbidden application error.
 */
export class ForbiddenError extends AppError {
  /**
   * @param {string} [message="You do not have permission to perform this action"] - Error message.
   * @param {string} [code=ERROR_CODES.FORBIDDEN] - Error code.
   */
  constructor(message = "You do not have permission to perform this action", code = ERROR_CODES.FORBIDDEN) {
    super(message, 403, code);
    this.name = "ForbiddenError";
  }
}

/**
 * Not-found application error.
 */
export class NotFoundError extends AppError {
  /**
   * @param {string} [message="The requested resource was not found"] - Error message.
   * @param {string} [code=ERROR_CODES.NOT_FOUND] - Error code.
   */
  constructor(message = "The requested resource was not found", code = ERROR_CODES.NOT_FOUND) {
    super(message, 404, code);
    this.name = "NotFoundError";
  }
}

/**
 * Conflict application error.
 */
export class ConflictError extends AppError {
  /**
   * @param {string} [message="The requested action conflicts with the current resource state"] - Error message.
   * @param {string} [code=ERROR_CODES.CONFLICT] - Error code.
   */
  constructor(message = "The requested action conflicts with the current resource state", code = ERROR_CODES.CONFLICT) {
    super(message, 409, code);
    this.name = "ConflictError";
  }
}
