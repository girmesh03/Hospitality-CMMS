/**
 * Frontend single source of truth for shared routes, enums, labels, filters,
 * and table-column keys.
 */

/**
 * Application route map.
 */
export const ROUTES = Object.freeze({
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  ACCEPT_INVITE: "/accept-invite/:token",
  DASHBOARD: "/dashboard",
  REQUESTS: "/requests",
  REQUEST_NEW: "/requests/new",
  REQUEST_DETAIL: "/requests/:requestId",
  WORK_ORDERS: "/work-orders",
  WORK_ORDER_NEW: "/work-orders/new",
  WORK_ORDER_DETAIL: "/work-orders/:workOrderId",
  PM_PLANS: "/pm",
  PM_CALENDAR: "/pm/calendar",
  PM_PLAN_DETAIL: "/pm/:planId",
  ASSETS: "/assets",
  ASSET_DETAIL: "/assets/:assetId",
  LOCATIONS: "/locations",
  LOCATION_DETAIL: "/locations/:locationId",
  INVENTORY_PARTS: "/inventory/parts",
  INVENTORY_PART_DETAIL: "/inventory/parts/:partId",
  INVENTORY_TRANSACTIONS: "/inventory/transactions",
  VENDORS: "/vendors",
  VENDOR_DETAIL: "/vendors/:vendorId",
  REPORTS: "/reports",
  SETTINGS_ORGANIZATION: "/settings/organization",
  SETTINGS_PROPERTIES: "/settings/properties/:propertyId",
  SETTINGS_MASTER_DATA: "/settings/master-data",
  SETTINGS_ROLES: "/settings/roles",
  SETTINGS_TEAMS: "/settings/teams",
  SETTINGS_USERS: "/settings/users",
  IMPORTS: "/imports",
  AUDIT: "/audit",
  PROFILE: "/profile",
  REQUEST_PORTAL: "/portal/:portalSlug",
  VENDOR_WORK_ORDERS: "/vendor/work-orders",
});

/**
 * Shared navigation section identifiers.
 */
export const NAVIGATION_SECTIONS = Object.freeze({
  OPERATIONS: "operations",
  ASSETS: "assets",
  INVENTORY: "inventory",
  VENDORS: "vendors",
  REPORTING: "reporting",
  SETTINGS: "settings",
  PORTALS: "portals",
});

/**
 * Primary application navigation inventory for the authenticated shell.
 */
export const APP_NAV_ITEMS = Object.freeze([
  Object.freeze({
    label: "Dashboard",
    routeKey: "DASHBOARD",
    section: NAVIGATION_SECTIONS.OPERATIONS,
    icon: "dashboard",
  }),
  Object.freeze({
    label: "Requests",
    routeKey: "REQUESTS",
    section: NAVIGATION_SECTIONS.OPERATIONS,
    icon: "request",
  }),
  Object.freeze({
    label: "Work Orders",
    routeKey: "WORK_ORDERS",
    section: NAVIGATION_SECTIONS.OPERATIONS,
    icon: "workOrder",
  }),
  Object.freeze({
    label: "PM",
    routeKey: "PM_PLANS",
    section: NAVIGATION_SECTIONS.OPERATIONS,
    icon: "pm",
  }),
  Object.freeze({
    label: "Assets",
    routeKey: "ASSETS",
    section: NAVIGATION_SECTIONS.ASSETS,
    icon: "asset",
  }),
  Object.freeze({
    label: "Locations",
    routeKey: "LOCATIONS",
    section: NAVIGATION_SECTIONS.ASSETS,
    icon: "location",
  }),
  Object.freeze({
    label: "Inventory",
    routeKey: "INVENTORY_PARTS",
    section: NAVIGATION_SECTIONS.INVENTORY,
    icon: "inventory",
  }),
  Object.freeze({
    label: "Vendors",
    routeKey: "VENDORS",
    section: NAVIGATION_SECTIONS.VENDORS,
    icon: "vendor",
  }),
  Object.freeze({
    label: "Reports",
    routeKey: "REPORTS",
    section: NAVIGATION_SECTIONS.REPORTING,
    icon: "report",
  }),
  Object.freeze({
    label: "Settings",
    routeKey: "SETTINGS_ORGANIZATION",
    section: NAVIGATION_SECTIONS.SETTINGS,
    icon: "settings",
  }),
  Object.freeze({
    label: "Imports",
    routeKey: "IMPORTS",
    section: NAVIGATION_SECTIONS.SETTINGS,
    icon: "import",
  }),
  Object.freeze({
    label: "Audit",
    routeKey: "AUDIT",
    section: NAVIGATION_SECTIONS.SETTINGS,
    icon: "audit",
  }),
]);

/**
 * Shared route-adjacent enums mirrored from backend canonical constants.
 */
export const ROLE_KEYS = Object.freeze([
  "organization_admin",
  "corporate_engineering_director",
  "property_admin",
  "engineering_manager",
  "maintenance_supervisor",
  "technician",
  "limited_technician",
  "requester",
  "inventory_controller",
  "vendor_coordinator",
  "vendor_user",
  "report_viewer",
  "auditor",
]);
export const REQUEST_STATUSES = Object.freeze([
  "submitted",
  "under_review",
  "needs_clarification",
  "approved",
  "rejected",
  "converted",
  "cancelled",
]);
export const WORK_ORDER_STATUSES = Object.freeze([
  "draft",
  "open",
  "assigned",
  "scheduled",
  "in_progress",
  "on_hold",
  "awaiting_parts",
  "awaiting_access",
  "awaiting_vendor",
  "completed_pending_verification",
  "closed",
  "cancelled",
]);
export const PRIORITY_VALUES = Object.freeze(["emergency", "urgent", "high", "medium", "low"]);
export const SEVERITY_VALUES = Object.freeze([
  "life_safety",
  "guest_service_critical",
  "operational_critical",
  "standard",
  "cosmetic",
]);
export const GUEST_IMPACT_VALUES = Object.freeze(["none", "low", "moderate", "high", "revenue_blocking"]);
export const PM_TRIGGER_TYPES = Object.freeze(["time", "meter", "seasonal", "hybrid"]);
export const NOTIFICATION_EVENTS = Object.freeze({
  REQUEST_CREATED: "request.created",
  REQUEST_UPDATED: "request.updated",
  WORK_ORDER_UPDATED: "work_order.updated",
  WORK_ORDER_COMMENT_ADDED: "work_order.comment_added",
  PM_GENERATED: "pm.generated",
  INVENTORY_LOW_STOCK: "inventory.low_stock",
  VENDOR_UPDATED: "vendor.updated",
});
export const SOCKET_EVENTS = Object.freeze({
  NOTIFICATION_CREATED: "notification.created",
  REQUEST_CREATED: "request.created",
  REQUEST_UPDATED: "request.updated",
  WORK_ORDER_CREATED: "work_order.created",
  WORK_ORDER_UPDATED: "work_order.updated",
  WORK_ORDER_COMMENT_ADDED: "work_order.comment_added",
  PM_GENERATED: "pm.generated",
  INVENTORY_LOW_STOCK: "inventory.low_stock",
  VENDOR_UPDATED: "vendor.updated",
});

/**
 * Shared filter and view-mode identifiers.
 */
export const FILTER_KEYS = Object.freeze({
  SEARCH: "search",
  PROPERTY_ID: "propertyId",
  LOCATION_ID: "locationId",
  STATUS: "status",
  CATEGORY: "category",
  PRIORITY: "priority",
  GUEST_IMPACT: "guestImpact",
  ASSIGNEE_ID: "assigneeId",
  TEAM_ID: "teamId",
  VENDOR_ID: "vendorId",
  DATE_FROM: "from",
  DATE_TO: "to",
  INCLUDE_ARCHIVED: "includeArchived",
});
export const VIEW_MODES = Object.freeze({
  LIST: "list",
  DETAIL: "detail",
  CALENDAR: "calendar",
  AGENDA: "agenda",
});

/**
 * Table-column identifiers used by list and reporting screens.
 */
export const TABLE_COLUMN_KEYS = Object.freeze({
  REQUESTS: Object.freeze([
    "requestNumber",
    "status",
    "property",
    "location",
    "category",
    "title",
    "guestImpact",
    "priorityRequested",
    "requester",
    "submittedAt",
    "linkedWorkOrder",
  ]),
  WORK_ORDERS: Object.freeze([
    "workOrderNumber",
    "status",
    "priority",
    "severity",
    "guestImpact",
    "property",
    "location",
    "asset",
    "type",
    "primaryAssignee",
    "teamOrVendor",
    "dueAt",
    "overdue",
    "totalCost",
  ]),
  ASSETS: Object.freeze([
    "assetCode",
    "name",
    "category",
    "location",
    "criticality",
    "lifecycleStatus",
    "warrantyEnd",
    "openWorkCount",
    "nextPmDue",
  ]),
  PARTS: Object.freeze([
    "partNumber",
    "name",
    "category",
    "status",
    "preferredVendor",
    "totalOnHand",
    "totalReserved",
    "totalAvailable",
    "lowStockFlag",
  ]),
  VENDORS: Object.freeze([
    "companyName",
    "status",
    "serviceCategories",
    "propertiesCovered",
    "insuranceExpiry",
    "openAssignedWorkCount",
    "onTimeCompletionPercentage",
  ]),
});

/**
 * Standard report identifiers.
 */
export const REPORT_KEYS = Object.freeze([
  "open_work_order_backlog",
  "overdue_work_order_backlog",
  "sla_attainment",
  "response_time_completion_time_trends",
  "pm_compliance",
  "pm_overdue_detail",
  "asset_downtime_summary",
  "asset_reliability_summary",
  "room_maintenance_downtime",
  "guest_impact_issue_summary",
  "parts_consumption",
  "low_stock_report",
  "vendor_performance_report",
  "labor_utilization_report",
]);

/**
 * Shared UI pagination defaults.
 */
export const UI_DEFAULTS = Object.freeze({
  PAGE_SIZE: 25,
  MAX_PAGE_SIZE: 200,
  MOBILE_BREAKPOINT: 360,
});

/**
 * Aggregate frontend constants export.
 */
export const CLIENT_CONSTANTS = Object.freeze({
  ROUTES,
  NAVIGATION_SECTIONS,
  APP_NAV_ITEMS,
  ROLE_KEYS,
  REQUEST_STATUSES,
  WORK_ORDER_STATUSES,
  PRIORITY_VALUES,
  SEVERITY_VALUES,
  GUEST_IMPACT_VALUES,
  PM_TRIGGER_TYPES,
  NOTIFICATION_EVENTS,
  SOCKET_EVENTS,
  FILTER_KEYS,
  VIEW_MODES,
  TABLE_COLUMN_KEYS,
  REPORT_KEYS,
  UI_DEFAULTS,
});

export default CLIENT_CONSTANTS;
