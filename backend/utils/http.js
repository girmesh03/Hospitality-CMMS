/** Standard success response body. @param {*} data - Response payload. @param {object} [meta={}] - Extra metadata fields. @returns {{success: boolean, data: *}} */
export const successResponse = (data, meta = {}) => ({
  success: true,
  data,
  ...meta,
});

/** Paginated success response body. @param {*} data - Page items. @param {{page: number, limit: number, total: number, totalPages: number}} pagination - Pagination metadata. @returns {{success: boolean, data: *, pagination: object}} */
export const paginatedResponse = (data, pagination) => ({
  success: true,
  data,
  pagination: {
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    totalPages: pagination.totalPages,
  },
});

/** Standard error response body. @param {string} errorCode - Machine-readable error code. @param {string} message - Human-readable message. @param {*[]} [errors=null] - Optional validation errors. @returns {{success: boolean, error: string, message: string}} */
export const errorResponse = (errorCode, message, errors = null) => ({
  success: false,
  error: errorCode,
  message,
  ...(errors && { errors }),
});
