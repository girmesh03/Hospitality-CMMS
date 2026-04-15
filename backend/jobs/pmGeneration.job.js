/**
 * Preventive-maintenance generation job shell.
 */
export const pmGenerationJob = Object.freeze({
  name: "pm_generation",
  schedule: "*/15 * * * *",
  /**
   * @param {{actorContext: {sourceChannel: string}, logger: import("winston").Logger}} context - Job execution context.
   * @returns {Promise<void>} Resolution when the shell completes.
   */
  async run({ actorContext, logger }) {
    logger.info("PM generation job tick", {
      route: "jobs.pmGeneration",
      sourceChannel: actorContext.sourceChannel,
    });
  },
});

export default pmGenerationJob;
