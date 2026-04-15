/**
 * Shared HTTP-response helpers for backend controllers and services.
 */

/**
 * Creates the standard success envelope for non-list responses.
 *
 * @param {unknown} data - Response payload.
 * @param {string | null} [requestId=null] - Request identifier.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {{success: true, data: unknown, meta: Record<string, unknown>}} Standard success envelope.
 */
export const createSuccessResponse = (data, requestId = null, meta = {}) => ({
  success: true,
  data,
  meta: requestId ? { requestId, ...meta } : { ...meta },
});

/**
 * Creates the standard list envelope for paginated responses.
 *
 * @param {unknown[]} items - Collection items.
 * @param {{page: number, limit: number, totalItems: number, totalPages: number}} pagination - Paging metadata.
 * @param {string | null} [requestId=null] - Request identifier.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {{success: true, data: {items: unknown[], page: number, limit: number, totalItems: number, totalPages: number}, meta: Record<string, unknown>}} Paginated success envelope.
 */
export const createPaginatedResponse = (items, pagination, requestId = null, meta = {}) =>
  createSuccessResponse(
    {
      items,
      page: pagination.page,
      limit: pagination.limit,
      totalItems: pagination.totalItems,
      totalPages: pagination.totalPages,
    },
    requestId,
    meta,
  );
