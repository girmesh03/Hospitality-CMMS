import helmet from "helmet";

/**
 * Restrictive security-header middleware for the backend API.
 */
export const securityHeaders = helmet();

export default securityHeaders;
