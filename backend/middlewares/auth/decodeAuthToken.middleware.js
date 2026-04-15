import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { ERROR_CODES, HTTP_HEADERS, SOURCE_CHANNELS } from "../../utils/constants.js";
import { UnauthorizedError } from "../../utils/errors.js";

/**
 * Normalizes a JWT payload into the canonical actor-context shape.
 *
 * @param {Record<string, unknown>} payload - Decoded JWT payload.
 * @returns {{userId: string | null, organizationId: string | null, propertyScopeIds: string[], locationScopeIds: string[], roleKeys: string[], permissions: string[], sessionId: string | null, sourceChannel: string}} Actor context.
 */
const toActorContext = (payload) => ({
  userId: payload.sub ? String(payload.sub) : null,
  organizationId: payload.organizationId ? String(payload.organizationId) : null,
  propertyScopeIds: Array.isArray(payload.propertyScope) ? payload.propertyScope.map(String) : [],
  locationScopeIds: Array.isArray(payload.locationScope) ? payload.locationScope.map(String) : [],
  roleKeys: Array.isArray(payload.roleKeys)
    ? payload.roleKeys.map(String)
    : Array.isArray(payload.roleIds)
      ? payload.roleIds.map(String)
      : [],
  permissions: Array.isArray(payload.permissions) ? payload.permissions.map(String) : [],
  sessionId: payload.sessionId ? String(payload.sessionId) : null,
  sourceChannel: typeof payload.sourceChannel === "string" ? payload.sourceChannel : SOURCE_CHANNELS.WEB_APP,
});

/**
 * Optionally decodes the bearer token and attaches `req.user` when present.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const decodeAuthToken = (req, _res, next) => {
  req.user = null;

  const authorizationHeader = req.get(HTTP_HEADERS.AUTHORIZATION);
  if (!authorizationHeader) {
    next();
    return;
  }

  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    next(new UnauthorizedError("Invalid authorization header format", ERROR_CODES.INVALID_AUTHORIZATION_HEADER));
    return;
  }

  if (!env.ACCESS_TOKEN_SECRET) {
    next(new UnauthorizedError("Access-token verification is not configured", ERROR_CODES.ACCESS_TOKEN_SECRET_MISSING));
    return;
  }

  try {
    const payload = jwt.verify(token, env.ACCESS_TOKEN_SECRET);
    if (!payload || typeof payload === "string") {
      next(new UnauthorizedError("Invalid or expired access token", ERROR_CODES.INVALID_TOKEN));
      return;
    }

    req.user = toActorContext(payload);
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired access token", ERROR_CODES.INVALID_TOKEN));
  }
};

export default decodeAuthToken;
