/**
 * Shared filename helpers for upload workflows.
 */

/**
 * Normalizes a filename stem into a filesystem-safe token.
 *
 * @param {string} value - Incoming filename stem.
 * @returns {string} Sanitized filename stem.
 */
export const sanitizeFilenameStem = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
