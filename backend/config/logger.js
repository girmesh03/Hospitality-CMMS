import winston from "winston";
import { env, envFlags } from "./env.js";

const { combine, timestamp, errors, printf, colorize, json } = winston.format;

const developmentFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ level, message, timestamp: loggedAt, requestId, route, method, userId, ...meta }) => {
    const context = { requestId, route, method, userId, ...meta };
    const serializedContext = Object.entries(context).some(([, value]) => value !== undefined)
      ? ` ${JSON.stringify(context)}`
      : "";

    return `${loggedAt} ${level}: ${message}${serializedContext}`;
  }),
);

/**
 * Shared backend Winston logger.
 */
export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: {
    service: "hospitality-cmms-backend",
    environment: env.NODE_ENV,
  },
  format: envFlags.IS_DEVELOPMENT ? developmentFormat : combine(timestamp(), errors({ stack: true }), json()),
  transports: [new winston.transports.Console()],
});

/**
 * Morgan stream adapter.
 */
export const morganStream = Object.freeze({
  /**
   * @param {string} message - Serialized Morgan message.
   */
  write(message) {
    logger.http(message.trim());
  },
});

export default logger;
