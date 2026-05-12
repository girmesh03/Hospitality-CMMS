import dotenv from "dotenv";
dotenv.config();
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { requestId } from "./middlewares/request/requestId.js";
import { helmetMiddleware } from "./middlewares/security/helmet.js";
import { corsMiddleware } from "./middlewares/security/cors.js";
import { generalLimiter } from "./middlewares/security/rateLimiter.js";
import { mongoSanitizeMiddleware } from "./middlewares/security/mongoSanitize.js";
import { requestLogger } from "./middlewares/request/requestLogger.js";
import { decodeToken } from "./middlewares/auth/decodeToken.js";
import { notFoundHandler } from "./middlewares/error/notFound.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import routes from "./routes/index.js";

/** Express application instance with all middleware and routes configured. @type {import("express").Express} */
const app = express();

app.use(requestId);
app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(generalLimiter);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(mongoSanitizeMiddleware);
app.use(requestLogger);
app.use(decodeToken);

app.use("/api/v1", routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
