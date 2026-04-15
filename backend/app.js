import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import "./config/env.js";
import corsOptions from "./config/cors.js";
import { env } from "./config/env.js";
import { morganStream } from "./config/logger.js";
import errorHandler from "./middlewares/error/errorHandler.middleware.js";
import notFoundHandler from "./middlewares/error/notFound.middleware.js";
import attachRequestId from "./middlewares/request/requestId.middleware.js";
import sanitizeRequest from "./middlewares/security/mongoSanitize.middleware.js";
import securityHeaders from "./middlewares/security/appSecurity.middleware.js";
import apiRouter from "./routes/index.js";
import { API_DEFAULTS } from "./utils/constants.js";

/**
 * Shared Express application bootstrap for the backend API.
 */
const app = express();

morgan.token("request-id", (req) => req.id || "-");

app.disable("x-powered-by");
app.use(attachRequestId);
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: env.BODY_SIZE_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: env.URL_ENCODED_LIMIT }));
app.use(sanitizeRequest);
app.use(
  morgan(":method :url :status :response-time ms requestId=:request-id", {
    stream: morganStream,
  }),
);

app.use(API_DEFAULTS.BASE_PATH, apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
