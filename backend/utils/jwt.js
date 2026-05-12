import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_DAYS,
  REMEMBER_ME_EXPIRY_DAYS,
} from "./constants.js";

export const signAccessToken = (user) => {
  const payload = {
    sub: user.id,
    organizationId: user.organizationId,
    sessionId: user.sessionId,
    roleKeys: user.roleKeys || [],
    propertyIds: user.propertyIds || [],
    permissionHash: user.permissionHash || "",
  };

  return jwt.sign(payload, env.accessTokenSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.accessTokenSecret);
};

export const signRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const getRefreshTokenExpiry = (rememberMe = false) => {
  const days = rememberMe ? REMEMBER_ME_EXPIRY_DAYS : REFRESH_TOKEN_EXPIRY_DAYS;
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry;
};

export const setRefreshTokenCookie = (res, token, rememberMe = false) => {
  const maxAge = rememberMe
    ? REMEMBER_ME_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    : REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

  res.cookie("refreshToken", token, {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    maxAge,
    path: "/api/v1/auth",
  });
};

export const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    path: "/api/v1/auth",
  });
};

export const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const setCsrfCookie = (res, token) => {
  res.cookie("x-csrf-token", token, {
    httpOnly: false,
    secure: env.cookieSecure,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
