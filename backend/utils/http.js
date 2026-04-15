import { HTTP_HEADERS } from "./constants.js";

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

/**
 * Creates the standard error envelope.
 *
 * @param {{code: string, message: string, fieldErrors?: Record<string, string[]> | null}} error - Error payload.
 * @param {string | null} [requestId=null] - Request identifier.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {{success: false, error: {code: string, message: string, fieldErrors?: Record<string, string[]> | null}, meta: Record<string, unknown>}} Standard error envelope.
 */
export const createErrorResponse = (error, requestId = null, meta = {}) => ({
  success: false,
  error,
  meta: requestId ? { requestId, ...meta } : { ...meta },
});

/**
 * Sends a standard success response through Express.
 *
 * @param {import("express").Response} res - Express response.
 * @param {unknown} data - Response payload.
 * @param {number} [statusCode=200] - HTTP status code.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {import("express").Response} Express response.
 */
export const sendSuccess = (res, data, statusCode = 200, meta = {}) =>
  res
    .status(statusCode)
    .json(createSuccessResponse(data, res.getHeader(HTTP_HEADERS.REQUEST_ID) || null, meta));

/**
 * Sends a standard paginated response through Express.
 *
 * @param {import("express").Response} res - Express response.
 * @param {unknown[]} items - Collection items.
 * @param {{page: number, limit: number, totalItems: number, totalPages: number}} pagination - Paging metadata.
 * @param {number} [statusCode=200] - HTTP status code.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {import("express").Response} Express response.
 */
export const sendPaginated = (res, items, pagination, statusCode = 200, meta = {}) =>
  res
    .status(statusCode)
    .json(createPaginatedResponse(items, pagination, res.getHeader(HTTP_HEADERS.REQUEST_ID) || null, meta));

/**
 * Sends a standard error response through Express.
 *
 * @param {import("express").Response} res - Express response.
 * @param {{code: string, message: string, fieldErrors?: Record<string, string[]> | null}} error - Error payload.
 * @param {number} [statusCode=500] - HTTP status code.
 * @param {Record<string, unknown>} [meta={}] - Additional metadata.
 * @returns {import("express").Response} Express response.
 */
export const sendError = (res, error, statusCode = 500, meta = {}) =>
  res.status(statusCode).json(createErrorResponse(error, res.getHeader(HTTP_HEADERS.REQUEST_ID) || null, meta));
