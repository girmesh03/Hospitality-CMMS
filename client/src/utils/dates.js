import dayjs from "dayjs";

/**
 * Shared date helpers for frontend formatting and lightweight comparisons.
 */

/**
 * Formats a UTC timestamp into a display string.
 *
 * @param {string | Date | null | undefined} value - Date-like value.
 * @param {string} [format="MMM D, YYYY h:mm A"] - Day.js format string.
 * @returns {string} Formatted display value.
 */
export const formatDateTime = (value, format = "MMM D, YYYY h:mm A") => {
  if (!value) {
    return "—";
  }

  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.format(format) : "—";
};

/**
 * Returns `true` when a date-like value is valid.
 *
 * @param {string | Date | null | undefined} value - Date-like value.
 * @returns {boolean} `true` when valid.
 */
export const isValidDateValue = (value) => Boolean(value) && dayjs(value).isValid();

/**
 * Returns the start of day for a date-like value.
 *
 * @param {string | Date} value - Date-like value.
 * @returns {string | null} ISO string at the start of day or `null`.
 */
export const toStartOfDayIso = (value) => {
  const parsed = dayjs(value);
  return parsed.isValid() ? parsed.startOf("day").toISOString() : null;
};
