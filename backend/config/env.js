import dotenv from "dotenv";
dotenv.config();

const requiredVars = [
  "NODE_ENV",
  "PORT",
  "MONGODB_URI",
  "CORS_ORIGINS",
  "CLIENT_APP_URL",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
];

const missing = requiredVars.filter((key) => process.env[key] === undefined);
if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}

/** Application environment configuration values loaded from process.env. */
export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT, 10) || 4000,
  mongodbUri: process.env.MONGODB_URI,
  corsOrigins: (process.env.CORS_ORIGINS || "").split(",").map((s) => s.trim()),
  clientAppUrl: process.env.CLIENT_APP_URL,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.SMTP_FROM,
    secure: process.env.SMTP_SECURE === "true",
  },
  enableSchedulers: process.env.ENABLE_SCHEDULERS === "true",
  bodySizeLimit: process.env.BODY_SIZE_LIMIT || "1mb",
  urlEncodedLimit: process.env.URL_ENCODED_LIMIT || "1mb",
  cookieSecure: process.env.COOKIE_SECURE === "true",
  logLevel: process.env.LOG_LEVEL || "info",
};
