import { env } from "./env.js";

export const loggerConfig = {
  level: env.logLevel,
  format: "combined",
  file: {
    error: "logs/error.log",
    combined: "logs/combined.log",
  },
};
