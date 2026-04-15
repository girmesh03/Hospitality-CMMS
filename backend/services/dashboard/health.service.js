import mongoose from "mongoose";
import { env } from "../../config/env.js";
import { API_DEFAULTS } from "../../utils/constants.js";

const DATABASE_READY_STATES = Object.freeze({
  0: "disconnected",
  1: "connected",
  2: "connecting",
  3: "disconnecting",
});

/**
 * Builds the base API descriptor payload.
 *
 * @param {{requestId: string | null}} input - Service input.
 * @returns {{name: string, basePath: string, environment: string, requestId: string | null, endpoints: {health: string}}} Descriptor payload.
 */
export const getApiDescriptorPayload = ({ requestId }) => ({
  name: "Hospitality CMMS API",
  basePath: API_DEFAULTS.BASE_PATH,
  environment: env.NODE_ENV,
  requestId,
  endpoints: {
    health: `${API_DEFAULTS.BASE_PATH}/health`,
  },
});

/**
 * Builds a lightweight health payload for infrastructure verification.
 *
 * @param {{requestId: string | null, actor: {userId: string | null} | null}} input - Service input.
 * @returns {{status: string, timestamp: string, environment: string, requestId: string | null, database: {readyState: number, status: string}, actor: {authenticated: boolean}}} Health payload.
 */
export const getHealthStatus = ({ requestId, actor }) => ({
  status: "ok",
  timestamp: new Date().toISOString(),
  environment: env.NODE_ENV,
  requestId,
  database: {
    readyState: mongoose.connection.readyState,
    status: DATABASE_READY_STATES[mongoose.connection.readyState] || "unknown",
  },
  actor: {
    authenticated: Boolean(actor?.userId),
  },
});
