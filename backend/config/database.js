import mongoose from "mongoose";
import { env } from "./env.js";
import logger from "./logger.js";

mongoose.set("strictQuery", true);

/**
 * Connects Mongoose to the configured MongoDB instance.
 *
 * @returns {Promise<typeof mongoose>} Connected Mongoose instance.
 */
export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  const connection = await mongoose.connect(env.MONGODB_URI);
  logger.info("MongoDB connection established", {
    route: "database.connect",
    connectionHost: connection.connection.host,
    connectionName: connection.connection.name,
  });

  return connection;
};

/**
 * Gracefully disconnects the active MongoDB connection.
 *
 * @returns {Promise<void>} Disconnect promise.
 */
export const disconnectFromDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
  logger.info("MongoDB connection closed", {
    route: "database.disconnect",
  });
};

export default connectToDatabase;
