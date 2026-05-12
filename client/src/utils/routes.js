/**
 * Route template path constants with `:param` placeholders for dynamic segments.
 * @type {Object<string, string>}
 */
export const ROUTES = {
  HOME: "/",
  BOOTSTRAP: "/bootstrap",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  DASHBOARD: "/app/dashboard",
  REQUESTS: "/app/requests",
  REQUESTS_NEW: "/app/requests/new",
  REQUESTS_DETAIL: "/app/requests/:id",
  WORK_ORDERS: "/app/work-orders",
  WORK_ORDERS_NEW: "/app/work-orders/new",
  WORK_ORDERS_DETAIL: "/app/work-orders/:id",
  PM_PLANS: "/app/pm-plans",
  PM_PLANS_DETAIL: "/app/pm-plans/:id",
  PM_CALENDAR: "/app/pm-plans/calendar",
  ASSETS: "/app/assets",
  ASSETS_DETAIL: "/app/assets/:id",
  LOCATIONS: "/app/locations",
  LOCATIONS_DETAIL: "/app/locations/:id",
  PROPERTIES: "/app/properties",
  PROPERTIES_DETAIL: "/app/properties/:id",
  INVENTORY: "/app/inventory",
  INVENTORY_DETAIL: "/app/inventory/:id",
  VENDORS: "/app/vendors",
  VENDORS_DETAIL: "/app/vendors/:id",
  USERS: "/app/users",
  USERS_DETAIL: "/app/users/:id",
  ROLES: "/app/roles",
  ROLES_DETAIL: "/app/roles/:id",
  TEAMS: "/app/teams",
  TEAMS_DETAIL: "/app/teams/:id",
  NOTIFICATIONS: "/app/notifications",
  REPORTS: "/app/reports",
  REPORTS_DETAIL: "/app/reports/:type",
  SETTINGS_PROFILE: "/app/settings/profile",
  SETTINGS_ORGANIZATION: "/app/settings/organization",
  SETTINGS_EMAIL: "/app/settings/email",
  IMPORTS: "/app/imports",
  IMPORT_NEW: "/app/imports/new",
  AUDIT_LOG: "/app/audit-log",
  PORTAL_REQUESTS: "/app/portal/requests",
  PORTAL_VENDOR: "/app/portal/vendor",
  FORBIDDEN: "/403",
};

/**
 * Build a concrete path by substituting route parameters into a template.
 * @param {string} template - Route template with `:param` placeholders
 * @param {Object<string, string>} params - Parameter key/value pairs
 * @returns {string}
 */
export const buildPath = (template, params) => {
  let path = template;
  for (const [key, value] of Object.entries(params)) {
    path = path.replace(`:${key}`, encodeURIComponent(value));
  }
  return path;
};
