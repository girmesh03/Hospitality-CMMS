import rateLimit from "express-rate-limit";

/**
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} max - Max requests per window
 * @param {string} [message] - Custom rate-limit message
 * @returns {import("express").RequestHandler}
 */
export const createRateLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      error: "RATE_LIMITED",
      message: message || "Too many requests",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

/** General API rate limiter: 100 requests per 60 seconds. */
export const generalLimiter = createRateLimiter(60 * 1000, 100);
/** Auth endpoint rate limiter: 5 requests per 15 minutes. */
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5);
/** Bootstrap endpoint rate limiter: 5 requests per 60 minutes. */
export const bootstrapLimiter = createRateLimiter(60 * 60 * 1000, 5);
