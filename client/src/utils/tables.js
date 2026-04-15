/**
 * Shared table-state helpers for list and report screens.
 */

/**
 * Builds a visibility model from an allowed column list and a preferred
 * visible-column subset.
 *
 * @param {string[]} columnKeys - All supported column keys.
 * @param {string[]} [visibleColumnKeys=[]] - Preferred visible columns.
 * @returns {Record<string, boolean>} Column visibility model.
 */
export const createColumnVisibilityModel = (columnKeys, visibleColumnKeys = []) => {
  const visibleSet = new Set(visibleColumnKeys.length ? visibleColumnKeys : columnKeys);

  return Object.fromEntries(columnKeys.map((columnKey) => [columnKey, visibleSet.has(columnKey)]));
};

/**
 * Merges persisted visible-column choices with the default column order.
 *
 * @param {string[]} defaultColumnKeys - Default column order.
 * @param {string[]} [persistedColumnKeys=[]] - Persisted preferred columns.
 * @returns {string[]} Ordered visible-column list.
 */
export const mergeVisibleColumns = (defaultColumnKeys, persistedColumnKeys = []) => {
  const persistedSet = new Set(persistedColumnKeys);
  const visibleColumns = defaultColumnKeys.filter((columnKey) => persistedSet.size === 0 || persistedSet.has(columnKey));

  return visibleColumns.length ? visibleColumns : [...defaultColumnKeys];
};
