# Hospitality CMMS Design Specification

## 1. Design Purpose

This document defines how the system described in `docs/prd.md` and `docs/requirements.md` must be designed in code, file structure, application architecture, UI composition, and implementation flow. This is the authoritative "how it must be built" reference.

## 2. Design Principles

### 2.1 Source-aligned design
1. `docs/prd.md` remains the product source of truth.
2. `docs/requirements.md` defines what must be built.
3. This document defines how it must be structured.
4. Repository must stay JavaScript-only and ESM-based.
5. Domain constants in dedicated constants sources of truth.

### 2.2 Architectural goals
1. Separate orchestration (controllers) from business logic (services).
2. Keep backend services framework-light and reusable.
3. Keep frontend shared UI reusable, feature logic organized by domain.
4. Every file maps to a requirement; every API maps to a screen or workflow.
5. Explicit responsive behavior rather than incidental.

### 2.3 Locked implementation defaults
1. Backend infrastructure additions: `multer`, `node-cron`, `csv-parse`, `sharp`.
2. File storage: multer + local disk (first implementation).
3. Scheduled jobs: in-process node-cron, guarded by `ENABLE_SCHEDULERS`.
4. Auth transport: access token (15 min, client memory), refresh token (httpOnly cookie, 7d default, 30d with remember_me), CSRF protection.
5. Constants SSOT: `backend/utils/constants.js`, `client/src/utils/constants.js`.

## 3. Repository Structure

### 3.1 Top-level structure
```
/
├── backend/
├── client/
├── docs/
├── .opencode/
│   └── skills/
│       ├── backend/SKILL.md
│       └── frontend/SKILL.md
├── README.md
└── .gitignore
```

### 3.2 Backend structure
```
backend/
├── app.js                    # Express app: middleware stack, route registration, error handling
├── server.js                 # HTTP server + Socket.IO + graceful shutdown
├── package.json
├── .env
├── config/
│   ├── env.js                # Environment variable validation + export
│   ├── database.js           # Mongoose connection with retry
│   ├── cors.js               # CORS configuration
│   ├── socket.js             # Socket.IO setup
│   └── logger.js             # Winston logger configuration
├── controllers/
│   ├── bootstrap/            # bootstrap.controller.js
│   ├── auth/                 # login, logout, refresh, invite, password, session controllers
│   ├── organizations/        # getCurrent, updateCurrent controllers
│   ├── dashboard/            # getKPIs, getCharts, getQuickActions controllers
│   ├── properties/           # CRUD controllers
│   ├── locations/            # CRUD + tree controllers
│   ├── users/                # CRUD + invitation controllers
│   ├── roles/                # CRUD controllers
│   ├── teams/                # CRUD controllers
│   ├── assets/               # CRUD + transfer + retire controllers
│   ├── meters/               # CRUD + reading controllers
│   ├── requests/             # CRUD + triage controllers
│   ├── workOrders/           # CRUD + status + assign + complete controllers
│   ├── pmPlans/              # CRUD + generate controllers
│   ├── inspections/          # CRUD + execute controllers
│   ├── inventory/            # Parts, stock lines, transactions controllers
│   ├── vendors/              # CRUD + compliance controllers
│   ├── documents/            # Upload, download, delete controllers
│   ├── notifications/        # List, read, preferences controllers
│   ├── reports/              # Report generation controllers
│   ├── savedViews/           # CRUD controllers
│   ├── settings/             # Profile, org, email config controllers
│   ├── imports/              # Upload, dry-run, commit controllers
│   └── audit/                # Query controllers
├── middlewares/
│   ├── auth/
│   │   ├── decodeToken.js    # JWT decode from cookie
│   │   ├── requireAuth.js    # Require authenticated user
│   │   └── csrfProtection.js # CSRF token validation
│   ├── validation/
│   │   ├── validateRequest.js     # Evaluate express-validator results
│   │   └── normalizeValidated.js  # Attach req.validated
│   ├── security/
│   │   ├── helmet.js         # Security headers
│   │   ├── cors.js           # CORS
│   │   ├── rateLimiter.js    # Rate limiting factory
│   │   └── mongoSanitize.js  # NoSQL injection prevention
│   ├── error/
│   │   ├── errorHandler.js   # Centralized error response
│   │   └── notFound.js       # 404 handler
│   └── request/
│       ├── requestId.js      # UUID per request
│       └── requestLogger.js  # Morgan/Winston request logging
├── models/
│   ├── organization.model.js
│   ├── property.model.js
│   ├── location.model.js
│   ├── role.model.js
│   ├── user.model.js
│   ├── team.model.js
│   ├── userSession.model.js
│   ├── asset.model.js
│   ├── assetMeter.model.js
│   ├── assetMeterReading.model.js
│   ├── workRequest.model.js
│   ├── workOrder.model.js
│   ├── preventiveMaintenancePlan.model.js
│   ├── checklistTemplate.model.js
│   ├── inspectionExecution.model.js
│   ├── part.model.js
│   ├── inventoryStockLine.model.js
│   ├── inventoryTransaction.model.js
│   ├── vendor.model.js
│   ├── document.model.js
│   ├── notification.model.js
│   ├── savedView.model.js
│   ├── masterDataConfig.model.js
│   ├── importJob.model.js
│   └── auditLog.model.js
├── routes/
│   ├── index.js              # Aggregate all routes under /api/v1
│   ├── bootstrap.routes.js
│   ├── auth.routes.js
│   ├── health.routes.js
│   ├── organizations.routes.js
│   ├── dashboard.routes.js
│   ├── properties.routes.js
│   ├── locations.routes.js
│   ├── roles.routes.js
│   ├── users.routes.js
│   ├── teams.routes.js
│   ├── assets.routes.js
│   ├── meters.routes.js
│   ├── requests.routes.js
│   ├── workOrders.routes.js
│   ├── pmPlans.routes.js
│   ├── checklists.routes.js
│   ├── inspections.routes.js
│   ├── parts.routes.js
│   ├── inventoryLines.routes.js
│   ├── inventoryTransactions.routes.js
│   ├── vendors.routes.js
│   ├── documents.routes.js
│   ├── notifications.routes.js
│   ├── reports.routes.js
│   ├── savedViews.routes.js
│   ├── settings.routes.js
│   ├── imports.routes.js
│   └── auditLogs.routes.js
├── services/
│   ├── bootstrap/            # bootstrap.service.js
│   ├── auth/                 # login, logout, refresh, invite, password, session services
│   ├── organizations/
│   ├── dashboard/
│   ├── properties/
│   ├── locations/
│   ├── users/
│   ├── roles/
│   ├── teams/
│   ├── assets/
│   ├── meters/
│   ├── requests/
│   ├── workOrders/
│   ├── preventiveMaintenance/
│   ├── inspections/
│   ├── inventory/
│   ├── vendors/
│   ├── documents/
│   ├── notifications/
│   ├── reports/
│   ├── savedViews/
│   ├── settings/
│   ├── imports/
│   └── audit/
├── validators/
│   ├── bootstrap/            # initialize.validator.js
│   ├── auth/                 # login, invite, password, session validators
│   ├── organizations/
│   ├── dashboard/
│   ├── properties/
│   ├── locations/
│   ├── users/
│   ├── roles/
│   ├── teams/
│   ├── assets/
│   ├── meters/
│   ├── requests/
│   ├── workOrders/
│   ├── preventiveMaintenance/
│   ├── inspections/
│   ├── inventory/
│   ├── vendors/
│   ├── documents/
│   ├── notifications/
│   ├── reports/
│   ├── savedViews/
│   ├── settings/
│   ├── imports/
│   └── audit/
├── utils/
│   ├── constants.js          # SSOT: all enums, statuses, action keys, event names
│   ├── http.js               # successResponse, errorResponse, paginatedResponse
│   ├── pagination.js         # Pagination helper
│   ├── query.js              # Query builder for filtered/sorted queries
│   ├── dates.js              # Date formatting and timezone utilities
│   ├── errors.js             # AppError, NotFoundError, ValidationError, ConflictError, etc.
│   ├── logger.js             # Winston logger instance
│   └── filenames.js          # File naming for uploads
├── jobs/
│   ├── index.js              # Job scheduler bootstrap
│   ├── pmGeneration.job.js   # Daily: generate PM work orders
│   ├── slaEscalation.job.js  # Periodic: escalate SLA breaches
│   ├── lowStock.job.js       # Periodic: low-stock alerts
│   ├── notificationDispatch.job.js  # Periodic: send queued emails
│   └── sessionCleanup.job.js # Periodic: remove expired sessions
├── sockets/
│   ├── index.js              # Socket.IO server + auth middleware
│   └── events.js             # Event name constants
├── uploads/                  # Local disk storage for uploaded files (gitignored)
└── mock/                     # Phase 17 only
    ├── index.js
    ├── seed.js
    └── *.mock.js
```

### 3.3 Frontend structure
```
client/
├── package.json
├── vite.config.js
├── eslint.config.js
├── index.html
├── public/
├── src/
│   ├── main.jsx              # App entry: StrictMode + Inter font
│   ├── App.jsx               # Bootstrap detection + AppProviders wrapper
│   ├── app/
│   │   ├── router.jsx        # react-router route definitions + guards
│   │   ├── store.js          # Redux Toolkit store + persist config
│   │   ├── providers.jsx     # Provider composition (Redux, Theme, Router, ErrorBoundary)
│   │   └── theme/
│   │       ├── index.js          # Theme creation (createTheme)
│   │       ├── AppTheme.jsx      # ThemeProvider wrapper with useMemo
│   │       ├── themePrimitives.js # Colors, typography, spacing, shape, shadows
│   │       └── customizations/
│   │           ├── index.js
│   │           ├── inputs.js
│   │           ├── dataDisplay.js
│   │           ├── feedback.js
│   │           ├── navigation.js
│   │           ├── surfaces.js
│   │           ├── charts.js
│   │           ├── dataGrid.js
│   │           └── datePickers.js
│   ├── components/
│   │   ├── layout/           # AppLayout, PageHeader, SideNav, TopBar, Footer
│   │   ├── feedback/         # LoadingState, EmptyState, ErrorState, AlertBanner
│   │   ├── navigation/       # Breadcrumbs, Tabs, NavMenu
│   │   ├── dataDisplay/      # KPICard, Timeline, StatTile, InfoList, StatusBadge
│   │   ├── forms/            # FormField, SelectField, DatePickerField, PasswordField
│   │   ├── dialogs/          # ConfirmDialog, FormDialog, InfoDialog
│   │   ├── uploads/          # FileDropzone, FilePreview, ImageGallery
│   │   └── charts/           # ChartWrapper, ChartLegend
│   ├── domains/
│   │   ├── auth/             # API, hooks, components for auth
│   │   ├── organizations/
│   │   ├── dashboard/
│   │   ├── properties/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── teams/
│   │   ├── requests/
│   │   ├── workOrders/
│   │   ├── preventiveMaintenance/
│   │   ├── assets/
│   │   ├── locations/
│   │   ├── inventory/
│   │   ├── vendors/
│   │   ├── notifications/
│   │   ├── reports/
│   │   ├── settings/
│   │   ├── imports/
│   │   ├── audit/
│   │   └── portal/           # Request portal + vendor portal
│   ├── pages/
│   │   ├── bootstrap/        # BootstrapPage.jsx
│   │   ├── auth/             # LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage
│   │   ├── organizations/    # OrganizationSettingsPage
│   │   ├── dashboard/        # DashboardPage
│   │   ├── properties/       # PropertyListPage, PropertyDetailPage
│   │   ├── users/            # UserListPage, UserDetailPage
│   │   ├── roles/            # RoleListPage, RoleDetailPage
│   │   ├── teams/            # TeamListPage, TeamDetailPage
│   │   ├── requests/         # RequestListPage, RequestDetailPage
│   │   ├── workOrders/       # WorkOrderListPage, WorkOrderDetailPage
│   │   ├── preventiveMaintenance/ # PMListPage, PMDetailPage, PMCalendarPage
│   │   ├── assets/           # AssetListPage, AssetDetailPage
│   │   ├── locations/        # LocationTreePage, LocationDetailPage
│   │   ├── inventory/        # InventoryListPage, InventoryDetailPage
│   │   ├── vendors/          # VendorListPage, VendorDetailPage
│   │   ├── notifications/    # NotificationCenterPage
│   │   ├── reports/          # ReportsHubPage, ReportDetailPage
│   │   ├── settings/         # ProfilePage, OrgSettingsPage, EmailConfigPage
│   │   ├── imports/          # ImportListPage, ImportCreatePage
│   │   ├── audit/            # AuditLogPage
│   │   └── portal/           # RequestPortalPage, VendorPortalPage
│   ├── hooks/                # useAuth, usePagination, useSocket, usePermission, etc.
│   ├── services/
│   │   ├── api/              # axios client + domain API modules
│   │   └── sockets/          # Socket.IO connection manager
│   ├── store/
│   │   ├── slices/           # authSlice, notificationSlice, themeSlice
│   │   └── selectors/        # Redux selectors
│   ├── utils/
│   │   ├── constants.js      # SSOT: route keys, filters, labels, enums, options
│   │   ├── routes.js         # Route path helpers
│   │   ├── permissions.js    # Permission check helpers
│   │   ├── formatting.js     # Date, currency, name formatting
│   │   ├── validation.js     # Common validation rules
│   │   ├── storage.js        # localStorage wrapper
│   │   └── dates.js          # date-fns wrappers
│   └── assets/               # notFound_404.svg, logo, etc.
```

## 4. Backend Architecture

### 4.1 app.js Architecture

```js
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDatabase } from "./config/database.js";
import { requestId } from "./middlewares/request/requestId.js";
import { helmetMiddleware } from "./middlewares/security/helmet.js";
import { corsMiddleware } from "./middlewares/security/cors.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import { mongoSanitizeMiddleware } from "./middlewares/security/mongoSanitize.js";
import { requestLogger } from "./middlewares/request/requestLogger.js";
import { decodeToken } from "./middlewares/auth/decodeToken.js";
import { notFoundHandler } from "./middlewares/error/notFound.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

// 1. Request ID
app.use(requestId);

// 2. Security headers
app.use(helmetMiddleware);

// 3. CORS
app.use(corsMiddleware);

// 4. Compression
app.use(compression());

// 5. Cookie parsing
app.use(cookieParser());

// 6. Body parsing
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// 7. NoSQL injection prevention
app.use(mongoSanitizeMiddleware);

// 8. Request logging
app.use(requestLogger);

// 9. Token decoding (attaches req.user if valid cookie present, no error on missing)
app.use(decodeToken);

// 10. API routes
app.use("/api/v1", routes);

// 11. 404
app.use(notFoundHandler);

// 12. Error handler
app.use(errorHandler);

export default app;
```

### 4.2 server.js Architecture

```js
import app from "./app.js";
import http from "http";
import { connectDatabase } from "./config/database.js";
import { initializeSocket } from "./sockets/index.js";
import { startJobs } from "./jobs/index.js";
import { logger } from "./utils/logger.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Connect to database
await connectDatabase();

// Start background jobs
startJobs();

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
const shutdown = async () => {
  logger.info("Shutting down gracefully...");
  server.close(async () => {
    await mongoose.connection.close();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
```

### 4.3 Middleware Pipeline (exact order)
1. `requestId` — attach UUID to each request.
2. `helmet` — security headers (CSP, X-Frame-Options, etc.).
3. `cors` — allow frontend origin with credentials.
4. `compression` — gzip responses.
5. `cookieParser` — parse cookies into `req.cookies`.
6. `express.json` / `express.urlencoded` — parse bodies (1mb limit).
7. `mongoSanitize` — strip `$` and `.` from user input.
8. `requestLogger` — log method, path, status, duration.
9. `decodeToken` — decode JWT from cookie, attach `req.user` if valid (no error if missing).
10. **Routes** — controllers execute with `req.user` and `req.validated`.
11. `notFound` — 404 for unmatched routes.
12. `errorHandler` — catch all errors, format response.

### 4.4 Request Normalization (validateRequest + normalizeValidated)

**validateRequest.js**:
```js
import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: "VALIDATION_ERROR",
      message: "Request validation failed",
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
```

**normalizeValidated.js**:
```js
import { matchedData } from "express-validator";

export const normalizeValidated = (req, res, next) => {
  req.validated = {
    body: matchedData(req, { locations: ["body"] }) || {},
    params: matchedData(req, { locations: ["params"] }) || {},
    query: matchedData(req, { locations: ["query"] }) || {},
  };
  next();
};
```

### 4.5 Route Pattern

```js
// Example: workOrders.routes.js
import { Router } from "express";
import { requireAuth } from "../middlewares/auth/requireAuth.js";
import { authorize } from "../middlewares/auth/authorize.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { normalizeValidated } from "../middlewares/validation/normalizeValidated.js";
import { listValidator } from "../validators/workOrders/list.validator.js";
import { createValidator } from "../validators/workOrders/create.validator.js";
import { list, getById, create, updateStatus, assign } from "../controllers/workOrders/workOrder.controller.js";

const router = Router();

router.get("/", requireAuth, authorize("work_orders.view"), listValidator, validateRequest, normalizeValidated, list);
router.get("/:id", requireAuth, authorize("work_orders.view"), getById);
router.post("/", requireAuth, authorize("work_orders.create"), createValidator, validateRequest, normalizeValidated, create);
router.patch("/:id/status", requireAuth, authorize("work_orders.edit"), updateStatus);
router.patch("/:id/assign", requireAuth, authorize("work_orders.assign"), assign);

export default router;
```

### 4.6 Controller Pattern

```js
export const list = async (req, res, next) => {
  try {
    const result = await workOrderService.list(req.user, req.validated.query);
    res.status(200).json(paginatedResponse(result.data, result.pagination));
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const workOrder = await workOrderService.create(req.user, req.validated.body);
    res.status(201).json(successResponse(workOrder));
  } catch (error) {
    next(error);
  }
};
```

### 4.7 Service Pattern

```js
export const create = async (actor, data) => {
  // 1. Validate business rules
  // 2. Check permissions
  // 3. Create entity
  // 4. Create audit log
  // 5. Emit notification
  // 6. Return result
};
```

### 4.8 Error Classes (utils/errors.js)

```js
export class AppError extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(404, "NOT_FOUND", `${resource} not found`);
  }
}

export class ValidationError extends AppError {
  constructor(errors = []) {
    super(400, "VALIDATION_ERROR", "Validation failed");
    this.errors = errors;
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(409, "CONFLICT", message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Authentication required") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Insufficient permissions") {
    super(403, "FORBIDDEN", message);
  }
}

export class RateLimitError extends AppError {
  constructor() {
    super(429, "RATE_LIMITED", "Too many requests");
  }
}
```

### 4.9 Response Helpers (utils/http.js)

```js
export const successResponse = (data, meta = {}) => ({
  success: true,
  data,
  ...meta,
});

export const paginatedResponse = (data, pagination) => ({
  success: true,
  data,
  pagination: {
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    totalPages: pagination.totalPages,
  },
});

export const errorResponse = (errorCode, message, errors = null) => ({
  success: false,
  error: errorCode,
  message,
  ...(errors && { errors }),
});
```

### 4.10 Rate Limiter Factory

```js
import rateLimit from "express-rate-limit";

export const createRateLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { success: false, error: "RATE_LIMITED", message: message || "Too many requests" },
    standardHeaders: true,
    legacyHeaders: false,
  });

export const generalLimiter = createRateLimiter(60 * 1000, 100);
export const authLimiter = createRateLimiter(15 * 60 * 1000, 5);
export const bootstrapLimiter = createRateLimiter(60 * 60 * 1000, 5);
```

### 4.11 Auth Middleware (decodeToken + requireAuth + csrf)

**decodeToken.js**: Reads JWT from `req.cookies.accessToken`. Verifies with `jsonwebtoken`. Attaches decoded payload to `req.user`. Does NOT error if token missing (routes without auth work).

**requireAuth.js**: Returns 401 if `req.user` is missing.

**csrfProtection.js**: Checks `x-csrf-token` header matches csrf token from cookie on mutating methods (POST, PUT, PATCH, DELETE).

```js
// decodeToken.js
import jwt from "jsonwebtoken";

export const decodeToken = (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: decoded.sub,
      organizationId: decoded.organizationId,
      propertyIds: decoded.propertyIds,
      roleKeys: decoded.roleKeys,
      permissions: decoded.permissions,
      sessionId: decoded.sessionId,
    };
  } catch (err) {
    // Token invalid/expired — continue without user
  }
  next();
};
```

### 4.12 Pagination Utility

```js
export const getPagination = (query) => {
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

export const getPaginationMetadata = (total, page, limit) => ({
  page,
  limit,
  total,
  totalPages: Math.ceil(total / limit),
});
```

### 4.13 Constants Structure (utils/constants.js)

```js
// ============================================================
// BACKEND CONSTANTS — SINGLE SOURCE OF TRUTH
// ============================================================

// ---- Role Keys ----
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

// ---- Permission Strings ----
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

// ---- Work Order Statuses ----
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
  closed: ["cancelled"], // reopen creates new WO
  cancelled: [],
};

// ---- Work Order Types ----
export const WO_TYPE = {
  CORRECTIVE: "corrective",
  EMERGENCY: "emergency",
  PREVENTIVE: "preventive",
  INSPECTION_FOLLOW_UP: "inspection_follow_up",
  PLANNED_PROJECT: "planned_project",
  VENDOR_SERVICE: "vendor_service",
};

// ---- Priority ----
export const PRIORITY = {
  EMERGENCY: "emergency",
  URGENT: "urgent",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

// ---- Severity ----
export const SEVERITY = {
  LIFE_SAFETY: "life_safety",
  GUEST_SERVICE_CRITICAL: "guest_service_critical",
  OPERATIONAL_CRITICAL: "operational_critical",
  STANDARD: "standard",
  COSMETIC: "cosmetic",
};

// ---- Guest Impact ----
export const GUEST_IMPACT = {
  REVENUE_BLOCKING: "revenue_blocking",
  HIGH: "high",
  MODERATE: "moderate",
  LOW: "low",
  NONE: "none",
};

// ---- Asset Statuses ----
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

// ---- Asset Criticality ----
export const ASSET_CRITICALITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
};

// ---- PM Plan Types ----
export const PM_PLAN_TYPE = {
  TIME_BASED: "time_based",
  METER_BASED: "meter_based",
  SEASONAL: "seasonal",
  HYBRID: "hybrid",
};

// ---- PM Frequency ----
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

// ---- Notification Events ----
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
};

// ---- Audit Actions ----
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

// ---- Entity Types ----
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

// ---- User Status ----
export const USER_STATUS = {
  INVITED: "invited",
  ACTIVE: "active",
  LOCKED: "locked",
  DISABLED: "disabled",
  ARCHIVED: "archived",
};

// ---- Property Status ----
export const PROPERTY_STATUS = {
  ACTIVE: "active",
  SEASONAL_CLOSED: "seasonal_closed",
  TEMPORARILY_CLOSED: "temporarily_closed",
  UNDER_RENOVATION: "under_renovation",
  INACTIVE: "inactive",
};

// ---- Location Status ----
export const LOCATION_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  UNDER_RENOVATION: "under_renovation",
  TEMPORARILY_CLOSED: "temporarily_closed",
  ARCHIVED: "archived",
};

// ---- Meter Types ----
export const METER_TYPE = {
  RUNNING_HOURS: "running_hours",
  CYCLES: "cycles",
  DISTANCE: "distance",
  COUNT: "count",
  USAGE_HOURS: "usage_hours",
  CUSTOM_NUMERIC: "custom_numeric",
};

// ---- Inventory Transaction Types ----
export const TX_TYPE = {
  RECEIPT: "receipt",
  ISSUE: "issue",
  RETURN: "return",
  TRANSFER: "transfer",
  ADJUSTMENT: "adjustment",
  CYCLE_COUNT: "cycle_count",
};

// ---- Vendor Status ----
export const VENDOR_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  SUSPENDED: "suspended",
  PENDING_APPROVAL: "pending_approval",
};

// ---- Document Entity Types (which entities can have documents) ----
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

// ---- Notification Delivery Status ----
export const DELIVERY_STATUS = {
  QUEUED: "queued",
  SENT: "sent",
  DELIVERED_IF_KNOWN: "delivered_if_known",
  FAILED: "failed",
  READ: "read",
};

// ---- Notification Channels ----
export const NOTIFICATION_CHANNELS = {
  IN_APP: "in_app",
  EMAIL: "email",
  BOTH: "both",
};

// ---- Business Constants ----
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
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/csv", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
export const PASSWORD_HISTORY_COUNT = 8;
export const SESSION_IDLE_TIMEOUT_HOURS = 24;
export const LOCATION_MAX_DEPTH = 8;
```

## 5. Data Models

### 5.1 Common schema plugin (applied to all mutable models)
```js
const commonFields = {
  organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true, index: true },
  revision: { type: Number, default: 1 },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
};

const commonOptions = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
};
```

### 5.2 Organization Model
```
Fields: name (String, required, unique, trim), code (String, unique, uppercase), subdomain (String, lowercase, unique), timezone (String, required), currency (String, default "USD"), language (String, default "en"), logo (String), contactEmail, contactPhone, address (Object: street, city, state, zip, country), status (String, enum: active/inactive), settings (Object: defaultServiceWindows, quietHours, businessHours)
Indexes: { name: 1 }, { code: 1 }, { subdomain: 1 }
```

### 5.3 Property Model
```
Fields: organizationId, name (required), code (required, uppercase), type (enum: hotel/resort/serviced_apartment/club/spa/restaurant/event_venue/mixed_use), status (enum: active/seasonal_closed/temporarily_closed/under_renovation/inactive), timezone, address (Object), contactEmail, contactPhone, settings: { quietHours, defaultServiceWindows, slaPolicies, numberingRules }
Indexes: { organizationId: 1, name: 1 }, { organizationId: 1, code: 1 }
```

### 5.4 Location Model
```
Fields: organizationId, propertyId, parentId (ref Location, default null), name, code, type (enum: 32+ types), description, status (enum), areaSize (Number), capacity (Number), roomAttributes: { roomNumber, roomType, occupancyStatus, dndFlag, vipFlag, housekeepingStatus }, serviceWindows, accessRestrictions, contactInfo
Indexes: { propertyId: 1, parentId: 1 }, { propertyId: 1, type: 1 }, { propertyId: 1, "roomAttributes.roomNumber": 1 }
```

### 5.5 Role Model
```
Fields: organizationId, key (String, enum from ROLE_KEYS), name, description, permissions ([String]), isBuiltIn (Boolean), isActive (Boolean)
Indexes: { organizationId: 1, key: 1 }
```

### 5.6 User Model
```
Fields: organizationId, email (unique, lowercase, trim), firstName, lastName, displayName, password (bcrypt hash), phone, jobTitle, employeeId, avatar, status (enum: invited/active/locked/disabled/archived), roleIds ([ref Role]), propertyIds ([ref Property]), locationIds ([ref Location]), teamIds ([ref Team]), emailVerified (Boolean), emailVerifiedAt (Date), passwordHistory ([String] — last 8 hashes), loginAttempts (Number), lockUntil (Date), notificationPreferences (Object), lastLoginAt, lastLoginIp
Indexes: { email: 1 }, { organizationId: 1, status: 1 }
```

### 5.7 UserSession Model
```
Fields: userId, organizationId, refreshToken (hashed), userAgent, ip, deviceInfo, issuedAt, lastActivityAt, expiresAt, revoked (Boolean), revokedAt, revocationReason
Indexes: { userId: 1 }, { refreshToken: 1 }, { expiresAt: 1 }
```

### 5.8 Team Model
```
Fields: organizationId, propertyId, name, description, leadId (ref User), memberIds ([ref User])
Indexes: { propertyId: 1 }, { leadId: 1 }
```

### 5.9 Asset Model
```
Fields: organizationId, propertyId, locationId, parentId (ref Asset), name, assetCode, serialNumber, modelNumber, manufacturer, category, subcategory, assetClass, severity (enum: critical/high/medium/low), criticality (enum), status (enum: 8 statuses from ASSET_STATUS), installDate, purchaseDate, purchaseCost, warrantyStart, warrantyEnd, usefulLifeYears, replacementCost, barcode, qrCode, serviceContractRef, image, customFields (Map), description
Indexes: { propertyId: 1, assetCode: 1 }, { propertyId: 1, serialNumber: 1 }, { locationId: 1 }, { parentId: 1 }
```

### 5.10 AssetMeter Model
```
Fields: assetId, name, unitOfMeasure, meterType (enum), currentReading (Number), lastReadingDate, rolloverAllowed (Boolean)
Indexes: { assetId: 1 }
```

### 5.11 AssetMeterReading Model
```
Fields: meterId, assetId, readingValue, readingDate, notes, enteredBy
Indexes: { meterId: 1, readingDate: -1 }
```

### 5.12 WorkRequest Model
```
Fields: organizationId, propertyId, locationId, assetId, title, description, category, priority (enum), status (enum: 7 statuses), requesterId, assignedToId, requestDate, dueDate, guestImpact (Boolean), guestImpactReason, emergencyReason, preferredServiceWindow, source (enum: web/portal/dispatcher/inspection), duplicateWarningOverridden (Boolean), convertedWorkOrderId (ref WorkOrder), rejectionReason, cancellationReason, photos: [{ url, caption }], attachments: [{ name, url }]
Indexes: { propertyId: 1, status: 1 }, { locationId: 1 }, { requesterId: 1 }, { createdAt: -1 }
```

### 5.13 WorkOrder Model
```
Fields: organizationId, propertyId, locationId, assetId, woNumber (unique), title, description, workType (enum), priority (enum), severity (enum), guestImpact (enum), status (enum), source (enum), requestId (ref WorkRequest), pmPlanId (ref PMPlan), assignedToId (ref User), assignedTeamId (ref Team), vendorId (ref Vendor), scheduledStart, scheduledEnd, actualStart, actualEnd, estimatedCost, actualLaborCost, actualPartsCost, actualVendorCost, totalCost (virtual), completionNotes, verificationNotes, cancelReason, reopenReason, downtimeEvents: [{ startTime, endTime, duration, reason, impact }], tasks: [{ title, assignedTo, status, completionNotes }], checklistItems: [{ description, responseType, required, response, passed }], laborEntries: [{ userId, startTime, endTime, duration, notes }], partsUsed: [{ partId, partName, quantity, unitCost, totalCost }], comments: [{ userId, text, visibility, mentions, createdAt }], slaMetrics: { responseTime, startTime, completionTime, slaStatus }
Indexes: { woNumber: 1 }, { propertyId: 1, status: 1 }, { assignedToId: 1 }, { assetId: 1 }, { createdAt: -1 }
```

### 5.14 PreventiveMaintenancePlan Model
```
Fields: organizationId, propertyId, locationId, assetId, name, description, planType (enum), triggerType (enum), frequency (enum), customIntervalDays (Number), startDate, endDate, nextDueDate, lastCompletedDate, meterId, triggerThreshold, resetOnCompletion (Boolean), seasonalTriggerDates: { openingDate, closingDate }, assignedToId, assignedTeamId, checklistTemplateId, estimatedDuration (minutes), leadTimeDays (default 7), blackoutWindows: [{ startTime, endTime, daysOfWeek }], partsList: [{ partId, quantity }], status (enum: active/paused/inactive/archived)
Indexes: { propertyId: 1, status: 1 }, { assetId: 1 }, { nextDueDate: 1 }
```

### 5.15 ChecklistTemplate Model
```
Fields: organizationId, name, description, version (Number), category, locationType, assetType, items: [{ sequence, description, responseType, required, conditionalLogic, passCriteria, failAction }], status (enum: draft/active/archived)
Indexes: { organizationId: 1, name: 1 }
```

### 5.16 InspectionExecution Model
```
Fields: organizationId, propertyId, locationId, assetId, woId, checklistTemplateId, templateVersion (snapshot), inspectorId, inspectionDate, responses: [{ itemId, responseValue, passed, photo, notes }], overallResult (enum: pass/pass_with_deficiencies/fail), notes, signature
Indexes: { propertyId: 1 }, { inspectorId: 1 }, { inspectionDate: -1 }
```

### 5.17 Part Model
```
Fields: organizationId, partNumber, name, description, category, manufacturer, model, unitOfMeasure (enum), unitCost, reorderPoint, reorderQuantity, criticalFlag, substitutePartIds ([ref Part]), customFields (Map)
Indexes: { partNumber: 1 }, { organizationId: 1, category: 1 }
```

### 5.18 InventoryStockLine Model
```
Fields: organizationId, propertyId, partId, storeroom (String), bin (String), quantityOnHand (Number), quantityReserved (Number), minQuantity, maxQuantity, reorderPoint
Virtual: quantityAvailable = quantityOnHand - quantityReserved
Indexes: { propertyId: 1, partId: 1 }, { partId: 1 }, { storeroom: 1, bin: 1 }
```

### 5.19 InventoryTransaction Model
```
Fields: organizationId, propertyId, partId, stockLineId, transactionType (enum), quantity, unitCost, totalCost, referenceType (enum: work_order/vendor/adjustment/cycle_count), referenceId, notes, performedById
Indexes: { stockLineId: 1 }, { partId: 1 }, { createdAt: -1 }
```

### 5.20 Vendor Model
```
Fields: organizationId, name, vendorCode, vendorType (enum), contactName, email, phone, address, taxId, insuranceExpiration, licenseExpiration, complianceDocuments: [{ docType, docNumber, issueDate, expirationDate, file }], status (enum), notes, serviceCategories: [String]
Indexes: { vendorCode: 1 }, { organizationId: 1, status: 1 }
```

### 5.21 Document Model
```
Fields: organizationId, originalName, filename, mimeType, size, path, thumbnail, entityType (String), entityId, uploadedById, description
Indexes: { entityType: 1, entityId: 1 }, { uploadedById: 1 }
```

### 5.22 Notification Model
```
Fields: organizationId, recipientId, type (enum: info/warning/alert/success/error), eventType (String), entityType, entityId, title, message, deliveryChannel (enum), deliveryStatus (enum), read (Boolean), readAt
Indexes: { recipientId: 1, read: 1, createdAt: -1 }, { createdAt: 1 }
```

### 5.23 SavedViewModel
```
Fields: organizationId, userId, name, entityType, filters (Object), sort (Object), columns ([String]), isDefault (Boolean)
Indexes: { userId: 1, entityType: 1 }
```

### 5.24 MasterDataConfig Model
```
Fields: organizationId, type (enum: category/priority/status/reason/customField), key, label, isActive, sortOrder, parentId, config: { ... }
Indexes: { organizationId: 1, type: 1 }
```

### 5.25 ImportJob Model
```
Fields: organizationId, propertyId, importType (String), fileName, status (enum: uploading/validating/validation_failed/ready/committing/committed/failed), totalRows, validRows, errorRows, errors: [{ row, field, message }], uploadedById, committedAt
Indexes: { organizationId: 1, createdAt: -1 }
```

### 5.26 AuditLog Model
```
Fields: organizationId, propertyId, actor: { id, type, email }, action (String), entity: { type, id }, changes: { before: Object, after: Object }, ip, userAgent, timestamp
Indexes: { organizationId: 1, createdAt: -1 }, { "entity.type": 1, "entity.id": 1 }, { "actor.id": 1 }, { action: 1 }
```

## 6. API Route Specifications

### 6.1 Health & Bootstrap
```
GET  /api/v1/health                — No auth. Returns { status, uptime, timestamp, dbStatus }
GET  /api/v1/bootstrap/status      — No auth. Returns { bootstrapRequired }
POST /api/v1/bootstrap/initialize  — Rate limited (5/hr). Creates org + admin.
```

### 6.2 Auth
```
POST   /api/v1/auth/register          — Register new user
POST   /api/v1/auth/login             — Login, returns access token + refresh cookie
POST   /api/v1/auth/refresh           — Refresh access token
DELETE /api/v1/auth/logout            — Logout current session
DELETE /api/v1/auth/sessions          — Logout all sessions
GET    /api/v1/auth/me                — Get current user profile
PATCH  /api/v1/auth/me                — Update profile
PATCH  /api/v1/auth/me/password       — Change password
POST   /api/v1/auth/forgot-password   — Send reset email
POST   /api/v1/auth/reset-password    — Reset with token
GET    /api/v1/auth/sessions          — List active sessions
DELETE /api/v1/auth/sessions/:id      — Revoke specific session
GET    /api/v1/auth/permissions       — Get user permissions
```

### 6.3 Organizations
```
GET   /api/v1/organizations/current    — Get current org
PATCH /api/v1/organizations/current    — Update current org
```

### 6.4 Properties
```
GET    /api/v1/properties              — List (paginated, filtered)
POST   /api/v1/properties              — Create
GET    /api/v1/properties/:id          — Get by ID
PATCH  /api/v1/properties/:id          — Update
DELETE /api/v1/properties/:id          — Delete (deactivate)
```

### 6.5 Locations
```
GET    /api/v1/locations               — List (paginated, filtered)
POST   /api/v1/locations               — Create
GET    /api/v1/locations/tree          — Get location tree
GET    /api/v1/locations/:id           — Get by ID
PATCH  /api/v1/locations/:id           — Update
DELETE /api/v1/locations/:id           — Delete (deactivate)
```

### 6.6 Users
```
GET    /api/v1/users                   — List (paginated, filtered)
POST   /api/v1/users                   — Create + send invite
GET    /api/v1/users/:id               — Get by ID
PATCH  /api/v1/users/:id               — Update
PATCH  /api/v1/users/:id/status        — Update status
PATCH  /api/v1/users/:id/role          — Update role
PATCH  /api/v1/users/:id/properties    — Update property scope
POST   /api/v1/users/:id/force-logout  — Force logout
```

### 6.7 Roles
```
GET    /api/v1/roles                   — List
POST   /api/v1/roles                   — Create custom role
GET    /api/v1/roles/:id               — Get
PATCH  /api/v1/roles/:id               — Update
DELETE /api/v1/roles/:id               — Delete (if not built-in)
```

### 6.8 Teams
```
GET    /api/v1/teams                   — List
POST   /api/v1/teams                   — Create
GET    /api/v1/teams/:id               — Get
PATCH  /api/v1/teams/:id               — Update
DELETE /api/v1/teams/:id               — Delete
```

### 6.9 Dashboard
```
GET /api/v1/dashboard/kpis       — KPI data
GET /api/v1/dashboard/charts     — Chart data
GET /api/v1/dashboard/recent     — Recent activity
```

### 6.10 Assets
```
GET    /api/v1/assets                — List (paginated, filtered)
POST   /api/v1/assets                — Create
GET    /api/v1/assets/tree           — Asset hierarchy tree
GET    /api/v1/assets/:id            — Get by ID
PATCH  /api/v1/assets/:id            — Update
DELETE /api/v1/assets/:id            — Delete
POST   /api/v1/assets/:id/transfer   — Transfer
POST   /api/v1/assets/:id/retire     — Retire
POST   /api/v1/assets/:id/replace    — Replace
GET    /api/v1/assets/:id/history    — Work + downtime history
```

### 6.11 Meters
```
GET    /api/v1/meters                — List by asset
POST   /api/v1/meters                — Create meter
GET    /api/v1/meters/:id            — Get meter
PATCH  /api/v1/meters/:id            — Update meter
DELETE /api/v1/meters/:id            — Delete meter
POST   /api/v1/meters/:id/readings   — Add reading
GET    /api/v1/meters/:id/readings   — Reading history
```

### 6.12 Work Requests
```
GET    /api/v1/requests              — List (paginated, filtered)
POST   /api/v1/requests              — Create
GET    /api/v1/requests/:id          — Get by ID
PATCH  /api/v1/requests/:id          — Update
POST   /api/v1/requests/:id/approve  — Approve
POST   /api/v1/requests/:id/reject   — Reject
POST   /api/v1/requests/:id/cancel   — Cancel
POST   /api/v1/requests/:id/convert  — Convert to WO
POST   /api/v1/requests/check-duplicate — Check duplicates
```

### 6.13 Work Orders
```
GET    /api/v1/work-orders                  — List (paginated, filtered)
POST   /api/v1/work-orders                  — Create
GET    /api/v1/work-orders/:id              — Get by ID
PATCH  /api/v1/work-orders/:id              — Update
PATCH  /api/v1/work-orders/:id/status       — Change status (validated)
PATCH  /api/v1/work-orders/:id/assign       — Assign/reassign
POST   /api/v1/work-orders/:id/labor/start  — Start labor timer
POST   /api/v1/work-orders/:id/labor/stop   — Stop labor timer
POST   /api/v1/work-orders/:id/parts        — Add parts usage
POST   /api/v1/work-orders/:id/comments     — Add comment
POST   /api/v1/work-orders/:id/downtime     — Add downtime event
POST   /api/v1/work-orders/:id/reopen       — Reopen
POST   /api/v1/work-orders/merge            — Merge WOs
```

### 6.14 PM Plans
```
GET    /api/v1/pm-plans                 — List (paginated, filtered)
POST   /api/v1/pm-plans                 — Create
GET    /api/v1/pm-plans/:id             — Get by ID
PATCH  /api/v1/pm-plans/:id             — Update
DELETE /api/v1/pm-plans/:id             — Delete
GET    /api/v1/pm-plans/calendar        — Calendar view
GET    /api/v1/pm-plans/forecast        — Forecast view
POST   /api/v1/pm-plans/:id/generate    — Manual generation
GET    /api/v1/pm-plans/:id/occurrences — List occurrences
```

### 6.15 Checklists & Inspections
```
GET    /api/v1/checklists               — List templates
POST   /api/v1/checklists               — Create template
GET    /api/v1/checklists/:id           — Get template
PATCH  /api/v1/checklists/:id           — Update (new version)
DELETE /api/v1/checklists/:id           — Delete
GET    /api/v1/checklists/:id/versions  — Version history
GET    /api/v1/inspections              — List executions
POST   /api/v1/inspections              — Execute inspection
GET    /api/v1/inspections/:id          — Get execution
```

### 6.16 Inventory
```
GET    /api/v1/parts                    — List part masters
POST   /api/v1/parts                    — Create part
GET    /api/v1/parts/:id                — Get part
PATCH  /api/v1/parts/:id                — Update part
GET    /api/v1/inventory/lines          — List stock lines
POST   /api/v1/inventory/lines          — Create stock line
PATCH  /api/v1/inventory/lines/:id      — Update stock line
GET    /api/v1/inventory/low-stock      — Low stock alerts
GET    /api/v1/inventory/transactions   — Transaction history
POST   /api/v1/inventory/adjust         — Adjust stock
POST   /api/v1/inventory/transfer       — Transfer stock
POST   /api/v1/inventory/cycle-count    — Cycle count
```

### 6.17 Vendors
```
GET    /api/v1/vendors                  — List
POST   /api/v1/vendors                  — Create
GET    /api/v1/vendors/:id              — Get
PATCH  /api/v1/vendors/:id              — Update
DELETE /api/v1/vendors/:id              — Delete
POST   /api/v1/vendors/:id/documents    — Add compliance doc
DELETE /api/v1/vendors/:id/documents/:docId — Remove doc
GET    /api/v1/vendors/:id/performance  — Performance metrics
```

### 6.18 Documents
```
POST   /api/v1/documents/upload         — Upload file(s)
GET    /api/v1/documents/:id            — Download/preview
DELETE /api/v1/documents/:id            — Delete
GET    /api/v1/documents/entity/:type/:id — List by entity
```

### 6.19 Notifications
```
GET    /api/v1/notifications            — List user's notifications
GET    /api/v1/notifications/unread-count — Unread count
PATCH  /api/v1/notifications/:id/read   — Mark read
PATCH  /api/v1/notifications/read-all   — Mark all read
GET    /api/v1/notifications/preferences — Get preferences
PATCH  /api/v1/notifications/preferences — Update preferences
```

### 6.20 Reports
```
GET /api/v1/reports/work-orders     — WO report
GET /api/v1/reports/assets          — Asset report
GET /api/v1/reports/pm              — PM compliance report
GET /api/v1/reports/inventory       — Inventory valuation
GET /api/v1/reports/vendors         — Vendor performance
GET /api/v1/reports/export          — Export (CSV/PDF)
```

### 6.21 Saved Views
```
GET    /api/v1/saved-views            — List for user+entity
POST   /api/v1/saved-views            — Create
PATCH  /api/v1/saved-views/:id        — Update
DELETE /api/v1/saved-views/:id        — Delete
```

### 6.22 Settings
```
GET    /api/v1/settings/profile       — Get profile settings
PATCH  /api/v1/settings/profile       — Update profile
GET    /api/v1/settings/organization  — Get org settings
PATCH  /api/v1/settings/organization  — Update org settings
GET    /api/v1/settings/email         — Get email config
PATCH  /api/v1/settings/email         — Update email config
POST   /api/v1/settings/email/test   — Test email
```

### 6.23 Imports
```
POST   /api/v1/imports/upload         — Upload CSV
POST   /api/v1/imports/:id/dry-run    — Validate rows
POST   /api/v1/imports/:id/commit     — Commit import
GET    /api/v1/imports/:id/errors     — Download error file
GET    /api/v1/imports                — List import jobs
```

### 6.24 Audit Logs
```
GET    /api/v1/audit-logs             — List (paginated, filtered by entity/actor/action/date)
GET    /api/v1/audit-logs/entities    — List tracked entity types
```

## 7. Frontend Architecture

### 7.1 App Shell Composition

```jsx
// providers.jsx
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store.js";
import AppTheme from "./theme/AppTheme.jsx";
import { RouterProvider } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import { router } from "./router.jsx";

export function AppProviders() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <PersistGate loading={<LoadingState />} persistor={persistor}>
          <AppTheme>
            <RouterProvider router={router} />
            <ToastContainer />
          </AppTheme>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}
```

### 7.2 axios Client

```js
// services/api/client.js
import axios from "axios";

const client = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Response interceptor: handle 401 → refresh → retry
client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post("/api/v1/auth/refresh", {}, { withCredentials: true });
        return client(originalRequest);
      } catch (refreshError) {
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default client;
```

### 7.3 Auth Slice (Redux)

```js
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isAuthenticated: false, loading: true },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setLoading: (state, action) => { state.loading = action.payload; },
  },
});
```

### 7.4 Route Guards

```jsx
// ProtectedRoute
export function ProtectedRoute({ roles, children }) {
  const { user, isAuthenticated, loading } = useSelector((s) => s.auth);
  if (loading) return <LoadingState />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.some((r) => user.roleKeys.includes(r)))
    return <ForbiddenPage />;
  return children;
}

// GuestRoute
export function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((s) => s.auth);
  if (loading) return <LoadingState />;
  if (isAuthenticated) return <Navigate to="/dashboard" />;
  return children;
}
```

### 7.5 Router Configuration

```jsx
const router = createBrowserRouter([
  { path: "/bootstrap", element: <GuestRoute><BootstrapPage /></GuestRoute> },
  { path: "/login", element: <GuestRoute><LoginPage /></GuestRoute> },
  { path: "/forgot-password", element: <GuestRoute><ForgotPasswordPage /></GuestRoute> },
  { path: "/reset-password", element: <GuestRoute><ResetPasswordPage /></GuestRoute> },
  {
    path: "/",
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "requests", element: <RequestListPage /> },
      { path: "requests/new", element: <RequestCreatePage /> },
      { path: "requests/:id", element: <RequestDetailPage /> },
      { path: "work-orders", element: <WorkOrderListPage /> },
      { path: "work-orders/new", element: <WorkOrderCreatePage /> },
      { path: "work-orders/:id", element: <WorkOrderDetailPage /> },
      { path: "pm-plans", element: <PMListPage /> },
      { path: "pm-plans/:id", element: <PMDetailPage /> },
      { path: "pm-plans/calendar", element: <PMCalendarPage /> },
      { path: "assets", element: <AssetListPage /> },
      { path: "assets/:id", element: <AssetDetailPage /> },
      { path: "locations", element: <LocationTreePage /> },
      { path: "locations/:id", element: <LocationDetailPage /> },
      { path: "inventory", element: <InventoryListPage /> },
      { path: "inventory/:id", element: <InventoryDetailPage /> },
      { path: "vendors", element: <VendorListPage /> },
      { path: "vendors/:id", element: <VendorDetailPage /> },
      { path: "notifications", element: <NotificationCenterPage /> },
      { path: "reports", element: <ReportsHubPage /> },
      { path: "reports/:type", element: <ReportDetailPage /> },
      { path: "settings/profile", element: <ProfilePage /> },
      { path: "settings/organization", element: <OrgSettingsPage /> },
      { path: "settings/email", element: <EmailConfigPage /> },
      { path: "imports", element: <ImportListPage /> },
      { path: "imports/new", element: <ImportCreatePage /> },
      { path: "audit-log", element: <AuditLogPage /> },
      { path: "portal/requests", element: <RequestPortalPage /> },
      { path: "portal/vendor", element: <VendorPortalPage /> },
    ],
  },
  { path: "/403", element: <ForbiddenPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
```

### 7.6 Theme Architecture

**AppTheme.jsx** — wraps children in MUI ThemeProvider with `useMemo`-ized theme.
**themePrimitives.js** — exports `brand`, `gray`, `green`, `orange`, `red` color scales, `typography`, `shadows`, `shape`, `layoutConfig`.
**customizations/** — per-component styleOverrides using `({ theme }) => ({ ...theme.applyStyles('dark', {...}) })`.
- Disable ripple effects on MuiButtonBase.
- Consistent border radius from theme.shape.
- Input focus outline using brand colors.

### 7.7 AppLayout Shell

```
+-------------------------------------------+
| TopBar (hamburger, logo, search, bell,    |
|   dark mode toggle, user menu)            |
+--------+----------------------------------+
|        | PageHeader (title, breadcrumb,   |
| SideNav|   actions)                       |
| (drawer|----------------------------------|
|  on    | Content area                     |
| mobile)| (Outlet)                         |
|        |                                  |
+--------+----------------------------------+
```

## 8. Real-Time Architecture (Socket.IO)

### 8.1 Server Setup (sockets/index.js)
```js
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: { origin: process.env.CLIENT_URL, credentials: true },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    // Join org room
    socket.join(`org:${socket.user.organizationId}`);
    // Join property rooms
    socket.user.propertyIds?.forEach((pid) => socket.join(`property:${pid}`));
    // Join personal room
    socket.join(`user:${socket.user.sub}`);

    socket.on("disconnect", () => { /* cleanup */ });
  });
};

export const getIO = () => io;
```

### 8.2 Event Names (sockets/events.js)
```js
export const SOCKET_EVENTS = {
  WO_CREATED: "wo:created",
  WO_UPDATED: "wo:updated",
  WO_STATUS_CHANGED: "wo:statusChanged",
  REQUEST_UPDATED: "request:updated",
  PM_GENERATED: "pm:generated",
  NOTIFICATION_RECEIVED: "notification:received",
  INVENTORY_LOW_STOCK: "inventory:lowStock",
  USER_MENTIONED: "user:mentioned",
};
```

### 8.3 Frontend Socket Service (services/sockets/client.js)
```js
import { io } from "socket.io-client";
import { store } from "../../app/store.js";

let socket;

export const connectSocket = (token) => {
  socket = io(import.meta.env.VITE_API_URL || "", {
    auth: { token },
    transports: ["websocket", "polling"],
  });

  socket.on("notification:received", (notification) => {
    store.dispatch(addNotification(notification));
  });

  socket.on("wo:updated", (workOrder) => {
    // Invalidate relevant query cache
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.close();
};

export const getSocket = () => socket;
```

## 9. Background Jobs

### 9.1 Job Bootstrap (jobs/index.js)
```js
import cron from "node-cron";
import { generatePMWO } from "./pmGeneration.job.js";
import { checkSLA } from "./slaEscalation.job.js";
import { checkLowStock } from "./lowStock.job.js";
import { dispatchNotifications } from "./notificationDispatch.job.js";
import { cleanupSessions } from "./sessionCleanup.job.js";

export const startJobs = () => {
  if (process.env.ENABLE_SCHEDULERS !== "true") return;

  cron.schedule("0 2 * * *", generatePMWO);        // Daily at 2 AM
  cron.schedule("*/15 * * * *", checkSLA);          // Every 15 min
  cron.schedule("*/30 * * * *", checkLowStock);     // Every 30 min
  cron.schedule("*/5 * * * *", dispatchNotifications); // Every 5 min
  cron.schedule("0 3 * * *", cleanupSessions);       // Daily at 3 AM
};
```

### 9.2 PM Generation Job
- Queries all active PM plans where `nextDueDate <= now + leadTimeDays`.
- For each due PM: creates a WorkOrder with type "preventive", copies checklist template, copies parts list, sets scheduled start.
- Updates `nextDueDate` based on frequency.
- Creates audit log entries.
- Sends notifications to PM assignee.

### 9.3 SLA Escalation Job
- Queries open/assigned/scheduled/in_progress work orders.
- Compares current time against SLA targets.
- Flags orders as "at_risk" or "breached".
- Sends escalation notifications.

### 9.4 Low Stock Job
- Queries inventory stock lines where `quantityAvailable <= reorderPoint`.
- Sends low-stock notifications to inventory controllers.
- For critical parts, sends urgent notifications.

### 9.5 Notification Dispatch Job
- Queries notifications with `deliveryStatus: "queued"` and `deliveryChannel` includes "email".
- Sends via Nodemailer.
- Updates delivery status to "sent" or "failed".

### 9.6 Session Cleanup Job
- Queries sessions where `expiresAt < now` or `lastActivityAt < now - 24h`.
- Removes expired sessions.
- Revokes stale sessions.

## 10. File Upload Architecture

### 10.1 Upload Flow
1. Client sends multipart POST with file(s) to `/api/v1/documents/upload`.
2. `multer` middleware parses file, validates type + size.
3. For images: `sharp` resizes to max 1920px on longest side + generates 300px thumbnail.
4. File saved to `backend/uploads/{entityType}/{entityId}/` with UUID filename.
5. Document model record created with metadata.
6. Returns document ID and URL.

### 10.2 Multer Configuration
```js
import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("uploads", req.body.entityType || "general");
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf", "text/csv"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("File type not allowed"), false);
  },
});
```

## 11. Email Architecture

### 11.1 Nodemailer Transport
```js
import nodemailer from "nodemailer";

let transporter;

export const initializeEmail = () => {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendEmail = async ({ to, subject, html }) => {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject,
    html,
  });
};
```

### 11.2 Email Templates
- Password reset
- User invitation
- Account lockout notification
- New device login alert
- Work order assignment
- PM overdue notification
- Low stock alert
- SLA breach notification

## 12. Security Architecture

### 12.1 Authentication Flow
```
Login:
  1. User submits email + password + optional remember_me
  2. Validate credentials (check lockout, status, password)
  3. Generate access token (15 min) + refresh token (7d or 30d)
  4. Set refresh token as httpOnly cookie
  5. Return access token in response body (stored in memory by client)
  6. Create session record

Request with Access Token:
  1. decodeToken middleware reads accessToken from cookie
  2. Verifies JWT signature + expiry
  3. Attaches decoded payload to req.user

Token Refresh:
  1. Interceptor catches 401
  2. POST /api/v1/auth/refresh with httpOnly cookie
  3. Server validates refresh token from cookie
  4. Rotates refresh token (old revoked, new issued)
  5. Returns new access token + sets new refresh cookie
  6. Client retries original request
```

### 12.2 CSRF Protection
- On login: server sets csrf token in a non-httpOnly cookie (readable by JS).
- Client reads csrf token cookie and sends as `x-csrf-token` header on mutations.
- Server validates header matches cookie.

### 12.3 Data Isolation
- Every query scoped by `organizationId` from `req.user.organizationId`.
- Property-scoped users: additional filter on `propertyId` from `req.user.propertyIds`.
- Location-scoped users: additional filter using location subtree query.
- Vendor users: filter work orders by `vendorId`.

### 12.4 Optimistic Concurrency
- Every mutable model has a `revision` field (Number, default 1).
- On update: `findOneAndUpdate({ _id, revision: currentRevision }, { ..., $inc: { revision: 1 } })`.
- If no document matched → 409 Conflict. Client must re-fetch and retry.

## 13. Audit Logging

### 13.1 Audit Service
```js
export const createAuditLog = async ({
  actor, action, entity, organizationId, propertyId, changes, ip, userAgent,
}) => {
  await AuditLog.create({
    actor: { id: actor.id, type: actor.type || "user", email: actor.email },
    action,
    entity: { type: entity.type, id: entity.id },
    organizationId,
    propertyId,
    changes: { before: changes?.before || {}, after: changes?.after || {} },
    ip: ip || actor.ip,
    userAgent: userAgent || actor.userAgent,
    timestamp: new Date(),
  });
};
```

### 13.2 Audit Log Entry Example
```json
{
  "actor": { "id": "507f1f77bcf86cd799439011", "type": "user", "email": "tech@hotel.com" },
  "action": "WORK_ORDER_STATUS_CHANGED",
  "entity": { "type": "WORK_ORDER", "id": "507f1f77bcf86cd799439012" },
  "organizationId": "507f1f77bcf86cd799439010",
  "propertyId": "507f1f77bcf86cd799439013",
  "changes": { "before": { "status": "assigned" }, "after": { "status": "in_progress" } },
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "timestamp": "2026-05-12T10:30:00Z"
}
```

## 14. Prohibited Implementation Patterns

1. Backend business logic embedded directly in routes.
2. Controllers reading raw `req.body`, `req.params`, or `req.query`.
3. Duplicated canonical enums across unrelated backend modules.
4. Frontend feature logic collapsed into a single `App.jsx`.
5. Shared components mixed indiscriminately with domain-specific components.
6. Hardcoded UI tokens (colors, fonts, spacing) in reusable components.
7. Non-tree-shakable MUI import patterns.
8. `react-router-dom` usage.
9. React Hook Form `watch()`.
10. Deprecated MUI Grid `item` prop.
11. Early mock-data injection before Phase 17.
12. TypeScript conversion.
13. PowerShell- or CMD-specific command syntax.
14. Direct access to `req.body` instead of `req.validated`.
15. Bypassing `req.user` for actor context.
