import { env } from "./env.js";

/** CORS configuration object. */
export const corsConfig = {
  origin: env.corsOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
  exposedHeaders: ["x-csrf-token"],
};
