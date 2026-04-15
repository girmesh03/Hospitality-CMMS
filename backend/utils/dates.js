/**
 * Shared date helpers for backend services and validators.
 */

/**
 * Coerces an incoming date-like value into a `Date` instance.
 *
 * @param {Date | string | number | null | undefined} value - Incoming date-like value.
 * @returns {Date | null} Parsed UTC date or `null` when invalid.
 */
export const coerceUtcDate = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Verifies that an optional date range is chronologically valid.
 *
 * @param {Date | null} startAt - Range start.
 * @param {Date | null} endAt - Range end.
 * @returns {boolean} `true` when the range is valid.
 */
export const isChronologicalRange = (startAt, endAt) => {
  if (!startAt || !endAt) {
    return true;
  }

  return startAt.getTime() <= endAt.getTime();
};
