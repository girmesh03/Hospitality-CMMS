/**
 * Check if a user has a specific permission.
 * Supports wildcard (`*`) for full access.
 * @param {Object|null} user - User object with permissions array
 * @param {string} permission - Permission string to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user?.permissions) return false;
  if (user.permissions === "*" || user.permissions.includes("*")) return true;
  return user.permissions.includes(permission);
};

/**
 * Check if a user has a specific role.
 * @param {Object|null} user - User object with roleKeys array
 * @param {string} roleKey - Role key to check
 * @returns {boolean}
 */
export const hasRole = (user, roleKey) => {
  if (!user?.roleKeys) return false;
  return user.roleKeys.includes(roleKey);
};

/**
 * Check if a user has any of the specified roles.
 * @param {Object|null} user - User object with roleKeys array
 * @param {string[]} roleKeys - Array of role keys to check
 * @returns {boolean}
 */
export const hasAnyRole = (user, roleKeys) => {
  if (!user?.roleKeys) return false;
  return roleKeys.some((r) => user.roleKeys.includes(r));
};

/**
 * Check if a user has all of the specified roles.
 * @param {Object|null} user - User object with roleKeys array
 * @param {string[]} roleKeys - Array of role keys to check
 * @returns {boolean}
 */
export const hasAllRoles = (user, roleKeys) => {
  if (!user?.roleKeys) return false;
  return roleKeys.every((r) => user.roleKeys.includes(r));
};

/**
 * Check if a user can manage a resource.
 * @param {Object|null} user - User object with permissions array
 * @param {string} resource - Resource name (e.g. "work_orders")
 * @returns {boolean}
 */
export const canManage = (user, resource) => {
  return hasPermission(user, `${resource}.manage`);
};

/**
 * Check if a user can create a resource.
 * @param {Object|null} user - User object with permissions array
 * @param {string} resource - Resource name
 * @returns {boolean}
 */
export const canCreate = (user, resource) => {
  return hasPermission(user, `${resource}.create`);
};

/**
 * Check if a user can view a resource.
 * @param {Object|null} user - User object with permissions array
 * @param {string} resource - Resource name
 * @returns {boolean}
 */
export const canView = (user, resource) => {
  return hasPermission(user, `${resource}.view`);
};

/**
 * Check if a user can edit a resource.
 * @param {Object|null} user - User object with permissions array
 * @param {string} resource - Resource name
 * @returns {boolean}
 */
export const canEdit = (user, resource) => {
  return hasPermission(user, `${resource}.edit`);
};

/**
 * Check if a user can delete a resource.
 * @param {Object|null} user - User object with permissions array
 * @param {string} resource - Resource name
 * @returns {boolean}
 */
export const canDelete = (user, resource) => {
  return hasPermission(user, `${resource}.delete`);
};
