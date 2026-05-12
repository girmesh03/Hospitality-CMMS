/** Build a MongoDB filter object from query params, whitelisting allowed fields. @param {object} filters - Raw filter key-value pairs. @param {string[]} allowedFields - Whitelist of filterable fields. @returns {object} MongoDB query object. */
export const buildFilterQuery = (filters, allowedFields) => {
  const query = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") continue;
    if (!allowedFields.includes(key)) continue;
    if (typeof value === "string") {
      query[key] = { $regex: value, $options: "i" };
    } else {
      query[key] = value;
    }
  }
  return query;
};

/** Build a MongoDB sort object from field and order. @param {string} [sortField] - Field to sort by (defaults to createdAt). @param {string} [sortOrder] - "asc" or "desc" (defaults to desc). @returns {object} MongoDB sort object. */
export const buildSort = (sortField, sortOrder) => {
  const order = sortOrder === "asc" ? 1 : -1;
  return { [sortField || "createdAt"]: order };
};
