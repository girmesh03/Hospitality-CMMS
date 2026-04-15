/**
 * Notification dispatch and retry job shell.
 */
export const notificationDispatchJob = Object.freeze({
  name: "notification_dispatch",
  schedule: "*/5 * * * *",
  /**
   * @param {{actorContext: {sourceChannel: string}, logger: import("winston").Logger}} context - Job execution context.
   * @returns {Promise<void>} Resolution when the shell completes.
   */
  async run({ actorContext, logger }) {
    logger.info("Notification dispatch job tick", {
      route: "jobs.notificationDispatch",
      sourceChannel: actorContext.sourceChannel,
    });
  },
});

export default notificationDispatchJob;
