import { matchedData } from "express-validator";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const normalizeValidated = (req, res, next) => {
  req.validated = {
    body: matchedData(req, { locations: ["body"] }) || {},
    params: matchedData(req, { locations: ["params"] }) || {},
    query: matchedData(req, { locations: ["query"] }) || {},
  };
  next();
};
