/**
 * Shared query-building helpers for backend list endpoints.
 */

/**
 * Returns a shallow object containing only defined, non-empty values.
 *
 * @param {Record<string, unknown>} [filters={}] - Filter candidates.
 * @returns {Record<string, unknown>} Sanitized filter object.
 */
export const pickDefinedFilters = (filters = {}) =>
  Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );

/**
 * Creates a stable sort object from query values.
 *
 * @param {string | undefined} sortBy - Requested sort field.
 * @param {"asc" | "desc" | undefined} sortOrder - Requested direction.
 * @param {string} [fallbackField="createdAt"] - Fallback field.
 * @returns {Record<string, 1 | -1>} Sort object with `_id` tie-breaker.
 */
export const createStableSort = (sortBy, sortOrder, fallbackField = "createdAt") => {
  const field = sortBy || fallbackField;
  const direction = sortOrder === "asc" ? 1 : -1;

  return {
    [field]: direction,
    _id: direction,
  };
};
