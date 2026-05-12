import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

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
