import mongoose from "mongoose";
import { successResponse } from "../../utils/http.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const getHealth = async (req, res, next) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    res.status(200).json(
      successResponse({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        dbStatus,
      })
    );
  } catch (error) {
    next(error);
  }
};
