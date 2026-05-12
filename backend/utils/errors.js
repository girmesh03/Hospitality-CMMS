/** Base application error with HTTP status and error code. @extends Error */
export class AppError extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

/** 404 Not Found. @extends AppError */
export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(404, "NOT_FOUND", `${resource} not found`);
    this.name = "NotFoundError";
  }
}

/** 400 Bad Request with validation error details. @extends AppError */
export class ValidationError extends AppError {
  constructor(errors = []) {
    super(400, "VALIDATION_ERROR", "Validation failed");
    this.name = "ValidationError";
    this.errors = errors;
  }
}

/** 409 Conflict (duplicate / state conflict). @extends AppError */
export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, "CONFLICT", message);
    this.name = "ConflictError";
  }
}

/** 401 Unauthorized (missing/invalid credentials). @extends AppError */
export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(401, "UNAUTHORIZED", message);
    this.name = "UnauthorizedError";
  }
}

/** 403 Forbidden (insufficient permissions). @extends AppError */
export class ForbiddenError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(403, "FORBIDDEN", message);
    this.name = "ForbiddenError";
  }
}

/** 429 Too Many Requests (rate limited). @extends AppError */
export class RateLimitError extends AppError {
  constructor() {
    super(429, "RATE_LIMITED", "Too many requests");
    this.name = "RateLimitError";
  }
}
