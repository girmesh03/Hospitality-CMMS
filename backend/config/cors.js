import { env } from "./env.js";
import { ERROR_CODES, HTTP_HEADERS } from "../utils/constants.js";
import { AppError } from "../utils/errors.js";

/**
 * Allowed CORS origins for the backend API and socket server.
 */
export const allowedCorsOrigins = Object.freeze([...env.CORS_ORIGINS]);

/**
 * Express/Socket.IO CORS configuration.
 */
export const corsOptions = Object.freeze({
  origin(origin, callback) {
    if (!origin || allowedCorsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new AppError(`Origin not allowed by CORS: ${origin}`, 403, ERROR_CODES.CORS_ORIGIN_NOT_ALLOWED));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", HTTP_HEADERS.AUTHORIZATION, HTTP_HEADERS.CSRF_TOKEN, HTTP_HEADERS.REQUEST_ID],
  exposedHeaders: [HTTP_HEADERS.REQUEST_ID],
});

export default corsOptions;
