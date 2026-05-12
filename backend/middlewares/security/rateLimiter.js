import rateLimit from "express-rate-limit";

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

export const generalLimiter = createRateLimiter(60 * 1000, 100);
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5);
export const bootstrapLimiter = createRateLimiter(60 * 60 * 1000, 5);
