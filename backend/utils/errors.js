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
   * @param {string} [code="internal_error"] - Machine-readable error code.
   * @param {Record<string, unknown> | null} [details=null] - Structured error details.
   */
  constructor(message, statusCode = 500, code = "internal_error", details = null) {
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
