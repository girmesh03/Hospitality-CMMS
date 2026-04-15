/**
 * Backend single source of truth for shared domain constants.
 *
 * The values in this module are intentionally foundational and are limited to
 * canonical enums, identifiers, event names, and thresholds required across
 * backend layers.
 */

/**
 * Builds a frozen list of permission keys from domain and action lists.
 *
 * @param {readonly string[]} domains - Permission domains.
 * @param {readonly string[]} actions - Permission actions.
 * @returns {readonly string[]} Frozen permission-key list.
 */
const buildPermissionKeys = (domains, actions) =>
  Object.freeze(domains.flatMap((domain) => actions.map((action) => `${domain}.${action}`)));

/**
 * Shared API and paging constants.
 */
export const API_DEFAULTS = Object.freeze({
  BASE_PATH: "/api/v1",
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 25,
  MAX_LIMIT: 200,
});

/**
 * Shared upload and security thresholds.
 */
export const SYSTEM_LIMITS = Object.freeze({
  ACCESS_TOKEN_TTL_MINUTES: 15,
  REFRESH_TOKEN_IDLE_HOURS: 12,
  REFRESH_TOKEN_ABSOLUTE_DAYS: 30,
  PASSWORD_MIN_LENGTH: 12,
  PASSWORD_MAX_LENGTH: 72,
  PASSWORD_HISTORY_COUNT: 8,
  LOGIN_LOCKOUT_ATTEMPTS: 10,
  LOGIN_LOCKOUT_WINDOW_MINUTES: 15,
  LOGIN_LOCKOUT_DURATION_MINUTES: 30,
  MAX_UPLOAD_FILE_BYTES: 25 * 1024 * 1024,
  MAX_UPLOAD_BATCH_FILES: 20,
});

/**
 * Supported source channels for interactive and system-triggered activity.
 */
export const SOURCE_CHANNELS = Object.freeze({
  WEB_APP: "web_app",
  REQUEST_PORTAL: "request_portal",
  VENDOR_PORTAL: "vendor_portal",
  SCHEDULER: "scheduler",
  IMPORT_JOB: "import_job",
});

/**
 * Tenant-facing role identifiers.
 */
export const ROLE_KEYS = Object.freeze({
  ORGANIZATION_ADMIN: "organization_admin",
  CORPORATE_ENGINEERING_DIRECTOR: "corporate_engineering_director",
  PROPERTY_ADMIN: "property_admin",
  ENGINEERING_MANAGER: "engineering_manager",
  MAINTENANCE_SUPERVISOR: "maintenance_supervisor",
  TECHNICIAN: "technician",
  LIMITED_TECHNICIAN: "limited_technician",
  REQUESTER: "requester",
  INVENTORY_CONTROLLER: "inventory_controller",
  VENDOR_COORDINATOR: "vendor_coordinator",
  VENDOR_USER: "vendor_user",
  REPORT_VIEWER: "report_viewer",
  AUDITOR: "auditor",
});

/**
 * Permission domains and actions used to compose generic permission keys.
 */
export const PERMISSION_DOMAINS = Object.freeze([
  "dashboard",
  "organizations",
  "properties",
  "locations",
  "users",
  "roles",
  "teams",
  "assets",
  "meters",
  "requests",
  "work_orders",
  "pm_plans",
  "checklists",
  "inspections",
  "inventory",
  "vendors",
  "documents",
  "notifications",
  "reports",
  "saved_views",
  "imports",
  "settings",
  "audit_logs",
]);

/**
 * Standard permission actions supported across multiple domains.
 */
export const PERMISSION_ACTIONS = Object.freeze([
  "view_scope",
  "view_all",
  "create",
  "edit_scope",
  "edit_all",
  "assign",
  "approve",
  "verify_close",
  "cancel",
  "reopen",
  "delete",
  "export",
  "configure",
]);

/**
 * Expanded permission-key inventory for shared permission resolution.
 */
export const PERMISSION_KEYS = buildPermissionKeys(PERMISSION_DOMAINS, PERMISSION_ACTIONS);

/**
 * Explicit permission keys that do not follow the shared action matrix.
 */
export const SPECIAL_PERMISSION_KEYS = Object.freeze([
  "inventory.approve_adjustment",
  "vendors.assign_critical",
]);

/**
 * Hospitality organization and location enums.
 */
export const PROPERTY_TYPES = Object.freeze([
  "hotel",
  "resort",
  "serviced_apartment",
  "club",
  "spa",
  "restaurant",
  "event_venue",
  "mixed_use",
]);

/**
 * Supported location types from the PRD baseline.
 */
export const LOCATION_TYPES = Object.freeze([
  "building",
  "tower",
  "wing",
  "floor",
  "zone",
  "room",
  "suite",
  "villa",
  "public_area",
  "restaurant",
  "kitchen",
  "bar",
  "ballroom",
  "meeting_room",
  "spa_area",
  "pool_area",
  "laundry",
  "plant_room",
  "electrical_room",
  "mechanical_room",
  "roof",
  "parking",
  "external_ground",
  "storeroom",
  "bin",
]);

/**
 * Shared lifecycle and workflow enums.
 */
export const USER_STATUSES = Object.freeze(["invited", "active", "locked", "disabled", "archived"]);
export const PROPERTY_STATUSES = Object.freeze(["active", "temporarily_closed", "inactive", "archived"]);
export const LOCATION_STATUSES = Object.freeze([
  "active",
  "inactive",
  "under_renovation",
  "temporarily_closed",
  "archived",
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
export const PRIORITY_VALUES = Object.freeze(["emergency", "urgent", "high", "medium", "low"]);
export const SEVERITY_VALUES = Object.freeze([
  "life_safety",
  "guest_service_critical",
  "operational_critical",
  "standard",
  "cosmetic",
]);
export const GUEST_IMPACT_VALUES = Object.freeze(["none", "low", "moderate", "high", "revenue_blocking"]);
export const WORK_ORDER_TYPES = Object.freeze([
  "corrective",
  "emergency",
  "preventive",
  "inspection_follow_up",
  "planned_project",
  "vendor_service",
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
export const PM_TRIGGER_TYPES = Object.freeze(["time", "meter", "seasonal", "hybrid"]);
export const PM_PLAN_STATUSES = Object.freeze(["draft", "active", "paused", "archived"]);
export const CHECKLIST_TEMPLATE_STATUSES = Object.freeze(["draft", "active", "archived"]);
export const INSPECTION_STATUSES = Object.freeze(["in_progress", "completed", "cancelled"]);
export const ASSET_LIFECYCLE_STATUSES = Object.freeze([
  "planned",
  "active",
  "standby",
  "out_of_service",
  "under_repair",
  "decommission_pending",
  "retired",
  "archived",
]);
export const ASSET_CRITICALITY_VALUES = Object.freeze([
  "life_safety",
  "guest_service_critical",
  "business_critical",
  "standard",
  "low",
]);
export const METER_TYPES = Object.freeze([
  "running_hours",
  "cycles",
  "distance",
  "count",
  "usage_hours",
  "custom_numeric",
]);

/**
 * Inventory, vendor, document, and notification enums.
 */
export const PART_STOCK_TYPES = Object.freeze(["stock", "non_stock", "consumable", "serialized_if_enabled"]);
export const PART_STATUSES = Object.freeze(["active", "restricted", "obsolete", "archived"]);
export const INVENTORY_LINE_STATUSES = Object.freeze(["active", "quarantine", "archived"]);
export const INVENTORY_TRANSACTION_TYPES = Object.freeze([
  "initial_load",
  "receipt",
  "issue_to_work_order",
  "return_from_work_order",
  "adjustment_increase",
  "adjustment_decrease",
  "transfer_out",
  "transfer_in",
  "reservation",
  "reservation_release",
  "cycle_count_variance",
]);
export const VENDOR_TYPES = Object.freeze(["vendor", "contractor", "service_partner"]);
export const VENDOR_STATUSES = Object.freeze(["active", "probation", "suspended", "inactive"]);
export const DOCUMENT_VISIBILITY = Object.freeze(["internal", "vendor_visible"]);
export const DOCUMENT_CATEGORIES = Object.freeze([
  "photo",
  "manual",
  "warranty",
  "estimate",
  "vendor_document",
  "inspection_evidence",
  "floor_plan",
  "other",
]);
export const NOTIFICATION_CHANNELS = Object.freeze(["in_app", "email"]);
export const NOTIFICATION_DELIVERY_STATUSES = Object.freeze([
  "queued",
  "sent",
  "delivered_if_known",
  "failed",
  "read",
]);

/**
 * Shared event names.
 */
export const NOTIFICATION_EVENTS = Object.freeze({
  INVITATION_SENT: "invitation.sent",
  PASSWORD_RESET_REQUESTED: "password_reset.requested",
  PASSWORD_CHANGED: "password.changed",
  ACCOUNT_LOCKED: "account.locked",
  REQUEST_CREATED: "request.created",
  REQUEST_UPDATED: "request.updated",
  REQUEST_APPROVED: "request.approved",
  REQUEST_REJECTED: "request.rejected",
  WORK_ORDER_ASSIGNED: "work_order.assigned",
  WORK_ORDER_UPDATED: "work_order.updated",
  WORK_ORDER_COMMENT_ADDED: "work_order.comment_added",
  PM_GENERATED: "pm.generated",
  PM_OVERDUE: "pm.overdue",
  LOW_STOCK: "inventory.low_stock",
  VENDOR_UPDATED: "vendor.updated",
});

/**
 * Socket event names mirrored by the frontend client.
 */
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
 * Common audit action names shared across future services.
 */
export const AUDIT_ACTIONS = Object.freeze({
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  ASSIGN: "assign",
  APPROVE: "approve",
  REJECT: "reject",
  CONVERT: "convert",
  COMPLETE: "complete",
  VERIFY: "verify",
  REOPEN: "reopen",
  CANCEL: "cancel",
  LOGIN: "login",
  LOGOUT: "logout",
  EXPORT: "export",
  IMPORT_COMMIT: "import_commit",
  FILE_UPLOAD: "file_upload",
  FILE_DELETE: "file_delete",
});

/**
 * Entity-name inventory used for audit and notification attribution.
 */
export const ENTITY_TYPES = Object.freeze({
  ORGANIZATION: "organization",
  PROPERTY: "property",
  LOCATION: "location",
  ROLE: "role",
  USER: "user",
  TEAM: "team",
  USER_SESSION: "user_session",
  ASSET: "asset",
  ASSET_METER: "asset_meter",
  ASSET_METER_READING: "asset_meter_reading",
  WORK_REQUEST: "work_request",
  WORK_ORDER: "work_order",
  PREVENTIVE_MAINTENANCE_PLAN: "preventive_maintenance_plan",
  CHECKLIST_TEMPLATE: "checklist_template",
  INSPECTION_EXECUTION: "inspection_execution",
  PART: "part",
  INVENTORY_STOCK_LINE: "inventory_stock_line",
  INVENTORY_TRANSACTION: "inventory_transaction",
  VENDOR: "vendor",
  DOCUMENT: "document",
  NOTIFICATION: "notification",
  SAVED_VIEW: "saved_view",
  MASTER_DATA_CONFIG: "master_data_config",
  IMPORT_JOB: "import_job",
  AUDIT_LOG: "audit_log",
});

/**
 * Aggregate backend constants export.
 */
export const BACKEND_CONSTANTS = Object.freeze({
  API_DEFAULTS,
  SYSTEM_LIMITS,
  SOURCE_CHANNELS,
  ROLE_KEYS,
  PERMISSION_DOMAINS,
  PERMISSION_ACTIONS,
  PERMISSION_KEYS,
  SPECIAL_PERMISSION_KEYS,
  PROPERTY_TYPES,
  LOCATION_TYPES,
  USER_STATUSES,
  PROPERTY_STATUSES,
  LOCATION_STATUSES,
  REQUEST_STATUSES,
  PRIORITY_VALUES,
  SEVERITY_VALUES,
  GUEST_IMPACT_VALUES,
  WORK_ORDER_TYPES,
  WORK_ORDER_STATUSES,
  PM_TRIGGER_TYPES,
  PM_PLAN_STATUSES,
  CHECKLIST_TEMPLATE_STATUSES,
  INSPECTION_STATUSES,
  ASSET_LIFECYCLE_STATUSES,
  ASSET_CRITICALITY_VALUES,
  METER_TYPES,
  PART_STOCK_TYPES,
  PART_STATUSES,
  INVENTORY_LINE_STATUSES,
  INVENTORY_TRANSACTION_TYPES,
  VENDOR_TYPES,
  VENDOR_STATUSES,
  DOCUMENT_VISIBILITY,
  DOCUMENT_CATEGORIES,
  NOTIFICATION_CHANNELS,
  NOTIFICATION_DELIVERY_STATUSES,
  NOTIFICATION_EVENTS,
  SOCKET_EVENTS,
  AUDIT_ACTIONS,
  ENTITY_TYPES,
});

export default BACKEND_CONSTANTS;
