# Hospitality CMMS Implementation Tasks

## 1. Task Document Purpose

This document converts `docs/requirements.md` and `docs/design.md` into a phase-based implementation plan for developer AI execution. This task plan is mandatory.

## 2. Phase Planning Rules

1. The implementation order is `prd.md → requirements.md → design.md → tasks.md → task-execution-protocol.md`.
2. Every phase must be executed using `docs/task-execution-protocol.md` six-step method.
3. Phases must be feature-based unless the phase is a prerequisite.
4. A later phase may not begin until the earlier phase completion gate is satisfied.
5. Mock data injection under `backend/mock/*` is prohibited until Phase 17.
6. Every phase must produce a reviewable artifact at step 5 (user review).

## 3. Phase Summary

| Phase | Name | Type | Depends On |
|-------|------|------|------------|
| 00 | Consolidation & Foundation Setup | Prerequisite | None |
| 01 | Frontend Foundation — Theme, Layout, Routing | Prerequisite | 00 |
| 02 | Backend Core Infrastructure | Prerequisite | 01 |
| 03 | Frontend Core Infrastructure | Prerequisite | 01 |
| 03.5 | System Bootstrap Mechanism | Prerequisite | 02, 03 |
| 04 | Authentication and Session Management | Feature | 02, 03, 03.5 |
| 05 | Organization, Property, Location Management | Feature | 02, 03, 04 |
| 06 | Users, Roles, Teams, and Access Control | Feature | 05 |
| 07 | Assets, Meters, and Documents | Feature | 05, 06 |
| 08 | Work Request Intake and Triage | Feature | 05, 06, 07 |
| 09 | Work Order Core Lifecycle | Feature | 08 |
| 10 | Preventive Maintenance | Feature | 07, 09 |
| 11 | Inspections, Checklists, and Procedures | Feature | 09, 10 |
| 12 | Inventory and Spare Parts | Feature | 07, 09 |
| 13 | Vendors and Restricted Contractor Access | Feature | 09, 12 |
| 14 | Notifications and Real-Time Synchronization | Feature | 08, 09, 10, 12, 13 |
| 15 | Dashboards, Search, Saved Views, Reporting, Audit UX | Feature | 05 through 14 |
| 16 | Data Import, Export, and Migration | Feature | 05 through 15 |
| 17 | Mock Data Injection and Demo Dataset | Late Support | 05 through 16 |
| 18 | Final Cross-Phase Alignment and Completion Gate | Completion | 00 through 17 |

## 4. Phase Traceability

| Phase | PRD Scope | Requirements Scope | Design Scope |
|-------|-----------|-------------------|--------------|
| 00 | Whole-document alignment | 1, 2, 3, 4, 31 | 1, 2, 3, 14 |
| 01 | 12.10, 13.5.3, 15.6.2, 18.12 | 3, 4, 5 | 2, 3, 7.6 |
| 02 | 13, 15, 16, 17, 18.12 | 3, 4, 5, 22, 23, 24, 26 | 4 |
| 03 | 12, 15.6.2, 18.12 | 3, 4, 5, 10, 12, 28 | 5, 7 |
| 03.5 | PRD §8.6 bootstrap content | 7 | 4.1.5 (in §6), 4.11 |
| 04 | 8.1, 9.1, 11.8, 18.1 | 8, 23, 24 | 4.11, 5.6, 5.7, 12 |
| 05 | 8.2, 8.3, 8.17, 11.2-11.4, 11.22 | 9, 10 | 5.2-5.4, 6.3-6.5 |
| 06 | 8.3, 11.5-11.7, 18.1 | 10 | 5.5-5.8, 6.6-6.8 |
| 07 | 8.5, 8.13, 11.9-11.10, 11.19, 18.6 | 12, 20 | 5.9-5.11, 5.21, 6.10-6.11, 10 |
| 08 | 8.6, 9.2, 11.11, 18.2 | 13 | 5.12, 6.12 |
| 09 | 8.7, 9.3-9.4, 11.12, 18.3 | 14 | 5.13, 6.13 |
| 10 | 8.8, 9.5, 11.13, 18.4 | 15 | 5.14, 6.14 |
| 11 | 8.9, 9.6, 11.14, 18.5 | 16 | 5.15-5.16, 6.15 |
| 12 | 8.10, 9.7, 11.15-11.17, 18.7 | 17 | 5.17-5.19, 6.16 |
| 13 | 8.11, 9.8, 11.18, 18.8 | 18 | 5.20, 6.17 |
| 14 | 8.12, 14, 18.9 | 19 | 5.22, 8, 9, 11 |
| 15 | 8.4, 8.14-8.16, 11.20-11.21, 11.24, 18.10 | 11, 25 | 5.23-5.24, 6.19-6.22, 7 |
| 16 | 8.18, 9.10, 11.23, 18.11 | 22.3 (imports), 27 (workflow 11) | 5.25, 6.23 |
| 17 | 19.2, 18.12 plus full models | 29 | 3.2 (mock/) |
| 18 | Whole-document acceptance | 30 | 13, 14 |

## 5. Phase 00: Consolidation & Foundation Setup

### Objective
Freeze implementation flow by producing authoritative consolidated docs, agent skill files, and archiving legacy specs.

### Requirements scope
§1 (precedence), §2 (discipline), §3 (baseline), §4 (constraints), §31 (prohibitions)

### Design scope
§2 (principles), §3 (repo structure), §14 (prohibitions)

### Task checklist
1. Archive `.kiro/specs/` to `_archive/.kiro/specs/`.
2. Create `.opencode/skills/backend/SKILL.md` with all backend conventions, prohibitions, patterns.
3. Create `.opencode/skills/frontend/SKILL.md` with all frontend conventions, prohibitions, patterns.
4. Create consolidated `docs/requirements.md` (31 sections, merged from 11 documents + codebase + analysis).
5. Create consolidated `docs/design.md` (14 sections, full architecture + data models + API specs).
6. Create consolidated `docs/tasks.md` (18 phases, complete checklists + traceability).
7. Create `docs/traceability-matrix.md` mapping PRD → Requirements → Design → Phases.
8. Verify no `.kiro/*` files remain authoritative (all content absorbed into `docs/*`).

### Files to create
- `_archive/.kiro/specs/` (moved from `.kiro/specs/`)
- `.opencode/skills/backend/SKILL.md`
- `.opencode/skills/frontend/SKILL.md`
- `docs/requirements.md` (overwrite)
- `docs/design.md` (overwrite)
- `docs/tasks.md` (overwrite)
- `docs/traceability-matrix.md` (overwrite)

### Step-5 reviewable artifact
- All 6 new/updated files exist and are readable.
- `.kiro/specs/` is archived under `_archive/`.
- Docs are self-consistent (no §20 cross-ref bug, password 12 chars, bcrypt 12 rounds, etc.).

### Completion gates
- No unresolved contradiction across docs.
- Password min length = 12 everywhere; bcrypt = 12 everywhere.
- Theme path consistently `client/src/app/theme/` in all docs.
- All B1-B20 missing functionalities are added to requirements.
- All A1-A20 contradictions are resolved per winning source.
- `.kiro/` no longer authoritative.

## 6. Phase 01: Frontend Foundation — Theme, Layout, Routing

### Objective
Running app at `localhost:3000` showing styled MUI theme, main layout shell, and route structure with placeholder pages.

### Requirements scope
§3 (baseline), §4.3 (frontend constraints), §5.4 (frontend deliverables), §28 (UI requirements)

### Design scope
§3.3 (frontend structure), §7 (frontend architecture), §7.6 (AppLayout shell)

### Task checklist
1. Move `client/src/theme/` → `client/src/app/theme/` with all existing files.
2. Create/full theme modules:
   - `app/theme/index.js` — `createTheme()` with colorSchemes, typography, shape.
   - `app/theme/AppTheme.jsx` — ThemeProvider with `useMemo`, `disableTransitionOnChange`.
   - `app/theme/themePrimitives.js` — brand/gray/green/orange/red colors, typography, shadows, shape, layoutConfig.
   - `app/theme/customizations/index.js` — aggregates all.
   - `app/theme/customizations/inputs.js` — TextField, Select, Autocomplete overrides.
   - `app/theme/customizations/dataDisplay.js` — Card, Chip, Avatar, Table overrides.
   - `app/theme/customizations/feedback.js` — Alert, Skeleton, LinearProgress overrides.
   - `app/theme/customizations/navigation.js` — Drawer, AppBar, Tabs, Breadcrumbs overrides.
   - `app/theme/customizations/surfaces.js` — Paper, Dialog overrides.
   - `app/theme/customizations/charts.js` — MUI X Charts overrides.
   - `app/theme/customizations/dataGrid.js` — MUI X DataGrid overrides.
   - `app/theme/customizations/datePickers.js` — DatePicker overrides.
3. Create Redux theme slice with dark mode toggle.
4. Create `AppProviders` in `app/providers.jsx` with Redux, Theme, Router, ErrorBoundary.
5. Create `router.jsx` in `app/router.jsx` with route definitions.
6. Create `<ProtectedRoute>` and `<GuestRoute>` components.
7. Create AppLayout:
   - `<TopBar>` with hamburger (mobile), logo, search, notification bell, dark mode toggle, user menu.
   - `<SideNav>` with navigation items, collapsible sections, active state.
   - `<AppLayout>` composition with outlet for page content.
   - Responsive: drawer navigation on mobile, persistent sidebar on desktop.
8. Create placeholder pages for all main routes (Dashboard, Requests, Work Orders, PM, Assets, Locations, Inventory, Vendors, Reports, Settings, etc.) — each returns `<PagePlaceholder title="..." />`.
9. Create `<LoadingState>`, `<EmptyState>`, `<ErrorState>`, `<NotFoundPage>`, `<ForbiddenPage>` feedback components.
10. Update `main.jsx` to render `<AppProviders>`.
11. Update `App.jsx` to return bootstrap detection + AppProviders composition.
12. Ensure all MUI imports are tree-shakable, Grid uses `size` prop, no `react-router-dom`.

### Files to create/modify
- Move: `client/src/theme/*` → `client/src/app/theme/*`
- Create: `app/providers.jsx`, `app/router.jsx`, `app/store.js`, `app/theme/*` (full)
- Create: `components/layout/AppLayout.jsx`, `TopBar.jsx`, `SideNav.jsx`, `PageHeader.jsx`
- Create: `components/feedback/LoadingState.jsx`, `EmptyState.jsx`, `ErrorState.jsx`, `AlertBanner.jsx`
- Create: `store/slices/themeSlice.js`
- Modify: `src/main.jsx`, `src/App.jsx`

### Step-5 reviewable artifact
Visit `localhost:3000` → see dark/light toggle working, sidebar navigation rendering, routes navigating to placeholder pages.

### Completion gates
- Theme renders correctly with light/dark modes.
- AppLayout responsive on mobile and desktop.
- Router works with all route guards.
- All MUI imports tree-shakable, no deprecated patterns.

## 7. Phase 02: Backend Core Infrastructure

### Objective
Complete backend scaffold with all middleware, domain structure, constants, health endpoint, error handling.

### Requirements scope
§4.2 (backend constraints), §5.3 (backend deliverables), §22 (API requirements), §23 (security), §24 (non-functional), §26 (error handling)

### Design scope
§4 (backend architecture), §4.10 (rate limiter), §4.11 (auth middleware), §4.12 (pagination), §4.13 (constants), §6.1 (health + bootstrap routes)

### Task checklist
1. Create `config/env.js` — validate required env vars: PORT, MONGODB_URI, JWT_SECRET, JWT_REFRESH_SECRET, CLIENT_URL, SMTP_*, etc.
2. Create `config/database.js` — Mongoose connection with retry logic, event handlers.
3. Create `config/logger.js` — Winston: console + file transports, log levels.
4. Create `config/cors.js` — CORS config for client origin + credentials.
5. Create `utils/constants.js` — FULL constant file per design §4.13 (all enums, statuses, permissions, event names, business constants).
6. Create `utils/errors.js` — AppError, NotFoundError, ValidationError, ConflictError, UnauthorizedError, ForbiddenError, RateLimitError.
7. Create `utils/http.js` — successResponse, paginatedResponse, errorResponse helpers.
8. Create `utils/pagination.js` — getPagination, getPaginationMetadata.
9. Create `utils/query.js` — buildFilterQuery, buildSort helpers.
10. Create `utils/dates.js` — formatInTimezone, dateRange helpers.
11. Create `utils/logger.js` — logger instance.
12. Create `middlewares/request/requestId.js` — UUID per request on `req.requestId`.
13. Create `middlewares/request/requestLogger.js` — Morgan/Winston logging.
14. Create `middlewares/security/helmet.js` — helmet middleware config.
15. Create `middlewares/security/cors.js` — cors middleware using config.
16. Create `middlewares/security/rateLimiter.js` — general (100/min), auth (5/15min), bootstrap (5/hr) limiters.
17. Create `middlewares/security/mongoSanitize.js` — express-mongo-sanitize.
18. Create `middlewares/validation/validateRequest.js` — express-validator result evaluation.
19. Create `middlewares/validation/normalizeValidated.js` — attach `req.validated` with defaults.
20. Create `middlewares/auth/decodeToken.js` — read JWT from cookie, decode, attach req.user.
21. Create `middlewares/auth/requireAuth.js` — return 401 if no req.user.
22. Create `middlewares/auth/csrfProtection.js` — validate CSRF header on mutations.
23. Create `middlewares/error/notFound.js` — 404 handler.
24. Create `middlewares/error/errorHandler.js` — centralized error formatting + logging.
25. Create `routes/index.js` — aggregate all routes under `/api/v1`. Register health route.
26. Create `routes/health.routes.js` — `GET /api/v1/health` (no auth).
27. Expand `app.js` — full middleware stack per design §4.1 + §4.3.
28. Expand `server.js` — HTTP server + DB connect + graceful shutdown.
29. Create `sockets/index.js` — Socket.IO server setup shell.
30. Create `sockets/events.js` — SOCKET_EVENTS constants.
31. Create `jobs/index.js` — node-cron bootstrap with ENABLE_SCHEDULERS guard.
32. Create `controllers/health/health.controller.js` — health check logic.
33. Create `domains/` directory structure placeholders.

### Files to create/modify
- Create: all `config/*`, `middlewares/*`, `utils/*` files listed above
- Create: `routes/index.js`, `routes/health.routes.js`
- Create: `sockets/index.js`, `sockets/events.js`
- Create: `jobs/index.js`
- Modify: `app.js`, `server.js`

### Step-5 reviewable artifact
`curl GET /api/v1/health` returns `{ success: true, data: { status: "ok", uptime, timestamp, dbStatus } }`.
Server boots without errors.

### Completion gates
- App boots with correct middleware ordering.
- `req.validated` contract works.
- Error handling centralized with proper status codes.
- Rate limiting, security headers, CORS all functional.
- Database connects with retry logic.
- Constants file complete with all domains.

## 8. Phase 03: Frontend Core Infrastructure

### Objective
Complete frontend shell: Redux store, axios client, shared components, domain placeholders.

### Requirements scope
§4.3 (frontend constraints), §5.4, §28 (UI requirements)

### Design scope
§7 (frontend architecture), §7.1-§7.5

### Task checklist
1. Create `app/store.js` — Redux Toolkit store with auth, notifications, theme slices + redux-persist.
2. Create `store/slices/authSlice.js` — user, isAuthenticated, loading states + actions.
3. Create `store/slices/notificationSlice.js` — items, unreadCount.
4. Create `utils/constants.js` — frontend SSOT: route keys, nav sections, filter keys, table columns, UI options.
5. Create `utils/routes.js` — route path constants matching router.
6. Create `utils/permissions.js` — hasPermission, hasRole helpers.
7. Create `utils/formatting.js` — formatDate, formatCurrency, formatName, truncate.
8. Create `utils/validation.js` — common validation rules (email, password, phone).
9. Create `utils/storage.js` — localStorage wrappers.
10. Create `utils/dates.js` — date-fns wrappers for common formats.
11. Create `services/api/client.js` — axios instance with baseURL, withCredentials, interceptors.
12. Create `services/sockets/client.js` — Socket.IO connection manager.
13. Create `components/layout/AppLayout.jsx` — TopBar + SideNav + Outlet composition.
14. Create `components/layout/TopBar.jsx` — hamburger, logo, search, notifications, dark mode toggle, user avatar.
15. Create `components/layout/SideNav.jsx` — nav items from constants, active state, collapsible.
16. Create `components/layout/PageHeader.jsx` — title, breadcrumb, action buttons.
17. Create `components/feedback/LoadingState.jsx` — centered CircularProgress or Skeleton.
18. Create `components/feedback/EmptyState.jsx` — illustration + message + action button.
19. Create `components/feedback/ErrorState.jsx` — error message + retry button.
20. Create `components/feedback/AlertBanner.jsx` — dismissible alert.
21. Create `pages/bootstrap/BootstrapPage.jsx` — bootstrap detection + form UI (Phase 03.5 integration).
22. Update `main.jsx` — render AppProviders.
23. Update `App.jsx` — bootstrap detection + AppProviders.

### Files to create
- `app/store.js`, `store/slices/authSlice.js`, `store/slices/notificationSlice.js`
- All `utils/*` files, `services/api/client.js`, `services/sockets/client.js`
- `components/layout/*`, `components/feedback/*`

### Step-5 reviewable artifact
Frontend app runs on `localhost:3000`, shows layout shell with sidebar, all navigation items present.

### Completion gates
- Redux store configured with auth + notifications + theme.
- Axios client with interceptors functional.
- Layout renders correctly with responsive behavior.
- All shared components exist with proper states.

## 9. Phase 03.5: System Bootstrap Mechanism

### Objective
Implement bootstrap endpoint + UI for first-time system setup.

### Requirements scope
§7 (bootstrap requirements)

### Design scope
§4.11 (auth middleware), §6.1 (bootstrap routes), §4.10 (rate limiter)

### Task checklist
**Backend:**
1. Create `controllers/bootstrap/bootstrap.controller.js` — `initializeSystem`, `getBootstrapStatus`.
2. Create `services/bootstrap/bootstrap.service.js` — atomic transaction for org + admin user creation.
3. Create `validators/bootstrap/initialize.validator.js` — validate org + admin fields.
4. Create `routes/bootstrap.routes.js` — register before auth routes.
5. Register bootstrap routes in `routes/index.js` (before auth routes).
6. Add bootstrap rate limiter (5/hr per IP).
7. Ensure password uses bcrypt 12, password min 12 validation.
8. Ensure admin user created with `emailVerified: true`, Super_Admin role.

**Frontend:**
9. Create `pages/bootstrap/BootstrapPage.jsx` — full bootstrap form.
10. Create `hooks/useBootstrapDetection.js` — check bootstrap status on load.
11. Integrate bootstrap detection into `App.jsx`.

### Files to create
- `controllers/bootstrap/bootstrap.controller.js`
- `services/bootstrap/bootstrap.service.js`
- `validators/bootstrap/initialize.validator.js`
- `routes/bootstrap.routes.js`
- `pages/bootstrap/BootstrapPage.jsx`
- `hooks/useBootstrapDetection.js`

### Step-5 reviewable artifact
`POST /api/v1/bootstrap/initialize` with valid data → 201. Re-run → 409.
Frontend shows bootstrap page on fresh system, redirects to login after success.

### Completion gates
- Bootstrap endpoint creates org + admin atomically.
- Password validated at 12+ chars with bcrypt 12.
- 409 returned when already initialized.
- Rate limited at 5/hr.
- Frontend detects bootstrap requirement, shows form, redirects to login on success.

## 10. Phase 04: Authentication and Session Management

### Objective
Full auth lifecycle: register, login, refresh, logout, remember_me, account lockout, password management.

### Requirements scope
§8 (authentication requirements), §23.5-§23.6 (security)

### Design scope
§4.11 (auth middleware), §5.6 (User model), §5.7 (UserSession model), §12 (security architecture)

### Task checklist
**Backend:**
1. Create UserSession model.
2. Create auth domain: controller, service, validator, routes.
3. Implement `POST /api/v1/auth/register` — validate, hash (bcrypt 12), create user, issue tokens.
4. Implement `POST /api/v1/auth/login` — validate, check lockout, verify password, clear fails, issue tokens.
5. Implement account lockout: track loginAttempts, lockUntil, escalation logic.
6. Implement `POST /api/v1/auth/refresh` — validate refresh token from cookie, rotate, issue new pair.
7. Implement `DELETE /api/v1/auth/logout` — revoke session, clear cookie.
8. Implement `DELETE /api/v1/auth/sessions` — revoke all sessions for user.
9. Implement `GET /api/v1/auth/me` — return user profile.
10. Implement `PATCH /api/v1/auth/me` — update profile fields.
11. Implement `PATCH /api/v1/auth/me/password` — verify old, enforce history check, hash new.
12. Implement `POST /api/v1/auth/forgot-password` — generate reset token, send email.
13. Implement `POST /api/v1/auth/reset-password` — validate token, reset password, revoke sessions.
14. Implement `GET /api/v1/auth/sessions` — list active sessions.
15. Implement `DELETE /api/v1/auth/sessions/:id` — revoke specific session.
16. Implement `GET /api/v1/auth/permissions` — return user's resolved permissions.
17. Remember me: accept `remember_me` flag in login, extend refresh token to 30d.
18. JWT utility: sign, verify, cookie helpers (httpOnly, secure, sameSite).
19. CSRF token generation + validation.
20. Auth rate limiter (5/15min per IP).

**Frontend:**
21. Create `pages/auth/LoginPage.jsx` — email + password + remember_me checkbox, validation, error states.
22. Create `pages/auth/RegisterPage.jsx` — registration form with password strength indicator.
23. Create `pages/auth/ForgotPasswordPage.jsx` — email input, success message.
24. Create `pages/auth/ResetPasswordPage.jsx` — new password + confirm, token validation.
25. Create `domains/auth/` — API calls, hooks.
26. Update axios interceptor for token refresh.
27. Update AuthGuard for protected routes.
28. Update store/authSlice for full auth flow.

### Files to create
- `models/userSession.model.js`
- Full `controllers/auth/*`, `services/auth/*`, `validators/auth/*`, `routes/auth.routes.js`
- `pages/auth/*`, `domains/auth/*`

### Step-5 reviewable artifact
Complete auth flow: register → login (with remember_me) → refresh → logout → lockout after 5 bad attempts → forgot/reset password.

### Completion gates
- Register, login, refresh, logout all work end-to-end.
- Account lockout: 5 failures → 30-min lock.
- Remember me: 30-day refresh token.
- Password: 12+ chars, bcrypt 12, history check.
- CSRF protection on mutations.
- All auth routes rate-limited.

## 11. Phase 05: Organization, Property, Location Management

### Objective
Implement foundational administrative structures.

### Requirements scope
§9 (org, property, location), §21 (data model conventions)

### Design scope
§5.2-5.4 (models), §6.3-6.5 (routes)

### Task checklist
**Backend:**
1. Create Organization model with `code` field.
2. Create Property model.
3. Create Location model with parent-child hierarchy.
4. Create MasterDataConfig model.
5. Create organization domain: controller, service, validator, routes.
6. Create property domain: CRUD + status management.
7. Create location domain: CRUD + tree query + subtree filtering.
8. Create master data domain: CRUD for categories, statuses, etc.
9. Implement location hierarchy logic (ancestors, descendants, depth validation).
10. Implement property-scoped user filtering.

**Frontend:**
11. Create `pages/organizations/OrgSettingsPage.jsx`.
12. Create `pages/properties/PropertyListPage.jsx`, PropertyDetailPage.
13. Create `pages/locations/LocationTreePage.jsx`, LocationDetailPage.
14. Create location tree navigation with expand/collapse.

### Step-5 reviewable artifact
Create org → add property → add locations with hierarchy → view location tree.

## 12. Phase 06: Users, Roles, Teams, and Access Control

### Objective
Implement user administration, roles, permissions, teams.

### Requirements scope
§10 (user, role, permission)

### Design scope
§5.5-5.8 (models), §6.6-6.8 (routes)

### Task checklist
**Backend:**
1. Create Role model with built-in roles provisioning.
2. Create User model with roleIds, propertyIds, locationIds.
3. Create Team model.
4. Create user domain: CRUD, invite, status, force-logout.
5. Create role domain: CRUD, built-in + custom roles.
6. Create team domain: CRUD.
7. Implement permission resolution utility.
8. Implement forced logout on role/permission changes.
9. Implement audit logging for access changes.

**Frontend:**
10. Create `pages/users/UserListPage.jsx`, UserDetailPage.
11. Create `pages/roles/RoleListPage.jsx`, RoleDetailPage.
12. Create `pages/teams/TeamListPage.jsx`, TeamDetailPage.
13. Create role assignment UI.
14. Create permission matrix editor.

### Step-5 reviewable artifact
Create roles → create users with roles → assign to properties → verify permission enforcement.

## 13. Phase 07: Assets, Meters, and Documents

### Objective
Full asset management with lifecycle, meters, document upload.

### Requirements scope
§12 (assets), §20 (documents)

### Design scope
§5.9-5.11 (asset models), §5.21 (document model), §6.10-6.11 (routes), §10 (file upload)

### Task checklist
**Backend:**
1. Create Asset model with `severity` field, hierarchy, lifecycle status.
2. Create AssetMeter model.
3. Create AssetMeterReading model.
4. Create Document model.
5. Implement asset CRUD + tree + transfer + retire + replace.
6. Implement meter CRUD + reading entry + reading history.
7. Implement document upload/download/delete with multer + sharp.
8. Implement asset transfer, replacement, retirement business rules.

**Frontend:**
9. Create `pages/assets/AssetListPage.jsx`, AssetDetailPage.
10. Create asset create/edit form with hierarchy selector.
11. Create meter reading UI.
12. Create document upload with react-dropzone.
13. Create image gallery with lightbox.

### Step-5 reviewable artifact
Create asset hierarchy → add meter → enter reading → upload document → transfer asset → view history.

## 14. Phase 08: Work Request Intake and Triage

### Objective
Request intake, duplicate detection, triage workflow.

### Requirements scope
§13 (work requests)

### Design scope
§5.12 (WorkRequest model), §6.12 (routes)

### Task checklist
**Backend:**
1. Create WorkRequest model.
2. Implement request CRUD.
3. Implement duplicate detection (same location + category within time window).
4. Implement status transitions: submitted → under_review → approved/rejected/needs_clarification.
5. Implement request → work order conversion.
6. Implement notification triggers for request events.

**Frontend:**
7. Create `pages/requests/RequestListPage.jsx`, RequestCreatePage, RequestDetailPage.
8. Create duplicate warning UI.
9. Create approval/rejection/clarification dialogs.

### Step-5 reviewable artifact
Submit request → see duplicate warning → triage → approve → convert to work order.

## 15. Phase 09: Work Order Core Lifecycle

### Objective
Central work order engine with full lifecycle.

### Requirements scope
§14 (work orders)

### Design scope
§5.13 (WorkOrder model), §6.13 (routes)

### Task checklist
**Backend:**
1. Create WorkOrder model with all fields (woNumber, status, priority, severity, guestImpact, tasks, checklist, labor, parts, comments, SLA, downtime).
2. Implement WO CRUD with auto-numbering (`WO-{CODE}-{YYYY}-{SEQUENCE}`).
3. Implement status transition validation.
4. Implement assignment (user/team/vendor) + notification.
5. Implement labor entry + timer.
6. Implement parts usage tracking.
7. Implement comments with @mentions.
8. Implement completion + verification + close + reopen + cancel.
9. Implement downtime event tracking.
10. Implement SLA tracking + escalation triggers.
11. Implement merge functionality.

**Frontend:**
12. Create `pages/workOrders/WorkOrderListPage.jsx` — kanban + table view.
13. Create `pages/workOrders/WorkOrderDetailPage.jsx` — all panels.
14. Create assignment, status-change, completion, verification dialogs.
15. Create labor timer UI.
16. Create parts usage selector.
17. Create comment input with @mentions.

### Step-5 reviewable artifact
Create WO → change status through workflow → assign → add labor → add parts → complete → verify → close → view total cost.

## 16. Phase 10: Preventive Maintenance

### Objective
PM plans, schedule generation, calendar integration.

### Requirements scope
§15 (PM)

### Design scope
§5.14 (PMModel), §6.14 (routes), §9.2 (PM generation job)

### Task checklist
**Backend:**
1. Create PreventiveMaintenancePlan model.
2. Implement PM plan CRUD.
3. Implement time-based, meter-based, seasonal, hybrid plan logic.
4. Implement nextDueDate calculation + generation logic.
5. Implement PM generation cron job.
6. Implement occurrence tracking.
7. Implement blackout/service window compliance.
8. Implement PM calendar + forecast endpoints.

**Frontend:**
9. Create `pages/pm/PMListPage.jsx`, PMDetailPage, PMCalendarPage.
10. Create PM calendar view with @fullcalendar.
11. Create PM completion form.

### Step-5 reviewable artifact
Create PM plan → verify auto-generation → see on calendar → complete → verify next due date.

## 17. Phase 11: Inspections, Checklists, and Procedures

### Objective
Checklist templates, inspection execution, follow-up work.

### Requirements scope
§16 (inspections)

### Design scope
§5.15-5.16 (checklist + inspection models), §6.15 (routes)

### Task checklist
**Backend:**
1. Create ChecklistTemplate model with versioning.
2. Create InspectionExecution model.
3. Implement template CRUD with version management.
4. Implement inspection execution with response capture.
5. Implement conditional logic, required items, fail actions.
6. Implement follow-up work creation (request/WO) on failure.

**Frontend:**
7. Create `pages/checklists/ChecklistListPage.jsx`, ChecklistDetailPage.
8. Create inspection execution UI with response types.
9. Create evidence capture (photo, signature).

### Step-5 reviewable artifact
Create checklist template → execute inspection → fail item → verify follow-up WO created.

## 18. Phase 12: Inventory and Spare Parts

### Objective
Parts catalog, stock control, transactions, low-stock alerts.

### Requirements scope
§17 (inventory)

### Design scope
§5.17-5.19 (models), §6.16 (routes)

### Task checklist
**Backend:**
1. Create Part, InventoryStockLine, InventoryTransaction models.
2. Implement part master CRUD.
3. Implement stock line CRUD (per property/storeroom/bin).
4. Implement transactions: receipt, issue, return, transfer, adjustment, cycle count.
5. Implement reservation system (reserve for WO → release on complete/cancel).
6. Implement low-stock calculation + notification triggers.
7. Implement substitute part suggestion.

**Frontend:**
8. Create `pages/inventory/InventoryListPage.jsx`, InventoryDetailPage.
9. Create stock adjustment UI.
10. Create low-stock alerts display.
11. Create transaction history view.

### Step-5 reviewable artifact
Create part → add stock → issue to WO → return → transfer → see low-stock alert.

## 19. Phase 13: Vendors and Restricted Contractor Access

### Objective
Vendor management, compliance tracking, restricted portal.

### Requirements scope
§18 (vendors)

### Design scope
§5.20 (vendor model), §6.17 (routes)

### Task checklist
**Backend:**
1. Create Vendor model with compliance documents.
2. Implement vendor CRUD.
3. Implement compliance document tracking + expiry notifications.
4. Implement vendor user invitation with restricted access.
5. Implement vendor-performed work flow.
6. Implement vendor rating + performance metrics.

**Frontend:**
7. Create `pages/vendors/VendorListPage.jsx`, VendorDetailPage.
8. Create vendor portal pages.
9. Create performance chart.

### Step-5 reviewable artifact
Create vendor → add compliance doc → assign WO → vendor marks complete → verify → rate.

## 20. Phase 14: Notifications and Real-Time Synchronization

### Objective
In-app + email notifications, Socket.IO real-time updates.

### Requirements scope
§19 (notifications)

### Design scope
§5.22 (notification model), §8 (Socket.IO), §9.5 (notification dispatch job), §11 (email)

### Task checklist
**Backend:**
1. Create Notification model.
2. Implement notification CRUD.
3. Implement notification generation across all domains (request, WO, PM, inventory, vendor).
4. Implement email dispatch via Nodemailer + notification dispatch job.
5. Implement quiet hours + batching.
6. Implement Socket.IO event emission.
7. Implement user notification preferences.

**Frontend:**
8. Create `pages/notifications/NotificationCenterPage.jsx`.
9. Add notification bell with badge to TopBar.
10. Implement socket subscriptions for real-time updates.
11. Implement toast notifications.

### Step-5 reviewable artifact
Trigger notification → see bell badge → open dropdown → view in center → receive socket update.

## 21. Phase 15: Dashboards, Search, Saved Views, Reporting, Audit UX

### Objective
Dashboard KPIs, charts, reports (PDF/CSV), saved views, audit log viewer.

### Requirements scope
§11 (dashboard), §25 (audit)

### Design scope
§6.9 (dashboard routes), §6.19-6.22, §6.24 (report, saved view, settings, audit routes)

### Task checklist
**Backend:**
1. Implement dashboard KPI aggregation endpoints.
2. Implement dashboard chart data endpoints.
3. Implement report generation (WO, asset, PM, inventory, vendor).
4. Implement PDF export (jsPDF) and CSV export.
5. Implement saved views CRUD.
6. Implement audit log query with filters.
7. Implement Settings endpoints (profile, org, email config).

**Frontend:**
8. Create `pages/dashboard/DashboardPage.jsx` — KPI cards, charts (recharts), recent items.
9. Create `pages/reports/ReportsHubPage.jsx`, ReportDetailPage.
10. Create `pages/settings/ProfilePage.jsx`, OrgSettingsPage, EmailConfigPage.
11. Create `pages/audit/AuditLogPage.jsx`.
12. Create saved views management UI.

### Step-5 reviewable artifact
Dashboard shows real data → filter report → export PDF → view audit log → save view → reload.

## 22. Phase 16: Data Import, Export, and Migration

### Objective
CSV import with dry-run, validation, commit.

### Requirements scope
§22.3 (import routes), §27 (workflow 11)

### Design scope
§5.25 (ImportJob model), §6.23 (routes)

### Task checklist
**Backend:**
1. Create ImportJob model.
2. Implement upload, dry-run validation, commit flow.
3. Implement CSV parsing with csv-parse.
4. Implement row-level error reporting.
5. Implement downloadable error file.

**Frontend:**
6. Create `pages/imports/ImportListPage.jsx`, ImportCreatePage.
7. Create import upload UI with dry-run + commit workflow.
8. Create error result display.

### Step-5 reviewable artifact
Upload CSV → dry run → see validation errors → fix → commit → see imported data.

## 23. Phase 17: Mock Data Injection and Demo Dataset

### Objective
Realistic seed data after all models exist.

### Requirements scope
§29 (mock data)

### Design scope
§3.2 (mock/ directory)

### Task checklist
1. Create `backend/mock/index.js` — aggregate mock modules.
2. Create `backend/mock/seed.js` — seed entry point.
3. Create `backend/mock/organizations.mock.js` — 1 organization.
4. Create `backend/mock/properties.mock.js` — 2-3 properties.
5. Create `backend/mock/locations.mock.js` — full hierarchy for each property.
6. Create `backend/mock/roles.mock.js` — all built-in roles.
7. Create `backend/mock/users.mock.js` — users with role assignments.
8. Create `backend/mock/teams.mock.js` — teams with members.
9. Create `backend/mock/assets.mock.js` — assets with hierarchy, severity, meters.
10. Create `backend/mock/requests.mock.js` — work requests.
11. Create `backend/mock/workOrders.mock.js` — work orders at various statuses.
12. Create `backend/mock/pmPlans.mock.js` — PM plans with occurrences.
13. Create `backend/mock/checklists.mock.js` — checklist templates.
14. Create `backend/mock/parts.mock.js` — part masters.
15. Create `backend/mock/inventory.mock.js` — stock lines with quantities.
16. Create `backend/mock/vendors.mock.js` — vendors + compliance docs.
17. Create `backend/mock/notifications.mock.js` — sample notifications.
18. Create `backend/mock/savedViews.mock.js` — default saved views.

### Step-5 reviewable artifact
Run seed script → full app with realistic data across all domains.

## 24. Phase 18: Final Cross-Phase Alignment and Completion Gate

### Objective
Final reconciliation, verification, and delivery.

### Requirements scope
§30 (acceptance)

### Design scope
§13 (audit), §14 (prohibitions)

### Task checklist
1. Reconcile all implemented files against `docs/requirements.md`.
2. Reconcile repository structure against `docs/design.md`.
3. Reconcile every feature against PRD acceptance criteria.
4. Verify no prohibited patterns were introduced.
5. Verify constants SSOTs are actually used everywhere.
6. Verify responsive design for all screens.
7. Verify all required screens have matching route, UI, API, data support.
8. Verify mock data only in Phase 17 designated location.
9. Verify all error states (400, 401, 403, 404, 409, 429, 500) handled appropriately.
10. Verify audit logging on all state-changing operations.
11. Verify JSDoc on all exported modules and non-trivial helpers.
12. Generate implementation summary for user review.

### Step-5 reviewable artifact
Complete project audit report showing all requirements satisfied.

## 25. Non-Negotiables (All Phases)

1. Do not bypass `req.validated` — controllers consume only validated input.
2. Do not bypass `req.user` — actor context for auth, audit, notifications.
3. Do not hardcode backend domain constants outside `backend/utils/constants.js`.
4. Do not hardcode frontend shared constants outside `client/src/utils/constants.js`.
5. Do not use non-tree-shakable MUI imports.
6. Do not use `react-router-dom`.
7. Do not use React Hook Form `watch()`.
8. Do not use deprecated Grid `item` patterns.
9. Do not use hardcoded styling tokens where theme values are required.
10. Do not introduce mock data before Phase 17.
11. Every UI-touching phase must implement loading, empty, error, and responsive states.
12. Password min length: 12 characters. bcrypt cost: 12 rounds.
13. Every state-changing operation must create an audit log entry.
14. Every mutable model must include `revision` field for optimistic concurrency.
