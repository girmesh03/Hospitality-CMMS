/**
 * Low-stock evaluation job shell.
 */
export const lowStockJob = Object.freeze({
  name: "low_stock",
  schedule: "0 * * * *",
  /**
   * @param {{actorContext: {sourceChannel: string}, logger: import("winston").Logger}} context - Job execution context.
   * @returns {Promise<void>} Resolution when the shell completes.
   */
  async run({ actorContext, logger }) {
    logger.info("Low-stock evaluation job tick", {
      route: "jobs.lowStock",
      sourceChannel: actorContext.sourceChannel,
    });
  },
});

export default lowStockJob;
