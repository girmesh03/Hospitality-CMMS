import { randomUUID } from "node:crypto";
import { HTTP_HEADERS } from "../../utils/constants.js";

/**
 * Attaches a stable request identifier to the request/response lifecycle.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const attachRequestId = (req, res, next) => {
  const incomingRequestId = req.get(HTTP_HEADERS.REQUEST_ID);
  const requestId = incomingRequestId || randomUUID();

  req.id = requestId;
  req.requestId = requestId;
  res.setHeader(HTTP_HEADERS.REQUEST_ID, requestId);
  next();
};

export default attachRequestId;
