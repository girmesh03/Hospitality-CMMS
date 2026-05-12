import mongoSanitize from "express-mongo-sanitize";

/** Express middleware that strips $ and . from request body/query/params to prevent MongoDB injection. @type {import("express").RequestHandler} */
export const mongoSanitizeMiddleware = mongoSanitize();
