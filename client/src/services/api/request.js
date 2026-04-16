/**
 * Normalizes an Axios error into a consistent frontend error object.
 *
 * @param {unknown} error - Unknown thrown error.
 * @returns {{statusCode: number, code: string, message: string, fieldErrors: Record<string, string[]> | null, requestId: string | null, originalError: unknown}} Normalized API error.
 */
export const normalizeApiError = (error) => {
  const response = error?.response;
  const payload = response?.data || {};
  const errorPayload = payload.error || {};

  return {
    statusCode: response?.status || 500,
    code: errorPayload.code || "client_error",
    message: errorPayload.message || error?.message || "An unexpected error occurred",
    fieldErrors: errorPayload.fieldErrors || null,
    requestId: payload.meta?.requestId || null,
    originalError: error,
  };
};

/**
 * Extracts the normalized response payload envelope.
 *
 * @param {{data?: {data?: unknown}}} response - Axios response.
 * @returns {unknown} Envelope data payload.
 */
export const unwrapResponseData = (response) => response?.data?.data;

/**
 * Removes empty query values from a filter object.
 *
 * @param {Record<string, unknown>} [query={}] - Query object.
 * @returns {Record<string, unknown>} Sanitized query object.
 */
export const buildQueryParams = (query = {}) =>
  Object.fromEntries(
    Object.entries(query).filter(
      ([, value]) => value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0),
    ),
  );
