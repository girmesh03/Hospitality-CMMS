import helmet from "helmet";

/** Express middleware that sets secure HTTP headers via Helmet. @type {import("express").RequestHandler} */
export const helmetMiddleware = helmet();
