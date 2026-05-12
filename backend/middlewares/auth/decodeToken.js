import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const decodeToken = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, env.accessTokenSecret);
    req.user = {
      id: decoded.sub,
      organizationId: decoded.organizationId,
      propertyIds: decoded.propertyIds,
      roleKeys: decoded.roleKeys,
      permissions: decoded.permissions,
      sessionId: decoded.sessionId,
    };
  } catch (err) {
    // Token invalid/expired — continue without user
  }
  next();
};
