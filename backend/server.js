import http from "node:http";
import app from "./app.js";
import { connectToDatabase, disconnectFromDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";
import { closeSocketServer, initializeSocketServer } from "./config/socket.js";
import { initializeJobs, stopJobs } from "./jobs/index.js";

let httpServer = null;

/**
 * Starts the backend HTTP server after infrastructure initialization.
 *
 * @returns {Promise<import("http").Server>} Running HTTP server.
 */
export const startServer = async () => {
  if (httpServer) {
    return httpServer;
  }

  await connectToDatabase();

  httpServer = http.createServer(app);
  initializeSocketServer(httpServer);
  initializeJobs();

  await new Promise((resolve, reject) => {
    httpServer.once("error", reject);
    httpServer.listen(env.PORT, () => {
      logger.info("HTTP server listening", {
        route: "server.start",
        port: env.PORT,
      });
      resolve();
    });
  });

  return httpServer;
};

/**
 * Stops the backend HTTP server and infrastructure dependencies.
 *
 * @returns {Promise<void>} Resolution once shutdown completes.
 */
export const stopServer = async () => {
  stopJobs();

  if (httpServer) {
    await new Promise((resolve, reject) => {
      httpServer.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    logger.info("HTTP server stopped", {
      route: "server.stop",
      port: env.PORT,
    });
    httpServer = null;
  }

  await closeSocketServer();
  await disconnectFromDatabase();
};

/**
 * Handles process shutdown signals gracefully.
 *
 * @param {string} signal - Process signal name.
 * @returns {Promise<void>} Resolution once shutdown completes.
 */
export const handleShutdownSignal = async (signal) => {
  logger.info("Shutdown signal received", {
    route: "server.shutdown",
    signal,
  });

  try {
    await stopServer();
    process.exit(0);
  } catch (error) {
    logger.error("Graceful shutdown failed", {
      route: "server.shutdown",
      signal,
      errorMessage: error instanceof Error ? error.message : "Unknown shutdown error",
    });
    process.exit(1);
  }
};

if (env.NODE_ENV !== "test") {
  ["SIGINT", "SIGTERM"].forEach((signal) => {
    process.once(signal, () => {
      void handleShutdownSignal(signal);
    });
  });

  startServer().catch((error) => {
    logger.error("Server startup failed", {
      route: "server.start",
      errorMessage: error instanceof Error ? error.message : "Unknown startup error",
    });
    process.exit(1);
  });
}

export default startServer;
