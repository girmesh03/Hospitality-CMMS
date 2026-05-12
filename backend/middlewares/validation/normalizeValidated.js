import { matchedData } from "express-validator";

export const normalizeValidated = (req, res, next) => {
  req.validated = {
    body: matchedData(req, { locations: ["body"] }) || {},
    params: matchedData(req, { locations: ["params"] }) || {},
    query: matchedData(req, { locations: ["query"] }) || {},
  };
  next();
};
