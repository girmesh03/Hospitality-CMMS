/**
 * Shared pagination helpers for backend list endpoints.
 */

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 25;
const MAX_LIMIT = 200;

/**
 * Parses a positive integer from query input.
 *
 * @param {unknown} value - Incoming query value.
 * @param {number} fallback - Fallback value.
 * @returns {number} Positive integer.
 */
const toPositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(String(value ?? ""), 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
};

/**
 * Normalizes pagination query values into a stable object shape.
 *
 * @param {{page?: unknown, limit?: unknown}} [query={}] - Incoming query object.
 * @returns {{page: number, limit: number, skip: number}} Normalized paging configuration.
 */
export const normalizePagination = (query = {}) => {
  const page = toPositiveInteger(query.page, DEFAULT_PAGE);
  const requestedLimit = toPositiveInteger(query.limit, DEFAULT_LIMIT);
  const limit = Math.min(requestedLimit, MAX_LIMIT);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
};
