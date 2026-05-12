import mongoose from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

let retryCount = 0;

/** Database connection configuration. @returns {Promise<void>} */
export async function connectDatabase() {
  try {
    mongoose.connection.on("connected", () => {
      logger.info("MongoDB connected");
      retryCount = 0;
    });

    mongoose.connection.on("error", (err) => {
      logger.error("MongoDB connection error", { error: err.message });
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });

    await mongoose.connect(env.mongodbUri);
  } catch (error) {
    retryCount++;
    logger.error(`MongoDB connection attempt ${retryCount} failed`, { error: error.message });

    if (retryCount < MAX_RETRIES) {
      logger.info(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDatabase();
    }

    throw new Error(`Failed to connect to MongoDB after ${MAX_RETRIES} attempts`);
  }
}
