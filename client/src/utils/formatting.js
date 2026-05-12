/**
 * Format a date as a localized date string.
 * @param {string|Date|null} date - Date value
 * @param {Intl.DateTimeFormatOptions} [options] - Additional format options
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
};

/**
 * Format a date as a localized date-time string.
 * @param {string|Date|null} date - Date value
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return formatDate(date, {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format a number as currency.
 * @param {number|null} amount - Numeric amount
 * @param {string} [currency="USD"] - ISO 4217 currency code
 * @returns {string}
 */
export const formatCurrency = (amount, currency = "USD") => {
  if (amount == null || isNaN(amount)) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/**
 * Combine first and last name into a single display string.
 * @param {string|null} firstName
 * @param {string|null} lastName
 * @returns {string}
 */
export const formatName = (firstName, lastName) => {
  if (!firstName && !lastName) return "";
  if (!firstName) return lastName;
  if (!lastName) return firstName;
  return `${firstName} ${lastName}`;
};

/**
 * Truncate a string with ellipsis if it exceeds the given length.
 * @param {string|null} str - Input string
 * @param {number} [length=50] - Max characters before truncation
 * @returns {string}
 */
export const truncate = (str, length = 50) => {
  if (!str) return "";
  if (str.length <= length) return str;
  return str.substring(0, length).trimEnd() + "...";
};

/**
 * Format a phone number string into a human-readable US format.
 * @param {string|null} phone - Raw phone string
 * @returns {string}
 */
export const formatPhone = (phone) => {
  if (!phone) return "";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Return the singular or plural form of a word based on count.
 * @param {number} count
 * @param {string} singular - Singular form
 * @param {string} [plural] - Plural form (defaults to singular + "s")
 * @returns {string}
 */
export const pluralize = (count, singular, plural) => {
  return count === 1 ? singular : plural || `${singular}s`;
};
