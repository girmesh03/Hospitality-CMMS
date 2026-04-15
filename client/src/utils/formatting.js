/**
 * Shared text-formatting helpers for frontend presentation.
 */

/**
 * Formats a machine-readable key into a readable label.
 *
 * @param {string | null | undefined} value - Machine-readable value.
 * @returns {string} Human-readable label.
 */
export const formatLabelFromKey = (value) =>
  String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());

/**
 * Formats a collection of strings into a comma-separated display value.
 *
 * @param {string[] | undefined | null} values - Collection values.
 * @returns {string} Human-readable string.
 */
export const formatCommaSeparatedList = (values) => (values && values.length ? values.join(", ") : "None");

/**
 * Returns a safe fallback display value for optional fields.
 *
 * @param {unknown} value - Candidate display value.
 * @param {string} [fallback="—"] - Fallback display token.
 * @returns {string} Display string.
 */
export const formatEmptyValue = (value, fallback = "—") =>
  value === undefined || value === null || value === "" ? fallback : String(value);
