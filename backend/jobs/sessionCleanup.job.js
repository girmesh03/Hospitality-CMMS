/**
 * User-session cleanup job shell.
 */
export const sessionCleanupJob = Object.freeze({
  name: "session_cleanup",
  schedule: "0 */6 * * *",
  /**
   * @param {{actorContext: {sourceChannel: string}, logger: import("winston").Logger}} context - Job execution context.
   * @returns {Promise<void>} Resolution when the shell completes.
   */
  async run({ actorContext, logger }) {
    logger.info("Session cleanup job tick", {
      route: "jobs.sessionCleanup",
      sourceChannel: actorContext.sourceChannel,
    });
  },
});

export default sessionCleanupJob;
