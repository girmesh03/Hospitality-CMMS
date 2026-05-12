const PREFIX = "hc_";

/**
 * Read a namespaced value from localStorage.
 * @param {string} key - Storage key (without prefix)
 * @returns {*}
 */
export const getItem = (key) => {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Write a namespaced value to localStorage.
 * @param {string} key - Storage key (without prefix)
 * @param {*} value - Value to serialize as JSON
 * @returns {boolean}
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

/**
 * Remove a namespaced key from localStorage.
 * @param {string} key - Storage key (without prefix)
 * @returns {boolean}
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(PREFIX + key);
    return true;
  } catch {
    return false;
  }
};

/**
 * Clear all namespaced keys from localStorage.
 * @returns {boolean}
 */
export const clearAll = () => {
  try {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith(PREFIX));
    keys.forEach((k) => localStorage.removeItem(k));
    return true;
  } catch {
    return false;
  }
};
