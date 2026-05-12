export const successResponse = (data, meta = {}) => ({
  success: true,
  data,
  ...meta,
});

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

export const errorResponse = (errorCode, message, errors = null) => ({
  success: false,
  error: errorCode,
  message,
  ...(errors && { errors }),
});
