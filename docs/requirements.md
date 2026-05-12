# Hospitality CMMS Requirements Specification

## 1. Document Purpose

This document converts `docs/prd.md` into an implementation-facing requirements specification. It is the authoritative "what must be built" reference for all implementation phases.

This document is mandatory. It defines:
1. What must be built.
2. How the repository must be organized before and during implementation.
3. Which coding and UI rules are non-negotiable.
4. Which user stories, workflows, screens, entities, APIs, and behaviors must exist.
5. Which completion conditions define done for each area.

## 2. Document Precedence and Alignment

### 2.1 Source of truth order
1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`

Interpretation rules:
1. `docs/prd.md` is the master product source of truth.
2. `docs/requirements.md` translates the PRD into mandatory execution requirements.
3. `docs/design.md` defines how the requirements are realized structurally and architecturally.
4. `docs/tasks.md` defines the exact implementation order and phase plan.
5. `docs/task-execution-protocol.md` defines how every phase is executed and reviewed.
6. If any lower-priority document conflicts with a higher-priority document, the higher-priority document wins and the lower-priority document must be corrected before implementation continues.

### 2.2 Required implementation discipline
1. No implementation may begin from `docs/tasks.md` alone.
2. Every phase must start by reading the relevant `requirements.md` sections first, then `design.md`, then `tasks.md`.
3. No requirement in the PRD may be silently dropped because it appears minor or obvious.
4. No requirement may be downgraded to optional unless `docs/prd.md` explicitly places it out of scope or a later-phase candidate.

## 3. Current Repository Baseline

### 3.1 Existing repository state
1. `backend/app.js` — bare Express app export (7 lines).
2. `backend/server.js` — HTTP server listening on port 4000 (10 lines).
3. `client/src/main.jsx` — StrictMode + Inter font render (14 lines).
4. `client/src/App.jsx` — placeholder `<div>App</div>` (5 lines).
5. `docs/prd.md`, `docs/requirements.md`, `docs/design.md`, `docs/tasks.md`, `docs/task-execution-protocol.md`, `docs/traceability-matrix.md`, `docs/generation_prompt.md`, `docs/theming-protocol.md`.
6. Backend constants file does not yet exist.
7. Frontend constants file does not yet exist.
8. Frontend centralized theme exists at `client/src/theme/` but must move to `client/src/app/theme/`.

### 3.2 Mandatory baseline packages
**Backend**: express, mongoose, express-validator, jsonwebtoken, bcrypt, socket.io, winston, helmet, cors, express-rate-limit, express-mongo-sanitize, compression, cookie-parser, cookie, dayjs, dotenv, validator, mongoose-paginate-v2, nodemailer, multer, node-cron, csv-parse, sharp.

**Frontend**: react 19, react-dom, react-router 7, @mui/material 9, @mui/icons-material, @mui/lab, @mui/x-data-grid, @mui/x-charts, @mui/x-date-pickers, @emotion/react, @emotion/styled, @reduxjs/toolkit, react-redux, redux-persist, react-hook-form, axios, socket.io-client, react-dropzone, jspdf, jspdf-autotable, react-photo-album, yet-another-react-lightbox, react-toastify, react-error-boundary, @fontsource/inter, dayjs, recharts, @fullcalendar/react, date-fns, zod, @hookform/resolvers.

### 3.3 Locked implementation defaults
1. Approved backend infrastructure additions: `multer`, `node-cron`, `csv-parse`, `sharp`.
2. Upload handling: multer + local disk storage (first implementation).
3. Scheduled jobs: in-process with node-cron, guarded by `ENABLE_SCHEDULERS` flag.
4. Auth transport: access token in client memory (15 min), refresh token in httpOnly cookie (7 days default, 30 days with `remember_me`), CSRF header on mutating requests.
5. Constants sources of truth: `backend/utils/constants.js` and `client/src/utils/constants.js`.

## 4. Mandatory Engineering Constraints

### 4.1 Global repository constraints
1. JavaScript-only. No TypeScript.
2. ESM syntax throughout (import/export, no CommonJS require).
3. Every exported module and every non-trivial internal helper must use JSDoc.
4. Development instructions must use Git Bash or WSL compatible commands only.
5. CMD-specific or PowerShell-specific command syntax is prohibited.

### 4.2 Backend constraints
1. `backend/utils/constants.js` is the backend single source of truth for all enums, statuses, permission keys, event names, audit actions, and domain constants.
2. Controllers must not read input from `req.body`, `req.params`, or `req.query`.
3. Controllers must only consume validated input from `req.validated`.
4. The exact validated-input middleware contract:
```js
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```
5. Validation middleware must attach empty object defaults for missing validated locations.
6. The acting user must be attached to `req.user`.
7. `req.user` is the authoritative actor context for authorization, audit attribution, notification attribution, and tenant scoping.
8. Services must not receive raw Express request or response objects.
9. Controllers must remain orchestration-only and delegate business logic to services.
10. Middleware ordering must follow `docs/design.md` section 4.2.
11. Jobs, imports, schedulers, and automated flows must pass a synthetic actor context compatible with the `req.user` contract.
12. All models, middleware, controllers, services, validators, utilities, jobs, constants modules, and non-trivial helpers must use JSDoc.

### 4.3 Frontend constraints
1. `client/src/utils/constants.js` is the frontend single source of truth.
2. Components must never use hardcoded styling values where theme values are applicable.
3. Styling must use `theme.palette`, `theme.typography`, `theme.spacing`, `theme.breakpoints`.
4. Reusable custom styling must use MUI `styled()`.
5. All MUI imports must be tree-shakable (e.g., `import Button from "@mui/material/Button"`).
6. `react-router` must be used for router imports; `react-router-dom` is not allowed.
7. React Hook Form `watch()` must never be used. Use `useWatch`, `Controller`, or `getValues`.
8. MUI Grid must use the `size` prop rather than the deprecated `item` prop pattern.
9. Custom rendering must prefer the MUI slots and `slotProps` APIs where available.
10. MUI usage must follow v9 syntax and deprecation guidance.
11. Centralized theme must be created under `client/src/app/theme/`.
12. Theming Protocol (`docs/theming-protocol.md`) is mandatory for all frontend development.

## 5. Required Repository Deliverables

### 5.1 Top-level requirements
1. `backend/` — complete backend application.
2. `client/` — complete frontend application.
3. `docs/` — all documentation.
4. `README.md` — project overview.
5. `.gitignore` — standard ignores.

### 5.2 Required documentation files
1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`
6. `docs/traceability-matrix.md`
7. `docs/generation_prompt.md`

### 5.3 Required backend deliverables
1. Application bootstrap (`app.js`, `server.js`).
2. Configuration modules (`config/`).
3. Constants source of truth (`utils/constants.js`).
4. Models matching the PRD data model (`models/`).
5. Validation middleware + request normalization middleware.
6. Authentication middleware and authorization middleware.
7. Routes (`routes/`).
8. Controllers (`controllers/`).
9. Services (`services/`).
10. Utilities (`utils/`).
11. Schedulers / job runners (`jobs/`).
12. Socket.IO integration (`sockets/`).
13. Mock data (`mock/` — Phase 17 only).

### 5.4 Required frontend deliverables
1. App bootstrap and app router.
2. Theme module (`app/theme/`).
3. Frontend constants source of truth (`utils/constants.js`).
4. Shared API client and request helpers.
5. Shared reusable components (`components/`).
6. Domain-organized feature folders (`domains/`).
7. Domain pages and page-level containers (`pages/`).
8. Redux store, slices, selectors, and persistence configuration.
9. Shared hooks, utilities, and layout primitives.

## 6. Actor Context Requirements

The actor context (attached to `req.user`) must carry at minimum:
1. `id` — User ID.
2. `organizationId` — Organization ID.
3. `propertyIds` — Array of assigned property IDs.
4. `roleKeys` — Array of role keys.
5. `permissions` — Array or set of resolved permission strings.
6. `sessionId` — Current session ID.

Background jobs must pass a synthetic actor context:
```js
{ id: "SYSTEM", organizationId: null, propertyIds: [], roleKeys: ["system"], permissions: ["*"], sessionId: null }
```

## 7. System Bootstrap Requirements (PRD §1-18 bootstrap content)

### 7.1 Bootstrap endpoint
`POST /api/v1/bootstrap/initialize` creates the first organization and admin user.

### 7.2 Bootstrap status endpoint
`GET /api/v1/bootstrap/status` returns whether bootstrap is required.

### 7.3 Availability control
Bootstrap endpoint only accessible when organization count is zero. Returns 409 if already initialized.

### 7.4 Atomic transaction
Organization and admin user creation must be atomic (all-or-nothing via MongoDB transaction).

### 7.5 Input validation
Organization: name (3-100 chars, required), subdomain (3-50 chars, optional, lowercase alphanumeric + hyphens), timezone (IANA, required), currency (ISO 4217, optional, default USD).
Admin: email (valid email, required), firstName (1-50 chars, required), lastName (1-50 chars, required), password (meets password policy, required), confirmPassword (must match password, required).

### 7.6 Bootstrap admin user
- emailVerified: true (no verification email required).
- Assigned Super_Admin role with permissions ["*"].
- Password hashed with bcrypt cost factor 12.

### 7.7 Rate limiting
Bootstrap endpoint: maximum 5 attempts per IP per hour.

### 7.8 Audit logging
Bootstrap event logged with system actor ID "SYSTEM", timestamp, IP address, user agent.

### 7.9 Frontend detection
Frontend must call bootstrap status endpoint on app load. If bootstrap required, show BootstrapPage instead of login.

### 7.10 Bootstrap UI
Welcome page with organization form (name, subdomain, timezone, currency) and admin form (email, first name, last name, password, confirm password). Password strength indicator. Success view with "Continue to Login" button.

## 8. Authentication and Session Requirements (PRD §8.1)

### 8.1 Account model
- Unique email within organization.
- User may belong to multiple properties.
- User status: `invited`, `active`, `locked`, `disabled`, `archived`.

### 8.2 Login behavior
- Login requires email and password.
- Must reject archived and disabled users.
- Must verify organization scope and active property assignments before issuing session.
- Must return current user profile, scoped permissions, property access list, initial notification counts.

### 8.3 Session and JWT behavior
- Access token: short-lived JWT, 15-minute expiration, stored in client memory only.
- Refresh token: httpOnly cookie, 7-day idle timeout by default.
- **Remember me flag**: extends refresh token lifetime up to 30 days absolute.
- JWT claims: `sub`, `organizationId`, `sessionId`, `roleKeys`, `propertyIds`, `permissionHash`, `iat`, `exp`.
- Refresh tokens persisted server-side with user agent, IP, issued time, last activity, revoked flag, revocation reason.
- Sensitive permission changes must invalidate all active sessions.

### 8.4 Cookie and security behavior
- Refresh token cookies: httpOnly, secure in production, sameSite=lax.
- Access tokens must not be stored in localStorage.
- Mutating requests must include anti-CSRF header when cookie-authenticated.

### 8.5 Password policy
- Minimum length: 12 characters.
- Maximum accepted length: 72 characters (bcrypt input compatibility).
- Must contain: at least one uppercase letter, one lowercase letter, one number, one special character.
- Must not contain the full email address.
- Must not match the last 8 stored password hashes.
- bcrypt cost factor: 12 rounds.

### 8.6 Logout and forced logout
- Standard logout revokes current session.
- "Logout all sessions" revokes all sessions for the user.
- Admin disable, password reset completion, role change, property-scope removal, or suspicious login must force logout from all sessions.

### 8.7 Password reset
- Forgot-password: one-time email link with 60-minute expiration.
- Reset tokens must be single use.
- Email verification mandatory for invited users before first login.

### 8.8 Account lockout
- 5 failed login attempts in 15 minutes locks account for 30 minutes.
- Subsequent lockouts escalate: 15 min → 30 min → 1 hour → 2 hours → 4 hours → 8 hours → 24 hours (capped).
- Rate limiting per IP and per account identifier.
- Security emails sent for: password reset initiation, password change, account lockout, new-device login.

## 9. Organization, Property, and Location Requirements (PRD §8.2)

### 9.1 Organization structure
- Organization record owns all users, properties, roles, master data, numbering rules.
- Code field: unique organization code for identification.
- Settings: default timezone, default currency, default language, logo/branding, default business rules.

### 9.2 Property hierarchy
- Each property belongs to exactly one organization.
- Property types: hotel, resort, serviced_apartment, club, spa, restaurant, event_venue, mixed_use.
- Property settings: timezone, address, quiet hours, operational status, default service windows, SLA policies.

### 9.3 Location model
- Parent-child hierarchy, maximum depth 8 levels.
- Default location types: building, tower, wing, floor, zone, room, suite, villa, public_area, restaurant, kitchen, bar, ballroom, meeting_room, spa_area, pool_area, laundry, plant_room, electrical_room, mechanical_room, roof, parking, external_ground, storeroom, bin.
- Custom location types configurable by org admins.
- Location status: active, inactive, under_renovation, temporarily_closed, archived.

### 9.4 Location-based permissions
- Permissions support scope by property and by selected location subtrees.
- Users limited to location subtree only view/act on records in that subtree.
- Corporate users may be granted unrestricted property-level visibility.

## 10. User, Role, and Permission Requirements (PRD §8.3)

### 10.1 Built-in roles
1. `organization_admin` 2. `corporate_engineering_director` 3. `property_admin` 4. `engineering_manager` 5. `maintenance_supervisor` 6. `technician` 7. `limited_technician` 8. `requester` 9. `inventory_controller` 10. `vendor_coordinator` 11. `vendor_user` 12. `report_viewer` 13. `auditor`

### 10.2 Permission domains
Dashboard, Properties/Locations, Users/Roles, Assets/Meters, Requests, Work Orders, PM Plans, Inspections/Checklists, Inventory, Vendors, Documents, Notifications, Reports/Exports, Imports, Settings/Master Data, Audit Logs.

### 10.3 Permission granularity per domain
`view_scope`, `view_all`, `create`, `edit_scope`, `edit_all`, `assign`, `approve`, `verify_close`, `cancel`, `reopen`, `delete`, `export`, `configure`.

### 10.4 Auditability of access changes
- Role assignment changes create immutable audit events.
- Property-scope changes create immutable audit events.
- Permission-set updates record before and after values.

## 11. Dashboard Requirements (PRD §8.4)

### 11.1 Role-aware dashboards
- Corporate users: multi-property rollups.
- Property users: property-specific operational cards.
- Technicians: assigned work, due work, recently updated work.
- Requesters: open requests and latest status changes.
- Inventory controllers: low stock, pending counts, transfer needs.
- Vendor coordinators: vendor-assigned open work, compliance expirations.

### 11.2 Required KPI cards
Open work orders, overdue work orders, emergency open work orders, guest-impact open work orders, PM due today, PM overdue, critical assets down, low-stock critical parts, OOO/OOS room maintenance count.

### 11.3 Required charts
Work orders by status, work orders by priority, PM compliance trend, mean completion time by property, guest-impact incidents by area, top recurring asset failures, parts usage by category.

## 12. Asset Management Requirements (PRD §8.5)

### 12.1 Core asset record
System ID, asset code, name, category, subcategory, asset class, parent asset, property/location, manufacturer, model, serial number, barcode/QR, lifecycle status, operational status, **severity** (critical/high/medium/low), install date, purchase date, warranty, useful life, replacement cost, service contract, linked documents, linked photos, custom fields.

### 12.2 Asset hierarchies
- Parent-child relationships supported (unlimited levels, UI shows at least 8).
- Successor asset linking.
- Related asset linking (non-hierarchical).

### 12.3 Asset status lifecycle
planned, active, standby, out_of_service, under_repair, decommission_pending, retired, archived.

### 12.4 Meter support
- Zero or many meters per asset.
- Meter types: running_hours, cycles, distance, count, usage_hours, custom_numeric.
- Decreasing readings blocked unless rollover flag enabled.
- Meter history auditable.

### 12.5 Transfer, replacement, retirement
- Transfer updates location and all downstream visibility.
- Cross-property transfer requires org-level permission.
- Retirement blocked if open work orders or open PM occurrences exist.
- Replacement links successor asset while preserving old history.

### 12.6 Downtime and health indicators
- Downtime events linkable to work orders.
- Planned and unplanned classification.
- Derived health indicators: open WO count, overdue PM count, downtime hours (30-day), MTTR, MTBF, last failure date, last PM completion date.

## 13. Work Request Requirements (PRD §8.6)

### 13.1 Request channels
- Authenticated internal web form.
- Requester portal for limited users.
- Property-specific or location-specific portal links.
- Manual dispatcher entry.
- Inspection-generated request.

### 13.2 Required fields
Property, location, title, description, category, requester identity.
Conditionally required: room number (if room-type location), asset (if asset-specific), guest-impact reason, emergency reason, preferred service window (if occupied room).

### 13.3 Request statuses
submitted, under_review, needs_clarification, approved, rejected, converted, cancelled.

### 13.4 Duplicate detection
Check open requests and work orders in same property using exact location, exact asset (when present), matching category/subcategory within configurable time window.

### 13.5 Notification and SLA
- Submission triggers acknowledgment email.
- Emergency requests trigger immediate notification.
- SLA timer starts at submission for emergency, at approval for non-emergency.

## 14. Work Order Requirements (PRD §8.7)

### 14.1 Work order types
corrective, emergency, preventive, inspection_follow_up, planned_project, vendor_service.
Sources: manual, request conversion, PM generation, inspection failure, duplicate split, import.

### 14.2 Numbering
Default format: `WO-{PROPERTYCODE}-{YYYY}-{SEQUENCE}`. Property-scoped, yearly reset. Sequence numbers never reused.

### 14.3 Priority, severity, guest impact
Priority: emergency, urgent, high, medium, low.
Severity: life_safety, guest_service_critical, operational_critical, standard, cosmetic.
Guest impact: none, low, moderate, high, revenue_blocking.

### 14.4 Work order statuses
draft, open, assigned, scheduled, in_progress, on_hold, awaiting_parts, awaiting_access, awaiting_approval, completed, verified, closed, cancelled.

### 14.5 Status transition validation
draft→open→assigned→scheduled→in_progress→awaiting_parts, on_hold (from in_progress), completed→verified→closed. Cancelled from most statuses. Reopen from closed.

### 14.6 Tasks, checklists, labor, parts, comments
- Sub-tasks with assignee, status, completion notes.
- Checklist items with response types (pass/fail, yes/no, text, number, photo).
- Required checklist items block completion until done.
- Labor entries with user, start/end time, duration, notes. Labor timer.
- Parts usage with part, quantity, unit cost, total cost.
- Comments with @mentions.
- Attachments for photos, documents.

### 14.7 SLA, downtime, cost
- SLA metrics: response time, start time, completion time, status (met, at_risk, breached).
- SLA breach triggers escalation notifications.
- Downtime events: start, end, duration, reason, impact.
- Total cost: labor + parts + vendor.

## 15. Preventive Maintenance Requirements (PRD §8.8)

### 15.1 PM plan types
Time-based, meter-based, seasonal, hybrid.

### 15.2 Frequency
Daily, weekly, biweekly, monthly, quarterly, semiannual, annual, custom_interval.

### 15.3 Occurrence status
scheduled, generated, in_progress, completed, missed, skipped, deferred.

### 15.4 Generation rules
- Lead time (e.g., generate 7 days before due).
- Respect blackout windows and service windows.
- Copy checklist template and parts list to generated work order.
- Meter-based triggers: generate when reading reaches threshold.

### 15.5 Calendar and forecast
- PM calendar view: monthly with color-coded status.
- PM forecast: next 90 days of upcoming occurrences.

## 16. Inspection and Checklist Requirements (PRD §8.9)

### 16.1 Checklist templates
- Versioned (updating creates new version, preserves old).
- Response types: pass_fail, yes_no, text, number, photo, signature, date, time, dropdown, checkbox.
- Conditional items (show/hide based on previous responses).
- Fail actions: none, create_request, create_work_order, block_completion.
- Required item completion enforced.

### 16.2 Inspection execution
- Template version frozen at execution time.
- Results: pass, pass_with_deficiencies, fail.
- Evidence capture: photos, signature, notes.
- PDF export with all responses and photos.

## 17. Inventory Requirements (PRD §8.10)

### 17.1 Part master
- Part number, name, description, category, manufacturer, model, UOM, unit cost, reorder point, reorder quantity, critical flag, substitute parts.
- Part master records shared across properties.

### 17.2 Inventory stock lines
- Part, property, storeroom, bin, quantity on hand, quantity reserved, quantity available (on_hand - reserved), min quantity, max quantity, reorder point.
- Multiple stock lines per part (one per property/storeroom/bin).

### 17.3 Inventory transactions
Types: receipt, issue, return, transfer, adjustment, cycle_count.

### 17.4 Low-stock alerts
- Quantity available below reorder point → notification.
- Critical part below min quantity → urgent notification.

## 18. Vendor Requirements (PRD §8.11)

### 18.1 Vendor profile
Name, vendor code, type (service_provider, supplier, contractor, consultant), contact, address, tax ID, insurance expiration, license expiration, compliance documents, status.

### 18.2 Vendor user access
- Restricted to only work orders assigned to their vendor.
- Can view details, add comments, upload attachments, update status.
- Cannot see other vendors' work or internal work orders.

### 18.3 Vendor performance
- Metrics: total WOs, on-time completion rate, avg completion time, avg cost, quality rating.
- Per-work-order rating: 1-5 stars, quality score, timeliness score, comments.

## 19. Notification Requirements (PRD §8.12)

### 19.1 Notification types
Info, warning, alert, success, error.
Event types: request_created, request_approved, request_rejected, wo_created, wo_assigned, wo_reassigned, wo_status_changed, wo_completed, wo_verified, wo_overdue, pm_generated, pm_missed, inspection_failed, part_low_stock, part_out_of_stock, vendor_assigned, vendor_completed, user_mentioned, document_uploaded, comment_added, sla_at_risk, sla_breached, compliance_document_expiring, compliance_document_expired.

### 19.2 Delivery
Channels: in_app, email, both.
Delivery status: queued, sent, delivered_if_known, failed, read.
User preference: enable/disable by event type and channel.

### 19.3 Quiet hours
Email notifications queued during quiet hours, sent after.

### 19.4 Real-time (Socket.IO)
Events: work_order_updated, request_updated, pm_generated, notification_received, user_mentioned, comment_added.
Room subscriptions by property and user.

## 20. Document and Attachment Requirements (PRD §8.13)

### 20.1 File upload
- Max file size: 10MB.
- Allowed types: jpg, jpeg, png, webp, gif, pdf, csv, xlsx, doc, docx.
- Drag-and-drop or file picker.
- Server-side file type and size validation.

### 20.2 Image handling
- Sharp processing: resize to 1920px max, generate 300px thumbnail.
- Lightbox viewing with zoom/navigation (yet-another-react-lightbox).
- Photo album gallery (react-photo-album).

## 21. Data Model Conventions (PRD §11)

### 21.1 Common fields on ALL models
- `createdAt`, `updatedAt` (via Mongoose `timestamps: true`).
- `createdBy`, `updatedBy` — ObjectId refs to User.
- `organizationId` — ObjectId ref to Organization (for multi-tenancy).
- `revision: { type: Number, default: 1 }` — optimistic concurrency control.

### 21.2 Required models
Organization, Property, Location, Role, User, Team, UserSession, Asset, AssetMeter, AssetMeterReading, WorkRequest, WorkOrder, PreventiveMaintenancePlan, ChecklistTemplate, InspectionExecution, Part, InventoryStockLine, InventoryTransaction, Vendor, Document, Notification, SavedView, MasterDataConfig, ImportJob, AuditLog.

## 22. API Requirements (PRD §13)

### 22.1 API conventions
- All routes under `/api/v1/`.
- List responses: paginated `{ success, data, pagination: { page, limit, total, totalPages } }`.
- Detail responses: `{ success, data }`.
- Error responses: `{ success: false, error: "CODE", message: "..." }`.
- Validation errors: field-specific messages.
- Conflict errors: HTTP 409.

### 22.2 Health endpoint
`GET /api/v1/health` — unauthenticated. Returns server status, uptime, timestamp, database connectivity.

### 22.3 Required API domains
Bootstrap, Auth (register, login, refresh, logout, password), Organizations, Properties, Locations, Users, Roles, Teams, Assets, Meters, Work Requests, Work Orders, PM Plans, Checklists, Inspections, Parts, Inventory Lines, Inventory Transactions, Vendors, Documents, Notifications, Reports, Saved Views, Settings, Imports, Audit Logs, Dashboard.

## 23. Security Requirements (PRD §16)

### 23.1 Security headers
Helmet middleware for security headers (CSP, XSS protection, etc.).

### 23.2 CORS
Configured to allow frontend origin (`localhost:3000` in development).

### 23.3 Rate limiting
- General API: 100 requests per minute per IP.
- Auth endpoints: 5 requests per 15 minutes per IP.
- Bootstrap: 5 requests per hour per IP.

### 23.4 Input sanitization
express-mongo-sanitize to prevent NoSQL injection.

### 23.5 Password storage
bcrypt with cost factor 12.

### 23.6 Session revocation
All sessions revocable. Sensitive changes force logout all sessions.

## 24. Non-Functional Requirements (PRD §15)

### 24.1 Performance
- Page load < 2 seconds.
- API response < 500ms for 95% of requests.
- Real-time updates < 1 second latency.

### 24.2 Concurrency
Optimistic concurrency via `revision` field. Server returns 409 on revision mismatch. Client refreshes data and retries.

### 24.3 Browser support
Latest versions of Chrome, Firefox, Safari, Edge. Responsive for mobile, tablet, desktop.

## 25. Audit Logging Requirements (PRD §8.2)

### 25.1 Audit log entries
Every state-changing operation must record: actor (id, type, email), action, entity (type, id), organizationId, propertyId, changes (before/after), IP address, user agent, timestamp.

### 25.2 Immutability
Audit entries are write-only. No updates or deletes.

### 25.3 Queryability
Filterable by entity, actor, date range, action type.

## 26. Error Handling and Edge Cases (PRD §17)

### 26.1 Error categories
- 400: Validation errors (field-specific).
- 401: Unauthenticated.
- 403: Forbidden (insufficient permissions).
- 404: Resource not found.
- 409: Conflict (revision mismatch, duplicate, already initialized).
- 429: Rate limited.
- 500: Internal server error.

### 26.2 Edge case coverage
- Empty states for all lists (illustration + message + CTA).
- Loading skeletons for all data-dependent pages.
- Network error handling with retry.
- Form unsaved changes warning.
- Confirm dialogs for destructive actions.
- Idle session timeout warning.
- 404 page.
- 403 forbidden page.

## 27. Workflow Requirements

The following workflows are mandatory:
1. System bootstrap → first organization → admin user.
2. User invitation → email → account setup → first login.
3. Request submission → triage → approval/rejection → conversion to work order.
4. Standard corrective work order lifecycle.
5. Emergency work dispatch lifecycle.
6. PM plan → generation → completion lifecycle.
7. Inspection → failure → follow-up work lifecycle.
8. Inventory reservation → issue → return → transfer lifecycle.
9. Vendor assignment → restricted execution → verification lifecycle.
10. Asset transfer → replacement → retirement lifecycle.
11. Import dry-run → validation → commit lifecycle.

## 28. UI and Interaction Requirements

### 28.1 Global UI requirements
- Consistent application shell (sidebar + topbar + content area).
- Permission-aware (elements hidden/disabled based on user role).
- Responsive (mobile, tablet, desktop).
- Accessible (keyboard navigation, WCAG AA contrast, focus states).
- MUI v9 consistently throughout.

### 28.2 Responsive breakpoints
- Mobile (< 600px): single column, stacked cards, compact nav, drawer filters.
- Tablet (600-900px): split layouts, wider tables, partial inline filters.
- Desktop (> 900px): full density, side-by-side panels, wide data grids.

### 28.3 Route and screen coverage
Login, password flows, dashboard, requests (list/create/detail), work orders (list/create/detail), PM (list/calendar/detail), assets (list/detail), locations (list/tree/detail), organization settings, property settings, users, roles, teams, parts, inventory history, vendors, notification center, reports hub, settings, imports, audit log, request portal, vendor portal.

## 29. Mock Data Requirements

### 29.1 Timing
Mock data must not be introduced before Phase 17. All primary models must be implemented first.

### 29.2 Location
All mock data under `backend/mock/`.

### 29.3 Requirements
Realistic hospitality data: multiple properties, room/public-area issues, assets with meters, PM plans, work requests/orders, inventory, vendors. Uses same domain constants and schema rules as production.

## 30. Acceptance Requirements

Implementation complete only when:
1. Required repository structure exists.
2. Backend constants SSOT exists and is used.
3. Frontend constants SSOT exists and is used.
4. Centralized frontend theme exists and is used.
5. All PRD functional modules are implemented.
6. All PRD workflows are implemented.
7. All PRD entities are implemented.
8. Required UI routes and screens exist.
9. Responsive behavior is implemented.
10. Notifications, audit logs, reports, imports, and configuration are implemented.
11. Mock data exists only after full model layer.
12. Delivery follows `docs/task-execution-protocol.md`.

## 31. Explicit Prohibitions

The following are prohibited:
1. AI features of any kind.
2. TypeScript introduction.
3. Billing, pricing, or subscription features.
4. Testing strategy sections as substitute for implementation detail.
5. Direct controller reads from raw request containers.
6. `react-router-dom` usage.
7. Non-tree-shakable MUI imports.
8. React Hook Form `watch()`.
9. Deprecated MUI Grid `item` usage.
10. Hardcoded UI design token values.
11. PowerShell- or CMD-specific command syntax.
12. Mock data before Phase 17.
13. Direct `req.body` access (must use `req.validated`).
14. Bypassing `req.user` for actor context.
