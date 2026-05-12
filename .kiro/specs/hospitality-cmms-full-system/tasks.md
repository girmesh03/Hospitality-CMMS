# Hospitality CMMS Implementation Tasks

## 1. Task Document Purpose

This document converts `.kiro/specs/hospitality-cmms-full-system/requirements.md` and `.kiro/specs/hospitality-cmms-full-system/design.md` into a phase-based implementation plan for developer AI execution.

This task plan is mandatory.

## 2. Phase Planning Rules

1. The implementation order is `requirements.md -> design.md -> tasks.md -> task-execution-protocol.md`.
2. Every phase must be executed using `docs/task-execution-protocol.md`.
3. Phases must be feature-based unless the phase is a prerequisite required to enable later feature work.
4. A later phase may not begin until the earlier phase completion gate is satisfied or an explicit document change reorders dependencies.
5. Mock data injection under `backend/mock/*` is prohibited until all models are implemented and the designated mock-data phase begins.

## 3. Phase Summary

| Phase | Name                                                          | Type         | Depends On         |
| ----- | ------------------------------------------------------------- | ------------ | ------------------ |
| 00    | Documentation Lock and Traceability Setup                     | Prerequisite | None               |
| 01    | Repository Foundation and Shared Conventions                  | Prerequisite | 00                 |
| 02    | Backend Core Infrastructure                                   | Prerequisite | 01                 |
| 03    | Frontend Core Infrastructure                                  | Prerequisite | 01                 |
| 03.5  | System Bootstrap Mechanism                                    | Prerequisite | 02, 03             |
| 04    | Authentication and Session Management                         | Feature      | 02, 03, 03.5       |
| 05    | Organization, Property, Location, and Master Data Foundations | Feature      | 02, 03, 04         |
| 06    | Users, Roles, Teams, and Access Control                       | Feature      | 05                 |
| 07    | Assets, Meters, Documents, and Location Context               | Feature      | 05, 06             |
| 08    | Work Request Intake and Triage                                | Feature      | 05, 06, 07         |
| 09    | Work Order Core Lifecycle                                     | Feature      | 08                 |
| 10    | Preventive Maintenance                                        | Feature      | 07, 09             |
| 11    | Inspections, Checklists, and Procedures                       | Feature      | 09, 10             |
| 12    | Inventory and Spare Parts                                     | Feature      | 07, 09             |
| 13    | Vendors and Restricted Contractor Access                      | Feature      | 09, 12             |
| 14    | Notifications and Real-Time Synchronization                   | Feature      | 08, 09, 10, 12, 13 |
| 15    | Dashboards, Search, Saved Views, Reporting, and Audit UX      | Feature      | 05 through 14      |
| 16    | Data Import, Export, and Migration Operations                 | Feature      | 05 through 15      |
| 17    | Mock Data Injection and Demo Dataset Assembly                 | Late Support | 05 through 16      |
| 18    | Final Cross-Phase Alignment and Completion Gate               | Completion   | 00 through 17      |

## 4. Phase Traceability Matrix

| Phase | Primary Requirements Scope                  | Primary Design Scope                        |
| ----- | ------------------------------------------- | ------------------------------------------- |
| 00    | Requirements sections 1 to 30               | Design sections 1 to 14                     |
| 01    | Requirements sections 22, 23, 24, 25, 26    | Design sections 2 and 3                     |
| 02    | Requirements sections 22, 23, 24, 25        | Design section 4                            |
| 03    | Requirements sections 22, 26, 28            | Design sections 5, 6, 7, and 8              |
| 03.5  | Requirement 0                               | Design sections 4.1.5 and 5.1.5             |
| 04    | Requirements 1                              | Design sections 4, 5, and 9.1               |
| 05    | Requirements 2, 3, 20                       | Design sections 3, 4, 5, and 9.2            |
| 06    | Requirements 4, 5                           | Design sections 4, 5, and 9.2               |
| 07    | Requirements 6, 7, 8                        | Design sections 4, 5, 6, and 9.3            |
| 08    | Requirement 9                               | Design sections 4, 5, 6, 7, 8, and 9.3      |
| 09    | Requirement 10                              | Design sections 4, 5, 6, 7, 8, and 9.3      |
| 10    | Requirement 11                              | Design sections 4, 5, 6, 7, and 9.3         |
| 11    | Requirement 12                              | Design sections 4, 5, 6, 7, 8, and 9.3      |
| 12    | Requirement 13                              | Design sections 4, 5, 6, 7, 8, and 9.3      |
| 13    | Requirement 14                              | Design sections 4, 5, 6, 7, 8, and 9.3      |
| 14    | Requirements 15, 29                         | Design sections 4, 5, 8, 9.3, and 10        |
| 15    | Requirements 16, 17, 18, 19                 | Design sections 5, 6, 7, 8, 9.3, 10, and 11 |
| 16    | Requirement 21                              | Design sections 4, 5, 10, and 11.4          |
| 17    | Requirements 1-21 (mock data coverage)      | Design section 12                           |
| 18    | Requirements 22-30 (cross-cutting concerns) | Design sections 13 and 14                   |

## 5. Detailed Phases

## Phase 00: Documentation Lock and Traceability Setup

### Objective

Freeze the implementation flow and ensure that every later change is traceable to requirements, design, and tasks.

### Tasks

- [ ] 1. Read all specification documents together

  - Read `.kiro/specs/hospitality-cmms-full-system/requirements.md`
  - Read `.kiro/specs/hospitality-cmms-full-system/design.md`
  - Read `.kiro/specs/hospitality-cmms-full-system/tasks.md`
  - Read `docs/task-execution-protocol.md`
  - Read `docs/theming-protocol.md`
  - _Requirements: All_

- [ ] 2. Verify document precedence and resolve contradictions

  - Verify requirements document is authoritative for WHAT must be built
  - Verify design document is authoritative for HOW it must be built
  - Verify tasks document is authoritative for WHEN it must be built
  - Resolve any contradictions before feature work starts
  - _Requirements: All_

- [ ] 3. Record locked implementation defaults

  - Document backend infrastructure additions: multer, node-cron, csv-parse, sharp
  - Document auth transport: access token (15 min, memory), refresh token (7 days, httpOnly cookie)
  - Document document storage: multer with local-disk storage
  - Document scheduled jobs: in-process with node-cron, ENABLE_SCHEDULERS flag
  - Document constants sources of truth: backend/utils/constants.js, client/src/utils/constants.js
  - _Requirements: 22, 23, 24, 25_

- [ ] 4. Create traceability matrix

  - Create `.kiro/specs/hospitality-cmms-full-system/traceability-matrix.md`
  - Map all 30 requirements to design sections
  - Map all 30 requirements to task phases
  - Map all 18 phases to requirements and design sections
  - _Requirements: All_

- [ ] 5. Confirm engineering constraints are understood
  - Confirm JavaScript-only (no TypeScript)
  - Confirm ESM syntax throughout
  - Confirm JSDoc documentation required
  - Confirm Git Bash/WSL compatible commands only
  - Confirm Task Execution Protocol mandatory
  - Confirm constants single source of truth
  - Confirm no raw request access in controllers
  - Confirm no React Hook Form watch()
  - Confirm tree-shakable MUI imports only
  - Confirm MUI v9 Grid size prop
  - Confirm no react-router-dom
  - Confirm theme tokens required
  - Confirm theming protocol compliance
  - _Requirements: 22, 26_

### Deliverables

- Stable documentation set
- `.kiro/specs/hospitality-cmms-full-system/traceability-matrix.md`
- Requirement-to-design-to-task traceability mapping
- Recorded Phase 00 implementation defaults

### Completion Gate

- No unresolved contradiction remains across the docs
- Every requirement maps to at least one phase
- Phase 00 implementation defaults are documented and no longer discretionary
- Traceability matrix is complete and accurate

## Phase 01: Repository Foundation and Shared Conventions

### Objective

Create the baseline repository structure required for scalable implementation.

### Tasks

- [ ] 1. Create backend directory skeleton

  - Create `backend/config/` directory
  - Create `backend/controllers/` directory with domain subdirectories
  - Create `backend/middlewares/` directory with subdirectories
  - Create `backend/models/` directory
  - Create `backend/routes/` directory
  - Create `backend/services/` directory with domain subdirectories
  - Create `backend/validators/` directory with domain subdirectories
  - Create `backend/utils/` directory
  - Create `backend/jobs/` directory
  - Create `backend/sockets/` directory
  - Create `backend/mock/` directory (placeholder, used in Phase 17)
  - _Requirements: 22, 23_

- [ ] 2. Create frontend directory skeleton

  - Create `client/src/app/` directory
  - Create `client/src/app/theme/` directory
  - Create `client/src/app/theme/customizations/` directory
  - Create `client/src/assets/` directory
  - Create `client/src/components/` directory with subdirectories
  - Create `client/src/domains/` directory with domain subdirectories
  - Create `client/src/hooks/` directory
  - Create `client/src/services/` directory
  - Create `client/src/services/api/` directory
  - Create `client/src/store/` directory
  - Create `client/src/utils/` directory
  - _Requirements: 22, 26, 28_

- [ ] 3. Create backend constants single source of truth

  - Create `backend/utils/constants.js`
  - Add JSDoc documentation
  - Export all backend constants as named exports
  - Include placeholder constants for all domains
  - _Requirements: 22_

- [ ] 4. Create frontend constants single source of truth

  - Create `client/src/utils/constants.js`
  - Add JSDoc documentation
  - Export all frontend constants as named exports
  - Include placeholder constants for all domains
  - _Requirements: 22, 26_

- [ ] 5. Create centralized frontend theme structure

  - Create `client/src/app/theme/index.js`
  - Create `client/src/app/theme/AppTheme.jsx`
  - Create `client/src/app/theme/themePrimitives.js`
  - Create `client/src/app/theme/customizations/index.js`
  - Create `client/src/app/theme/customizations/inputs.js`
  - Create `client/src/app/theme/customizations/dataDisplay.js`
  - Create `client/src/app/theme/customizations/feedback.js`
  - Create `client/src/app/theme/customizations/navigation.js`
  - Create `client/src/app/theme/customizations/surfaces.js`
  - Create `client/src/app/theme/customizations/charts.js`
  - Create `client/src/app/theme/customizations/dataGrid.js`
  - Create `client/src/app/theme/customizations/datePickers.js`
  - Follow `docs/theming-protocol.md` standards
  - _Requirements: 26, 28_

- [ ] 6. Establish shared utility placeholders

  - Create `backend/utils/http.js` (response helpers)
  - Create `backend/utils/pagination.js` (pagination utilities)
  - Create `backend/utils/query.js` (query building utilities)
  - Create `backend/utils/dates.js` (date manipulation utilities)
  - Create `backend/utils/errors.js` (custom error classes)
  - Create `backend/utils/logger.js` (logger instance)
  - Create `backend/utils/filenames.js` (file naming utilities)
  - Create `client/src/utils/format.js` (formatting utilities)
  - Create `client/src/utils/validation.js` (validation utilities)
  - Create `client/src/utils/storage.js` (local storage utilities)
  - _Requirements: 22, 24, 25_

- [ ] 7. Ensure all modules use JSDoc

  - Add JSDoc to all created modules
  - Document all exported functions and constants
  - Include parameter types and return types
  - _Requirements: 22_

- [ ] 8. Verify JavaScript-only constraint
  - Verify no TypeScript files exist
  - Verify all files use .js or .jsx extensions
  - Verify ESM syntax throughout
  - _Requirements: 22_

### Required File Groups

- Backend config directories
- Backend controllers, services, validators, middlewares, models, routes, utils, jobs, sockets, and mock directories
- Frontend app, domains, components, services, store, hooks, utils, and theme directories

### Completion Gate

- Repository structure exists per design.md
- Backend constants single source of truth exists
- Frontend constants single source of truth exists
- Centralized frontend theme exists
- All modules use JSDoc
- JavaScript-only constraint verified

## Phase 02: Backend Core Infrastructure

### Objective

Build the backend foundation that all feature domains depend on.

### Tasks

- [ ] 1. Expand backend app bootstrap

  - Expand `backend/app.js` into full Express app configuration
  - Add middleware registration in correct order
  - Add route registration
  - Add error handling middleware
  - Add JSDoc documentation
  - _Requirements: 22, 23, 24_

- [ ] 2. Expand backend server startup

  - Expand `backend/server.js` into startup entry
  - Add clean server initialization
  - Add graceful shutdown handling
  - Add JSDoc documentation
  - _Requirements: 22, 23, 24_

- [ ] 3. Add environment configuration

  - Create `backend/config/env.js`
  - Validate all required environment variables
  - Export validated configuration
  - Add JSDoc documentation
  - _Requirements: 22, 24_

- [ ] 4. Add database connection bootstrap

  - Create `backend/config/database.js`
  - Add MongoDB connection logic
  - Add connection error handling
  - Add connection retry logic
  - Add JSDoc documentation
  - _Requirements: 23, 24_

- [ ] 5. Add structured logger setup

  - Create `backend/config/logger.js`
  - Configure Winston logger
  - Add console and file transports
  - Add log rotation
  - Add JSDoc documentation
  - _Requirements: 25_

- [ ] 6. Add request ID middleware

  - Create `backend/middlewares/request/requestId.js`
  - Generate unique request ID for each request
  - Attach request ID to req object
  - Add JSDoc documentation
  - _Requirements: 25_

- [ ] 7. Add security middleware stack

  - Create `backend/middlewares/security/helmet.js`
  - Create `backend/middlewares/security/cors.js`
  - Create `backend/middlewares/security/rateLimiter.js`
  - Create `backend/middlewares/security/mongoSanitize.js`
  - Configure helmet security headers
  - Configure CORS policies
  - Configure rate limiting
  - Configure MongoDB injection prevention
  - Add JSDoc documentation
  - _Requirements: 22_

- [ ] 8. Add centralized error classes and error middleware

  - Create `backend/utils/errors.js` with custom error classes
  - Create `backend/middlewares/error/errorHandler.js`
  - Create `backend/middlewares/error/notFound.js`
  - Add error response normalization
  - Add error logging
  - Add JSDoc documentation
  - _Requirements: 24_

- [ ] 9. Add response helpers

  - Create `backend/utils/http.js`
  - Add success response helper
  - Add error response helper
  - Add pagination response helper
  - Add JSDoc documentation
  - _Requirements: 22, 24_

- [ ] 10. Add auth middleware shells

  - Create `backend/middlewares/auth/decodeToken.js`
  - Create `backend/middlewares/auth/requireAuth.js`
  - Create `backend/middlewares/auth/csrfProtection.js`
  - Add JWT token decoding logic
  - Add authentication requirement logic
  - Add CSRF token validation logic
  - Add JSDoc documentation
  - _Requirements: 1, 22_

- [ ] 11. Add validation middleware

  - Create `backend/middlewares/validation/validateRequest.js`
  - Create `backend/middlewares/validation/normalizeValidated.js`
  - Add express-validator result evaluation
  - Add req.validated attachment logic
  - Add JSDoc documentation
  - _Requirements: 22, 24_

- [ ] 12. Add base route registration

  - Create `backend/routes/index.js`
  - Register all domain routes under `/api/v1`
  - Add route not found handling
  - Add JSDoc documentation
  - _Requirements: 22_

- [ ] 13. Add socket bootstrap shell

  - Create `backend/sockets/index.js`
  - Add Socket.IO server setup
  - Add connection handling
  - Add JSDoc documentation
  - _Requirements: 15_

- [ ] 14. Add job bootstrap shell
  - Create `backend/jobs/index.js`
  - Add node-cron setup
  - Add ENABLE_SCHEDULERS flag check
  - Add JSDoc documentation
  - _Requirements: 30_

### Design-Critical Implementation Rules

- Controllers MUST NOT read raw request containers (req.body, req.params, req.query)
- Middleware ordering MUST match design.md specification
- Shared constants MUST come from backend/utils/constants.js
- All middleware MUST use JSDoc documentation
- All error handling MUST be centralized

### Completion Gate

- Backend app boots with structured middleware ordering
- Validation middleware can attach req.validated
- Error handling is centralized
- Logging and request IDs are in place
- Security middleware stack is configured
- Database connection is established
- Socket and job bootstrap shells exist

## Phase 03: Frontend Core Infrastructure

### Objective

Build the frontend shell and shared UI infrastructure required by all features.

### Tasks

- [ ] 1. Expand frontend application shell

  - Expand `client/src/App.jsx` into application shell entry
  - Add provider composition
  - Add router integration
  - Add error boundary
  - Add JSDoc documentation
  - _Requirements: 22, 26, 28_

- [ ] 2. Create router configuration

  - Create `client/src/app/router.jsx`
  - Use react-router (NOT react-router-dom)
  - Add route definitions
  - Add protected route logic
  - Add JSDoc documentation
  - _Requirements: 22, 26_

- [ ] 3. Create Redux store and persistence

  - Create `client/src/app/store.js`
  - Configure Redux Toolkit store
  - Add redux-persist integration
  - Add auth slice
  - Add JSDoc documentation
  - _Requirements: 22, 26_

- [ ] 4. Create app-level providers

  - Create `client/src/app/providers.jsx`
  - Add Redux Provider
  - Add Theme Provider
  - Add Router Provider
  - Add Error Boundary
  - Add JSDoc documentation
  - _Requirements: 22, 26_

- [ ] 5. Build centralized MUI theme modules

  - Implement `client/src/app/theme/index.js`
  - Implement `client/src/app/theme/AppTheme.jsx`
  - Implement `client/src/app/theme/themePrimitives.js`
  - Add color schemes (light and dark)
  - Add typography scale with Inter font
  - Add spacing system
  - Add shape and border radius
  - Add shadows
  - Follow `docs/theming-protocol.md` standards
  - Add JSDoc documentation
  - _Requirements: 26, 28_

- [ ] 6. Implement MUI component customizations

  - Implement `client/src/app/theme/customizations/index.js`
  - Implement `client/src/app/theme/customizations/inputs.js`
  - Implement `client/src/app/theme/customizations/dataDisplay.js`
  - Implement `client/src/app/theme/customizations/feedback.js`
  - Implement `client/src/app/theme/customizations/navigation.js`
  - Implement `client/src/app/theme/customizations/surfaces.js`
  - Implement `client/src/app/theme/customizations/charts.js`
  - Implement `client/src/app/theme/customizations/dataGrid.js`
  - Implement `client/src/app/theme/customizations/datePickers.js`
  - Use slots and slotProps APIs
  - Follow `docs/theming-protocol.md` standards
  - Add JSDoc documentation
  - _Requirements: 26, 28_

- [ ] 7. Create shared layout components

  - Create `client/src/components/layout/AppLayout.jsx`
  - Create `client/src/components/layout/PageHeader.jsx`
  - Create `client/src/components/layout/SideNav.jsx`
  - Create `client/src/components/layout/TopBar.jsx`
  - Create `client/src/components/layout/Footer.jsx`
  - Use theme tokens only (no hardcoded values)
  - Use MUI styled() API
  - Add responsive behavior
  - Add JSDoc documentation
  - _Requirements: 26, 28_

- [ ] 8. Create shared feedback components

  - Create `client/src/components/feedback/LoadingState.jsx`
  - Create `client/src/components/feedback/EmptyState.jsx`
  - Create `client/src/components/feedback/ErrorState.jsx`
  - Create `client/src/components/feedback/AlertBanner.jsx`
  - Use theme tokens only
  - Use MUI styled() API
  - Add JSDoc documentation
  - _Requirements: 24, 26_

- [ ] 9. Create shared form field wrappers

  - Create `client/src/components/forms/FormField.jsx`
  - Create `client/src/components/forms/TextField.jsx`
  - Create `client/src/components/forms/SelectField.jsx`
  - Create `client/src/components/forms/DateField.jsx`
  - Create `client/src/components/forms/CheckboxField.jsx`
  - Create `client/src/components/forms/FilterBar.jsx`
  - Integrate with React Hook Form
  - Use Controller or useWatch (NO watch())
  - Use theme tokens only
  - Add JSDoc documentation
  - _Requirements: 22, 26_

- [ ] 10. Create shared dialog and drawer primitives

  - Create `client/src/components/dialogs/ConfirmDialog.jsx`
  - Create `client/src/components/dialogs/ActionDrawer.jsx`
  - Use theme tokens only
  - Use MUI styled() API
  - Add JSDoc documentation
  - _Requirements: 26_

- [ ] 11. Create shared data-grid wrappers

  - Create `client/src/components/dataDisplay/DataGrid.jsx`
  - Create `client/src/components/dataDisplay/Card.jsx`
  - Create `client/src/components/dataDisplay/StatTile.jsx`
  - Create `client/src/components/dataDisplay/Timeline.jsx`
  - Create `client/src/components/dataDisplay/KeyValueList.jsx`
  - Use @mui/x-data-grid
  - Use theme tokens only
  - Add JSDoc documentation
  - _Requirements: 26, 28_

- [ ] 12. Create shared API client modules

  - Create `client/src/services/api/client.js`
  - Configure axios instance
  - Add request interceptors
  - Add response interceptors
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 22, 24_

- [ ] 13. Create shared socket service shell

  - Create `client/src/services/socket.js`
  - Add Socket.IO client setup
  - Add connection handling
  - Add event subscription logic
  - Add JSDoc documentation
  - _Requirements: 15_

- [ ] 14. Verify MUI import patterns

  - Verify all MUI imports are tree-shakable
  - Verify Grid uses size prop (not deprecated item prop)
  - Verify no react-router-dom usage
  - Verify no React Hook Form watch() usage
  - _Requirements: 22, 26_

- [ ] 15. Verify responsive design patterns
  - Verify all components use theme.breakpoints
  - Verify mobile, tablet, and desktop layouts
  - Verify touch-friendly targets (minimum 44x44px)
  - _Requirements: 26, 28_

### Completion Gate

- Frontend app bootstraps through providers, router, store, and theme
- Shared layout, form, feedback, and data-display primitives exist
- No react-router-dom usage is introduced
- No watch() usage is introduced
- All MUI imports are tree-shakable
- Grid uses size prop only
- All components use theme tokens
- Responsive design patterns are established
- Theming protocol compliance verified

## Phase 03.5: System Bootstrap Mechanism

### Objective

Implement the in-application bootstrap mechanism to create the first organization and Super_Admin user, enabling end-to-end authentication testing in Phase 04.

### Backend Tasks

- [ ] 1. Create bootstrap controller directory and files

  - Create `backend/controllers/bootstrap/` directory
  - Create `backend/controllers/bootstrap/initializeSystem.controller.js`
  - Create `backend/controllers/bootstrap/getBootstrapStatus.controller.js`
  - Implement initializeSystem controller
  - Implement getBootstrapStatus controller
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 2. Create bootstrap service directory and files

  - Create `backend/services/bootstrap/` directory
  - Create `backend/services/bootstrap/bootstrap.service.js`
  - Implement atomic transaction logic for organization and admin user creation
  - Implement organization count check helper
  - Implement Super_Admin role creation or retrieval
  - Implement admin user creation with emailVerified=true
  - Implement bcrypt password hashing
  - Implement audit log entry creation
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 3. Create bootstrap validator directory and files

  - Create `backend/validators/bootstrap/` directory
  - Create `backend/validators/bootstrap/initialize.validator.js`
  - Validate organization name (required, 3-100 characters)
  - Validate subdomain (optional, lowercase alphanumeric with hyphens)
  - Validate timezone (required, valid IANA timezone using Intl.DateTimeFormat)
  - Validate currency (optional, 3-letter ISO 4217 code, defaults to USD)
  - Validate admin email (required, valid email, normalized to lowercase)
  - Validate admin firstName (required, 1-50 characters)
  - Validate admin lastName (required, 1-50 characters)
  - Validate admin password (required, minimum 8 characters with uppercase, lowercase, number, special character)
  - Validate confirmPassword (required, must match password)
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 4. Create bootstrap routes

  - Create `backend/routes/bootstrap.routes.js`
  - Add POST /api/v1/bootstrap/initialize route
  - Add GET /api/v1/bootstrap/status route
  - Add rate limiting (5 attempts per hour per IP)
  - Register bootstrap routes in `backend/routes/index.js` BEFORE auth routes
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 5. Update backend constants

  - Add SYSTEM_BOOTSTRAP to AUDIT_ACTIONS in `backend/utils/constants.js`
  - Add SYSTEM to ENTITY_TYPES in `backend/utils/constants.js`
  - Add BOOTSTRAP_ALREADY_COMPLETED error code
  - _Requirements: 0, 22_

- [ ] 6. Implement bootstrap endpoint logic

  - Check organization count before proceeding
  - Return 409 Conflict if organization count > 0
  - Use atomic transaction (all-or-nothing)
  - Create organization with status "active"
  - Create or ensure Super_Admin role exists with permissions ["*"]
  - Create admin user with emailVerified=true
  - Hash admin password using bcrypt
  - Log SYSTEM_BOOTSTRAP audit event with IP address and user agent
  - Rollback all changes if any step fails
  - Return 201 Created with organizationId, adminUserId, organizationName
  - _Requirements: 0_

- [ ] 7. Test bootstrap endpoint
  - Test bootstrap endpoint returns 409 when organization already exists
  - Test bootstrap endpoint validates all input fields
  - Test bootstrap endpoint enforces password policy
  - Test bootstrap creates organization and user atomically
  - Test bootstrap admin is marked as emailVerified=true
  - Test bootstrap admin is assigned Super_Admin role
  - Test bootstrap event is logged to audit log
  - _Requirements: 0_

### Frontend Tasks

- [ ] 8. Create bootstrap page directory and files

  - Create `client/src/pages/bootstrap/` directory
  - Create `client/src/pages/bootstrap/BootstrapPage.jsx`
  - Implement organization form section
  - Implement admin user form section
  - Use React Hook Form for form management
  - Use theme tokens only
  - Add responsive design for mobile, tablet, desktop
  - Add JSDoc documentation
  - _Requirements: 0, 26, 28_

- [ ] 9. Implement bootstrap detection hook

  - Create `client/src/hooks/useBootstrapDetection.js`
  - Call bootstrap status endpoint on app load
  - Return bootstrap requirement status
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 10. Integrate bootstrap detection into app shell

  - Update `client/src/App.jsx` or app shell
  - Call useBootstrapDetection hook
  - Redirect to /bootstrap if bootstrap required
  - Redirect to /login if bootstrap not required
  - _Requirements: 0_

- [ ] 11. Implement bootstrap form components

  - Implement password strength indicator component
  - Implement timezone selector with Intl.supportedValuesOf
  - Implement currency selector with common currencies
  - Implement password confirmation validation
  - Use theme tokens only
  - Add JSDoc documentation
  - _Requirements: 0, 26_

- [ ] 12. Implement bootstrap success view

  - Display success message after bootstrap
  - Show "Continue to Login" button
  - Redirect to login page on button click
  - Use theme tokens only
  - _Requirements: 0, 26_

- [ ] 13. Create bootstrap API client

  - Create `client/src/services/api/bootstrap.api.js`
  - Add initializeSystem API method
  - Add getBootstrapStatus API method
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 0_

- [ ] 14. Add bootstrap route to router

  - Add /bootstrap route to router configuration
  - Make route accessible without authentication
  - _Requirements: 0_

- [ ] 15. Implement bootstrap form validation

  - Validate all required fields client-side
  - Match backend validation rules
  - Display clear error messages
  - _Requirements: 0, 24_

- [ ] 16. Implement bootstrap error handling

  - Display clear error messages on failure
  - Handle network errors
  - Handle validation errors
  - Handle 409 Conflict (bootstrap already completed)
  - _Requirements: 0, 24_

- [ ] 17. Implement bootstrap loading states

  - Show loading spinner during submission
  - Disable form during submission
  - _Requirements: 0, 26_

- [ ] 18. Test bootstrap page
  - Test bootstrap page redirects to login after success
  - Test bootstrap detection on application load
  - Test form validation for all required fields
  - Test password strength indicator updates correctly
  - Test responsive design on mobile, tablet, desktop
  - _Requirements: 0, 26, 28_

### Design-Critical Implementation Rules

- Bootstrap endpoint MUST check organization count before proceeding
- Bootstrap MUST use atomic transaction (all-or-nothing)
- Bootstrap admin MUST be pre-verified (no email verification required)
- Bootstrap endpoint MUST be rate limited
- Bootstrap MUST NOT be accessible after first organization exists
- Frontend MUST detect bootstrap requirement on app load
- Frontend MUST redirect to login after successful bootstrap
- Bootstrap MUST NOT depend on mock data
- Bootstrap MUST work in production environments
- Bootstrap routes MUST be registered BEFORE auth routes

### Completion Gate

- Bootstrap endpoint POST /api/v1/bootstrap/initialize exists and works
- Bootstrap status endpoint GET /api/v1/bootstrap/status exists and works
- Bootstrap endpoint only accessible when organization count is zero
- Bootstrap endpoint returns 409 when organization already exists
- Bootstrap endpoint validates all input fields per specification
- Bootstrap endpoint enforces password policy
- Bootstrap endpoint creates organization and admin user atomically
- Bootstrap admin is marked as email-verified
- Bootstrap admin is assigned Super_Admin role
- Bootstrap event is logged to audit log
- Frontend detects bootstrap requirement on application load
- Frontend provides bootstrap form with all required fields
- Frontend validates password strength and confirmation
- Frontend displays success message after bootstrap
- Frontend redirects to login after bootstrap
- Bootstrap admin can log in immediately after bootstrap
- End-to-end test: Bootstrap → Login → Access dashboard

## Phase 04: Authentication and Session Management

### Objective

Implement all authentication, invitation, password, session, and security-notification flows.

### Backend Tasks

- [ ] 1. Create auth models

  - Create `backend/models/userSession.model.js`
  - Add session schema with user ID, device info, IP address, login time, last activity time, expiration time
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 2. Create auth constants

  - Add auth-related constants to `backend/utils/constants.js`
  - Add token expiration times (access: 15 min, refresh: 7 days)
  - Add account lockout settings (5 attempts, 15 min window, 30 min lockout)
  - Add password policy constants
  - _Requirements: 1, 22_

- [ ] 3. Create auth validators

  - Create `backend/validators/auth/login.validator.js`
  - Create `backend/validators/auth/invite.validator.js`
  - Create `backend/validators/auth/password.validator.js`
  - Create `backend/validators/auth/session.validator.js`
  - Validate email, password, tokens
  - Enforce password policy
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 4. Create auth controllers

  - Create `backend/controllers/auth/login.controller.js`
  - Create `backend/controllers/auth/logout.controller.js`
  - Create `backend/controllers/auth/refresh.controller.js`
  - Create `backend/controllers/auth/invite.controller.js`
  - Create `backend/controllers/auth/password.controller.js`
  - Create `backend/controllers/auth/session.controller.js`
  - Use req.validated only (no raw request access)
  - Add JSDoc documentation
  - _Requirements: 1, 22_

- [ ] 5. Create auth services

  - Create `backend/services/auth/login.service.js`
  - Create `backend/services/auth/logout.service.js`
  - Create `backend/services/auth/refresh.service.js`
  - Create `backend/services/auth/invite.service.js`
  - Create `backend/services/auth/password.service.js`
  - Create `backend/services/auth/session.service.js`
  - Implement login and refresh-token session lifecycle
  - Implement logout and logout-all flows
  - Implement password reset flow
  - Implement account lockout and lockout release behavior
  - Implement security notification event generation
  - Implement session listing and revoke logic
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 6. Create auth routes

  - Create `backend/routes/auth.routes.js`
  - Add POST /api/v1/auth/login
  - Add POST /api/v1/auth/logout
  - Add POST /api/v1/auth/logout-all
  - Add POST /api/v1/auth/refresh
  - Add POST /api/v1/auth/invite/accept
  - Add POST /api/v1/auth/password/forgot
  - Add POST /api/v1/auth/password/reset
  - Add POST /api/v1/auth/password/change
  - Add GET /api/v1/auth/sessions
  - Add DELETE /api/v1/auth/sessions/:sessionId
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 7. Implement invitation acceptance flow

  - Generate secure invitation tokens
  - Send invitation emails
  - Validate invitation tokens
  - Create user accounts on acceptance
  - _Requirements: 1, 29_

- [ ] 8. Implement session management

  - Store session records in database
  - Track device info, IP address, login time, last activity time
  - Implement session expiration (24 hours inactivity)
  - Implement session listing
  - Implement session revocation
  - _Requirements: 1_

- [ ] 9. Implement security notifications

  - Send email on new device login
  - Send email on account lockout
  - Send email on password change
  - _Requirements: 1, 29_

- [ ] 10. Test authentication flows
  - Test login with valid credentials
  - Test login with invalid credentials
  - Test account lockout after 5 failed attempts
  - Test refresh token flow
  - Test logout and logout-all
  - Test password reset flow
  - Test invitation acceptance
  - Test session management
  - _Requirements: 1_

### Frontend Tasks

- [ ] 11. Create auth domain structure

  - Create `client/src/domains/auth/` directory
  - Create `client/src/domains/auth/api/` directory
  - Create `client/src/domains/auth/hooks/` directory
  - Create `client/src/domains/auth/components/` directory
  - _Requirements: 22, 26_

- [ ] 12. Build landing page

  - Create `client/src/pages/LandingPage.jsx`
  - Add welcome message
  - Add login button
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 26, 28_

- [ ] 13. Build login page

  - Create `client/src/pages/LoginPage.jsx`
  - Add email and password fields
  - Add "Forgot Password" link
  - Add "Remember Me" checkbox
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 1, 26, 28_

- [ ] 14. Build forgot-password page

  - Create `client/src/pages/ForgotPasswordPage.jsx`
  - Add email field
  - Add submit button
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 1, 26, 28_

- [ ] 15. Build reset-password page

  - Create `client/src/pages/ResetPasswordPage.jsx`
  - Add new password and confirm password fields
  - Add password strength indicator
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 1, 26, 28_

- [ ] 16. Build invitation acceptance page

  - Create `client/src/pages/InvitationAcceptancePage.jsx`
  - Add password creation fields
  - Add profile completion fields
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 1, 26, 28_

- [ ] 17. Build profile/session management page

  - Create `client/src/pages/ProfilePage.jsx`
  - Add profile editing section
  - Add password change section
  - Add active sessions section
  - Add logout-all button
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 1, 26, 28_

- [ ] 18. Create auth API client

  - Create `client/src/domains/auth/api/auth.api.js`
  - Add login, logout, refresh, invite, password, session methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 19. Create auth hooks

  - Create `client/src/domains/auth/hooks/useAuth.js`
  - Add login, logout, refresh logic
  - Add auth state management
  - Add JSDoc documentation
  - _Requirements: 1_

- [ ] 20. Build auth state handling

  - Update Redux auth slice
  - Add auth state persistence
  - Add token refresh logic
  - Add protected route logic
  - _Requirements: 1_

- [ ] 21. Test authentication UI
  - Test login flow
  - Test logout flow
  - Test password reset flow
  - Test invitation acceptance flow
  - Test session management
  - Test responsive design
  - _Requirements: 1, 26, 28_

### Completion Gate

- All authentication flows work end-to-end
- Invitation acceptance works
- Password reset works
- Session management works
- Account lockout works
- Security notifications work
- Protected routes work
- Responsive design verified

## Phase 05: Organization, Property, Location, and Master Data Foundations

### Objective

Implement the foundational administrative structures used by nearly every feature.

### Backend Tasks

- [ ] 1. Create organization, property, location, and master-data models

  - Create `backend/models/organization.model.js`
  - Create `backend/models/property.model.js`
  - Create `backend/models/location.model.js`
  - Create `backend/models/masterDataConfig.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20_

- [ ] 2. Create organization, property, location validators

  - Create validators for organization, property, location CRUD operations
  - Validate all required fields
  - Validate enums and constraints
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20_

- [ ] 3. Create organization, property, location controllers

  - Create controllers for organization, property, location CRUD operations
  - Use req.validated only
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20, 22_

- [ ] 4. Create organization, property, location services

  - Create services for organization, property, location CRUD operations
  - Implement numbering rule support
  - Implement service-window and blackout-window storage
  - Implement location hierarchy logic
  - Implement subtree filtering logic
  - Add audit logging
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20_

- [ ] 5. Create organization, property, location routes

  - Create routes for organization, property, location CRUD operations
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20_

- [ ] 6. Create master-data config routes, validators, controllers, services
  - Implement master-data configuration management
  - Support categories, statuses, priorities, reasons, custom fields
  - Add JSDoc documentation
  - _Requirements: 20_

### Frontend Tasks

- [ ] 7. Build organization settings screens

  - Create organization settings page
  - Add organization profile section
  - Add timezone, language, currency settings
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 2, 26, 28_

- [ ] 8. Build property settings screens

  - Create property list page
  - Create property detail page
  - Add property CRUD operations
  - Add business hours configuration
  - Add holiday calendar configuration
  - Add quiet hours configuration
  - Add service windows configuration
  - Add blackout windows configuration
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 2, 26, 28_

- [ ] 9. Build location tree/list/detail screens

  - Create location tree page
  - Create location list page
  - Create location detail page
  - Add location CRUD operations
  - Implement location-tree selection UI
  - Implement subtree filtering UI
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 3, 26, 28_

- [ ] 10. Build master-data settings screens

  - Create master-data settings page
  - Add category management
  - Add status management
  - Add priority management
  - Add custom field management
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 20, 26, 28_

- [ ] 11. Create API clients for organization, property, location, master-data
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 2, 3, 20_

### Completion Gate

- Organization, properties, locations, and master data are manageable through UI and API
- Location hierarchy and scope filtering work
- Numbering and baseline configuration structures exist
- Service windows, quiet hours, holidays, and business rules are configurable
- Responsive design verified

## Phase 06: Users, Roles, Teams, and Access Control

### Objective

Implement user administration, teams, roles, permissions, and scope assignment.

### Backend Tasks

- [ ] 1. Create role, user, and team models

  - Create `backend/models/role.model.js`
  - Create `backend/models/user.model.js`
  - Create `backend/models/team.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 4, 5_

- [ ] 2. Create role, user, team validators, controllers, services, routes

  - Create validators for role, user, team CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 4, 5, 22_

- [ ] 3. Implement built-in role provisioning

  - Create built-in roles: Super_Admin, Corporate_Admin, Corporate_Engineering_Director, Property_Manager, Chief_Engineer, Maintenance_Supervisor, Maintenance_Planner, Technician, Inventory_Controller, Vendor_Coordinator, Requester, Vendor_User, Read_Only_User
  - Assign permissions to each role
  - _Requirements: 4_

- [ ] 4. Implement custom role CRUD

  - Allow custom role creation
  - Allow permission assignment
  - _Requirements: 4_

- [ ] 5. Implement permission resolution utilities

  - Create permission checking utilities
  - Implement effective permissions calculation
  - _Requirements: 4_

- [ ] 6. Implement property-scope and location-scope assignment logic

  - Allow property scope assignment to users
  - Allow location scope assignment to users
  - Enforce scope restrictions in queries
  - _Requirements: 4_

- [ ] 7. Implement forced logout on permission-critical changes

  - Force logout when role changes
  - Force logout when permissions change
  - Force logout when scope changes
  - _Requirements: 4_

- [ ] 8. Implement audit logging for access changes
  - Log all role changes
  - Log all user changes
  - Log all team changes
  - Log all permission changes
  - _Requirements: 4, 5, 19_

### Frontend Tasks

- [ ] 9. Build users management screens

  - Create users list page
  - Create user detail page
  - Add user CRUD operations
  - Add user invite action
  - Add user disable action
  - Add force-logout action
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 4, 26, 28_

- [ ] 10. Build roles management screens

  - Create roles list page
  - Create role detail page
  - Add role CRUD operations
  - Add permission assignment UI
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 4, 26, 28_

- [ ] 11. Build teams management screens

  - Create teams list page
  - Create team detail page
  - Add team CRUD operations
  - Add team member assignment UI
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 5, 26, 28_

- [ ] 12. Build permission assignment and scope assignment UI

  - Create permission assignment component
  - Create property scope assignment component
  - Create location scope assignment component
  - Use theme tokens only
  - Add JSDoc documentation
  - _Requirements: 4, 26_

- [ ] 13. Create API clients for users, roles, teams
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 4, 5_

### Completion Gate

- Effective permissions are enforceable
- Property and location scopes are assignable and respected
- Role/team/user admin UI is functional
- Built-in roles exist
- Custom roles can be created
- Forced logout on permission changes works
- Audit logging works
- Responsive design verified

## Phase 07: Assets, Meters, Documents, and Location Context

### Objective

Implement asset management, meter management, and core document support.

### Backend Tasks

- [ ] 1. Create asset, meter, and document models

  - Create `backend/models/asset.model.js`
  - Create `backend/models/assetMeter.model.js`
  - Create `backend/models/assetMeterReading.model.js`
  - Create `backend/models/document.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 6, 7, 8_

- [ ] 2. Create asset validators, controllers, services, routes

  - Create validators for asset CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement asset transfer, replacement, retirement logic
  - Implement asset history aggregation logic
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 6, 22_

- [ ] 3. Create meter validators, controllers, services, routes

  - Create validators for meter CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement meter reading entry logic
  - Implement meter-based PM trigger logic
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 7, 22_

- [ ] 4. Create document validators, controllers, services, routes

  - Create validators for document upload/download/delete
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement file upload using multer
  - Implement file storage on local disk
  - Implement file download logic
  - Implement file deletion logic (soft delete)
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 8, 22_

- [ ] 5. Implement asset lifecycle operations

  - Implement asset transfer between locations
  - Implement asset replacement workflow
  - Implement asset retirement workflow
  - Log all operations to audit log
  - _Requirements: 6, 19_

- [ ] 6. Implement asset history and metrics
  - Calculate asset MTTR (Mean Time To Repair)
  - Calculate asset MTBF (Mean Time Between Failures)
  - Aggregate asset work history
  - Aggregate asset downtime history
  - Aggregate asset cost history
  - _Requirements: 6_

### Frontend Tasks

- [ ] 7. Build assets list and detail screens

  - Create assets list page
  - Create asset detail page
  - Add asset CRUD operations
  - Add asset search and filtering
  - Add asset QR code display
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 6, 26, 28_

- [ ] 8. Build asset create/edit/transfer/retire flows

  - Create asset create form
  - Create asset edit form
  - Create asset transfer dialog
  - Create asset replacement dialog
  - Create asset retirement dialog
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 6, 26, 28_

- [ ] 9. Build meter history displays and reading-entry flows

  - Create meter history display
  - Create meter reading entry form
  - Add meter reading validation
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 7, 26, 28_

- [ ] 10. Build document upload and preview UI

  - Create document upload component using react-dropzone
  - Create document preview component
  - Create image lightbox using yet-another-react-lightbox
  - Add file type and size validation
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 8, 26, 28_

- [ ] 11. Build asset history, downtime, and PM relation tabs

  - Create asset work history tab
  - Create asset downtime history tab
  - Create asset PM plans tab
  - Create asset cost history tab
  - Create asset metrics display (MTTR, MTBF)
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 6, 26, 28_

- [ ] 12. Create API clients for assets, meters, documents
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 6, 7, 8_

### Completion Gate

- Assets, meters, and documents are fully manageable
- Asset history and location context are visible
- Asset transfer, replacement, retirement work
- Meter readings can be entered
- Documents can be uploaded, downloaded, previewed
- Asset metrics (MTTR, MTBF) are calculated
- QR codes are generated
- Responsive design verified

## Phase 08: Work Request Intake and Triage

### Objective

Implement request creation, request portal intake, duplicate warnings, and triage workflows.

### Backend Tasks

- [ ] 1. Create work request model

  - Create `backend/models/workRequest.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 9_

- [ ] 2. Create work request validators, controllers, services, routes

  - Create validators for work request CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement duplicate-warning logic
  - Implement approval, rejection, cancellation, clarification, conversion logic
  - Implement requester-facing visibility restrictions
  - Implement request notification triggers
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 9, 22_

- [ ] 3. Implement request duplicate-warning logic

  - Check for duplicate requests in same location within last 7 days
  - Return warning with similar requests
  - Allow requester to proceed or cancel
  - _Requirements: 9_

- [ ] 4. Implement request triage workflows

  - Implement request approval workflow
  - Implement request rejection workflow
  - Implement request cancellation workflow
  - Implement request clarification workflow
  - Implement request conversion to work order
  - _Requirements: 9_

- [ ] 5. Implement request notification triggers
  - Send notification to dispatcher/supervisor on request submission
  - Send notification to requester on status change
  - _Requirements: 9, 15, 29_

### Frontend Tasks

- [ ] 6. Build request list screen

  - Create request list page
  - Add request search and filtering
  - Add request status indicators
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 9, 26, 28_

- [ ] 7. Build internal request create screen

  - Create internal request create form
  - Add location selector
  - Add asset selector
  - Add priority selector
  - Add category selector
  - Add duplicate warning display
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 9, 26, 28_

- [ ] 8. Build request detail and triage screen

  - Create request detail page
  - Add request summary section
  - Add request triage actions (approve, reject, cancel, clarify, convert)
  - Add request comments section
  - Add request attachments section
  - Add request activity timeline
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 9, 26, 28_

- [ ] 9. Build request portal screen structure

  - Create request portal page
  - Add simplified request create form
  - Add requester view of owned requests
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 9, 26, 28_

- [ ] 10. Create API client for work requests
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 9_

### Completion Gate

- All request intake channels supported by version 1 are implemented
- Triage workflow is usable end to end
- Duplicate warnings work
- Request conversion to work order works
- Request notifications work
- Request portal works
- Responsive design verified

## Phase 09: Work Order Core Lifecycle

### Objective

Implement the central corrective and emergency work-order engine.

### Backend Tasks

- [ ] 1. Create work order model

  - Create `backend/models/workOrder.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 10_

- [ ] 2. Create work order validators, controllers, services, routes

  - Create validators for work order CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement numbering logic
  - Implement status transitions and validation rules
  - Implement assignment, scheduling, rescheduling logic
  - Implement labor entry and timer logic
  - Implement comments and attachment linkage
  - Implement completion, verification, reopen, cancel, merge behavior
  - Implement guest-impact, downtime, and SLA handling
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 10, 22_

- [ ] 3. Implement work order status transitions

  - Implement status transition validation
  - Implement status change notifications
  - Log all status changes to audit log
  - _Requirements: 10, 19_

- [ ] 4. Implement work order assignment and scheduling

  - Implement assignment to users or teams
  - Implement scheduling logic
  - Implement rescheduling logic
  - Implement service window validation
  - Implement blackout window validation
  - Implement occupied room restriction validation
  - _Requirements: 10_

- [ ] 5. Implement labor entry and timer logic

  - Implement labor time entry
  - Implement labor timer start/stop
  - Calculate total labor hours
  - Calculate labor costs
  - _Requirements: 10_

- [ ] 6. Implement work order completion and verification

  - Implement completion workflow
  - Implement verification workflow
  - Implement reopen workflow
  - Implement cancel workflow
  - _Requirements: 10_

- [ ] 7. Implement guest-impact and downtime handling

  - Track guest-impact issues
  - Track downtime events
  - Calculate downtime duration
  - _Requirements: 10_

- [ ] 8. Implement SLA handling
  - Calculate SLA response time
  - Calculate SLA start time
  - Calculate SLA completion time
  - Track SLA breaches
  - Send SLA escalation notifications
  - _Requirements: 10_

### Frontend Tasks

- [ ] 9. Build work-order list screen

  - Create work order list page
  - Add work order search and filtering
  - Add work order status indicators
  - Add work order priority indicators
  - Add work order SLA indicators
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 10, 26, 28_

- [ ] 10. Build work-order create screen

  - Create work order create form
  - Add location selector
  - Add asset selector
  - Add priority selector
  - Add category selector
  - Add assignment selector
  - Add scheduling fields
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 10, 26, 28_

- [ ] 11. Build work-order detail screen

  - Create work order detail page
  - Add summary panel
  - Add schedule panel
  - Add tasks panel
  - Add labor panel
  - Add parts panel
  - Add attachments panel
  - Add comments panel
  - Add activity timeline panel
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 10, 26, 28_

- [ ] 12. Build work order action dialogs

  - Create assignment dialog
  - Create status-change dialog
  - Create completion dialog
  - Create verification dialog
  - Create reopen dialog
  - Create cancel dialog
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 10, 26, 28_

- [ ] 13. Build emergency visibility treatment

  - Add emergency badge to work order cards
  - Add emergency indicator to work order detail
  - Add emergency filtering
  - Use theme tokens only
  - _Requirements: 10, 26_

- [ ] 14. Create API client for work orders
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 10_

### Completion Gate

- Standard corrective lifecycle works end to end
- Emergency lifecycle works end to end
- Work-order detail supports all primary actions
- Assignment and scheduling work
- Labor entry and timer work
- Completion and verification work
- Guest-impact and downtime tracking work
- SLA handling works
- Responsive design verified

## Phase 10: Preventive Maintenance

### Objective

Implement PM plans, PM generation, PM calendars, and PM history.

### Backend Tasks

- [ ] 1. Create preventive maintenance plan model

  - Create `backend/models/preventiveMaintenancePlan.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 11_

- [ ] 2. Create PM plan validators, controllers, services, routes

  - Create validators for PM plan CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement recurrence logic for time, meter, seasonal, hybrid plans
  - Implement defer, skip, pause, missed behavior
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 11, 22_

- [ ] 3. Implement PM generation job

  - Create `backend/jobs/pmGeneration.job.js`
  - Implement PM work order generation logic
  - Implement occurrence uniqueness rules
  - Schedule job to run daily
  - Add JSDoc documentation
  - _Requirements: 11, 30_

- [ ] 4. Implement PM recurrence logic

  - Implement time-based recurrence (daily, weekly, monthly, yearly)
  - Implement meter-based recurrence
  - Implement seasonal recurrence
  - Implement hybrid recurrence (time + meter)
  - _Requirements: 11_

- [ ] 5. Implement PM defer, skip, pause, missed behavior
  - Implement defer logic (postpone to later date)
  - Implement skip logic (skip one occurrence)
  - Implement pause logic (pause plan temporarily)
  - Implement missed logic (mark occurrence as missed)
  - _Requirements: 11_

### Frontend Tasks

- [ ] 6. Build PM list screen

  - Create PM plan list page
  - Add PM plan search and filtering
  - Add PM plan status indicators
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 11, 26, 28_

- [ ] 7. Build PM detail/edit screen

  - Create PM plan detail page
  - Add PM plan summary section
  - Add PM plan recurrence configuration
  - Add PM plan asset assignment
  - Add PM plan checklist assignment
  - Add PM plan history section
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 11, 26, 28_

- [ ] 8. Build PM calendar screen

  - Create PM calendar page
  - Display PM occurrences on calendar
  - Add month, week, day views
  - Add PM occurrence actions (defer, skip)
  - Use @mui/x-date-pickers
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 11, 26, 28_

- [ ] 9. Build PM forecast UI

  - Create PM forecast display
  - Show upcoming PM occurrences
  - Show PM workload forecast
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 11, 26, 28_

- [ ] 10. Create API client for PM plans
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 11_

### Completion Gate

- PM plans can be created and managed
- PM work orders can be generated correctly
- Calendar and forecast views are functional
- PM recurrence logic works for all types
- PM defer, skip, pause, missed behavior works
- PM generation job runs successfully
- Responsive design verified

## Phase 11: Inspections, Checklists, and Procedures

### Objective

Implement reusable templates, checklist execution, and failure-to-follow-up work behavior.

### Backend Tasks

- [ ] 1. Create checklist template and inspection execution models

  - Create `backend/models/checklistTemplate.model.js`
  - Create `backend/models/inspectionExecution.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 12_

- [ ] 2. Create checklist and inspection validators, controllers, services, routes

  - Create validators for checklist template and inspection CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement step-type handling
  - Implement required-task rules
  - Implement conditional logic
  - Implement signoff capture
  - Implement failure-triggered request/work-order creation
  - Implement version-preserving execution behavior
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 12, 22_

- [ ] 3. Implement checklist template versioning

  - Track template versions
  - Preserve execution against specific version
  - Allow template updates without affecting in-progress executions
  - _Requirements: 12_

- [ ] 4. Implement failure-triggered follow-up work
  - Create work request or work order on checklist failure
  - Link follow-up work to inspection execution
  - _Requirements: 12_

### Frontend Tasks

- [ ] 5. Build checklist template management screens

  - Create checklist template list page
  - Create checklist template detail page
  - Add checklist template CRUD operations
  - Add step configuration UI
  - Add conditional logic configuration UI
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 12, 26, 28_

- [ ] 6. Build inspection execution UI

  - Create inspection execution page
  - Add step-by-step execution flow
  - Add evidence capture (photos, notes)
  - Add signoff capture
  - Add failure handling UI
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 12, 26, 28_

- [ ] 7. Build checklist rendering for work orders and PM

  - Create checklist display component
  - Add checklist execution within work order
  - Add checklist execution within PM
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 12, 26, 28_

- [ ] 8. Create API client for checklists and inspections
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 12_

### Completion Gate

- Checklist templates are versioned and reusable
- Inspection execution can create follow-up work where configured
- Checklist execution works within work orders and PM
- Evidence capture works
- Signoff capture works
- Conditional logic works
- Responsive design verified

## Phase 12: Inventory and Spare Parts

### Objective

Implement the parts catalog and stock-control flows tied to work orders.

### Backend Tasks

- [ ] 1. Create part, inventory stock line, and inventory transaction models

  - Create `backend/models/part.model.js`
  - Create `backend/models/inventoryStockLine.model.js`
  - Create `backend/models/inventoryTransaction.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 13_

- [ ] 2. Create part, inventory validators, controllers, services, routes

  - Create validators for part and inventory CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement reservation, issue, return, transfer, adjustment, cycle-count flows
  - Implement low-stock logic
  - Implement part substitute logic
  - Integrate inventory usage with work-order cost summaries
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 13, 22_

- [ ] 3. Implement inventory transaction flows

  - Implement reservation flow (reserve parts for work order)
  - Implement issue flow (issue parts to work order)
  - Implement return flow (return unused parts)
  - Implement transfer flow (transfer between storerooms)
  - Implement adjustment flow (adjust stock levels)
  - Implement cycle-count flow (physical count verification)
  - _Requirements: 13_

- [ ] 4. Implement low-stock alerts

  - Create `backend/jobs/lowStock.job.js`
  - Check stock levels against minimum thresholds
  - Send low-stock notifications
  - Schedule job to run daily
  - Add JSDoc documentation
  - _Requirements: 13, 30_

- [ ] 5. Implement part substitute logic
  - Allow part substitutes to be defined
  - Suggest substitutes when primary part is out of stock
  - _Requirements: 13_

### Frontend Tasks

- [ ] 6. Build parts list screen

  - Create parts list page
  - Add part search and filtering
  - Add part status indicators
  - Add low-stock indicators
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 13, 26, 28_

- [ ] 7. Build part detail screen

  - Create part detail page
  - Add part summary section
  - Add stock lines section
  - Add transaction history section
  - Add substitute parts section
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 13, 26, 28_

- [ ] 8. Build stock line management UI

  - Create stock line list display
  - Add stock line CRUD operations
  - Add stock level indicators
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 13, 26, 28_

- [ ] 9. Build inventory transaction history UI

  - Create transaction history display
  - Add transaction filtering
  - Add transaction details
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 13, 26, 28_

- [ ] 10. Build reservation/issue/return/transfer/count actions

  - Create reservation dialog
  - Create issue dialog
  - Create return dialog
  - Create transfer dialog
  - Create adjustment dialog
  - Create cycle-count dialog
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 13, 26, 28_

- [ ] 11. Create API client for parts and inventory
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 13_

### Completion Gate

- Parts and inventory are operational
- Work-order-linked part usage updates inventory and costs
- Reservation, issue, return, transfer, adjustment, cycle-count flows work
- Low-stock alerts work
- Part substitutes work
- Responsive design verified

## Phase 13: Vendors and Restricted Contractor Access

### Objective

Implement vendor management and restricted external work participation.

### Backend Tasks

- [ ] 1. Create vendor model

  - Create `backend/models/vendor.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 14_

- [ ] 2. Create vendor validators, controllers, services, routes

  - Create validators for vendor CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement vendor compliance document tracking
  - Implement vendor user invitation and restricted access behavior
  - Implement vendor assignment and vendor visibility filtering
  - Implement vendor performance capture inputs
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 14, 22_

- [ ] 3. Implement vendor user invitation and restricted access

  - Allow vendor users to be invited
  - Restrict vendor user access to assigned work only
  - Implement vendor portal visibility filtering
  - _Requirements: 14_

- [ ] 4. Implement vendor compliance document tracking

  - Track vendor compliance documents (insurance, licenses, certifications)
  - Track document expiration dates
  - Send expiration notifications
  - _Requirements: 14, 29_

- [ ] 5. Implement vendor performance capture
  - Capture vendor performance ratings
  - Capture vendor performance notes
  - Calculate vendor performance metrics
  - _Requirements: 14_

### Frontend Tasks

- [ ] 6. Build vendors list and detail screens

  - Create vendors list page
  - Create vendor detail page
  - Add vendor CRUD operations
  - Add vendor search and filtering
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 14, 26, 28_

- [ ] 7. Build vendor compliance document UI

  - Create compliance document list display
  - Add compliance document upload
  - Add expiration date tracking
  - Add expiration indicators
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 14, 26, 28_

- [ ] 8. Build vendor assignment UX within work orders

  - Add vendor assignment selector to work order
  - Add vendor user assignment selector
  - Display vendor information in work order detail
  - Use theme tokens only
  - Add JSDoc documentation
  - _Requirements: 14, 26_

- [ ] 9. Build restricted vendor portal screens

  - Create vendor portal page
  - Display only assigned work orders
  - Add work order status update capability
  - Add comment capability
  - Add attachment capability
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 14, 26, 28_

- [ ] 10. Create API client for vendors
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 14_

### Completion Gate

- Vendors can be maintained, assigned, and restricted correctly
- Vendor portal access is limited to assigned work
- Vendor compliance document tracking works
- Vendor performance capture works
- Vendor user invitation works
- Responsive design verified

## Phase 14: Notifications and Real-Time Synchronization

### Objective

Implement the platform notification model and socket-driven UI freshness.

### Backend Tasks

- [ ] 1. Create notification model

  - Create `backend/models/notification.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 15, 29_

- [ ] 2. Create notification validators, controllers, services, routes

  - Create validators for notification operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement notification generation across request, work-order, PM, inventory, vendor events
  - Implement quiet-hours handling
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 15, 29, 22_

- [ ] 3. Implement socket event emission

  - Implement `backend/sockets/events.js`
  - Add socket event emission for work request events
  - Add socket event emission for work order events
  - Add socket event emission for PM events
  - Add socket event emission for inventory events
  - Add socket event emission for vendor events
  - Add socket event emission for notification events
  - Add JSDoc documentation
  - _Requirements: 15_

- [ ] 4. Implement email dispatch and retry integration

  - Create `backend/jobs/notificationDispatch.job.js`
  - Implement email sending using nodemailer
  - Implement retry logic for failed emails
  - Schedule job to run every 5 minutes
  - Add JSDoc documentation
  - _Requirements: 29, 30_

- [ ] 5. Implement quiet-hours handling

  - Check property quiet hours before sending notifications
  - Defer notifications during quiet hours
  - Send deferred notifications after quiet hours end
  - _Requirements: 15, 29_

- [ ] 6. Implement notification generation triggers
  - Generate notifications on work request submission
  - Generate notifications on work request status change
  - Generate notifications on work order assignment
  - Generate notifications on work order status change
  - Generate notifications on work order completion
  - Generate notifications on PM generation
  - Generate notifications on low stock
  - Generate notifications on vendor compliance expiration
  - _Requirements: 15, 29_

### Frontend Tasks

- [ ] 7. Build notification center UI

  - Create notification center component
  - Add notification list display
  - Add unread count badge
  - Add mark as read action
  - Add mark all as read action
  - Add notification filtering
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 15, 26, 28_

- [ ] 8. Implement unread/read synchronization

  - Sync notification read status with backend
  - Update unread count in real-time
  - _Requirements: 15_

- [ ] 9. Implement socket subscriptions

  - Implement `client/src/services/socket.js`
  - Subscribe to work request events
  - Subscribe to work order events
  - Subscribe to PM events
  - Subscribe to inventory events
  - Subscribe to vendor events
  - Subscribe to notification events
  - Add JSDoc documentation
  - _Requirements: 15_

- [ ] 10. Implement scoped UI refresh behavior

  - Refresh work request list on work request events
  - Refresh work order list on work order events
  - Refresh PM list on PM events
  - Refresh inventory list on inventory events
  - Refresh vendor list on vendor events
  - Refresh notification center on notification events
  - _Requirements: 15_

- [ ] 11. Integrate real-time updates into screens

  - Integrate socket updates into dashboard
  - Integrate socket updates into work request screens
  - Integrate socket updates into work order screens
  - Integrate socket updates into PM screens
  - Integrate socket updates into inventory screens
  - Integrate socket updates into vendor screens
  - _Requirements: 15_

- [ ] 12. Create API client for notifications
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 15_

### Completion Gate

- In-app notifications work
- Email notifications work for required events
- Socket-driven updates refresh the intended screens
- Notification center UI works
- Unread/read synchronization works
- Quiet-hours handling works
- Real-time updates work across all major screens
- Responsive design verified

## Phase 15: Dashboards, Search, Saved Views, Reporting, and Audit UX

### Objective

Implement visibility and analysis features that sit on top of the operational system.

### Backend Tasks

- [ ] 1. Create saved view and audit log models

  - Create `backend/models/savedView.model.js`
  - Create `backend/models/auditLog.model.js`
  - Add schemas with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 17, 19_

- [ ] 2. Create dashboard validators, controllers, services, routes

  - Create validators for dashboard operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement role-aware dashboard summary APIs
  - Implement KPI calculation logic
  - Implement chart data aggregation logic
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 16, 22_

- [ ] 3. Create report validators, controllers, services, routes

  - Create validators for report operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement report APIs for work orders, PM, assets, inventory, vendors
  - Implement export flows (CSV, PDF)
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 18, 22_

- [ ] 4. Create search validators, controllers, services, routes

  - Create validators for search operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement global search across entities
  - Implement entity-specific search
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 17, 22_

- [ ] 5. Create saved-view validators, controllers, services, routes

  - Create validators for saved-view CRUD operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement saved-view storage and retrieval
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 17, 22_

- [ ] 6. Create audit-log validators, controllers, services, routes

  - Create validators for audit-log query operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement audit-log query APIs with scope restrictions
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 19, 22_

- [ ] 7. Implement dashboard KPI calculations

  - Calculate total work orders
  - Calculate open work orders
  - Calculate overdue work orders
  - Calculate completed work orders
  - Calculate average completion time
  - Calculate SLA compliance rate
  - Calculate asset uptime
  - Calculate inventory value
  - _Requirements: 16_

- [ ] 8. Implement report generation and export
  - Generate work order reports
  - Generate PM reports
  - Generate asset reports
  - Generate inventory reports
  - Generate vendor reports
  - Export reports to CSV using csv-parse
  - Export reports to PDF using jspdf
  - _Requirements: 18_

### Frontend Tasks

- [ ] 9. Build role-aware dashboard screens

  - Create dashboard page
  - Add KPI tiles for each role
  - Add charts for each role
  - Add quick actions for each role
  - Use @mui/x-charts
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 16, 26, 28_

- [ ] 10. Build search surfaces

  - Create global search component
  - Add search results display
  - Add entity-specific search
  - Add search filtering
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 17, 26, 28_

- [ ] 11. Build saved-view management UI

  - Create saved-view list display
  - Add saved-view CRUD operations
  - Add saved-view application to lists
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 17, 26, 28_

- [ ] 12. Build reports hub and report detail/filter/export UI

  - Create reports hub page
  - Add report list display
  - Add report detail page
  - Add report filtering UI
  - Add report export buttons (CSV, PDF)
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 18, 26, 28_

- [ ] 13. Build audit-log screens

  - Create audit log page
  - Add audit log list display
  - Add audit log filtering
  - Add audit log detail display
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 19, 26, 28_

- [ ] 14. Create API clients for dashboard, reports, search, saved-views, audit-logs
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 16, 17, 18, 19_

### Completion Gate

- Dashboard widgets are functional and scoped
- Reports can be filtered and exported
- Audit logs are visible with correct restrictions
- Search works across entities
- Saved views work
- Role-aware dashboards work
- CSV and PDF export work
- Responsive design verified

## Phase 16: Data Import, Export, and Migration Operations

### Objective

Implement import and migration support after the core operational model exists.

### Backend Tasks

- [ ] 1. Create import job model

  - Create `backend/models/importJob.model.js`
  - Add schema with all required fields per requirements
  - Add indexes for performance
  - Add JSDoc documentation
  - _Requirements: 21_

- [ ] 2. Create import validators, controllers, services, routes

  - Create validators for import operations
  - Create controllers using req.validated only
  - Create services with business logic
  - Implement upload, dry-run validation, and commit flows
  - Implement CSV parsing using csv-parse
  - Implement downloadable validation-error outputs
  - Implement historical work import support
  - Create routes
  - Register routes in `backend/routes/index.js`
  - Add JSDoc documentation
  - _Requirements: 21, 22_

- [ ] 3. Implement CSV import flows

  - Implement asset import
  - Implement location import
  - Implement part import
  - Implement work order import (historical)
  - Implement user import
  - _Requirements: 21_

- [ ] 4. Implement dry-run validation

  - Parse CSV file
  - Validate each row
  - Collect validation errors
  - Return validation results without committing
  - _Requirements: 21_

- [ ] 5. Implement commit flow

  - Parse CSV file
  - Validate each row
  - Insert valid rows into database
  - Track import job progress
  - Generate import summary
  - _Requirements: 21_

- [ ] 6. Implement validation-error outputs
  - Generate CSV file with validation errors
  - Include row number, field name, error message
  - Make file downloadable
  - _Requirements: 21_

### Frontend Tasks

- [ ] 7. Build import jobs screen

  - Create import jobs page
  - Add import job list display
  - Add import job status indicators
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 21, 26, 28_

- [ ] 8. Build import create/upload flows

  - Create import create page
  - Add entity type selector
  - Add CSV file upload using react-dropzone
  - Add file validation
  - Use React Hook Form
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 21, 26, 28_

- [ ] 9. Build dry-run results and commit UI

  - Create dry-run results display
  - Show validation errors
  - Show valid row count
  - Show invalid row count
  - Add commit button
  - Add download error report button
  - Use theme tokens only
  - Add responsive design
  - Add JSDoc documentation
  - _Requirements: 21, 26, 28_

- [ ] 10. Build downloadable error-report UX

  - Generate error report CSV
  - Trigger download
  - _Requirements: 21_

- [ ] 11. Create API client for imports
  - Create API client methods
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: 21_

### Completion Gate

- CSV imports support dry run and commit
- Row-level error feedback is available
- Asset, location, part, work order, user imports work
- Validation-error outputs are downloadable
- Import job tracking works
- Responsive design verified

## Phase 17: Mock Data Injection and Demo Dataset Assembly

### Objective

Create realistic seed and demo data only after the full domain model exists.

### Preconditions

- All primary models are implemented
- Shared constants are stable
- Feature phases through import support are complete enough for relational mock data

### Backend Tasks

- [ ] 1. Create mock data entry point

  - Create `backend/mock/index.js`
  - Add seed script entry point
  - Add JSDoc documentation
  - _Requirements: All (mock data coverage)_

- [ ] 2. Create organization and property mock data

  - Create `backend/mock/organizations.mock.js`
  - Create `backend/mock/properties.mock.js`
  - Generate realistic hospitality organizations
  - Generate realistic properties (hotels, resorts, etc.)
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 2_

- [ ] 3. Create location hierarchy mock data

  - Create `backend/mock/locations.mock.js`
  - Generate realistic location hierarchies (buildings, floors, rooms, etc.)
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 3_

- [ ] 4. Create user, role, team mock data

  - Create `backend/mock/roles.mock.js`
  - Create `backend/mock/users.mock.js`
  - Create `backend/mock/teams.mock.js`
  - Generate realistic users with roles and scopes
  - Generate realistic teams
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 4, 5_

- [ ] 5. Create asset and meter mock data

  - Create `backend/mock/assets.mock.js`
  - Create `backend/mock/meters.mock.js`
  - Generate realistic assets with hierarchies
  - Generate realistic meters with readings
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 6, 7_

- [ ] 6. Create work request and work order mock data

  - Create `backend/mock/requests.mock.js`
  - Create `backend/mock/workOrders.mock.js`
  - Generate realistic work requests
  - Generate realistic work orders with full lifecycle data
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 9, 10_

- [ ] 7. Create PM plan mock data

  - Create `backend/mock/pmPlans.mock.js`
  - Generate realistic PM plans with various recurrence types
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 11_

- [ ] 8. Create checklist and inspection mock data

  - Create `backend/mock/checklists.mock.js`
  - Generate realistic checklist templates
  - Generate realistic inspection executions
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 12_

- [ ] 9. Create part and inventory mock data

  - Create `backend/mock/parts.mock.js`
  - Create `backend/mock/inventory.mock.js`
  - Generate realistic parts catalog
  - Generate realistic stock lines and transactions
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 13_

- [ ] 10. Create vendor mock data

  - Create `backend/mock/vendors.mock.js`
  - Generate realistic vendors with compliance documents
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 14_

- [ ] 11. Create notification and saved view mock data

  - Create `backend/mock/notifications.mock.js`
  - Create `backend/mock/savedViews.mock.js`
  - Generate realistic notifications
  - Generate realistic saved views
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 15, 17_

- [ ] 12. Create document mock data

  - Create `backend/mock/documents.mock.js`
  - Generate realistic document records
  - Use constants from `backend/utils/constants.js`
  - Add JSDoc documentation
  - _Requirements: 8_

- [ ] 13. Create seed script

  - Create `backend/mock/seed.js`
  - Orchestrate mock data creation in correct order
  - Handle dependencies between entities
  - Add progress logging
  - Add error handling
  - Add JSDoc documentation
  - _Requirements: All (mock data coverage)_

- [ ] 14. Verify mock data uses constants source of truth

  - Verify all mock data uses `backend/utils/constants.js`
  - Verify no hardcoded enums or magic strings
  - _Requirements: 22_

- [ ] 15. Verify mock data is relational and realistic
  - Verify all foreign key relationships are valid
  - Verify data is realistic for hospitality context
  - Verify data covers all major use cases
  - _Requirements: All (mock data coverage)_

### Completion Gate

- Mock data is comprehensive, relational, and realistic
- Mock data exists only after all models are implemented
- Mock data uses constants source of truth
- Seed script runs successfully
- All major entities have mock data
- Mock data covers all major use cases

## Phase 18: Final Cross-Phase Alignment and Completion Gate

### Objective

Close the loop across requirements, design, tasks, and implementation state.

### Tasks

- [ ] 1. Reconcile implemented files against requirements

  - Review all 30 requirements
  - Verify each requirement has corresponding implementation
  - Verify all acceptance criteria are met
  - Document any gaps or deviations
  - _Requirements: All_

- [ ] 2. Reconcile repository structure against design

  - Review design.md repository structure
  - Verify all required directories exist
  - Verify all required files exist
  - Verify file organization matches design
  - _Requirements: 22_

- [ ] 3. Reconcile features against requirements acceptance criteria

  - Review each requirement's acceptance criteria
  - Test each acceptance criterion
  - Document test results
  - Fix any failing criteria
  - _Requirements: All_

- [ ] 4. Verify no prohibited implementation patterns

  - Verify no backend business logic in routes
  - Verify no controllers reading raw req.body/params/query
  - Verify no duplicated canonical enums
  - Verify no frontend feature logic in App.jsx
  - Verify no shared components mixed with domain components
  - Verify no hardcoded UI tokens
  - Verify no non-tree-shakable MUI imports
  - Verify no react-router-dom usage
  - Verify no React Hook Form watch() usage
  - Verify no deprecated MUI Grid item prop
  - Verify no early mock-data injection
  - Verify no TypeScript files
  - Verify no PowerShell/CMD commands
  - _Requirements: 22, 26_

- [ ] 5. Verify constants sources of truth are used

  - Verify all backend code uses `backend/utils/constants.js`
  - Verify all frontend code uses `client/src/utils/constants.js`
  - Verify no hardcoded enums or magic strings
  - _Requirements: 22_

- [ ] 6. Verify responsive design expectations

  - Test all screens on mobile (320px - 767px)
  - Test all screens on tablet (768px - 1023px)
  - Test all screens on desktop (1024px+)
  - Verify touch-friendly targets (minimum 44x44px)
  - Verify responsive layouts work correctly
  - _Requirements: 26, 28_

- [ ] 7. Verify all required screens have matching support

  - Verify each screen has matching route
  - Verify each screen has matching UI components
  - Verify each screen has matching API endpoints
  - Verify each screen has matching data models
  - _Requirements: All_

- [ ] 8. Verify mock data was introduced only in Phase 17

  - Verify no mock data exists in Phases 01-16
  - Verify mock data exists only in `backend/mock/`
  - Verify mock data is comprehensive
  - _Requirements: All (mock data coverage)_

- [ ] 9. Verify theming protocol compliance

  - Verify all components use theme tokens
  - Verify no hardcoded colors, fonts, spacing
  - Verify MUI styled() API is used correctly
  - Verify slots and slotProps APIs are used correctly
  - Verify dark mode support exists
  - Verify accessibility standards are met (WCAG AA)
  - Follow `docs/theming-protocol.md` checklist
  - _Requirements: 26_

- [ ] 10. Verify task execution protocol compliance

  - Verify all phases followed six-step execution model
  - Verify all phases have completion gates
  - Verify all phases have traceability to requirements
  - Follow `docs/task-execution-protocol.md` checklist
  - _Requirements: 22_

- [ ] 11. Run comprehensive end-to-end tests

  - Test bootstrap flow
  - Test authentication flow
  - Test work request to work order flow
  - Test PM generation flow
  - Test inventory transaction flow
  - Test vendor assignment flow
  - Test notification flow
  - Test real-time updates flow
  - Test import flow
  - _Requirements: All_

- [ ] 12. Prepare implementation summary

  - Document all implemented features
  - Document all known issues or limitations
  - Document all deviations from requirements
  - Document all future enhancements
  - Follow `docs/task-execution-protocol.md` summary format
  - _Requirements: All_

- [ ] 13. Verify security and performance requirements

  - Verify authentication and authorization work correctly
  - Verify CSRF protection is enabled
  - Verify rate limiting is configured
  - Verify security headers are set
  - Verify password hashing is secure
  - Verify session management is secure
  - Verify API response times are acceptable
  - Verify database queries are optimized
  - Verify pagination is implemented
  - _Requirements: 22, 23, 24_

- [ ] 14. Verify observability and monitoring

  - Verify logging is comprehensive
  - Verify audit logging works correctly
  - Verify error handling is centralized
  - Verify health check endpoint works
  - _Requirements: 19, 24, 25_

- [ ] 15. Verify email notifications

  - Verify invitation emails work
  - Verify password reset emails work
  - Verify security notification emails work
  - Verify work order notification emails work
  - Verify low stock notification emails work
  - Verify vendor compliance expiration emails work
  - _Requirements: 29_

- [ ] 16. Verify background jobs

  - Verify PM generation job runs correctly
  - Verify SLA escalation job runs correctly
  - Verify low stock job runs correctly
  - Verify notification dispatch job runs correctly
  - Verify session cleanup job runs correctly
  - _Requirements: 30_

- [ ] 17. Create final documentation
  - Update README.md with setup instructions
  - Document environment variables
  - Document API endpoints
  - Document database schema
  - Document deployment instructions
  - _Requirements: All_

### Completion Gate

- Cross-document alignment is confirmed
- No mandatory requirement remains unimplemented
- All prohibited patterns are absent
- Constants sources of truth are used consistently
- Responsive design works on all devices
- All screens have matching route, UI, API, and data support
- Mock data was introduced only in Phase 17
- Theming protocol compliance verified
- Task execution protocol compliance verified
- Comprehensive end-to-end tests pass
- Security and performance requirements met
- Observability and monitoring verified
- Email notifications verified
- Background jobs verified
- Final documentation complete
- The phase package is ready for user review and approval

## 6. File Ownership by Phase

### 6.1 Backend Ownership Summary

- **Phases 01-03**: Create infrastructure files (config, middlewares, utils, routes/index.js, sockets/index.js, jobs/index.js)
- **Phase 03.5**: Create bootstrap domain files (controllers/bootstrap, services/bootstrap, validators/bootstrap, routes/bootstrap.routes.js)
- **Phase 04**: Create auth domain files (controllers/auth, services/auth, validators/auth, routes/auth.routes.js, models/userSession.model.js)
- **Phase 05**: Create organization, property, location, master-data domain files
- **Phase 06**: Create role, user, team domain files
- **Phase 07**: Create asset, meter, document domain files
- **Phase 08**: Create work request domain files
- **Phase 09**: Create work order domain files
- **Phase 10**: Create PM domain files
- **Phase 11**: Create checklist and inspection domain files
- **Phase 12**: Create part and inventory domain files
- **Phase 13**: Create vendor domain files
- **Phase 14**: Create notification domain files and socket/job implementations
- **Phase 15**: Create dashboard, report, search, saved-view, audit-log domain files
- **Phase 16**: Create import domain files
- **Phase 17**: Create `backend/mock/*` files

### 6.2 Frontend Ownership Summary

- **Phases 01 and 03**: Create app shell, theme, shared utilities, and component primitives
- **Phase 03.5**: Create bootstrap domain files (pages/bootstrap, hooks/useBootstrapDetection, services/api/bootstrap.api.js)
- **Phase 04**: Create auth domain files (pages/auth, domains/auth, hooks/useAuth)
- **Phases 05-16**: Progressively fill pages, domain hooks, domain API adapters, and reusable UI elements

### 6.3 Documentation Ownership

- **Phase 00**: Create `.kiro/specs/hospitality-cmms-full-system/traceability-matrix.md`
- **Phase 18**: Update README.md and create final documentation

## 7. Implementation Notes

### 7.1 JavaScript-Only Constraint

All code must be JavaScript-only. No TypeScript conversion is allowed. Use JSDoc for type documentation.

### 7.2 ESM Syntax

All modules must use ES6 import/export syntax. No CommonJS require() is allowed.

### 7.3 Constants Single Source of Truth

- Backend: `backend/utils/constants.js`
- Frontend: `client/src/utils/constants.js`

All domain code must import constants from these files. No hardcoded enums or magic strings are allowed.

### 7.4 Controller Pattern

Controllers must:

- Use `req.validated` only (no raw `req.body`, `req.params`, `req.query`)
- Use `req.user` for actor context
- Orchestrate only (no business logic)
- Call services for business logic

### 7.5 Service Pattern

Services must:

- Contain all business logic
- Handle audit logging
- Handle notification emission
- Be framework-light and reusable

### 7.6 Frontend Component Pattern

Components must:

- Use theme tokens only (no hardcoded values)
- Use MUI styled() API for custom styling
- Use React Hook Form with Controller or useWatch (NO watch())
- Use tree-shakable MUI imports
- Use MUI v9 Grid size prop (not deprecated item prop)
- Follow responsive design patterns

### 7.7 Theming Protocol

All frontend styling must follow `docs/theming-protocol.md`:

- Centralized theme configuration in `client/src/app/theme/`
- Color system using brand and semantic palettes
- Typography scale with Inter font family
- Spacing system using `theme.spacing()`
- Shape and border radius using `theme.shape.borderRadius`
- Responsive breakpoints using `theme.breakpoints.*`
- Component customization in `client/src/app/theme/customizations/`
- Dark mode support using `theme.applyStyles('dark', {...})`
- Accessibility standards (WCAG AA contrast ratios, focus states, touch targets)

### 7.8 Task Execution Protocol

All phases must follow `docs/task-execution-protocol.md`:

- Six-step execution model
- Completion gates
- Traceability to requirements
- User review and approval

### 7.9 Mock Data Constraint

Mock data must NOT be created until Phase 17. All earlier phases must work without mock data.

### 7.10 Bootstrap Mechanism

Phase 03.5 implements the bootstrap mechanism, which is a production feature (not a development convenience). It must:

- Work without authentication
- Check organization count before proceeding
- Use atomic transactions
- Create pre-verified admin user
- Be independent of mock data

## 8. Success Criteria

The implementation is complete when:

1. All 30 requirements are implemented
2. All 18 phases are complete
3. All completion gates are satisfied
4. All prohibited patterns are absent
5. All engineering constraints are met
6. All responsive design requirements are met
7. All security requirements are met
8. All performance requirements are met
9. All observability requirements are met
10. All end-to-end tests pass
11. Final documentation is complete
12. User review and approval is obtained
