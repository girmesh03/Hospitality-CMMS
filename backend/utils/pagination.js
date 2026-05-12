import { PAGINATION_DEFAULTS } from "./constants.js";

/** Parse page/limit from query string with defaults and clamping. @param {object} query - Express query object. @returns {{page: number, limit: number, skip: number}} */
export const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || PAGINATION_DEFAULTS.page);
  const limit = Math.min(PAGINATION_DEFAULTS.maxLimit, Math.max(1, parseInt(query.limit, 10) || PAGINATION_DEFAULTS.limit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

/** Build pagination metadata object. @param {number} total - Total matching records. @param {number} page - Current page. @param {number} limit - Items per page. @returns {{page: number, limit: number, total: number, totalPages: number}} */
export const getPaginationMetadata = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
