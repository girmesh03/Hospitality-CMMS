/**
 * Shared permission helpers for client-side affordance checks.
 */

/**
 * Normalizes an incoming permission list into a `Set`.
 *
 * @param {string[] | Set<string> | undefined | null} permissions - Permission collection.
 * @returns {Set<string>} Normalized permission set.
 */
const toPermissionSet = (permissions) => {
  if (permissions instanceof Set) {
    return permissions;
  }

  return new Set((permissions || []).filter(Boolean));
};

/**
 * Returns `true` when the permission collection contains the requested key.
 *
 * @param {string[] | Set<string> | undefined | null} permissions - Permission collection.
 * @param {string} permissionKey - Permission to test.
 * @returns {boolean} `true` when the permission is present.
 */
export const hasPermission = (permissions, permissionKey) => toPermissionSet(permissions).has(permissionKey);

/**
 * Returns `true` when any of the supplied permission keys are present.
 *
 * @param {string[] | Set<string> | undefined | null} permissions - Permission collection.
 * @param {string[]} permissionKeys - Candidate permissions.
 * @returns {boolean} `true` when any permission is present.
 */
export const hasAnyPermission = (permissions, permissionKeys) =>
  permissionKeys.some((permissionKey) => hasPermission(permissions, permissionKey));

/**
 * Returns `true` only when all supplied permission keys are present.
 *
 * @param {string[] | Set<string> | undefined | null} permissions - Permission collection.
 * @param {string[]} permissionKeys - Candidate permissions.
 * @returns {boolean} `true` when all permissions are present.
 */
export const hasAllPermissions = (permissions, permissionKeys) =>
  permissionKeys.every((permissionKey) => hasPermission(permissions, permissionKey));
