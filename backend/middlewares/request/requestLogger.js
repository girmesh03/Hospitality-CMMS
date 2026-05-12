import morgan from "morgan";
import { logger } from "../../utils/logger.js";

/** Morgan stream wrapper that writes logs via the application logger. */
const stream = {
  write: (message) => logger.info(message.trim()),
};

/** Express request-logging middleware using Morgan in combined format. @type {import("express").RequestHandler} */
export const requestLogger = morgan("combined", { stream });
