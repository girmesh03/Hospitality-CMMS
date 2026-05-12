import { PAGINATION_DEFAULTS } from "./constants.js";

export const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || PAGINATION_DEFAULTS.page);
  const limit = Math.min(PAGINATION_DEFAULTS.maxLimit, Math.max(1, parseInt(query.limit, 10) || PAGINATION_DEFAULTS.limit));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const getPaginationMetadata = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
