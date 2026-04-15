import cron from "node-cron";
import { env } from "../config/env.js";
import logger from "../config/logger.js";
import { SOURCE_CHANNELS } from "../utils/constants.js";
import lowStockJob from "./lowStock.job.js";
import notificationDispatchJob from "./notificationDispatch.job.js";
import pmGenerationJob from "./pmGeneration.job.js";
import sessionCleanupJob from "./sessionCleanup.job.js";
import slaEscalationJob from "./slaEscalation.job.js";

const jobDefinitions = Object.freeze([
  pmGenerationJob,
  slaEscalationJob,
  lowStockJob,
  notificationDispatchJob,
  sessionCleanupJob,
]);

let activeTasks = [];

/**
 * Builds the synthetic actor context required for scheduler-triggered work.
 *
 * @returns {{userId: null, organizationId: null, propertyScopeIds: string[], locationScopeIds: string[], roleKeys: string[], permissions: string[], sessionId: null, sourceChannel: string}} Synthetic actor context.
 */
export const createSchedulerActorContext = () => ({
  userId: null,
  organizationId: null,
  propertyScopeIds: [],
  locationScopeIds: [],
  roleKeys: [],
  permissions: [],
  sessionId: null,
  sourceChannel: SOURCE_CHANNELS.SCHEDULER,
});

/**
 * Initializes all background jobs when schedulers are enabled.
 *
 * @returns {{name: string, schedule: string, task: import("node-cron").ScheduledTask}[]} Scheduled tasks.
 */
export const initializeJobs = () => {
  if (activeTasks.length > 0) {
    return activeTasks;
  }

  if (!env.ENABLE_SCHEDULERS) {
    logger.info("Background jobs are disabled", {
      route: "jobs.initialize",
      enabled: false,
    });
    return activeTasks;
  }

  const actorContext = createSchedulerActorContext();

  activeTasks = jobDefinitions.map((jobDefinition) => ({
    name: jobDefinition.name,
    schedule: jobDefinition.schedule,
    task: cron.schedule(
      jobDefinition.schedule,
      async () => {
        try {
          await jobDefinition.run({ actorContext, logger });
        } catch (error) {
          logger.error("Background job execution failed", {
            route: "jobs.run",
            jobName: jobDefinition.name,
            errorMessage: error instanceof Error ? error.message : "Unknown job error",
          });
        }
      },
      {
        timezone: "UTC",
        noOverlap: true,
      },
    ),
  }));

  logger.info("Background jobs initialized", {
    route: "jobs.initialize",
    enabled: true,
    jobCount: activeTasks.length,
  });

  return activeTasks;
};

/**
 * Stops and clears all active background jobs.
 *
 * @returns {void}
 */
export const stopJobs = () => {
  if (activeTasks.length === 0) {
    return;
  }

  activeTasks.forEach(({ task }) => {
    task.stop();
    task.destroy();
  });

  logger.info("Background jobs stopped", {
    route: "jobs.stop",
    jobCount: activeTasks.length,
  });

  activeTasks = [];
};

export default initializeJobs;
