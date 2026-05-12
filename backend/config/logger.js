import { env } from "./env.js";

/** Logger configuration (level, format, file paths). */
export const loggerConfig = {
  level: env.logLevel,
  format: "combined",
  file: {
    error: "logs/error.log",
    combined: "logs/combined.log",
  },
};
