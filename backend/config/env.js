import dotenv from "dotenv";

dotenv.config({ quiet: true });

/**
 * Parses a string environment value into a boolean.
 *
 * @param {string | undefined} value - Raw environment value.
 * @param {boolean} fallback - Fallback boolean.
 * @returns {boolean} Parsed boolean value.
 */
const toBoolean = (value, fallback) => {
  if (value === undefined) {
    return fallback;
  }

  return ["1", "true", "yes", "on"].includes(String(value).trim().toLowerCase());
};

/**
 * Parses a string environment value into an integer.
 *
 * @param {string | undefined} value - Raw environment value.
 * @param {number} fallback - Fallback number.
 * @returns {number} Parsed integer value.
 */
const toInteger = (value, fallback) => {
  const parsedValue = Number.parseInt(value || "", 10);
  return Number.isNaN(parsedValue) ? fallback : parsedValue;
};

/**
 * Parses a comma-separated origin list.
 *
 * @param {string | undefined} value - Raw origin list.
 * @returns {string[]} Parsed origin array.
 */
const toOriginList = (value) =>
  String(value || "http://localhost:5173,http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

/**
 * Centralized backend environment configuration.
 */
export const env = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: toInteger(process.env.PORT, 4000),
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/hospitality_cmms",
  CORS_ORIGINS: toOriginList(process.env.CORS_ORIGINS),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "",
  ENABLE_SCHEDULERS: toBoolean(process.env.ENABLE_SCHEDULERS, false),
  BODY_SIZE_LIMIT: process.env.BODY_SIZE_LIMIT || "2mb",
  URL_ENCODED_LIMIT: process.env.URL_ENCODED_LIMIT || "1mb",
  COOKIE_SECURE: toBoolean(process.env.COOKIE_SECURE, process.env.NODE_ENV === "production"),
  LOG_LEVEL: process.env.LOG_LEVEL || (process.env.NODE_ENV === "production" ? "info" : "debug"),
});

/**
 * Convenience environment flags.
 */
export const envFlags = Object.freeze({
  IS_DEVELOPMENT: env.NODE_ENV === "development",
  IS_TEST: env.NODE_ENV === "test",
  IS_PRODUCTION: env.NODE_ENV === "production",
});

export default env;
