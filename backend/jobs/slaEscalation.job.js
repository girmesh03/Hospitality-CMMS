/**
 * SLA escalation evaluator job shell.
 */
export const slaEscalationJob = Object.freeze({
  name: "sla_escalation",
  schedule: "*/10 * * * *",
  /**
   * @param {{actorContext: {sourceChannel: string}, logger: import("winston").Logger}} context - Job execution context.
   * @returns {Promise<void>} Resolution when the shell completes.
   */
  async run({ actorContext, logger }) {
    logger.info("SLA escalation job tick", {
      route: "jobs.slaEscalation",
      sourceChannel: actorContext.sourceChannel,
    });
  },
});

export default slaEscalationJob;
