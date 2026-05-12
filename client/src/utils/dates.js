/**
 * Check whether a date falls on the current calendar day.
 * @param {string|Date} date
 * @returns {boolean}
 */
export const isToday = (date) => {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
};

/**
 * Check whether a date is in the past.
 * @param {string|Date|null} date
 * @returns {boolean}
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};

/**
 * Add a number of days to a date.
 * @param {string|Date} date
 * @param {number} days
 * @returns {Date}
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Add a number of months to a date.
 * @param {string|Date} date
 * @param {number} months
 * @returns {Date}
 */
export const addMonths = (date, months) => {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
};

/**
 * Get the start (midnight) of a given date.
 * @param {string|Date} date
 * @returns {Date}
 */
export const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Get the end (last millisecond) of a given date.
 * @param {string|Date} date
 * @returns {Date}
 */
export const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

/**
 * Calculate the difference in days between two dates.
 * @param {string|Date} date1
 * @param {string|Date} date2
 * @returns {number}
 */
export const diffInDays = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.round((d1 - d2) / (1000 * 60 * 60 * 24));
};

/**
 * Convert a date value to an ISO 8601 string.
 * @param {string|Date|null} date
 * @returns {string}
 */
export const toISO = (date) => {
  if (!date) return "";
  return new Date(date).toISOString();
};

/**
 * Format a date as a human-readable relative string (Today, Tomorrow, etc.).
 * @param {string|Date|null} date
 * @returns {string}
 */
export const formatRelative = (date) => {
  if (!date) return "";
  const diff = diffInDays(new Date(), date);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  if (diff === -1) return "Yesterday";
  if (diff > 0) return `In ${diff} days`;
  return `${Math.abs(diff)} days ago`;
};
