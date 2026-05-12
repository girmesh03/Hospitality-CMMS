import { v4 as uuidv4 } from "uuid";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const requestId = (req, res, next) => {
  req.requestId = uuidv4();
  res.setHeader("x-request-id", req.requestId);
  next();
};
