import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env.js";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_DAYS,
  REMEMBER_ME_EXPIRY_DAYS,
} from "./constants.js";

/** Sign a JWT access token for the given user. @param {import("../models/user.js").User} user - User document. @returns {string} Signed JWT. */
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

/** Verify and decode a JWT access token. @param {string} token - JWT string. @returns {object} Decoded payload. */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.accessTokenSecret);
};

/** Generate a cryptographically random refresh token. @returns {string} Hex-encoded random bytes. */
export const signRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

/** SHA-256 hash a token for secure storage. @param {string} token - Token to hash. @returns {string} Hex digest. */
export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

/** Calculate refresh token expiration date. @param {boolean} [rememberMe=false] - Use extended expiry. @returns {Date} Expiration date. */
export const getRefreshTokenExpiry = (rememberMe = false) => {
  const days = rememberMe ? REMEMBER_ME_EXPIRY_DAYS : REFRESH_TOKEN_EXPIRY_DAYS;
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  return expiry;
};

/** Set httpOnly refresh-token cookie on the response. @param {import("express").Response} res - Express response. @param {string} token - Refresh token. @param {boolean} [rememberMe=false] - Extended expiry. */
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

/** Clear the refresh-token cookie on the response. @param {import("express").Response} res - Express response. */
export const clearRefreshTokenCookie = (res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: env.cookieSecure,
    sameSite: "lax",
    path: "/api/v1/auth",
  });
};

/** Generate a cryptographically random CSRF token. @returns {string} Hex-encoded token. */
export const generateCsrfToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

/** Set a non-httpOnly CSRF-token cookie on the response. @param {import("express").Response} res - Express response. @param {string} token - CSRF token. */
export const setCsrfCookie = (res, token) => {
  res.cookie("x-csrf-token", token, {
    httpOnly: false,
    secure: env.cookieSecure,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
};
