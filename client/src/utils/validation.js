/**
 * Check whether a value is a syntactically valid email address.
 * @param {string|null} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate a password against complexity requirements.
 * Must be 12–72 characters and include upper, lower, digit, and special char.
 * @param {string|null} password
 * @returns {boolean}
 */
export const isValidPassword = (password) => {
  if (!password || password.length < 12) return false;
  if (password.length > 72) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) return false;
  return true;
};

/**
 * Score a password and return a strength assessment.
 * @param {string|null} password
 * @returns {{ score: number, label: string, color: string }}
 */
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "None", color: "default" };
  let score = 0;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 1;
  if (score <= 2) return { score, label: "Weak", color: "error" };
  if (score <= 4) return { score, label: "Medium", color: "warning" };
  return { score, label: "Strong", color: "success" };
};

/**
 * Check whether a value is a valid phone number (7–20 digits/symbols).
 * @param {string|null} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  return /^[\d\s\-().+]{7,20}$/.test(phone);
};

/**
 * Check whether a value is non-null, non-undefined, and non-empty-string.
 * @param {*} value
 * @returns {boolean}
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string" && value.trim() === "") return false;
  return true;
};

/**
 * Check whether a numeric value falls within a given range (inclusive).
 * @param {*} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export const isInRange = (value, min, max) => {
  if (value == null) return false;
  const num = Number(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Check whether a value is a valid absolute URL.
 * @param {string|null} url
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
