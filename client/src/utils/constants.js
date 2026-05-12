/**
 * Application-wide constants: route paths, nav sections, role keys,
 * permission strings, and domain enum-like objects.
 */
export { ROUTES } from "./routes.js";

export const NAV_SECTIONS = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", path: ROUTES.DASHBOARD, icon: "Dashboard" },
      { label: "Work Orders", path: ROUTES.WORK_ORDERS, icon: "Assignment" },
      { label: "Requests", path: ROUTES.REQUESTS, icon: "RequestQuote" },
      { label: "PM Plans", path: ROUTES.PM_PLANS, icon: "Schedule" },
    ],
  },
  {
    title: "Assets & Locations",
    items: [
      { label: "Assets", path: ROUTES.ASSETS, icon: "PrecisionManufacturing" },
      { label: "Locations", path: ROUTES.LOCATIONS, icon: "LocationOn" },
      { label: "Inventory", path: ROUTES.INVENTORY, icon: "Inventory" },
    ],
  },
  {
    title: "Administration",
    items: [
      { label: "Users", path: ROUTES.USERS, icon: "People" },
      { label: "Roles", path: ROUTES.ROLES, icon: "AdminPanelSettings" },
      { label: "Teams", path: ROUTES.TEAMS, icon: "Group" },
      { label: "Properties", path: ROUTES.PROPERTIES, icon: "Business" },
    ],
  },
  {
    title: "Vendors & Reports",
    items: [
      { label: "Vendors", path: ROUTES.VENDORS, icon: "LocalShipping" },
      { label: "Reports", path: ROUTES.REPORTS, icon: "BarChart" },
    ],
  },
  {
    title: "System",
    items: [
      { label: "Notifications", path: ROUTES.NOTIFICATIONS, icon: "Notifications" },
      { label: "Imports", path: ROUTES.IMPORTS, icon: "FileUpload" },
      { label: "Audit Log", path: ROUTES.AUDIT_LOG, icon: "Security" },
      { label: "Settings", path: ROUTES.SETTINGS_PROFILE, icon: "Settings" },
    ],
  },
];

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

export const REQUEST_STATUS = {
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  NEEDS_CLARIFICATION: "needs_clarification",
  APPROVED: "approved",
  REJECTED: "rejected",
  CONVERTED: "converted",
  CANCELLED: "cancelled",
};

export const NOTIFICATION_TYPE = {
  INFO: "info",
  WARNING: "warning",
  ALERT: "alert",
  SUCCESS: "success",
  ERROR: "error",
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

export const PAGINATION_DEFAULTS = { page: 1, limit: 20, maxLimit: 100 };
export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 72;
export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const LOCATION_MAX_DEPTH = 8;
