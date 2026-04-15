/**
 * Shared log-context helpers for backend instrumentation.
 */

/**
 * Builds a normalized log context from optional request-scoped values.
 *
 * @param {{requestId?: string, userId?: string, route?: string, method?: string, sourceChannel?: string}} [input={}] - Context input.
 * @returns {{requestId?: string, userId?: string, route?: string, method?: string, sourceChannel?: string}} Sanitized log context.
 */
export const createLogContext = (input = {}) =>
  Object.fromEntries(Object.entries(input).filter(([, value]) => value !== undefined && value !== null && value !== ""));
