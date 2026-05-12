import cron from "node-cron";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export const startJobs = () => {
  if (!env.enableSchedulers) {
    logger.info("Schedulers are disabled (ENABLE_SCHEDULERS=false)");
    return;
  }

  logger.info("Starting background jobs...");

  // Daily PM generation at 2:00 AM
  cron.schedule("0 2 * * *", async () => {
    logger.info("Running PM generation job...");
  });

  // SLA escalation check every 15 minutes
  cron.schedule("*/15 * * * *", async () => {
    logger.info("Running SLA escalation check...");
  });

  // Low stock check every hour
  cron.schedule("0 * * * *", async () => {
    logger.info("Running low stock check...");
  });

  // Notification dispatch every 5 minutes
  cron.schedule("*/5 * * * *", async () => {
    logger.info("Running notification dispatch...");
  });

  // Session cleanup daily at 3:00 AM
  cron.schedule("0 3 * * *", async () => {
    logger.info("Running session cleanup...");
  });

  logger.info("All background jobs registered");
};
