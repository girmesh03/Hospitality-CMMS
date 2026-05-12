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

export const buildSort = (sortField, sortOrder) => {
  const order = sortOrder === "asc" ? 1 : -1;
  return { [sortField || "createdAt"]: order };
};
