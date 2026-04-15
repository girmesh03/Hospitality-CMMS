import mongoSanitize from "express-mongo-sanitize";

const sanitizeOptions = Object.freeze({
  replaceWith: "_",
});

/**
 * Sanitizes request containers in place while remaining compatible with
 * Express 5's read-only `req.query` accessor.
 *
 * @param {import("express").Request} req - Express request.
 * @param {import("express").Response} _res - Express response.
 * @param {import("express").NextFunction} next - Express next callback.
 * @returns {void}
 */
export const sanitizeRequest = (req, _res, next) => {
  ["body", "params", "headers", "query"].forEach((key) => {
    const target = req[key];
    if (!target || typeof target !== "object") {
      return;
    }

    mongoSanitize.sanitize(target, sanitizeOptions);
  });

  next();
};

export default sanitizeRequest;
