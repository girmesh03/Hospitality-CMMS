export const ROLE_KEYS = {
  ORGANIZATION_ADMIN: "ORGANIZATION_ADMIN",
  CORPORATE_ENGINEERING_DIRECTOR: "CORPORATE_ENGINEERING_DIRECTOR",
  PROPERTY_ADMIN: "PROPERTY_ADMIN",
  ENGINEERING_MANAGER: "ENGINEERING_MANAGER",
  MAINTENANCE_SUPERVISOR: "MAINTENANCE_SUPERVISOR",
  TECHNICIAN: "TECHNICIAN",
  LIMITED_TECHNICIAN: "LIMITED_TECHNICIAN",
  REQUESTER: "REQUESTER",
  INVENTORY_CONTROLLER: "INVENTORY_CONTROLLER",
  VENDOR_COORDINATOR: "VENDOR_COORDINATOR",
  VENDOR_USER: "VENDOR_USER",
  REPORT_VIEWER: "REPORT_VIEWER",
  AUDITOR: "AUDITOR",
};

export const PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard.view",
  REQUESTS_CREATE: "requests.create",
  REQUESTS_VIEW: "requests.view",
  REQUESTS_EDIT: "requests.edit",
  REQUESTS_DELETE: "requests.delete",
  REQUESTS_APPROVE: "requests.approve",
  WORK_ORDERS_CREATE: "work_orders.create",
  WORK_ORDERS_VIEW: "work_orders.view",
  WORK_ORDERS_EDIT: "work_orders.edit",
  WORK_ORDERS_DELETE: "work_orders.delete",
  WORK_ORDERS_ASSIGN: "work_orders.assign",
  WORK_ORDERS_COMPLETE: "work_orders.complete",
  WORK_ORDERS_VERIFY: "work_orders.verify",
  WORK_ORDERS_CANCEL: "work_orders.cancel",
  ASSETS_CREATE: "assets.create",
  ASSETS_VIEW: "assets.view",
  ASSETS_EDIT: "assets.edit",
  ASSETS_DELETE: "assets.delete",
  ASSETS_TRANSFER: "assets.transfer",
  ASSETS_RETIRE: "assets.retire",
  PM_CREATE: "pm.create",
  PM_VIEW: "pm.view",
  PM_EDIT: "pm.edit",
  PM_DELETE: "pm.delete",
  INVENTORY_VIEW: "inventory.view",
  INVENTORY_ADJUST: "inventory.adjust",
  VENDORS_CREATE: "vendors.create",
  VENDORS_VIEW: "vendors.view",
  VENDORS_EDIT: "vendors.edit",
  VENDORS_DELETE: "vendors.delete",
  REPORTS_VIEW: "reports.view",
  REPORTS_EXPORT: "reports.export",
  USERS_MANAGE: "users.manage",
  ROLES_MANAGE: "roles.manage",
  PROPERTIES_MANAGE: "properties.manage",
  LOCATIONS_MANAGE: "locations.manage",
  SETTINGS_MANAGE: "settings.manage",
  AUDIT_VIEW: "audit.view",
};

export const WO_STATUS = {
  DRAFT: "draft",
  OPEN: "open",
  ASSIGNED: "assigned",
  SCHEDULED: "scheduled",
  IN_PROGRESS: "in_progress",
  ON_HOLD: "on_hold",
  AWAITING_PARTS: "awaiting_parts",
  AWAITING_ACCESS: "awaiting_access",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  VERIFIED: "verified",
  CLOSED: "closed",
  CANCELLED: "cancelled",
};

export const WO_VALID_TRANSITIONS = {
  draft: ["open", "cancelled"],
  open: ["assigned", "cancelled"],
  assigned: ["scheduled", "in_progress", "on_hold", "cancelled"],
  scheduled: ["in_progress", "on_hold", "cancelled"],
  in_progress: ["completed", "on_hold", "awaiting_parts", "awaiting_access", "cancelled"],
  on_hold: ["in_progress", "cancelled"],
  awaiting_parts: ["in_progress", "cancelled"],
  awaiting_access: ["in_progress", "cancelled"],
  awaiting_approval: ["in_progress", "completed", "cancelled"],
  completed: ["verified", "closed", "cancelled"],
  verified: ["closed", "cancelled"],
  closed: ["cancelled"],
  cancelled: [],
};

export const WO_TYPE = {
  CORRECTIVE: "corrective",
  EMERGENCY: "emergency",
  PREVENTIVE: "preventive",
  INSPECTION_FOLLOW_UP: "inspection_follow_up",
  PLANNED_PROJECT: "planned_project",
  VENDOR_SERVICE: "vendor_service",
};

export const PRIORITY = {
  EMERGENCY: "emergency",
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const SEVERITY = {
  LIFE_SAFETY: "life_safety",
  GUEST_SERVICE_CRITICAL: "guest_service_critical",
  OPERATIONAL_CRITICAL: "operational_critical",
  STANDARD: "standard",
  COSMETIC: "cosmetic",
};

export const GUEST_IMPACT = {
  REVENUE_BLOCKING: "revenue_blocking",
  HIGH: "high",
  MODERATE: "moderate",
  LOW: "low",
  NONE: "none",
};

export const ASSET_STATUS = {
  PLANNED: "planned",
  ACTIVE: "active",
  STANDBY: "standby",
  OUT_OF_SERVICE: "out_of_service",
  UNDER_REPAIR: "under_repair",
  DECOMMISSION_PENDING: "decommission_pending",
  RETIRED: "retired",
  ARCHIVED: "archived",
};

export const ASSET_CRITICALITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

export const PM_PLAN_TYPE = {
  TIME_BASED: "time_based",
  METER_BASED: "meter_based",
  SEASONAL: "seasonal",
  HYBRID: "hybrid",
};

export const PM_FREQUENCY = {
  DAILY: "daily",
  WEEKLY: "weekly",
  BIWEEKLY: "biweekly",
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  SEMI_ANNUAL: "semiannual",
  ANNUAL: "annual",
  CUSTOM: "custom_interval",
};

export const NOTIFICATION_EVENTS = {
  REQUEST_CREATED: "request_created",
  REQUEST_APPROVED: "request_approved",
  REQUEST_REJECTED: "request_rejected",
  WO_CREATED: "wo_created",
  WO_ASSIGNED: "wo_assigned",
  WO_REASSIGNED: "wo_reassigned",
  WO_STATUS_CHANGED: "wo_status_changed",
  WO_COMPLETED: "wo_completed",
  WO_VERIFIED: "wo_verified",
  WO_OVERDUE: "wo_overdue",
  PM_GENERATED: "pm_generated",
  PM_MISSED: "pm_missed",
  INSPECTION_FAILED: "inspection_failed",
  PART_LOW_STOCK: "part_low_stock",
  PART_OUT_OF_STOCK: "part_out_of_stock",
  VENDOR_ASSIGNED: "vendor_assigned",
  VENDOR_COMPLETED: "vendor_completed",
  USER_MENTIONED: "user_mentioned",
  SLA_AT_RISK: "sla_at_risk",
  SLA_BREACHED: "sla_breached",
  COMPLIANCE_DOC_EXPIRING: "compliance_document_expiring",
  COMPLIANCE_DOC_EXPIRED: "compliance_document_expired",
  DOCUMENT_UPLOADED: "document_uploaded",
  COMMENT_ADDED: "comment_added",
};

export const AUDIT_ACTIONS = {
  SYSTEM_BOOTSTRAP: "SYSTEM_BOOTSTRAP",
  USER_LOGIN: "USER_LOGIN",
  USER_LOGOUT: "USER_LOGOUT",
  USER_CREATED: "USER_CREATED",
  USER_UPDATED: "USER_UPDATED",
  USER_DEACTIVATED: "USER_DEACTIVATED",
  USER_ROLE_CHANGED: "USER_ROLE_CHANGED",
  PASSWORD_CHANGED: "PASSWORD_CHANGED",
  PASSWORD_RESET: "PASSWORD_RESET",
  ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
  SESSION_REVOKED: "SESSION_REVOKED",
  ORGANIZATION_CREATED: "ORGANIZATION_CREATED",
  ORGANIZATION_UPDATED: "ORGANIZATION_UPDATED",
  PROPERTY_CREATED: "PROPERTY_CREATED",
  PROPERTY_UPDATED: "PROPERTY_UPDATED",
  LOCATION_CREATED: "LOCATION_CREATED",
  LOCATION_UPDATED: "LOCATION_UPDATED",
  ASSET_CREATED: "ASSET_CREATED",
  ASSET_UPDATED: "ASSET_UPDATED",
  ASSET_TRANSFERRED: "ASSET_TRANSFERRED",
  ASSET_RETIRED: "ASSET_RETIRED",
  WORK_REQUEST_CREATED: "WORK_REQUEST_CREATED",
  WORK_REQUEST_APPROVED: "WORK_REQUEST_APPROVED",
  WORK_REQUEST_REJECTED: "WORK_REQUEST_REJECTED",
  WORK_REQUEST_CONVERTED: "WORK_REQUEST_CONVERTED",
  WORK_ORDER_CREATED: "WORK_ORDER_CREATED",
  WORK_ORDER_UPDATED: "WORK_ORDER_UPDATED",
  WORK_ORDER_STATUS_CHANGED: "WORK_ORDER_STATUS_CHANGED",
  WORK_ORDER_ASSIGNED: "WORK_ORDER_ASSIGNED",
  WORK_ORDER_COMPLETED: "WORK_ORDER_COMPLETED",
  WORK_ORDER_VERIFIED: "WORK_ORDER_VERIFIED",
  WORK_ORDER_CANCELLED: "WORK_ORDER_CANCELLED",
  PM_PLAN_CREATED: "PM_PLAN_CREATED",
  PM_PLAN_UPDATED: "PM_PLAN_UPDATED",
  PM_GENERATED: "PM_GENERATED",
  INVENTORY_ADJUSTED: "INVENTORY_ADJUSTED",
  INVENTORY_TRANSFERRED: "INVENTORY_TRANSFERRED",
  VENDOR_CREATED: "VENDOR_CREATED",
  VENDOR_UPDATED: "VENDOR_UPDATED",
  DOCUMENT_UPLOADED: "DOCUMENT_UPLOADED",
  DOCUMENT_DELETED: "DOCUMENT_DELETED",
  SETTINGS_UPDATED: "SETTINGS_UPDATED",
  IMPORT_STARTED: "IMPORT_STARTED",
  IMPORT_COMMITTED: "IMPORT_COMMITTED",
};

export const ENTITY_TYPES = {
  SYSTEM: "SYSTEM",
  ORGANIZATION: "ORGANIZATION",
  PROPERTY: "PROPERTY",
  LOCATION: "LOCATION",
  USER: "USER",
  ROLE: "ROLE",
  TEAM: "TEAM",
  ASSET: "ASSET",
  METER: "METER",
  WORK_REQUEST: "WORK_REQUEST",
  WORK_ORDER: "WORK_ORDER",
  PM_PLAN: "PM_PLAN",
  CHECKLIST: "CHECKLIST",
  INSPECTION: "INSPECTION",
  PART: "PART",
  INVENTORY_STOCK: "INVENTORY_STOCK",
  VENDOR: "VENDOR",
  DOCUMENT: "DOCUMENT",
  NOTIFICATION: "NOTIFICATION",
  SETTINGS: "SETTINGS",
};

export const USER_STATUS = {
  INVITED: "invited",
  ACTIVE: "active",
  LOCKED: "locked",
  DISABLED: "disabled",
  ARCHIVED: "archived",
};

export const PROPERTY_STATUS = {
  ACTIVE: "active",
  SEASONAL_CLOSED: "seasonal_closed",
  TEMPORARILY_CLOSED: "temporarily_closed",
  UNDER_RENOVATION: "under_renovation",
  INACTIVE: "inactive",
};

export const PROPERTY_TYPE = {
  HOTEL: "hotel",
  RESORT: "resort",
  SERVICED_APARTMENT: "serviced_apartment",
  CLUB: "club",
  SPA: "spa",
  RESTAURANT: "restaurant",
  EVENT_VENUE: "event_venue",
  MIXED_USE: "mixed_use",
};

export const LOCATION_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  UNDER_RENOVATION: "under_renovation",
  TEMPORARILY_CLOSED: "temporarily_closed",
  ARCHIVED: "archived",
};

export const METER_TYPE = {
  RUNNING_HOURS: "running_hours",
  CYCLES: "cycles",
  DISTANCE: "distance",
  COUNT: "count",
  USAGE_HOURS: "usage_hours",
  CUSTOM_NUMERIC: "custom_numeric",
};

export const TX_TYPE = {
  RECEIPT: "receipt",
  ISSUE: "issue",
  RETURN: "return",
  TRANSFER: "transfer",
  ADJUSTMENT: "adjustment",
  CYCLE_COUNT: "cycle_count",
};

export const VENDOR_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  PENDING_APPROVAL: "pending_approval",
};

export const VENDOR_TYPE = {
  SERVICE_PROVIDER: "service_provider",
  SUPPLIER: "supplier",
  CONTRACTOR: "contractor",
  CONSULTANT: "consultant",
};

export const DOCUMENT_ENTITY_TYPES = [
  ENTITY_TYPES.ASSET,
  ENTITY_TYPES.WORK_ORDER,
  ENTITY_TYPES.WORK_REQUEST,
  ENTITY_TYPES.PM_PLAN,
  ENTITY_TYPES.INSPECTION,
  ENTITY_TYPES.VENDOR,
  ENTITY_TYPES.LOCATION,
  ENTITY_TYPES.USER,
];

export const DELIVERY_STATUS = {
  QUEUED: "queued",
  SENT: "sent",
  DELIVERED_IF_KNOWN: "delivered_if_known",
  FAILED: "failed",
  READ: "read",
};

export const NOTIFICATION_CHANNELS = {
  IN_APP: "in_app",
  EMAIL: "email",
  BOTH: "both",
};

export const NOTIFICATION_TYPE = {
  INFO: "info",
  WARNING: "warning",
  ALERT: "alert",
  SUCCESS: "success",
  ERROR: "error",
};

export const REQUEST_STATUS = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  NEEDS_CLARIFICATION: "needs_clarification",
  APPROVED: "approved",
  REJECTED: "rejected",
  CONVERTED: "converted",
  CANCELLED: "cancelled",
};

export const PAGINATION_DEFAULTS = { page: 1, limit: 20, maxLimit: 100 };
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 72;
export const BCRYPT_ROUNDS = 12;
export const ACCESS_TOKEN_EXPIRY = "15m";
export const REFRESH_TOKEN_EXPIRY_DAYS = 7;
export const REMEMBER_ME_EXPIRY_DAYS = 30;
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_WINDOW_MINUTES = 15;
export const INITIAL_LOCKOUT_MINUTES = 30;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const PASSWORD_HISTORY_COUNT = 8;
export const SESSION_IDLE_TIMEOUT_HOURS = 24;
export const LOCATION_MAX_DEPTH = 8;

export const WO_SOURCE = {
  MANUAL: "manual",
  REQUEST_CONVERSION: "request_conversion",
  PM_GENERATION: "pm_generation",
  INSPECTION_FAILURE: "inspection_failure",
  DUPLICATE_SPLIT: "duplicate_split",
  IMPORT: "import",
};

export const CHECKLIST_RESPONSE_TYPE = {
  PASS_FAIL: "pass_fail",
  YES_NO: "yes_no",
  TEXT: "text",
  NUMBER: "number",
  PHOTO: "photo",
  SIGNATURE: "signature",
  DATE: "date",
  TIME: "time",
  DROPDOWN: "dropdown",
  CHECKBOX: "checkbox",
};

export const INSPECTION_RESULT = {
  PASS: "pass",
  PASS_WITH_DEFICIENCIES: "pass_with_deficiencies",
  FAIL: "fail",
};

export const IMPORT_JOB_STATUS = {
  UPLOADING: "uploading",
  VALIDATING: "validating",
  VALIDATION_FAILED: "validation_failed",
  READY: "ready",
  COMMITTING: "committing",
  COMMITTED: "committed",
  FAILED: "failed",
};
