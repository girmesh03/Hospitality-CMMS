import app from "./app.js";
import http from "http";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { initializeSocket } from "./sockets/index.js";
import { startJobs } from "./jobs/index.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

initializeSocket(server);

await connectDatabase();

startJobs();

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

const shutdown = async () => {
  logger.info("Shutting down gracefully...");
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
