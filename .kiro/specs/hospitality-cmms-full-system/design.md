# Hospitality CMMS Design Specification

## Document Control

| Item           | Value                                 |
| -------------- | ------------------------------------- |
| Document Title | Hospitality CMMS Design Specification |
| Spec ID        | hospitality-cmms-full-system          |
| Version        | 1.0                                   |
| Status         | Draft                                 |
| Created        | 2026-05-01                            |
| Last Updated   | 2026-05-01                            |
| Workflow Type  | Requirements-First                    |
| Spec Type      | Feature                               |

## Document Purpose

This design specification defines the complete technical architecture, implementation structure, and engineering standards for the Hospitality CMMS (Computerized Maintenance Management System) web application.

This document translates the requirements defined in `requirements.md` into concrete implementation decisions covering:

1. **Repository Structure**: Complete directory organization for backend and frontend
2. **Architecture Patterns**: Backend services, middleware, controllers, and frontend component organization
3. **Data Models**: Complete Mongoose schemas for all 25+ entities
4. **API Specifications**: All 200+ REST endpoints with request/response contracts
5. **UI/UX Design**: Screen layouts, responsive patterns, and interaction flows
6. **Integration Patterns**: Socket.IO real-time updates, background jobs, email, file uploads
7. **Security Architecture**: Authentication, authorization, CSRF protection, session management
8. **Engineering Standards**: Code organization, naming conventions, prohibited patterns

**Target Audience**: This document is implementation-facing and designed for developer AI agents executing the 18-phase implementation plan.

**Relationship to Other Documents**:

- **requirements.md**: Defines WHAT must be built (30 requirements, 800+ acceptance criteria)
- **design.md** (this document): Defines HOW it must be built (architecture, structure, patterns)
- **tasks.md**: Defines WHEN it must be built (18 phases, dependencies, completion gates)

## Technology Stack

### Backend Stack

**Exact Package Versions** (from `backend/package.json`):

- **Runtime**: Node.js (ESM modules)
- **Framework**: express 5.2.1
- **Database**: MongoDB with mongoose 9.4.1
- **Authentication**: JWT with httpOnly refresh tokens (jsonwebtoken 9.0.3)
- **Validation**: express-validator 7.3.2
- **Async Handlers**: express-async-handler 1.2.0
- **Security**:
  - helmet 8.1.0
  - express-mongo-sanitize 2.2.0
  - express-rate-limit 8.3.2
  - cors 2.8.6
- **Password Hashing**: bcrypt 6.0.0
- **Logging**: winston 3.19.0
- **Email**: nodemailer 8.0.5
- **Real-time**: socket.io 4.8.3
- **Utilities**:
  - compression 1.8.1
  - cookie 1.1.1
  - cookie-parser 1.4.7
  - dayjs 1.11.20
  - dotenv 17.4.2
  - validator 13.15.35
  - mongoose-paginate-v2 1.9.4
- **Development**:
  - morgan 1.10.1
  - nodemon 3.1.14

### Frontend Stack

**Exact Package Versions** (from `client/package.json`):

- **Framework**: react 19.2.4, react-dom 19.2.4
- **UI Library**: @mui/material 9.0.0
- **MUI Extensions**:
  - @mui/icons-material 9.0.0
  - @mui/lab 9.0.0-beta.2
  - @mui/x-data-grid 9.0.1
  - @mui/x-charts 9.0.1
  - @mui/x-date-pickers 9.0.0
- **Styling**: @emotion/react 11.14.0, @emotion/styled 11.14.1
- **Routing**: react-router 7.14.1 (NOT react-router-dom)
- **State Management**: @reduxjs/toolkit 2.11.2, react-redux 9.2.0, redux-persist 6.0.0
- **Forms**: react-hook-form 7.72.1 (NO watch() usage)
- **HTTP Client**: axios 1.15.0
- **Real-time**: socket.io-client 4.8.3
- **File Upload**: react-dropzone 15.0.0
- **PDF Generation**: jspdf 4.2.1, jspdf-autotable 5.0.7
- **Image Handling**: react-photo-album 3.6.0, yet-another-react-lightbox 3.31.0
- **Notifications**: react-toastify 11.0.5
- **Error Boundaries**: react-error-boundary 6.1.1
- **Typography**: @fontsource/inter 5.2.8
- **Utilities**: dayjs 1.11.20, dotenv 17.4.2
- **Development**:
  - vite 8.0.4
  - @vitejs/plugin-react 6.0.1
  - eslint 9.39.4
  - @eslint/js 9.39.4
  - eslint-plugin-react-hooks 7.0.1
  - eslint-plugin-react-refresh 0.5.2
  - globals 17.4.0

### Development Tools

- **Build Tool**: Vite 8.0.4 (frontend)
- **Linting**: ESLint 9.39.4 (flat config)
- **Package Manager**: npm
- **Version Control**: Git

## Engineering Constraints

### Mandatory Constraints

These constraints are **non-negotiable** and must be followed throughout implementation:

1. **JavaScript-Only**: No TypeScript conversion allowed
2. **ESM Syntax**: All modules use ES6 import/export (no CommonJS require)
3. **JSDoc Required**: All exported functions, classes, and non-trivial helpers must have JSDoc
4. **Git Bash/WSL Compatible**: All commands must work in Git Bash or WSL (no PowerShell/CMD syntax)
5. **Task Execution Protocol**: All implementation phases must follow the mandatory six-step execution model defined in `docs/task-execution-protocol.md`

### Backend Constraints

1. **Constants Single Source of Truth**: `backend/utils/constants.js` is the ONLY approved import entry point for shared backend constants
2. **No Raw Request Access**: Controllers MUST NOT read `req.body`, `req.params`, or `req.query` directly
3. **Use req.validated**: Controllers MUST ONLY consume validated input from `req.validated`
4. **Use req.user**: Controllers MUST use `req.user` for actor context (user ID, org ID, permissions, etc.)
5. **Thin Controllers**: Controllers orchestrate only; business logic lives in services
6. **Service Layer Required**: All business logic, audit logging, and notification emission happens in services
7. **Middleware Ordering**: Must follow the exact pipeline defined in this document
8. **Actor Context Compatibility**: Background jobs, imports, and automated flows must pass synthetic actor context compatible with `req.user` contract

### Frontend Constraints

1. **Constants Single Source of Truth**: `client/src/utils/constants.js` is the ONLY approved import entry point for shared frontend constants
2. **No react-router-dom**: Use `react-router` imports only
3. **No React Hook Form watch()**: Use `useWatch`, `Controller`, or `getValues` instead
4. **Tree-Shakable MUI Imports**: Import components individually (e.g., `import Button from "@mui/material/Button"`)
5. **MUI v9 Grid size Prop**: Use `size` prop, NOT deprecated `item` prop
6. **Theme Tokens Required**: Use `theme.palette`, `theme.typography`, `theme.spacing`, `theme.breakpoints` - NO hardcoded values
7. **MUI styled() API**: Use MUI `styled()` for reusable custom styling
8. **Slots and SlotProps**: Use `slots` and `slotProps` APIs for MUI component customization
9. **Responsive Design**: All screens must work on mobile, tablet, and desktop
10. **Inter Font Only**: No other fonts allowed
11. **Theming Protocol Compliance**: All frontend styling must follow the mandatory theming standards defined in `docs/theming-protocol.md`, including:
    - Centralized theme configuration in `client/src/theme/`
    - Color system using brand and semantic palettes
    - Typography scale with Inter font family
    - Spacing system using `theme.spacing()`
    - Shape and border radius using `theme.shape.borderRadius`
    - Responsive breakpoints using `theme.breakpoints.*`
    - Component customization in `client/src/theme/customizations/`
    - Dark mode support using `theme.applyStyles('dark', {...})`
    - Accessibility standards (WCAG AA contrast ratios, focus states, touch targets)
    - Performance optimization (theme memoization, disabled ripple effects)

### Prohibited Patterns

The following patterns are **absolutely forbidden**:

1. ❌ Backend business logic embedded directly in routes
2. ❌ Controllers reading raw `req.body`, `req.params`, or `req.query`
3. ❌ Duplicated canonical enums across unrelated backend modules
4. ❌ Frontend feature logic collapsed into a single `App.jsx`
5. ❌ Shared components mixed with domain-specific components
6. ❌ Hardcoded UI tokens (colors, fonts, spacing) in components
7. ❌ Non-tree-shakable MUI imports (e.g., `import { Button } from "@mui/material"`)
8. ❌ `react-router-dom` usage
9. ❌ React Hook Form `watch()` usage
10. ❌ Deprecated MUI Grid `item` prop
11. ❌ Early mock-data injection before Phase 17
12. ❌ TypeScript conversion
13. ❌ PowerShell or CMD-specific commands

## 1. Design Principles

### 1.1 Source-Aligned Design Principles

1. **Requirements Document as Source of Truth**: The requirements document (`requirements.md`) remains the authoritative source for WHAT must be built
2. **Complete Feature Coverage**: The design must realize every required module and workflow without introducing architectural shortcuts
3. **JavaScript-Only Mandate**: The repository must stay JavaScript-only and ESM-based throughout all phases
4. **Clarity and Traceability**: The implementation must optimize for clarity, traceability, and future feature scale
5. **Centralized Constants**: Domain constants must live in dedicated constants sources of truth, not scattered string literals

### 1.2 Architectural Design Goals

1. **Separation of Concerns**: Separate orchestration (controllers) from business logic (services)
2. **Framework-Light Services**: Keep backend services framework-light and reusable
3. **Domain-Organized Frontend**: Keep frontend shared UI reusable while organizing feature logic by domain
4. **Clear Traceability**: Ensure routes, APIs, models, and screens have clear one-to-one or one-to-many traceability
5. **Explicit Responsive Behavior**: Make responsive behavior explicit rather than incidental

### 1.3 Locked Implementation Defaults

These defaults are **fixed** and cannot be changed without updating this document:

1. **Backend Infrastructure Additions**: Limited to `multer`, `node-cron`, `csv-parse`, and `sharp`
2. **Document Storage**: Use `multer` with local-disk storage abstraction in first implementation
3. **Scheduled Jobs**: Run in-process with `node-cron`, enabled only when `ENABLE_SCHEDULERS` environment flag is set
4. **Authentication Transport**:
   - Access token: Short-lived (15 minutes), stored in client memory only
   - Refresh token: Long-lived (7 days), stored in httpOnly cookie
   - CSRF Protection: Required for all mutating cookie-authenticated requests
5. **Phase Extension**: Later phases extend this architecture rather than choosing new approaches ad hoc

### 1.4 Design Philosophy

#### Predictability Over Cleverness

- Use explicit patterns over implicit magic
- Prefer verbose clarity over terse abstraction
- Make dependencies and data flow obvious

#### Consistency Over Flexibility

- One way to do common tasks
- Shared patterns across similar features
- Predictable file locations and naming

#### Traceability Over Convenience

- Every file maps to a requirement
- Every API maps to a screen or workflow
- Every constant has a single source

#### Scalability Over Simplicity

- Structure supports 100+ models and 1000+ routes
- Patterns work for 1 property or 100 properties
- Architecture supports 10 users or 10,000 users

## 2. Repository Structure

### 2.1 Top-Level Structure

The repository must evolve into the following top-level structure:

```
/
├── backend/
├── client/
├── docs/
├── .kiro/
├── README.md
└── .gitignore
```

### 2.2 Backend Structure

The backend must be organized as follows:

```
backend/
├── app.js                          # Express app configuration and middleware setup
├── server.js                       # HTTP server bootstrap and startup
├── package.json                    # Backend dependencies and scripts
├── package-lock.json              # Locked dependency versions
├── .env                           # Environment variables (gitignored)
│
├── config/                        # Configuration modules
│   ├── env.js                     # Environment variable validation and export
│   ├── database.js                # MongoDB connection configuration
│   ├── cors.js                    # CORS configuration
│   ├── socket.js                  # Socket.IO configuration
│   └── logger.js                  # Winston logger configuration
│
├── controllers/                   # Request orchestration layer
│   ├── auth/                      # Authentication controllers
│   │   ├── login.controller.js
│   │   ├── logout.controller.js
│   │   ├── refresh.controller.js
│   │   ├── invite.controller.js
│   │   ├── password.controller.js
│   │   └── session.controller.js
│   ├── organizations/             # Organization controllers
│   │   ├── getCurrent.controller.js
│   │   └── updateCurrent.controller.js
│   ├── dashboard/                 # Dashboard controllers
│   │   ├── getKPIs.controller.js
│   │   ├── getCharts.controller.js
│   │   └── getQuickActions.controller.js
│   ├── properties/                # Property controllers
│   │   ├── list.controller.js
│   │   ├── get.controller.js
│   │   ├── create.controller.js
│   │   ├── update.controller.js
│   │   └── delete.controller.js
│   ├── locations/                 # Location controllers
│   ├── users/                     # User controllers
│   ├── roles/                     # Role controllers
│   ├── teams/                     # Team controllers
│   ├── assets/                    # Asset controllers
│   ├── meters/                    # Meter controllers
│   ├── requests/                  # Work request controllers
│   ├── workOrders/                # Work order controllers
│   ├── preventiveMaintenance/     # PM controllers
│   ├── inspections/               # Inspection controllers
│   ├── inventory/                 # Inventory controllers
│   ├── vendors/                   # Vendor controllers
│   ├── documents/                 # Document controllers
│   ├── notifications/             # Notification controllers
│   ├── reports/                   # Report controllers
│   ├── savedViews/                # Saved view controllers
│   ├── settings/                  # Settings controllers
│   ├── imports/                   # Import controllers
│   └── audit/                     # Audit log controllers
│
├── middlewares/                   # Middleware functions
│   ├── auth/                      # Authentication middleware
│   │   ├── decodeToken.js         # JWT token decoding
│   │   ├── requireAuth.js         # Authentication requirement
│   │   └── csrfProtection.js      # CSRF token validation
│   ├── validation/                # Validation middleware
│   │   ├── validateRequest.js     # Express-validator result evaluation
│   │   └── normalizeValidated.js  # Attach req.validated
│   ├── security/                  # Security middleware
│   │   ├── helmet.js              # Security headers
│   │   ├── cors.js                # CORS handling
│   │   ├── rateLimiter.js         # Rate limiting
│   │   └── mongoSanitize.js       # MongoDB injection prevention
│   ├── error/                     # Error handling middleware
│   │   ├── errorHandler.js        # Centralized error handler
│   │   └── notFound.js            # 404 handler
│   └── request/                   # Request processing middleware
│       ├── requestId.js           # Attach unique request ID
│       └── requestLogger.js       # Log incoming requests
│
├── models/                        # Mongoose models
│   ├── organization.model.js      # Organization schema
│   ├── property.model.js          # Property schema
│   ├── location.model.js          # Location schema
│   ├── role.model.js              # Role schema
│   ├── user.model.js              # User schema
│   ├── team.model.js              # Team schema
│   ├── userSession.model.js       # User session schema
│   ├── asset.model.js             # Asset schema
│   ├── assetMeter.model.js        # Asset meter schema
│   ├── assetMeterReading.model.js # Meter reading schema
│   ├── workRequest.model.js       # Work request schema
│   ├── workOrder.model.js         # Work order schema
│   ├── preventiveMaintenancePlan.model.js  # PM plan schema
│   ├── checklistTemplate.model.js # Checklist template schema
│   ├── inspectionExecution.model.js # Inspection execution schema
│   ├── part.model.js              # Part schema
│   ├── inventoryStockLine.model.js # Inventory stock line schema
│   ├── inventoryTransaction.model.js # Inventory transaction schema
│   ├── vendor.model.js            # Vendor schema
│   ├── document.model.js          # Document schema
│   ├── notification.model.js      # Notification schema
│   ├── savedView.model.js         # Saved view schema
│   ├── masterDataConfig.model.js  # Master data config schema
│   ├── importJob.model.js         # Import job schema
│   └── auditLog.model.js          # Audit log schema
│
├── routes/                        # Route definitions
│   ├── index.js                   # Main router aggregator
│   ├── auth.routes.js             # Authentication routes
│   ├── organizations.routes.js    # Organization routes
│   ├── dashboard.routes.js        # Dashboard routes
│   ├── properties.routes.js       # Property routes
│   ├── locations.routes.js        # Location routes
│   ├── roles.routes.js            # Role routes
│   ├── users.routes.js            # User routes
│   ├── teams.routes.js            # Team routes
│   ├── assets.routes.js           # Asset routes
│   ├── meters.routes.js           # Meter routes
│   ├── requests.routes.js         # Work request routes
│   ├── workOrders.routes.js       # Work order routes
│   ├── pmPlans.routes.js          # PM plan routes
│   ├── checklists.routes.js       # Checklist template routes
│   ├── inspections.routes.js      # Inspection routes
│   ├── parts.routes.js            # Part routes
│   ├── inventoryLines.routes.js   # Inventory stock line routes
│   ├── inventoryTransactions.routes.js # Inventory transaction routes
│   ├── vendors.routes.js          # Vendor routes
│   ├── documents.routes.js        # Document routes
│   ├── notifications.routes.js    # Notification routes
│   ├── reports.routes.js          # Report routes
│   ├── savedViews.routes.js       # Saved view routes
│   ├── settings.routes.js         # Settings routes
│   ├── imports.routes.js          # Import routes
│   └── auditLogs.routes.js        # Audit log routes
│
├── services/                      # Business logic layer
│   ├── auth/                      # Authentication services
│   │   ├── login.service.js
│   │   ├── logout.service.js
│   │   ├── refresh.service.js
│   │   ├── invite.service.js
│   │   ├── password.service.js
│   │   └── session.service.js
│   ├── organizations/             # Organization services
│   ├── dashboard/                 # Dashboard services
│   ├── properties/                # Property services
│   ├── locations/                 # Location services
│   ├── users/                     # User services
│   ├── roles/                     # Role services
│   ├── teams/                     # Team services
│   ├── assets/                    # Asset services
│   ├── meters/                    # Meter services
│   ├── requests/                  # Work request services
│   ├── workOrders/                # Work order services
│   ├── preventiveMaintenance/     # PM services
│   ├── inspections/               # Inspection services
│   ├── inventory/                 # Inventory services
│   ├── vendors/                   # Vendor services
│   ├── documents/                 # Document services
│   ├── notifications/             # Notification services
│   ├── reports/                   # Report services
│   ├── savedViews/                # Saved view services
│   ├── settings/                  # Settings services
│   ├── imports/                   # Import services
│   └── audit/                     # Audit services
│
├── validators/                    # Express-validator chains
│   ├── auth/                      # Authentication validators
│   │   ├── login.validator.js
│   │   ├── invite.validator.js
│   │   ├── password.validator.js
│   │   └── session.validator.js
│   ├── organizations/             # Organization validators
│   ├── dashboard/                 # Dashboard validators
│   ├── properties/                # Property validators
│   ├── locations/                 # Location validators
│   ├── users/                     # User validators
│   ├── roles/                     # Role validators
│   ├── teams/                     # Team validators
│   ├── assets/                    # Asset validators
│   ├── meters/                    # Meter validators
│   ├── requests/                  # Work request validators
│   ├── workOrders/                # Work order validators
│   ├── preventiveMaintenance/     # PM validators
│   ├── inspections/               # Inspection validators
│   ├── inventory/                 # Inventory validators
│   ├── vendors/                   # Vendor validators
│   ├── documents/                 # Document validators
│   ├── notifications/             # Notification validators
│   ├── reports/                   # Report validators
│   ├── savedViews/                # Saved view validators
│   ├── settings/                  # Settings validators
│   ├── imports/                   # Import validators
│   └── audit/                     # Audit validators
│
├── utils/                         # Utility functions
│   ├── constants.js               # **SINGLE SOURCE OF TRUTH** for backend constants
│   ├── http.js                    # HTTP response helpers
│   ├── pagination.js              # Pagination utilities
│   ├── query.js                   # Query building utilities
│   ├── dates.js                   # Date manipulation utilities
│   ├── errors.js                  # Custom error classes
│   ├── logger.js                  # Logger instance
│   └── filenames.js               # File naming utilities
│
├── jobs/                          # Background jobs
│   ├── pmGeneration.job.js        # PM work order generation
│   ├── slaEscalation.job.js       # SLA breach escalation
│   ├── lowStock.job.js            # Low stock alerts
│   ├── notificationDispatch.job.js # Notification email dispatch
│   └── sessionCleanup.job.js      # Expired session cleanup
│
├── sockets/                       # Socket.IO integration
│   ├── index.js                   # Socket.IO server setup
│   └── events.js                  # Socket event definitions
│
└── mock/                          # Mock data (Phase 17 only)
    ├── index.js                   # Mock data entry point
    ├── organizations.mock.js      # Organization mock data
    ├── properties.mock.js         # Property mock data
    ├── locations.mock.js          # Location mock data
    ├── roles.mock.js              # Role mock data
    ├── users.mock.js              # User mock data
    ├── teams.mock.js              # Team mock data
    ├── assets.mock.js             # Asset mock data
    ├── meters.mock.js             # Meter mock data
    ├── documents.mock.js          # Document mock data
    ├── requests.mock.js           # Work request mock data
    ├── workOrders.mock.js         # Work order mock data
    ├── pmPlans.mock.js            # PM plan mock data
    ├── checklists.mock.js         # Checklist mock data
    ├── parts.mock.js              # Part mock data
    ├── inventory.mock.js          # Inventory mock data
    ├── vendors.mock.js            # Vendor mock data
    ├── notifications.mock.js      # Notification mock data
    ├── savedViews.mock.js         # Saved view mock data
    └── seed.js                    # Seed script
```

### 2.3 Frontend Structure

The frontend must be organized as follows:

```
client/
├── package.json                   # Frontend dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── vite.config.js                # Vite build configuration
├── eslint.config.js              # ESLint flat configuration
├── index.html                    # HTML entry point
├── .env                          # Environment variables (gitignored)
│
├── public/                       # Static assets
│   └── react.svg                 # React logo
│
└── src/                          # Source code
    ├── main.jsx                  # Application entry point
    ├── App.jsx                   # Root application component
    │
    ├── app/                      # Application configuration
    │   ├── router.jsx            # React Router configuration
    │   ├── store.js              # Redux store configuration
    │   ├── providers.jsx         # Provider composition
    │   └── theme/                # MUI theme configuration
    │       ├── index.js          # Theme export
    │       ├── AppTheme.jsx      # Theme provider component
    │       ├── themePrimitives.js # Color schemes, typography, shadows
    │       └── customizations/   # MUI component customizations
    │           ├── index.js      # Customizations export
    │           ├── inputs.js     # Input component overrides
    │           ├── dataDisplay.js # Data display overrides
    │           ├── feedback.js   # Feedback component overrides
    │           ├── navigation.js # Navigation overrides
    │           ├── surfaces.js   # Surface component overrides
    │           ├── charts.js     # Chart component overrides
    │           ├── dataGrid.js   # Data grid overrides
    │           └── datePickers.js # Date picker overrides
    │
    ├── assets/                   # Static assets
    │   └── notFound_404.svg      # 404 illustration
    │
    ├── components/               # Shared reusable components
    │   ├── layout/               # Layout components
    │   │   ├── AppLayout.jsx     # Main application layout
    │   │   ├── PageHeader.jsx    # Page header component
    │   │   ├── SideNav.jsx       # Side navigation
    │   │   ├── TopBar.jsx        # Top bar
    │   │   └── Footer.jsx        # Footer
    │   ├── feedback/             # Feedback components
    │   │   ├── LoadingState.jsx  # Loading spinner
    │   │   ├── EmptyState.jsx    # Empty state message
    │   │   ├── ErrorState.jsx    # Error state message
    │   │   └── AlertBanner.jsx   # Alert banner
    │   ├── navigation/           # Navigation components
    │   │   ├── Breadcrumbs.jsx   # Breadcrumb navigation
    │   │   ├── Tabs.jsx          # Tab navigation
    │   │   └── Menu.jsx          # Menu component
    │   ├── dataDisplay/          # Data display components
    │   │   ├── Card.jsx          # Card component
    │   │   ├── StatTile.jsx      # KPI stat tile
    │   │   ├── Timeline.jsx      # Timeline component
    │   │   ├── KeyValueList.jsx  # Key-value list
    │   │   └── DataGrid.jsx      # Data grid wrapper
    │   ├── forms/                # Form components
    │   │   ├── FormField.jsx     # Form field wrapper
    │   │   ├── TextField.jsx     # Text field
    │   │   ├── SelectField.jsx   # Select field
    │   │   ├── DateField.jsx     # Date field
    │   │   ├── CheckboxField.jsx # Checkbox field
    │   │   └── FilterBar.jsx     # Filter bar
    │   ├── dialogs/              # Dialog components
    │   │   ├── ConfirmDialog.jsx # Confirmation dialog
    │   │   └── ActionDrawer.jsx  # Action drawer
    │   ├── uploads/              # Upload components
    │   │   ├── FileDropzone.jsx  # File dropzone
    │   │   ├── FilePreview.jsx   # File preview
    │   │   └── AttachmentTile.jsx # Attachment tile
    │   └── charts/               # Chart components
    │       ├── ChartWrapper.jsx  # Chart wrapper
    │       └── ChartLegend.jsx   # Chart legend
    │
    ├── domains/                  # Domain-specific features
    │   ├── auth/                 # Authentication domain
    │   │   ├── api/              # Auth API calls
    │   │   ├── hooks/            # Auth hooks
    │   │   ├── components/       # Auth components
    │   │   └── utils/            # Auth utilities
    │   ├── organizations/        # Organizations domain
    │   ├── dashboard/            # Dashboard domain
    │   ├── properties/           # Properties domain
    │   ├── users/                # Users domain
    │   ├── roles/                # Roles domain
    │   ├── teams/                # Teams domain
    │   ├── requests/             # Work requests domain
    │   ├── workOrders/           # Work orders domain
    │   ├── preventiveMaintenance/ # PM domain
    │   ├── assets/               # Assets domain
    │   ├── locations/            # Locations domain
    │   ├── inventory/            # Inventory domain
    │   ├── vendors/              # Vendors domain
    │   ├── notifications/        # Notifications domain
    │   ├── reports/              # Reports domain
    │   ├── settings/             # Settings domain
    │   ├── imports/              # Imports domain
    │   ├── audit/                # Audit domain
    │   └── portal/               # Portal domain (request/vendor portals)
    │
    ├── hooks/                    # Shared custom hooks
    │   ├── useAuth.js            # Authentication hook
    │   ├── usePermissions.js     # Permissions hook
    │   ├── useSocket.js          # Socket.IO hook
    │   ├── useDebounce.js        # Debounce hook
    │   └── useMediaQuery.js      # Media query hook
    │
    ├── services/                 # Service layer
    │   ├── api/                  # API client
    │   │   ├── client.js         # Axios client configuration
    │   │   ├── auth.api.js       # Auth API
    │   │   ├── organizations.api.js # Organizations API
    │   │   ├── properties.api.js # Properties API
    │   │   ├── locations.api.js  # Locations API
    │   │   ├── users.api.js      # Users API
    │   │   ├── roles.api.js      # Roles API
    │   │   ├── teams.api.js      # Teams API
    │   │   ├── assets.api.js     # Assets API
    │   │   ├── meters.api.js     # Meters API
    │   │   ├── requests.api.js   # Work requests API
    │   │   ├── workOrders.api.js # Work orders API
    │   │   ├── pmPlans.api.js    # PM plans API
    │   │   ├── inspections.api.js # Inspections API
    │   │   ├── inventory.api.js  # Inventory API
    │   │   ├── vendors.api.js    # Vendors API
    │   │   ├── documents.api.js  # Documents API
    │   │   ├── notifications.api.js # Notifications API
    │   │   ├── reports.api.js    # Reports API
    │   │   ├── savedViews.api.js # Saved views API
    │   │   ├── settings.api.js   # Settings API
    │   │   ├── imports.api.js    # Imports API
    │   │   └── audit.api.js      # Audit API
    │   └── sockets/              # Socket.IO client
    │       ├── socket.js         # Socket client
    │       └── events.js         # Socket event handlers
    │
    ├── store/                    # Redux store
    │   ├── slices/               # Redux slices
    │   │   ├── authSlice.js      # Auth state
    │   │   ├── userSlice.js      # User state
    │   │   ├── notificationSlice.js # Notification state
    │   │   └── uiSlice.js        # UI state
    │   └── selectors/            # Redux selectors
    │       ├── authSelectors.js  # Auth selectors
    │       └── userSelectors.js  # User selectors
    │
    ├── utils/                    # Utility functions
    │   ├── constants.js          # **SINGLE SOURCE OF TRUTH** for frontend constants
    │   ├── routes.js             # Route constants
    │   ├── permissions.js        # Permission utilities
    │   ├── formatting.js         # Formatting utilities
    │   ├── tables.js             # Table utilities
    │   └── dates.js              # Date utilities
    │
    └── pages/                    # Page components
        ├── auth/                 # Auth pages
        │   ├── LoginPage.jsx     # Login page
        │   ├── ForgotPasswordPage.jsx # Forgot password page
        │   ├── ResetPasswordPage.jsx # Reset password page
        │   └── InvitePage.jsx    # Invitation acceptance page
        ├── organizations/        # Organization pages
        ├── dashboard/            # Dashboard pages
        ├── properties/           # Property pages
        ├── users/                # User pages
        ├── roles/                # Role pages
        ├── teams/                # Team pages
        ├── requests/             # Work request pages
        ├── workOrders/           # Work order pages
        ├── preventiveMaintenance/ # PM pages
        ├── assets/               # Asset pages
        ├── locations/            # Location pages
        ├── inventory/            # Inventory pages
        ├── vendors/              # Vendor pages
        ├── notifications/        # Notification pages
        ├── reports/              # Report pages
        ├── settings/             # Settings pages
        ├── imports/              # Import pages
        ├── audit/                # Audit pages
        └── portal/               # Portal pages
```

### 2.4 Documentation Structure

The `docs/` directory contains the full implementation flow:

```
docs/
├── prd.md                        # Product Requirements Document
├── requirements.md               # Implementation Requirements
├── design.md                     # Design Specifications
├── tasks.md                      # 18-Phase Implementation Plan
├── task-execution-protocol.md   # Execution Workflow
├── traceability-matrix.md        # Cross-Document Traceability
├── generation_prompt.md          # Repository Conventions
└── theming-protocol.md           # MUI v9 Theming Standards
```

## 3. Backend Architecture

### 3.1 Backend Bootstrap Design

#### 3.1.1 server.js Responsibilities

`backend/server.js` is the entry point and must:

1. Load the app instance from `app.js`
2. Create the HTTP server using `http.createServer(app)`
3. Bind the Socket.IO layer if enabled (check `ENABLE_SOCKETS` environment variable)
4. Start the server after environment and dependency initialization
5. Handle graceful shutdown on SIGTERM and SIGINT signals
6. Log server startup information (port, environment, timestamp)

**Example Structure**:

```javascript
/**
 * HTTP server bootstrap and startup.
 *
 * @module server
 */

import http from "http";
import app from "./app.js";
import { initializeSocket } from "./sockets/index.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

// Initialize Socket.IO if enabled
if (process.env.ENABLE_SOCKETS === "true") {
  initializeSocket(server);
  logger.info("Socket.IO initialized");
}

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});
```

#### 3.1.2 app.js Responsibilities

`backend/app.js` is the Express app configuration and must:

1. Load environment configuration from `config/env.js`
2. Build the Express app instance
3. Register core middlewares in the correct order (see section 3.2)
4. Register routes under `/api/v1` prefix
5. Register 404 handling middleware
6. Register centralized error handling middleware
7. Export the configured app instance

**Example Structure**:

```javascript
/**
 * Express app configuration and middleware setup.
 *
 * @module app
 */

import express from "express";
import "./config/env.js"; // Load environment variables
import "./config/database.js"; // Connect to MongoDB
import { requestId } from "./middlewares/request/requestId.js";
import { securityHeaders } from "./middlewares/security/helmet.js";
import { corsMiddleware } from "./middlewares/security/cors.js";
import { compression } from "compression";
import cookieParser from "cookie-parser";
import { mongoSanitize } from "./middlewares/security/mongoSanitize.js";
import { requestLogger } from "./middlewares/request/requestLogger.js";
import routes from "./routes/index.js";
import { notFound } from "./middlewares/error/notFound.js";
import { errorHandler } from "./middlewares/error/errorHandler.js";

const app = express();

// Core middleware pipeline (order matters!)
app.use(requestId);
app.use(securityHeaders);
app.use(corsMiddleware);
app.use(compression());
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(mongoSanitize);
app.use(requestLogger);

// API routes
app.use("/api/v1", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
```

### 3.2 Middleware Pipeline Design

The backend middleware pipeline must be executed in this **exact order**:

1. **Environment Bootstrap**: Load and validate environment variables
2. **Request ID Attachment**: Attach unique ID to `req.id` for tracing
3. **Security Headers**: Apply helmet security headers
4. **CORS**: Handle cross-origin requests
5. **Compression**: Compress responses
6. **Cookie Parsing**: Parse cookies into `req.cookies`
7. **JSON Parsing**: Parse JSON request bodies
8. **URL-Encoded Parsing**: Parse URL-encoded bodies where required
9. **Mongo Sanitization**: Prevent MongoDB injection attacks
10. **Request Logging**: Log incoming requests with request ID
11. **Auth Decoding** (route-specific): Decode JWT and attach `req.user`
12. **Authorization** (route-specific): Check permissions
13. **Validation** (route-specific): Run express-validator chains
14. **Validated-Request Normalization** (route-specific): Attach `req.validated`
15. **Controller Execution**: Execute controller logic
16. **Error Translation**: Catch and translate errors

**Critical Rules**:

- Middleware order is **non-negotiable**
- Auth, authorization, validation, and normalization are applied per-route, not globally
- Controllers execute after all middleware
- Error handling is the last middleware

### 3.3 Request Normalization Design

The validated input contract is **mandatory** and must be realized as a dedicated middleware utility.

#### 3.3.1 Validation Flow

1. **Route Definition**: Apply express-validator chains to route
2. **Validation Execution**: Express-validator runs validation rules
3. **Result Evaluation**: `validateRequest` middleware checks for validation errors
4. **Error Response**: If validation fails, return 400 with structured error details
5. **Normalization**: If validation passes, `normalizeValidated` middleware attaches `req.validated`
6. **Controller Execution**: Controller reads only `req.validated`

#### 3.3.2 req.validated Contract

The `req.validated` object must have this **exact structure**:

```javascript
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```

**Rules**:

- Each location (`body`, `params`, `query`) is an object
- If no data exists for a location, it defaults to `{}`
- Only validated and sanitized data appears in `req.validated`
- Controllers **MUST NOT** read `req.body`, `req.params`, or `req.query` directly

#### 3.3.3 Middleware Implementation

**validateRequest.js**:

```javascript
/**
 * Validate request using express-validator results.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};
```

**normalizeValidated.js**:

```javascript
/**
 * Normalize validated data into req.validated.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const normalizeValidated = (req, res, next) => {
  req.validated = {
    body: matchedData(req, { locations: ["body"] }) || {},
    params: matchedData(req, { locations: ["params"] }) || {},
    query: matchedData(req, { locations: ["query"] }) || {},
  };

  next();
};
```

### 3.4 Actor Context Design

The actor context must be designed as a stable object attached to `req.user` and reused by services and audit logging.

#### 3.4.1 Actor Context Structure

The `req.user` object must carry **at minimum**:

```javascript
req.user = {
  userId: '507f1f77bcf86cd799439011',           // MongoDB ObjectId as string
  organizationId: '507f1f77bcf86cd799439012',   // Organization ID
  propertyIds: ['507f...', '507f...'],          // Array of property IDs user has access to
  locationIds: ['507f...', '507f...'],          // Array of location IDs (optional, for location-scoped users)
  roleKeys: ['PROPERTY_MANAGER', 'TECHNICIAN'], // Array of role keys
  permissions: ['view_work_order', 'edit_work_order', ...], // Array of permission keys
  sessionId: '507f1f77bcf86cd799439013',        // Session ID
  email: 'user@example.com',                    // User email
  firstName: 'John',                            // User first name
  lastName: 'Doe'                               // User last name
};
```

#### 3.4.2 Actor Context Usage

**In Controllers**:

```javascript
export const getWorkOrder = async (req, res) => {
  const { id } = req.validated.params;
  const actor = req.user; // Actor context

  const workOrder = await workOrderService.getById(id, actor);

  res.json({ success: true, data: workOrder });
};
```

**In Services**:

```javascript
export const getById = async (id, actor) => {
  // Check permissions
  if (!actor.permissions.includes("view_work_order")) {
    throw new ForbiddenError("Insufficient permissions");
  }

  // Check property scope
  const workOrder = await WorkOrder.findById(id);
  if (!actor.propertyIds.includes(workOrder.propertyId.toString())) {
    throw new ForbiddenError("Work order not in user property scope");
  }

  // Log audit trail
  await auditService.log({
    action: "VIEW_WORK_ORDER",
    entityType: "WORK_ORDER",
    entityId: id,
    actorId: actor.userId,
    organizationId: actor.organizationId,
  });

  return workOrder;
};
```

#### 3.4.3 Synthetic Actor Context for Background Jobs

Background jobs, imports, and automated flows must pass a synthetic actor context compatible with the `req.user` contract:

```javascript
/**
 * Create synthetic actor context for system-triggered operations.
 *
 * @param {string} organizationId - Organization ID
 * @param {string} propertyId - Property ID
 * @returns {Object} Synthetic actor context
 */
export const createSystemActor = (organizationId, propertyId) => {
  return {
    userId: "SYSTEM",
    organizationId,
    propertyIds: [propertyId],
    locationIds: [],
    roleKeys: ["SYSTEM"],
    permissions: ["*"], // All permissions
    sessionId: null,
    email: "system@internal",
    firstName: "System",
    lastName: "Automated",
  };
};
```

### 3.5 Backend Constants Design

`backend/utils/constants.js` must export or aggregate **all** backend constants.

#### 3.5.1 Constants Structure

```javascript
/**
 * Backend constants - SINGLE SOURCE OF TRUTH.
 *
 * @module constants
 */

// Role Keys
export const ROLE_KEYS = {
  SUPER_ADMIN: "SUPER_ADMIN",
  CORPORATE_ADMIN: "CORPORATE_ADMIN",
  CORPORATE_ENGINEERING_DIRECTOR: "CORPORATE_ENGINEERING_DIRECTOR",
  PROPERTY_MANAGER: "PROPERTY_MANAGER",
  CHIEF_ENGINEER: "CHIEF_ENGINEER",
  MAINTENANCE_SUPERVISOR: "MAINTENANCE_SUPERVISOR",
  MAINTENANCE_PLANNER: "MAINTENANCE_PLANNER",
  TECHNICIAN: "TECHNICIAN",
  INVENTORY_CONTROLLER: "INVENTORY_CONTROLLER",
  VENDOR_COORDINATOR: "VENDOR_COORDINATOR",
  REQUESTER: "REQUESTER",
  VENDOR_USER: "VENDOR_USER",
  READ_ONLY_USER: "READ_ONLY_USER",
};

// Permission Keys
export const PERMISSION_KEYS = {
  VIEW_DASHBOARD: "view_dashboard",
  CREATE_REQUEST: "create_request",
  VIEW_REQUEST: "view_request",
  EDIT_REQUEST: "edit_request",
  DELETE_REQUEST: "delete_request",
  APPROVE_REQUEST: "approve_request",
  CREATE_WORK_ORDER: "create_work_order",
  VIEW_WORK_ORDER: "view_work_order",
  EDIT_WORK_ORDER: "edit_work_order",
  DELETE_WORK_ORDER: "delete_work_order",
  ASSIGN_WORK_ORDER: "assign_work_order",
  COMPLETE_WORK_ORDER: "complete_work_order",
  VERIFY_WORK_ORDER: "verify_work_order",
  // ... (all permission keys)
};

// Work Order Statuses
export const WORK_ORDER_STATUS = {
  DRAFT: "Draft",
  OPEN: "Open",
  ASSIGNED: "Assigned",
  SCHEDULED: "Scheduled",
  IN_PROGRESS: "In_Progress",
  ON_HOLD: "On_Hold",
  AWAITING_PARTS: "Awaiting_Parts",
  AWAITING_APPROVAL: "Awaiting_Approval",
  COMPLETED: "Completed",
  VERIFIED: "Verified",
  CLOSED: "Closed",
  CANCELLED: "Cancelled",
};

// Work Order Priorities
export const WORK_ORDER_PRIORITY = {
  EMERGENCY: "Emergency",
  URGENT: "Urgent",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

// Work Order Types
export const WORK_ORDER_TYPE = {
  CORRECTIVE: "Corrective",
  EMERGENCY: "Emergency",
  PREVENTIVE: "Preventive",
  INSPECTION_FOLLOW_UP: "Inspection_Follow_Up",
  VENDOR: "Vendor",
  PLANNED: "Planned",
  PROJECT: "Project",
};

// Guest Impact Levels
export const GUEST_IMPACT = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  NONE: "None",
};

// Notification Event Names
export const NOTIFICATION_EVENTS = {
  WORK_ORDER_CREATED: "WORK_ORDER_CREATED",
  WORK_ORDER_ASSIGNED: "WORK_ORDER_ASSIGNED",
  WORK_ORDER_COMPLETED: "WORK_ORDER_COMPLETED",
  REQUEST_SUBMITTED: "REQUEST_SUBMITTED",
  REQUEST_APPROVED: "REQUEST_APPROVED",
  REQUEST_REJECTED: "REQUEST_REJECTED",
  PM_GENERATED: "PM_GENERATED",
  LOW_STOCK_ALERT: "LOW_STOCK_ALERT",
  SLA_BREACH: "SLA_BREACH",
  // ... (all notification events)
};

// Audit Action Names
export const AUDIT_ACTIONS = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  VIEW: "VIEW",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  APPROVE: "APPROVE",
  REJECT: "REJECT",
  ASSIGN: "ASSIGN",
  COMPLETE: "COMPLETE",
  // ... (all audit actions)
};

// Entity Type Names
export const ENTITY_TYPES = {
  ORGANIZATION: "ORGANIZATION",
  PROPERTY: "PROPERTY",
  LOCATION: "LOCATION",
  USER: "USER",
  ROLE: "ROLE",
  TEAM: "TEAM",
  ASSET: "ASSET",
  WORK_REQUEST: "WORK_REQUEST",
  WORK_ORDER: "WORK_ORDER",
  PM_PLAN: "PM_PLAN",
  INSPECTION: "INSPECTION",
  PART: "PART",
  VENDOR: "VENDOR",
  // ... (all entity types)
};

// ... (all other constants)
```

#### 3.5.2 Constants Rules

1. **Single Source of Truth**: `backend/utils/constants.js` is the ONLY approved import entry point
2. **No Duplication**: Do NOT create duplicate constant definitions in other files
3. **No String Literals**: Use constants instead of hardcoded strings in business logic
4. **Export All**: All constants must be exported from this file
5. **Re-export Pattern**: If constants are split into multiple files for maintenance, re-export them through `constants.js`

### 3.6 Backend Service Design

Each service domain must own business logic and coordinate:

1. Model reads and writes
2. Validation beyond request-shape validation
3. Permission-sensitive business rules
4. Audit log creation
5. Notification emission
6. Transaction or multi-write coordination

#### 3.6.1 Service Layer Principles

**Separation of Concerns**:

- Controllers orchestrate HTTP concerns (request/response)
- Services implement business logic
- Models define data structure and basic validation

**Service Responsibilities**:

- Enforce business rules
- Check permissions
- Create audit logs
- Emit notifications
- Coordinate transactions
- Return structured data

**Service Anti-Patterns** (DO NOT DO):

- Receiving raw Express `req` or `res` objects
- Handling HTTP status codes
- Formatting HTTP responses
- Reading environment variables directly

#### 3.6.2 Service Structure Example

```javascript
/**
 * Work order service - business logic layer.
 *
 * @module services/workOrders
 */

import WorkOrder from "../../models/workOrder.model.js";
import { auditService } from "../audit/audit.service.js";
import { notificationService } from "../notifications/notification.service.js";
import { ForbiddenError, NotFoundError } from "../../utils/errors.js";
import {
  PERMISSION_KEYS,
  AUDIT_ACTIONS,
  NOTIFICATION_EVENTS,
} from "../../utils/constants.js";

/**
 * Get work order by ID.
 *
 * @param {string} id - Work order ID
 * @param {Object} actor - Actor context from req.user
 * @returns {Promise<Object>} Work order
 * @throws {ForbiddenError} If user lacks permissions
 * @throws {NotFoundError} If work order not found
 */
export const getById = async (id, actor) => {
  // Check permissions
  if (!actor.permissions.includes(PERMISSION_KEYS.VIEW_WORK_ORDER)) {
    throw new ForbiddenError("Insufficient permissions to view work orders");
  }

  // Fetch work order
  const workOrder = await WorkOrder.findById(id)
    .populate("assignedTo", "firstName lastName email")
    .populate("asset", "name assetTag")
    .populate("location", "name code");

  if (!workOrder) {
    throw new NotFoundError("Work order not found");
  }

  // Check property scope
  if (!actor.propertyIds.includes(workOrder.propertyId.toString())) {
    throw new ForbiddenError("Work order not in user property scope");
  }

  // Log audit trail
  await auditService.log({
    action: AUDIT_ACTIONS.VIEW,
    entityType: "WORK_ORDER",
    entityId: id,
    actorId: actor.userId,
    organizationId: actor.organizationId,
    propertyId: workOrder.propertyId,
  });

  return workOrder;
};

/**
 * Create work order.
 *
 * @param {Object} data - Work order data from req.validated.body
 * @param {Object} actor - Actor context from req.user
 * @returns {Promise<Object>} Created work order
 * @throws {ForbiddenError} If user lacks permissions
 */
export const create = async (data, actor) => {
  // Check permissions
  if (!actor.permissions.includes(PERMISSION_KEYS.CREATE_WORK_ORDER)) {
    throw new ForbiddenError("Insufficient permissions to create work orders");
  }

  // Check property scope
  if (!actor.propertyIds.includes(data.propertyId)) {
    throw new ForbiddenError(
      "Cannot create work order for property outside user scope"
    );
  }

  // Create work order
  const workOrder = await WorkOrder.create({
    ...data,
    organizationId: actor.organizationId,
    createdBy: actor.userId,
  });

  // Log audit trail
  await auditService.log({
    action: AUDIT_ACTIONS.CREATE,
    entityType: "WORK_ORDER",
    entityId: workOrder._id,
    actorId: actor.userId,
    organizationId: actor.organizationId,
    propertyId: workOrder.propertyId,
    after: workOrder,
  });

  // Emit notification
  await notificationService.emit({
    event: NOTIFICATION_EVENTS.WORK_ORDER_CREATED,
    entityType: "WORK_ORDER",
    entityId: workOrder._id,
    organizationId: actor.organizationId,
    propertyId: workOrder.propertyId,
    actorId: actor.userId,
    recipients: [workOrder.assignedTo], // Notify assigned user
  });

  return workOrder;
};
```

#### 3.6.3 Service Organization

Services must be split by domain:

- `services/auth/` - Authentication and session services
- `services/workOrders/` - Work order services
- `services/assets/` - Asset services
- `services/inventory/` - Inventory services
- etc.

**DO NOT** create generic CRUD helpers that bypass domain logic.

### 3.7 Backend Route and Controller Design

#### 3.7.1 Route File Structure

Each route file must:

1. Define endpoint paths
2. Apply auth middleware
3. Apply authorization middleware
4. Apply validator chains
5. Apply validated-request normalization
6. Invoke controller method

**Example Route File**:

```javascript
/**
 * Work order routes.
 *
 * @module routes/workOrders
 */

import express from "express";
import { requireAuth } from "../middlewares/auth/requireAuth.js";
import { requirePermissions } from "../middlewares/auth/requirePermissions.js";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { normalizeValidated } from "../middlewares/validation/normalizeValidated.js";
import {
  createValidator,
  updateValidator,
} from "../validators/workOrders/workOrder.validator.js";
import {
  create,
  getById,
  update,
  list,
} from "../controllers/workOrders/workOrder.controller.js";
import { PERMISSION_KEYS } from "../utils/constants.js";

const router = express.Router();

// List work orders
router.get(
  "/",
  requireAuth,
  requirePermissions([PERMISSION_KEYS.VIEW_WORK_ORDER]),
  validateRequest,
  normalizeValidated,
  list
);

// Get work order by ID
router.get(
  "/:id",
  requireAuth,
  requirePermissions([PERMISSION_KEYS.VIEW_WORK_ORDER]),
  validateRequest,
  normalizeValidated,
  getById
);

// Create work order
router.post(
  "/",
  requireAuth,
  requirePermissions([PERMISSION_KEYS.CREATE_WORK_ORDER]),
  createValidator,
  validateRequest,
  normalizeValidated,
  create
);

// Update work order
router.patch(
  "/:id",
  requireAuth,
  requirePermissions([PERMISSION_KEYS.EDIT_WORK_ORDER]),
  updateValidator,
  validateRequest,
  normalizeValidated,
  update
);

export default router;
```

#### 3.7.2 Controller File Structure

Each controller file must:

1. Extract only `req.user` and `req.validated`
2. Call one or more service methods
3. Return normalized success responses
4. Throw or pass structured errors to centralized error layer

**Example Controller File**:

```javascript
/**
 * Work order controllers.
 *
 * @module controllers/workOrders
 */

import * as workOrderService from "../../services/workOrders/workOrder.service.js";

/**
 * Get work order by ID.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const getById = async (req, res, next) => {
  try {
    const { id } = req.validated.params;
    const actor = req.user;

    const workOrder = await workOrderService.getById(id, actor);

    res.json({
      success: true,
      data: workOrder,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create work order.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const create = async (req, res, next) => {
  try {
    const data = req.validated.body;
    const actor = req.user;

    const workOrder = await workOrderService.create(data, actor);

    res.status(201).json({
      success: true,
      data: workOrder,
      message: "Work order created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * List work orders.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const list = async (req, res, next) => {
  try {
    const filters = req.validated.query;
    const actor = req.user;

    const result = await workOrderService.list(filters, actor);

    res.json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};
```

#### 3.7.3 Controller Rules

**MUST DO**:

- Extract `req.user` and `req.validated` only
- Call service methods
- Return structured JSON responses
- Pass errors to `next(error)`

**MUST NOT DO**:

- Read `req.body`, `req.params`, or `req.query` directly
- Implement business logic
- Access models directly
- Handle errors with try/catch without calling `next(error)`

### 3.8 Model Design

Every model must be implemented as a dedicated Mongoose model file with:

1. Full field set from requirements
2. Full enum validation
3. Required indexes
4. Shared audit and soft-delete fields
5. JSDoc documenting purpose and field intent

#### 3.8.1 Model Structure Example

```javascript
/**
 * Work Order model.
 *
 * @module models/workOrder
 */

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import {
  WORK_ORDER_STATUS,
  WORK_ORDER_PRIORITY,
  WORK_ORDER_TYPE,
  GUEST_IMPACT,
} from "../utils/constants.js";

const workOrderSchema = new mongoose.Schema(
  {
    // Identification
    workOrderNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Organization and Property
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true,
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
      index: true,
    },

    // Basic Information
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    // Classification
    workType: {
      type: String,
      enum: Object.values(WORK_ORDER_TYPE),
      required: true,
      index: true,
    },
    priority: {
      type: String,
      enum: Object.values(WORK_ORDER_PRIORITY),
      required: true,
      index: true,
    },
    guestImpact: {
      type: String,
      enum: Object.values(GUEST_IMPACT),
      default: "None",
    },

    // Location and Asset
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
      required: true,
      index: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      index: true,
    },

    // Assignment
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    assignedTeam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      index: true,
    },

    // Scheduling
    scheduledStart: {
      type: Date,
      index: true,
    },
    scheduledEnd: {
      type: Date,
    },
    actualStart: {
      type: Date,
    },
    actualEnd: {
      type: Date,
    },

    // Status
    status: {
      type: String,
      enum: Object.values(WORK_ORDER_STATUS),
      default: "Open",
      required: true,
      index: true,
    },

    // Completion
    completionNotes: {
      type: String,
      maxlength: 5000,
    },
    verificationNotes: {
      type: String,
      maxlength: 5000,
    },

    // Costs (server-derived)
    laborCost: {
      type: Number,
      default: 0,
    },
    partsCost: {
      type: Number,
      default: 0,
    },
    vendorCost: {
      type: Number,
      default: 0,
    },
    totalCost: {
      type: Number,
      default: 0,
    },

    // Audit Fields
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Soft Delete
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    collection: "work_orders",
  }
);

// Indexes
workOrderSchema.index({ organizationId: 1, propertyId: 1, status: 1 });
workOrderSchema.index({ organizationId: 1, propertyId: 1, assignedTo: 1 });
workOrderSchema.index({ organizationId: 1, propertyId: 1, workType: 1 });
workOrderSchema.index({ organizationId: 1, propertyId: 1, createdAt: -1 });

// Plugins
workOrderSchema.plugin(mongoosePaginate);

// Export model
export default mongoose.model("WorkOrder", workOrderSchema);
```

#### 3.8.2 Model Rules

**MUST HAVE**:

- All fields from requirements document
- Enum validation for status, priority, type fields
- Indexes for frequently queried fields
- Audit fields (createdBy, updatedBy, createdAt, updatedAt)
- Soft delete fields (isDeleted, deletedAt, deletedBy)
- JSDoc comments

**MUST NOT HAVE**:

- Business logic (belongs in services)
- HTTP concerns (belongs in controllers)
- Hardcoded enum values (use constants)

### 3.9 Background Jobs Design

The `backend/jobs/` area must isolate background tasks.

#### 3.9.1 Required Jobs

1. **PM Generation Job** (`pmGeneration.job.js`): Generate PM work orders based on schedules
2. **SLA Escalation Job** (`slaEscalation.job.js`): Evaluate SLA breaches and send escalations
3. **Low Stock Job** (`lowStock.job.js`): Check inventory levels and send alerts
4. **Notification Dispatch Job** (`notificationDispatch.job.js`): Send queued email notifications
5. **Session Cleanup Job** (`sessionCleanup.job.js`): Remove expired sessions

#### 3.9.2 Job Structure Example

```javascript
/**
 * PM generation background job.
 *
 * @module jobs/pmGeneration
 */

import cron from "node-cron";
import logger from "../utils/logger.js";
import * as pmService from "../services/preventiveMaintenance/generation.service.js";
import { createSystemActor } from "../utils/actor.js";

/**
 * Generate PM work orders for all active PM plans.
 * Runs daily at 2:00 AM.
 */
export const startPMGenerationJob = () => {
  // Run daily at 2:00 AM
  cron.schedule("0 2 * * *", async () => {
    logger.info("PM generation job started");

    try {
      // Get all organizations
      const organizations = await Organization.find({ isActive: true });

      for (const org of organizations) {
        // Get all properties for organization
        const properties = await Property.find({
          organizationId: org._id,
          isActive: true,
        });

        for (const property of properties) {
          // Create synthetic actor context
          const actor = createSystemActor(
            org._id.toString(),
            property._id.toString()
          );

          // Generate PM work orders
          const result = await pmService.generateWorkOrders(
            property._id,
            actor
          );

          logger.info(
            `Generated ${result.count} PM work orders for property ${property.name}`
          );
        }
      }

      logger.info("PM generation job completed successfully");
    } catch (error) {
      logger.error("PM generation job failed", {
        error: error.message,
        stack: error.stack,
      });
    }
  });

  logger.info("PM generation job scheduled");
};
```

#### 3.9.3 Job Rules

**MUST DO**:

- Call services rather than duplicating business rules
- Use synthetic actor context compatible with `req.user`
- Log job start, completion, and errors
- Handle errors gracefully
- Run only when `ENABLE_SCHEDULERS` environment flag is set

**MUST NOT DO**:

- Duplicate business logic from services
- Access models directly without going through services
- Run without synthetic actor context

### 3.10 Mock Data Design

The `backend/mock/` area must:

1. Mirror the domain model structure
2. Use the same constants source of truth
3. Produce realistic relationships across entities
4. Be introduced **only after all primary models exist** (Phase 17)

#### 3.10.1 Mock Data Rules

**MUST DO**:

- Use realistic hospitality naming and hierarchy
- Represent more than one property
- Include both guest-facing and BOH examples
- Include open and closed operational records
- Include inventory movements and vendor activity
- Use constants from `backend/utils/constants.js`

**MUST NOT DO**:

- Introduce mock data before Phase 17
- Hardcode enum values
- Create unrealistic data relationships

### 3.11 System Bootstrap Design

The system bootstrap mechanism provides a production-ready way to create the first organization and Super_Admin user without relying on pre-existing actors or external database insertion.

#### 3.11.1 Bootstrap Implementation Phase

**Phase**: Phase 03.5 (after infrastructure, before authentication)

**Rationale**: Bootstrap must be implemented after:

- Database connection is established
- Core models exist (Organization, Role, User, AuditLog)
- Constants source of truth exists
- Validation middleware exists

And before:

- Authentication can be tested end-to-end
- Any feature requiring a logged-in user

#### 3.11.2 Bootstrap Backend Endpoint Design

**Route**: `POST /api/v1/bootstrap/initialize`

**Purpose**: Create the first organization and Super_Admin user atomically

**Availability Logic**:

```javascript
/**
 * Check if bootstrap is required.
 *
 * @returns {Promise<boolean>} True if no organizations exist
 */
async function isBootstrapRequired() {
  const organizationCount = await Organization.countDocuments();
  return organizationCount === 0;
}
```

**Controller Pattern** (`backend/controllers/bootstrap/bootstrap.controller.js`):

```javascript
/**
 * Initialize system with first organization and admin user.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const initializeSystem = async (req, res, next) => {
  try {
    // 1. Check if bootstrap already completed
    const bootstrapRequired = await isBootstrapRequired();
    if (!bootstrapRequired) {
      return res.status(409).json({
        success: false,
        message: "System already initialized",
        error: "BOOTSTRAP_ALREADY_COMPLETED",
      });
    }

    // 2. Extract validated data
    const { organization, admin } = req.validated.body;

    // 3. Call bootstrap service
    const result = await bootstrapService.initializeSystem(
      organization,
      admin,
      {
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      }
    );

    // 4. Return success
    res.status(201).json({
      success: true,
      message: "System initialized successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
```

**Service Pattern** (`backend/services/bootstrap/bootstrap.service.js`):

```javascript
/**
 * Initialize system with first organization and admin user.
 *
 * @param {Object} organizationData - Organization data
 * @param {Object} adminData - Admin user data
 * @param {Object} metadata - Request metadata (IP, user agent)
 * @returns {Promise<Object>} Created organization and admin user IDs
 */
export const initializeSystem = async (
  organizationData,
  adminData,
  metadata
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create organization
    const organization = await Organization.create(
      [
        {
          name: organizationData.name,
          subdomain: organizationData.subdomain,
          timezone: organizationData.timezone,
          currency: organizationData.currency || "USD",
          status: "active",
          createdAt: new Date(),
        },
      ],
      { session }
    );

    // 2. Ensure Super_Admin role exists
    let superAdminRole = await Role.findOne({
      key: ROLE_KEYS.SUPER_ADMIN,
      organizationId: organization[0]._id,
    }).session(session);

    if (!superAdminRole) {
      superAdminRole = await Role.create(
        [
          {
            key: ROLE_KEYS.SUPER_ADMIN,
            name: "Super Admin",
            organizationId: organization[0]._id,
            permissions: ["*"], // All permissions
            isBuiltIn: true,
            isActive: true,
          },
        ],
        { session }
      );
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // 4. Create admin user
    const adminUser = await User.create(
      [
        {
          email: adminData.email.toLowerCase(),
          firstName: adminData.firstName,
          lastName: adminData.lastName,
          displayName: `${adminData.firstName} ${adminData.lastName}`,
          password: hashedPassword,
          organizationId: organization[0]._id,
          roleId: superAdminRole._id || superAdminRole[0]._id,
          propertyIds: [], // All properties (initially empty)
          locationIds: [], // All locations (initially empty)
          status: "active",
          emailVerified: true, // Bootstrap user is pre-verified
          emailVerifiedAt: new Date(),
          createdAt: new Date(),
        },
      ],
      { session }
    );

    // 5. Log bootstrap event
    await AuditLog.create(
      [
        {
          action: AUDIT_ACTIONS.SYSTEM_BOOTSTRAP,
          entityType: ENTITY_TYPES.ORGANIZATION,
          entityId: organization[0]._id,
          actorId: "SYSTEM",
          actorType: "system",
          organizationId: organization[0]._id,
          metadata: {
            adminUserId: adminUser[0]._id,
            adminEmail: adminData.email,
            ipAddress: metadata.ipAddress,
            userAgent: metadata.userAgent,
          },
          timestamp: new Date(),
        },
      ],
      { session }
    );

    // 6. Commit transaction
    await session.commitTransaction();

    // 7. Return result
    return {
      organizationId: organization[0]._id,
      adminUserId: adminUser[0]._id,
      organizationName: organization[0].name,
    };
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
```

**Validation Pattern** (`backend/validators/bootstrap/initialize.validator.js`):

```javascript
/**
 * Bootstrap initialization validator.
 */
export const initializeValidator = [
  body("organization.name")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Organization name must be 3-100 characters"),

  body("organization.subdomain")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .matches(/^[a-z0-9-]+$/)
    .withMessage("Subdomain must be lowercase alphanumeric with hyphens"),

  body("organization.timezone")
    .trim()
    .notEmpty()
    .withMessage("Timezone is required")
    .custom((value) => {
      // Validate IANA timezone
      try {
        Intl.DateTimeFormat(undefined, { timeZone: value });
        return true;
      } catch (error) {
        throw new Error("Invalid timezone identifier");
      }
    }),

  body("organization.currency")
    .optional()
    .trim()
    .isLength({ min: 3, max: 3 })
    .isUppercase()
    .withMessage("Currency must be 3-letter ISO 4217 code"),

  body("admin.email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),

  body("admin.firstName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be 1-50 characters"),

  body("admin.lastName")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be 1-50 characters"),

  body("admin.password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain special character"),

  body("admin.confirmPassword")
    .custom((value, { req }) => value === req.body.admin.password)
    .withMessage("Passwords must match"),
];
```

#### 3.11.3 Bootstrap Status Endpoint Design

**Route**: `GET /api/v1/bootstrap/status`

**Purpose**: Indicate whether system bootstrap is required

**Controller Pattern**:

```javascript
/**
 * Get bootstrap status.
 *
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Next middleware
 */
export const getBootstrapStatus = async (req, res, next) => {
  try {
    const bootstrapRequired = await isBootstrapRequired();

    res.json({
      success: true,
      data: {
        bootstrapRequired,
      },
    });
  } catch (error) {
    next(error);
  }
};
```

#### 3.11.4 Bootstrap Route Registration

**File**: `backend/routes/bootstrap.routes.js`

```javascript
/**
 * Bootstrap routes.
 *
 * @module routes/bootstrap
 */

import express from "express";
import { validateRequest } from "../middlewares/validation/validateRequest.js";
import { normalizeValidated } from "../middlewares/validation/normalizeValidated.js";
import { rateLimiter } from "../middlewares/security/rateLimiter.js";
import { initializeValidator } from "../validators/bootstrap/initialize.validator.js";
import {
  initializeSystem,
  getBootstrapStatus,
} from "../controllers/bootstrap/bootstrap.controller.js";

const router = express.Router();

// Get bootstrap status (no auth required)
router.get("/status", getBootstrapStatus);

// Initialize system (no auth required, rate limited)
router.post(
  "/initialize",
  rateLimiter({ windowMs: 60 * 60 * 1000, max: 5 }), // 5 attempts per hour
  initializeValidator,
  validateRequest,
  normalizeValidated,
  initializeSystem
);

export default router;
```

**Main Router Registration** (`backend/routes/index.js`):

```javascript
import bootstrapRoutes from "./bootstrap.routes.js";

// Bootstrap routes (must be registered before auth routes)
router.use("/bootstrap", bootstrapRoutes);
```

#### 3.11.5 Bootstrap Security Considerations

1. **No Authentication Required**: Bootstrap endpoints are intentionally unauthenticated (no users exist yet)
2. **Organization Count Check**: Primary security control is checking organization count
3. **Rate Limiting**: Strict rate limiting (5 attempts per hour per IP) prevents brute force attempts
4. **Atomic Transaction**: Mongoose transaction prevents partial bootstrap state
5. **Audit Logging**: All bootstrap attempts are logged with IP address
6. **Password Hashing**: Password hashed with bcrypt before storage
7. **Pre-Verified Admin**: Bootstrap admin user is pre-verified (no email verification required)

#### 3.11.6 Bootstrap Constants

**Add to** `backend/utils/constants.js`:

```javascript
// Audit Actions
export const AUDIT_ACTIONS = {
  // ... existing actions
  SYSTEM_BOOTSTRAP: "SYSTEM_BOOTSTRAP",
};

// Entity Types
export const ENTITY_TYPES = {
  // ... existing types
  SYSTEM: "SYSTEM",
};
```

#### 3.11.7 Bootstrap vs Mock Data

**Critical Distinction**:

- **Bootstrap** (Phase 03.5): Production mechanism for creating first organization and admin user
- **Mock Data** (Phase 17): Development/demo dataset for testing and demonstration

Bootstrap is **independent** of mock data and must work in production environments.

## 4. Frontend Architecture

### 4.1 Frontend App Shell Design

The app shell must include:

1. Global theme provider (MUI AppTheme)
2. Router provider (react-router)
3. Redux provider with persistence
4. Toast provider (react-toastify)
5. Error boundary (react-error-boundary)

#### 4.1.1 main.jsx Structure

```javascript
/**
 * Application entry point.
 *
 * @module main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";

// Import Inter font weights
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

#### 4.1.2 App.jsx Structure

```javascript
/**
 * Root application component.
 *
 * @module App
 */

import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "./app/providers.jsx";
import AppRouter from "./app/router.jsx";
import ErrorFallback from "./components/feedback/ErrorFallback.jsx";

/**
 * Root application component with providers and error boundary.
 *
 * @returns {JSX.Element} Application root
 */
function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Providers>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
```

#### 4.1.3 Providers Composition

```javascript
/**
 * Provider composition for application.
 *
 * @module app/providers
 */

import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store.js";
import AppTheme from "./theme/AppTheme.jsx";
import LoadingState from "../components/feedback/LoadingState.jsx";

/**
 * Compose all application providers.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Provider composition
 */
function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <AppTheme>{children}</AppTheme>
      </PersistGate>
    </Provider>
  );
}

export default Providers;
```

#### 4.1.4 Frontend Bootstrap Detection and UI Design

The frontend must detect if system bootstrap is required and present a bootstrap UI before allowing normal application access.

**Bootstrap Detection Hook** (`client/src/hooks/useBootstrapDetection.js`):

```javascript
/**
 * Custom hook to detect if system bootstrap is required.
 *
 * @returns {{ bootstrapRequired: boolean, loading: boolean, error: Error | null }}
 */
export function useBootstrapDetection() {
  const [bootstrapRequired, setBootstrapRequired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkBootstrapStatus() {
      try {
        const response = await axios.get("/api/v1/bootstrap/status");
        setBootstrapRequired(response.data.data.bootstrapRequired);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    checkBootstrapStatus();
  }, []);

  return { bootstrapRequired, loading, error };
}
```

**App-Level Integration** (update `App.jsx`):

```javascript
function App() {
  const { bootstrapRequired, loading, error } = useBootstrapDetection();

  if (loading) {
    return <LoadingState message="Initializing application..." />;
  }

  if (error) {
    return <ErrorState message="Failed to connect to server" />;
  }

  if (bootstrapRequired) {
    return <BootstrapPage />;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Providers>
        <AppRouter />
        <ToastContainer {...toastConfig} />
      </Providers>
    </ErrorBoundary>
  );
}
```

**Bootstrap Page Component** (`client/src/pages/bootstrap/BootstrapPage.jsx`):

```javascript
/**
 * System bootstrap page for first-time setup.
 *
 * @returns {JSX.Element} Bootstrap page
 */
export default function BootstrapPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      organization: {
        name: "",
        subdomain: "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        currency: "USD",
      },
      admin: {
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      },
    },
  });

  const password = useWatch({ control, name: "admin.password" });

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/v1/bootstrap/initialize", data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Bootstrap failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <BootstrapSuccessView onContinue={() => navigate("/login")} />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: (theme) => theme.spacing(4),
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome to Hospitality CMMS
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Let's set up your system. This will create your organization and
            administrator account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Organization Section */}
            <Typography variant="h6" gutterBottom sx={{ marginTop: 3 }}>
              Organization Information
            </Typography>

            <Controller
              name="organization.name"
              control={control}
              rules={{
                required: "Organization name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Name must not exceed 100 characters",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Organization Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.organization?.name}
                  helperText={errors.organization?.name?.message}
                />
              )}
            />

            {/* Additional form fields for subdomain, timezone, currency, admin details */}
            {/* ... (similar Controller patterns for all fields) */}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={loading}
              sx={{ marginTop: 3 }}
            >
              {loading ? "Initializing..." : "Initialize System"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
```

**Bootstrap Success View** (`client/src/pages/bootstrap/BootstrapSuccessView.jsx`):

```javascript
/**
 * Bootstrap success confirmation view.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onContinue - Continue callback
 * @returns {JSX.Element} Success view
 */
export default function BootstrapSuccessView({ onContinue }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: (theme) => theme.palette.background.default,
        padding: (theme) => theme.spacing(2),
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          width: "100%",
          padding: (theme) => theme.spacing(4),
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <CheckCircleIcon
            sx={{
              fontSize: 64,
              color: (theme) => theme.palette.success.main,
              marginBottom: 2,
            }}
          />
          <Typography variant="h4" gutterBottom>
            System Initialized Successfully!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Your organization and administrator account have been created. You
            can now log in with your credentials.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onContinue}
            sx={{ marginTop: 2 }}
          >
            Continue to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
```

**Bootstrap Design Rules**:

1. **Detection on App Load**: Check bootstrap status before rendering main app
2. **No Authentication**: Bootstrap page is accessible without authentication
3. **Form Validation**: Client-side validation matches backend validation rules
4. **Password Strength**: Visual feedback for password requirements
5. **Timezone Detection**: Auto-detect user's timezone as default
6. **Success Redirect**: Redirect to login page after successful bootstrap
7. **Error Handling**: Display clear error messages for bootstrap failures
8. **Responsive Design**: Bootstrap UI works on mobile, tablet, and desktop
9. **Theme Integration**: Use MUI theme tokens for consistent styling
10. **Loading States**: Show loading indicators during bootstrap process

### 4.2 Frontend Constants and Routing Design

`client/src/utils/constants.js` must contain frontend-shared constants.

#### 4.2.1 Constants Structure

```javascript
/**
 * Frontend constants - SINGLE SOURCE OF TRUTH.
 *
 * @module utils/constants
 */

// Route Keys
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password/:token",
  INVITE: "/invite/:token",

  DASHBOARD: "/dashboard",

  PROPERTIES: "/properties",
  PROPERTY_DETAIL: "/properties/:id",

  LOCATIONS: "/locations",
  LOCATION_DETAIL: "/locations/:id",

  USERS: "/users",
  USER_DETAIL: "/users/:id",

  ROLES: "/roles",
  ROLE_DETAIL: "/roles/:id",

  TEAMS: "/teams",
  TEAM_DETAIL: "/teams/:id",

  ASSETS: "/assets",
  ASSET_DETAIL: "/assets/:id",

  REQUESTS: "/requests",
  REQUEST_DETAIL: "/requests/:id",
  REQUEST_PORTAL: "/portal/requests",

  WORK_ORDERS: "/work-orders",
  WORK_ORDER_DETAIL: "/work-orders/:id",

  PM_PLANS: "/pm-plans",
  PM_PLAN_DETAIL: "/pm-plans/:id",
  PM_CALENDAR: "/pm-calendar",

  INSPECTIONS: "/inspections",
  INSPECTION_DETAIL: "/inspections/:id",

  INVENTORY: "/inventory",
  PART_DETAIL: "/inventory/parts/:id",

  VENDORS: "/vendors",
  VENDOR_DETAIL: "/vendors/:id",
  VENDOR_PORTAL: "/portal/vendors",

  NOTIFICATIONS: "/notifications",

  REPORTS: "/reports",
  REPORT_DETAIL: "/reports/:type",

  SETTINGS: "/settings",
  SETTINGS_ORGANIZATION: "/settings/organization",
  SETTINGS_PROPERTIES: "/settings/properties",
  SETTINGS_MASTER_DATA: "/settings/master-data",

  IMPORTS: "/imports",

  AUDIT: "/audit",
};

// Navigation Section Keys
export const NAV_SECTIONS = {
  OPERATIONS: "operations",
  MAINTENANCE: "maintenance",
  INVENTORY: "inventory",
  ADMINISTRATION: "administration",
  REPORTS: "reports",
};

// Filter Keys
export const FILTER_KEYS = {
  STATUS: "status",
  PRIORITY: "priority",
  ASSIGNED_TO: "assignedTo",
  PROPERTY: "property",
  LOCATION: "location",
  DATE_RANGE: "dateRange",
  WORK_TYPE: "workType",
  GUEST_IMPACT: "guestImpact",
};

// Table Column Keys
export const COLUMN_KEYS = {
  WORK_ORDER_NUMBER: "workOrderNumber",
  TITLE: "title",
  STATUS: "status",
  PRIORITY: "priority",
  ASSIGNED_TO: "assignedTo",
  LOCATION: "location",
  CREATED_DATE: "createdDate",
  DUE_DATE: "dueDate",
  ACTIONS: "actions",
};

// View Mode Keys
export const VIEW_MODES = {
  LIST: "list",
  GRID: "grid",
  CALENDAR: "calendar",
  KANBAN: "kanban",
};

// UI Option Lists (mirrored from backend)
export const WORK_ORDER_STATUSES = [
  { value: "Draft", label: "Draft" },
  { value: "Open", label: "Open" },
  { value: "Assigned", label: "Assigned" },
  { value: "Scheduled", label: "Scheduled" },
  { value: "In_Progress", label: "In Progress" },
  { value: "On_Hold", label: "On Hold" },
  { value: "Awaiting_Parts", label: "Awaiting Parts" },
  { value: "Awaiting_Approval", label: "Awaiting Approval" },
  { value: "Completed", label: "Completed" },
  { value: "Verified", label: "Verified" },
  { value: "Closed", label: "Closed" },
  { value: "Cancelled", label: "Cancelled" },
];

export const WORK_ORDER_PRIORITIES = [
  { value: "Emergency", label: "Emergency", color: "error" },
  { value: "Urgent", label: "Urgent", color: "warning" },
  { value: "High", label: "High", color: "info" },
  { value: "Medium", label: "Medium", color: "default" },
  { value: "Low", label: "Low", color: "default" },
];

export const GUEST_IMPACT_LEVELS = [
  { value: "High", label: "High", color: "error" },
  { value: "Medium", label: "Medium", color: "warning" },
  { value: "Low", label: "Low", color: "info" },
  { value: "None", label: "None", color: "default" },
];

// ... (all other constants)
```

#### 4.2.2 Constants Rules

1. **Single Source of Truth**: `client/src/utils/constants.js` is the ONLY approved import entry point
2. **No Duplication**: Do NOT create duplicate constant definitions in other files
3. **Mirror Backend Enums**: UI option lists must match backend enum values
4. **Export All**: All constants must be exported from this file

### 4.3 Frontend Theme Design

The theme must be centralized under `client/src/app/theme/` and must define:

1. Palette tokens
2. Typography tokens
3. Spacing conventions
4. Component overrides
5. Breakpoint usage

#### 4.3.1 Theme Provider (AppTheme.jsx)

```javascript
/**
 * App-wide MUI theme provider.
 *
 * @module app/theme/AppTheme
 */

import React, { useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives.js";
import {
  inputsCustomizations,
  dataDisplayCustomizations,
  feedbackCustomizations,
  navigationCustomizations,
  surfacesCustomizations,
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
} from "./customizations/index.js";

/**
 * App-wide MUI theme provider.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @returns {JSX.Element} Theme provider wrapper
 */
function AppTheme({ children }) {
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: {
          colorSchemeSelector: "data-mui-color-scheme",
          cssVarPrefix: "template",
        },
        colorSchemes,
        typography,
        shadows,
        shape,
        components: {
          ...inputsCustomizations,
          ...dataDisplayCustomizations,
          ...feedbackCustomizations,
          ...navigationCustomizations,
          ...surfacesCustomizations,
          ...chartsCustomizations,
          ...dataGridCustomizations,
          ...datePickersCustomizations,
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
```

#### 4.3.2 Theme Primitives (themePrimitives.js)

```javascript
/**
 * Theme primitives - colors, typography, shadows, shape.
 *
 * @module app/theme/themePrimitives
 */

import { createTheme, alpha } from "@mui/material/styles";

const defaultTheme = createTheme();

// Brand Colors
export const brand = {
  50: "hsl(210, 100%, 95%)",
  100: "hsl(210, 100%, 92%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)", // Primary main
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)", // Primary dark
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};

// Gray Scale
export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};

// Status Colors
export const green = {
  400: "hsl(142, 76%, 36%)",
  500: "hsl(142, 71%, 45%)",
  800: "hsl(142, 70%, 25%)",
};

export const orange = {
  400: "hsl(25, 95%, 53%)",
  500: "hsl(25, 90%, 48%)",
  800: "hsl(25, 90%, 30%)",
};

export const red = {
  400: "hsl(0, 90%, 58%)",
  500: "hsl(0, 90%, 50%)",
  800: "hsl(0, 90%, 30%)",
};

// Color Schemes
export const colorSchemes = {
  light: {
    palette: {
      primary: {
        light: brand[200],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[800],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[800],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[800],
      },
      info: {
        light: brand[300],
        main: brand[400],
        dark: brand[600],
      },
      background: {
        default: "hsl(0, 0%, 99%)",
        paper: "hsl(220, 35%, 97%)",
      },
      text: {
        primary: gray[800],
        secondary: gray[600],
      },
      divider: alpha(gray[300], 0.4),
    },
  },
  dark: {
    palette: {
      primary: {
        light: brand[300],
        main: brand[400],
        dark: brand[700],
        contrastText: brand[50],
      },
      success: {
        light: green[400],
        main: green[500],
        dark: green[800],
      },
      warning: {
        light: orange[400],
        main: orange[500],
        dark: orange[800],
      },
      error: {
        light: red[400],
        main: red[500],
        dark: red[800],
      },
      info: {
        light: brand[300],
        main: brand[400],
        dark: brand[600],
      },
      background: {
        default: gray[900],
        paper: "hsl(220, 30%, 7%)",
      },
      text: {
        primary: "hsl(0, 0%, 100%)",
        secondary: gray[400],
      },
      divider: alpha(gray[700], 0.6),
    },
  },
};

// Typography
export const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};

// Shadows
export const shadows = defaultTheme.shadows;

// Shape
export const shape = {
  borderRadius: 8,
};

// Layout Configuration
export const layoutConfig = {
  drawerWidth: 240,
  headerHeight: 64,
  mobileBreakpoint: "md",
};
```

#### 4.3.3 Theme Styling Rules

1. **Use Theme Tokens**: Always use `theme.palette`, `theme.typography`, `theme.spacing`, `theme.breakpoints`
2. **No Hardcoded Values**: Never hardcode colors, fonts, spacing, or breakpoints
3. **Reusable Components**: Use MUI `styled()` API for reusable custom styling
4. **One-Off Styling**: Use `sx` prop for one-off component styling
5. **Dark Mode Support**: Always test components in both light and dark modes

**Example of Correct Theme Usage**:

```javascript
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";

// ✅ CORRECT: Using styled() with theme tokens
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

// ❌ INCORRECT: Hardcoded values
const BadCard = styled(Card)({
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "#f5f5f5",
  border: "1px solid #e0e0e0",
});
```

### 4.4 Frontend Domain Organization Design

Feature logic must be domain-organized. Each domain folder should contain:

1. API calls or adapters
2. Hooks
3. Domain-specific components
4. Local utilities if domain-specific
5. Route/page composition helpers where needed

#### 4.4.1 Domain Structure Example (Work Orders)

```
domains/workOrders/
├── api/
│   ├── workOrders.api.js        # Work order API calls
│   ├── tasks.api.js             # Work order tasks API
│   ├── labor.api.js             # Labor tracking API
│   └── comments.api.js          # Comments API
├── hooks/
│   ├── useWorkOrder.js          # Work order data hook
│   ├── useWorkOrderList.js      # Work order list hook
│   ├── useWorkOrderActions.js   # Work order actions hook
│   └── useWorkOrderFilters.js   # Work order filters hook
├── components/
│   ├── WorkOrderCard.jsx        # Work order card component
│   ├── WorkOrderStatusBadge.jsx # Status badge component
│   ├── WorkOrderPriorityChip.jsx # Priority chip component
│   ├── WorkOrderTimeline.jsx    # Timeline component
│   ├── LaborEntryForm.jsx       # Labor entry form
│   ├── TaskList.jsx             # Task list component
│   └── CommentThread.jsx        # Comment thread component
└── utils/
    ├── statusTransitions.js     # Status transition logic
    ├── costCalculations.js      # Cost calculation utilities
    └── validation.js            # Domain-specific validation
```

#### 4.4.2 Domain API Example

```javascript
/**
 * Work order API client.
 *
 * @module domains/workOrders/api/workOrders.api
 */

import apiClient from "../../../services/api/client.js";

/**
 * Get work order by ID.
 *
 * @param {string} id - Work order ID
 * @returns {Promise<Object>} Work order data
 */
export const getWorkOrderById = async (id) => {
  const response = await apiClient.get(`/work-orders/${id}`);
  return response.data.data;
};

/**
 * List work orders with filters.
 *
 * @param {Object} filters - Filter parameters
 * @returns {Promise<Object>} Work orders list with pagination
 */
export const listWorkOrders = async (filters = {}) => {
  const response = await apiClient.get("/work-orders", { params: filters });
  return response.data;
};

/**
 * Create work order.
 *
 * @param {Object} data - Work order data
 * @returns {Promise<Object>} Created work order
 */
export const createWorkOrder = async (data) => {
  const response = await apiClient.post("/work-orders", data);
  return response.data.data;
};

/**
 * Update work order.
 *
 * @param {string} id - Work order ID
 * @param {Object} data - Update data
 * @returns {Promise<Object>} Updated work order
 */
export const updateWorkOrder = async (id, data) => {
  const response = await apiClient.patch(`/work-orders/${id}`, data);
  return response.data.data;
};

/**
 * Change work order status.
 *
 * @param {string} id - Work order ID
 * @param {string} status - New status
 * @param {string} notes - Status change notes
 * @returns {Promise<Object>} Updated work order
 */
export const changeWorkOrderStatus = async (id, status, notes) => {
  const response = await apiClient.post(`/work-orders/${id}/status`, {
    status,
    notes,
  });
  return response.data.data;
};
```

#### 4.4.3 Domain Hook Example

```javascript
/**
 * Work order data hook.
 *
 * @module domains/workOrders/hooks/useWorkOrder
 */

import { useState, useEffect } from "react";
import { getWorkOrderById } from "../api/workOrders.api.js";
import { toast } from "react-toastify";

/**
 * Hook to fetch and manage work order data.
 *
 * @param {string} id - Work order ID
 * @returns {Object} Work order state and actions
 */
export const useWorkOrder = (id) => {
  const [workOrder, setWorkOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getWorkOrderById(id);
        setWorkOrder(data);
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load work order: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorkOrder();
    }
  }, [id]);

  const refresh = async () => {
    try {
      const data = await getWorkOrderById(id);
      setWorkOrder(data);
    } catch (err) {
      toast.error(`Failed to refresh work order: ${err.message}`);
    }
  };

  return {
    workOrder,
    loading,
    error,
    refresh,
  };
};
```

#### 4.4.4 Minimum Frontend Domain Set

The frontend must cover these domain areas:

1. `auth` - Authentication and session management
2. `organizations` - Organization settings
3. `dashboard` - Dashboard widgets and KPIs
4. `properties` - Property management
5. `users` - User management
6. `roles` - Role and permission management
7. `teams` - Team management
8. `requests` - Work request intake and triage
9. `workOrders` - Work order lifecycle
10. `preventiveMaintenance` - PM plans and scheduling
11. `assets` - Asset management
12. `locations` - Location hierarchy
13. `inventory` - Parts and inventory control
14. `vendors` - Vendor management
15. `notifications` - Notification center
16. `reports` - Reporting and analytics
17. `settings` - System settings
18. `imports` - Data import operations
19. `audit` - Audit log viewing
20. `portal` - Request and vendor portals

### 4.5 Reusable Component Design

Shared components must be organized by reuse type:

1. `layout/` - Shells, section wrappers, page headers, side panels
2. `feedback/` - Empty states, loading states, error states, alert banners
3. `navigation/` - Menus, tabs, breadcrumbs, top bars, side nav
4. `dataDisplay/` - Cards, stat tiles, timeline items, key-value lists, data grids
5. `forms/` - Reusable field wrappers, RHF-integrated controls, filter bars
6. `dialogs/` - Confirmation dialogs and action drawers
7. `uploads/` - File dropzones, preview lists, attachment tiles
8. `charts/` - Chart wrappers and chart legends

#### 4.5.1 Shared Component Example (LoadingState)

```javascript
/**
 * Loading state component.
 *
 * @module components/feedback/LoadingState
 */

import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

/**
 * Display loading state with spinner and optional message.
 *
 * @param {Object} props - Component props
 * @param {string} [props.message='Loading...'] - Loading message
 * @param {string} [props.size='medium'] - Spinner size (small, medium, large)
 * @returns {JSX.Element} Loading state component
 */
function LoadingState({ message = "Loading...", size = "medium" }) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: (theme) => theme.spacing(20),
        gap: (theme) => theme.spacing(2),
      }}
    >
      <CircularProgress size={sizeMap[size]} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default LoadingState;
```

#### 4.5.2 Shared Component Example (EmptyState)

```javascript
/**
 * Empty state component.
 *
 * @module components/feedback/EmptyState
 */

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/**
 * Display empty state with message and optional action.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Empty state title
 * @param {string} [props.message] - Empty state message
 * @param {string} [props.actionLabel] - Action button label
 * @param {Function} [props.onAction] - Action button click handler
 * @param {React.ReactNode} [props.icon] - Optional icon
 * @returns {JSX.Element} Empty state component
 */
function EmptyState({ title, message, actionLabel, onAction, icon }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: (theme) => theme.spacing(30),
        gap: (theme) => theme.spacing(2),
        padding: (theme) => theme.spacing(4),
        textAlign: "center",
      }}
    >
      {icon && (
        <Box
          sx={{
            fontSize: (theme) => theme.typography.pxToRem(64),
            color: (theme) => theme.palette.text.disabled,
          }}
        >
          {icon}
        </Box>
      )}
      <Typography variant="h6" color="text.primary">
        {title}
      </Typography>
      {message && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ maxWidth: 400 }}
        >
          {message}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{ marginTop: (theme) => theme.spacing(2) }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;
```

### 4.6 Form Design

Form architecture must use React Hook Form with these design rules:

1. **No `watch()` usage** - Use `useWatch`, `Controller`, or `getValues` instead
2. Use reusable form field wrappers for common patterns
3. Keep validation messages consistent across the UI
4. Surface server validation and conflict responses cleanly

#### 4.6.1 Form Field Wrapper Example

```javascript
/**
 * Text field wrapper for React Hook Form.
 *
 * @module components/forms/TextField
 */

import React from "react";
import { Controller } from "react-hook-form";
import MuiTextField from "@mui/material/TextField";

/**
 * Text field integrated with React Hook Form.
 *
 * @param {Object} props - Component props
 * @param {string} props.name - Field name
 * @param {Object} props.control - React Hook Form control
 * @param {string} [props.label] - Field label
 * @param {string} [props.placeholder] - Field placeholder
 * @param {boolean} [props.required=false] - Required field
 * @param {boolean} [props.disabled=false] - Disabled field
 * @param {boolean} [props.multiline=false] - Multiline field
 * @param {number} [props.rows] - Number of rows for multiline
 * @param {string} [props.type='text'] - Input type
 * @param {string} [props.helperText] - Helper text
 * @returns {JSX.Element} Text field component
 */
function TextField({
  name,
  control,
  label,
  placeholder,
  required = false,
  disabled = false,
  multiline = false,
  rows,
  type = "text",
  helperText,
  ...rest
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTextField
          {...field}
          label={label}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          multiline={multiline}
          rows={rows}
          type={type}
          error={!!error}
          helperText={error ? error.message : helperText}
          fullWidth
          variant="outlined"
          {...rest}
        />
      )}
    />
  );
}

export default TextField;
```

#### 4.6.2 Form Usage Example

```javascript
/**
 * Work order create form.
 *
 * @module domains/workOrders/components/WorkOrderCreateForm
 */

import React from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "../../../components/forms/TextField.jsx";
import SelectField from "../../../components/forms/SelectField.jsx";
import {
  WORK_ORDER_PRIORITIES,
  WORK_ORDER_TYPES,
} from "../../../utils/constants.js";

/**
 * Work order create form component.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Form submit handler
 * @param {Function} props.onCancel - Form cancel handler
 * @returns {JSX.Element} Form component
 */
function WorkOrderCreateForm({ onSubmit, onCancel }) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      workType: "",
      priority: "",
      locationId: "",
      assetId: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: (theme) => theme.spacing(2),
      }}
    >
      <TextField
        name="title"
        control={control}
        label="Title"
        placeholder="Enter work order title"
        required
      />

      <TextField
        name="description"
        control={control}
        label="Description"
        placeholder="Enter work order description"
        multiline
        rows={4}
        required
      />

      <SelectField
        name="workType"
        control={control}
        label="Work Type"
        options={WORK_ORDER_TYPES}
        required
      />

      <SelectField
        name="priority"
        control={control}
        label="Priority"
        options={WORK_ORDER_PRIORITIES}
        required
      />

      <Box
        sx={{
          display: "flex",
          gap: (theme) => theme.spacing(2),
          justifyContent: "flex-end",
          marginTop: (theme) => theme.spacing(2),
        }}
      >
        <Button onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Create Work Order
        </Button>
      </Box>
    </Box>
  );
}

export default WorkOrderCreateForm;
```

### 4.7 Data Grid Design

Data-grid usage must support:

1. Column visibility management
2. Filter and sorting persistence
3. Responsive adaptation on smaller screens
4. Bulk selection and bulk actions where required
5. Permission-aware action cells

#### 4.7.1 Data Grid Wrapper Example

```javascript
/**
 * Data grid wrapper component.
 *
 * @module components/dataDisplay/DataGrid
 */

import React from "react";
import { DataGrid as MuiDataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

/**
 * Data grid wrapper with consistent styling and behavior.
 *
 * @param {Object} props - Component props
 * @param {Array} props.rows - Grid rows
 * @param {Array} props.columns - Grid columns
 * @param {boolean} [props.loading=false] - Loading state
 * @param {Object} [props.paginationModel] - Pagination model
 * @param {Function} [props.onPaginationModelChange] - Pagination change handler
 * @param {number} [props.rowCount] - Total row count
 * @param {boolean} [props.checkboxSelection=false] - Enable checkbox selection
 * @param {Function} [props.onRowSelectionModelChange] - Selection change handler
 * @returns {JSX.Element} Data grid component
 */
function DataGrid({
  rows,
  columns,
  loading = false,
  paginationModel,
  onPaginationModelChange,
  rowCount,
  checkboxSelection = false,
  onRowSelectionModelChange,
  ...rest
}) {
  return (
    <Box sx={{ height: 600, width: "100%" }}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        rowCount={rowCount}
        paginationMode="server"
        checkboxSelection={checkboxSelection}
        onRowSelectionModelChange={onRowSelectionModelChange}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50, 100]}
        sx={{
          border: (theme) => `1px solid ${theme.palette.divider}`,
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
        {...rest}
      />
    </Box>
  );
}

export default DataGrid;
```

### 4.8 MUI v9 Composition Design

All MUI usage must:

1. Use tree-shakable imports
2. Use the `size` prop for Grid
3. Use the `slots` and `slotProps` APIs when customizing component internals
4. Avoid deprecated v9 patterns and imports

#### 4.8.1 Tree-Shakable Imports

```javascript
// ✅ CORRECT: Tree-shakable imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// ❌ INCORRECT: Non-tree-shakable imports
import { Button, TextField, Box, Grid } from "@mui/material";
```

#### 4.8.2 Grid size Prop (MUI v9)

```javascript
// ✅ CORRECT: MUI v9 Grid with size prop
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>Content 1</Card>
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    <Card>Content 2</Card>
  </Grid>
</Grid>

// ❌ INCORRECT: Deprecated item prop
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>  {/* ❌ Deprecated */}
    <Card>Content 1</Card>
  </Grid>
</Grid>
```

#### 4.8.3 Slots and SlotProps API

```javascript
// ✅ CORRECT: Using slots API
<TextField
  slots={{
    input: CustomInput
  }}
  slotProps={{
    input: {
      customProp: 'value'
    }
  }}
/>

// ❌ INCORRECT: Using deprecated InputProps
<TextField
  InputProps={{  // ❌ Deprecated in v9
    component: CustomInput
  }}
/>
```

## 5. Route and Page Design

### 5.1 Route Ownership

Each route must map to:

1. One page entry component
2. One or more domain hooks
3. One or more API query or mutation helpers
4. One permission model
5. One set of loading, empty, and error states

#### 5.1.1 Route-to-Component Mapping

| Route                 | Page Component            | Domain                | Permissions Required |
| --------------------- | ------------------------- | --------------------- | -------------------- |
| `/login`              | `LoginPage.jsx`           | auth                  | None (public)        |
| `/dashboard`          | `DashboardPage.jsx`       | dashboard             | `view_dashboard`     |
| `/work-orders`        | `WorkOrderListPage.jsx`   | workOrders            | `view_work_order`    |
| `/work-orders/:id`    | `WorkOrderDetailPage.jsx` | workOrders            | `view_work_order`    |
| `/work-orders/create` | `WorkOrderCreatePage.jsx` | workOrders            | `create_work_order`  |
| `/requests`           | `RequestListPage.jsx`     | requests              | `view_request`       |
| `/requests/:id`       | `RequestDetailPage.jsx`   | requests              | `view_request`       |
| `/assets`             | `AssetListPage.jsx`       | assets                | `view_asset`         |
| `/assets/:id`         | `AssetDetailPage.jsx`     | assets                | `view_asset`         |
| `/pm-plans`           | `PMPlanListPage.jsx`      | preventiveMaintenance | `view_pm_plan`       |
| `/pm-plans/:id`       | `PMPlanDetailPage.jsx`    | preventiveMaintenance | `view_pm_plan`       |
| `/inventory`          | `InventoryListPage.jsx`   | inventory             | `view_part`          |
| `/vendors`            | `VendorListPage.jsx`      | vendors               | `view_vendor`        |
| `/users`              | `UserListPage.jsx`        | users                 | `manage_users`       |
| `/roles`              | `RoleListPage.jsx`        | roles                 | `manage_roles`       |
| `/settings`           | `SettingsPage.jsx`        | settings              | `manage_settings`    |
| `/reports`            | `ReportsPage.jsx`         | reports               | `view_report`        |
| `/audit`              | `AuditLogPage.jsx`        | audit                 | `view_audit_log`     |

### 5.2 Screen Families

#### 5.2.1 Auth Screens

**Purpose**: Handle authentication and session management

**Screens**:

- Login Page
- Forgot Password Page
- Reset Password Page
- Invitation Acceptance Page
- Profile and Sessions Page

**Common Patterns**:

- Centered layout
- Minimal navigation
- Form-focused design
- Clear error messaging
- Loading states during authentication

#### 5.2.2 Dashboard Screens

**Purpose**: Provide role-aware overview and quick actions

**Screens**:

- Main Dashboard (role-specific widgets)
- Property Dashboard (property-specific metrics)

**Common Patterns**:

- KPI cards at top
- Charts and graphs
- Quick action buttons
- Recent activity feed
- Responsive grid layout

#### 5.2.3 Operational List Screens

**Purpose**: Display and filter operational data

**Screens**:

- Work Order List
- Work Request List
- Asset List
- PM Plan List
- Inspection List
- Inventory List
- Vendor List

**Common Patterns**:

- Page header with title and actions
- Filter bar with saved views
- Data grid or card grid
- Bulk actions toolbar
- Pagination controls
- Export buttons

#### 5.2.4 Detail Screens

**Purpose**: Display and edit entity details

**Screens**:

- Work Order Detail
- Work Request Detail
- Asset Detail
- PM Plan Detail
- User Detail
- Vendor Detail

**Common Patterns**:

- Header summary with key info
- Primary action bar
- Tabbed content sections
- Side metadata panel (desktop)
- Activity timeline
- Related entities section

#### 5.2.5 Configuration Screens

**Purpose**: Manage system settings and master data

**Screens**:

- Organization Settings
- Property Settings
- Location Management
- Role Management
- Master Data Configuration

**Common Patterns**:

- Section-based layout
- Form-heavy interface
- Save/cancel actions
- Validation feedback
- Confirmation dialogs

#### 5.2.6 Portal Screens

**Purpose**: Provide limited access for external users

**Screens**:

- Request Portal (for requesters)
- Vendor Portal (for vendor users)

**Common Patterns**:

- Simplified navigation
- Limited data visibility
- Restricted actions
- Clear status indicators
- Mobile-friendly design

### 5.3 Shared Screen Composition Pattern

#### 5.3.1 List Screen Pattern

```
┌─────────────────────────────────────────────────────────┐
│ Page Header                                             │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Title                                    [+ Create]  │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ KPI Strip (optional)                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│ │ Total    │ │ Open     │ │ Overdue  │ │ Completed│   │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
├─────────────────────────────────────────────────────────┤
│ Filters and Saved Views                                 │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ [Status ▼] [Priority ▼] [Assigned ▼]  [Saved Views]│ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Main Data Grid                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ ☐ | ID | Title | Status | Priority | Assigned | ... │ │
│ │ ☐ | 001| Fix AC| Open   | High     | John     | ... │ │
│ │ ☐ | 002| Paint | Schedu | Medium   | Jane     | ... │ │
│ │ ...                                                  │ │
│ └─────────────────────────────────────────────────────┘ │
│ [Bulk Actions] [Export]                    [Pagination] │
└─────────────────────────────────────────────────────────┘
```

**Components**:

1. Page Header: Title, breadcrumbs, primary actions
2. KPI Strip: Summary statistics (optional)
3. Filter Bar: Filters, search, saved views
4. Data Grid: Main content with columns, sorting, selection
5. Action Bar: Bulk actions, export, pagination

#### 5.3.2 Detail Screen Pattern

```
┌─────────────────────────────────────────────────────────┐
│ Header Summary                                          │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ WO-001 | Fix AC Unit | [Status Badge] [Priority]   │ │
│ │ Location: Room 101 | Assigned: John Doe            │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ Primary Action Bar                                      │
│ [Assign] [Schedule] [Start] [Complete] [More ▼]        │
├─────────────────────────────────────────────────────────┤
│ Main Content                          │ Side Panel      │
│ ┌───────────────────────────────────┐ │ ┌─────────────┐ │
│ │ [Details] [Tasks] [Labor] [Parts] │ │ │ Metadata    │ │
│ │                                   │ │ │ Created:    │ │
│ │ Description:                      │ │ │ Updated:    │ │
│ │ AC unit not cooling properly...   │ │ │ Created By: │ │
│ │                                   │ │ │             │ │
│ │ Tasks:                            │ │ │ Activity    │ │
│ │ ☐ Check refrigerant levels        │ │ │ Timeline    │ │
│ │ ☐ Inspect compressor              │ │ │ ...         │ │
│ │ ☐ Test thermostat                 │ │ │             │ │
│ │                                   │ │ │ Related     │ │
│ │ Labor Entries:                    │ │ │ Asset: AC-1 │ │
│ │ John Doe | 2h | In Progress       │ │ │ Location:   │ │
│ │                                   │ │ │ Room 101    │ │
│ └───────────────────────────────────┘ │ └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Components**:

1. Header Summary: Key information, status, priority
2. Primary Action Bar: Main actions for the entity
3. Tabbed Content: Details, tasks, labor, parts, attachments, comments
4. Side Metadata Panel: Audit info, activity timeline, related entities (desktop only)
5. Mobile Stacked: On mobile, side panel moves below main content

## 6. Responsive UI Design

### 6.1 Responsive Strategy

The UI must be intentionally designed for three form factors:

1. **Mobile** (xs, sm): 0px - 899px
2. **Tablet** (md): 900px - 1199px
3. **Desktop** (lg, xl): 1200px+

**Design Approach**: Mobile-first with progressive enhancement

### 6.2 Dashboard Responsiveness

#### 6.2.1 Mobile (xs, sm)

- KPI cards stack vertically (1 column)
- Charts become full-width single-column sections
- Secondary widgets move below urgent widgets
- Navigation collapses to hamburger menu
- Quick actions move to floating action button

#### 6.2.2 Tablet (md)

- KPI cards display in 2-3 columns
- Primary charts may sit side by side when legible
- Navigation remains visible but condensed
- Quick actions remain in header

#### 6.2.3 Desktop (lg, xl)

- KPI cards display in 4+ columns
- Dashboard widgets use multi-column layouts
- Full navigation sidebar visible
- Side panels and metadata visible
- Quick actions in header with labels

### 6.3 List-Screen Responsiveness

#### 6.3.1 Mobile (xs, sm)

- Filters move into drawer (bottom sheet)
- Dense tables transform to stacked cards
- Bulk actions appear only when practical
- Pagination simplified
- Export moved to menu

**Example Mobile Card**:

```
┌─────────────────────────────┐
│ WO-001 | [Status Badge]     │
│ Fix AC Unit                 │
│ Priority: High              │
│ Assigned: John Doe          │
│ Location: Room 101          │
│ Due: 2024-05-15             │
│ [View Details →]            │
└─────────────────────────────┘
```

#### 6.3.2 Tablet (md)

- Tables retain more columns (5-7 columns)
- Filter rows may be partially inline
- Bulk actions visible when items selected
- Full pagination controls

#### 6.3.3 Desktop (lg, xl)

- Full table controls visible (10+ columns)
- Inline filters always visible
- Secondary summaries and side-panels coexist
- Bulk actions toolbar always visible

### 6.4 Detail-Screen Responsiveness

#### 6.4.1 Mobile (xs, sm)

- Detail sections stack vertically
- Tabs become full-width
- Secondary metadata moves beneath primary content
- Drawer usage replaces side panels
- Action buttons stack or use menu

#### 6.4.2 Tablet (md)

- Two-column layouts where readable
- Tabs remain horizontal
- Some metadata may appear in side panel
- Action buttons remain horizontal

#### 6.4.3 Desktop (lg, xl)

- Main content and side content coexist
- Activity history persistently visible
- Full action bar with all buttons
- Tabbed content with side metadata panel

### 6.5 Responsive Implementation Pattern

```javascript
/**
 * Responsive component example.
 *
 * @module components/ResponsiveExample
 */

import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useMediaQuery, useTheme } from "@mui/material";

function ResponsiveExample() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      sx={{
        padding: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
          padding: theme.spacing(4),
        },
        [theme.breakpoints.up("lg")]: {
          padding: theme.spacing(6),
        },
      }}
    >
      <Grid container spacing={2}>
        {/* KPI Cards - Responsive columns */}
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>KPI 1</Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>KPI 2</Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>KPI 3</Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card>KPI 4</Card>
        </Grid>
      </Grid>

      {/* Conditional rendering based on screen size */}
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </Box>
  );
}
```

## 7. Widget and Interaction Design

### 7.1 KPI Card Design

Each KPI card must define:

1. **Value**: Primary metric value
2. **Label**: Metric name
3. **Trend**: Optional trend indicator (up/down/neutral)
4. **Click Behavior**: Navigation or drill-down action
5. **Loading State**: Skeleton or spinner
6. **Empty State**: Message when no data
7. **Permission-Hidden State**: Hidden when user lacks permissions

#### 7.1.1 KPI Card Structure

```javascript
/**
 * KPI card component.
 *
 * @module components/dataDisplay/KPICard
 */

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

/**
 * KPI card with value, label, and optional trend.
 *
 * @param {Object} props - Component props
 * @param {string|number} props.value - KPI value
 * @param {string} props.label - KPI label
 * @param {Object} [props.trend] - Trend data
 * @param {string} props.trend.direction - 'up' | 'down' | 'neutral'
 * @param {string} props.trend.value - Trend value (e.g., '+12%')
 * @param {Function} [props.onClick] - Click handler
 * @param {boolean} [props.loading=false] - Loading state
 * @returns {JSX.Element} KPI card component
 */
function KPICard({ value, label, trend, onClick, loading = false }) {
  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: onClick ? "pointer" : "default",
        "&:hover": onClick
          ? {
              boxShadow: (theme) => theme.shadows[4],
            }
          : {},
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom>
          {loading ? "..." : value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        {trend && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: (theme) => theme.spacing(1),
              color:
                trend.direction === "up"
                  ? "success.main"
                  : trend.direction === "down"
                  ? "error.main"
                  : "text.secondary",
            }}
          >
            {trend.direction === "up" && <TrendingUpIcon fontSize="small" />}
            {trend.direction === "down" && (
              <TrendingDownIcon fontSize="small" />
            )}
            <Typography
              variant="caption"
              sx={{ marginLeft: (theme) => theme.spacing(0.5) }}
            >
              {trend.value}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default KPICard;
```

### 7.2 Chart Design

Charts must define:

1. **Series Mapping**: Data series configuration
2. **Drilldown Behavior**: Click actions for data points
3. **Tooltip Content**: Hover information
4. **Date Range Dependency**: Time-based filtering
5. **Empty Data Behavior**: Message when no data

#### 7.2.1 Chart Wrapper Example

```javascript
/**
 * Chart wrapper component.
 *
 * @module components/charts/ChartWrapper
 */

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import EmptyState from "../feedback/EmptyState.jsx";
import LoadingState from "../feedback/LoadingState.jsx";

/**
 * Chart wrapper with title, loading, and empty states.
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {Array} props.data - Chart data
 * @param {Array} props.series - Chart series configuration
 * @param {Array} props.xAxis - X-axis configuration
 * @param {boolean} [props.loading=false] - Loading state
 * @param {number} [props.height=300] - Chart height
 * @returns {JSX.Element} Chart wrapper component
 */
function ChartWrapper({
  title,
  data,
  series,
  xAxis,
  loading = false,
  height = 300,
}) {
  if (loading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <LoadingState message="Loading chart data..." />
        </CardContent>
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <EmptyState
            title="No data available"
            message="There is no data to display for this chart."
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ width: "100%", height }}>
          <BarChart
            dataset={data}
            series={series}
            xAxis={xAxis}
            height={height}
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default ChartWrapper;
```

### 7.3 Data Grid Interaction Design

Data grids must define:

1. **Row Click Behavior**: Navigate to detail page or open drawer
2. **Action Cell Behavior**: Edit, delete, view actions
3. **Bulk Selection Behavior**: Select multiple rows for bulk actions
4. **Export Behavior**: Export to CSV or PDF
5. **Responsive Column Fallback**: Hide less important columns on mobile

#### 7.3.1 Action Cell Example

```javascript
/**
 * Data grid action cell.
 *
 * @module components/dataDisplay/ActionCell
 */

import React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

/**
 * Action cell with view, edit, delete actions.
 *
 * @param {Object} props - Component props
 * @param {Object} props.row - Row data
 * @param {Function} props.onView - View action handler
 * @param {Function} props.onEdit - Edit action handler
 * @param {Function} props.onDelete - Delete action handler
 * @param {Object} props.permissions - User permissions
 * @returns {JSX.Element} Action cell component
 */
function ActionCell({ row, onView, onEdit, onDelete, permissions }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = () => {
    onView(row);
    handleClose();
  };

  const handleEdit = () => {
    onEdit(row);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(row);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="small">
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleView}>
          <VisibilityIcon
            fontSize="small"
            sx={{ marginRight: (theme) => theme.spacing(1) }}
          />
          View
        </MenuItem>
        {permissions.canEdit && (
          <MenuItem onClick={handleEdit}>
            <EditIcon
              fontSize="small"
              sx={{ marginRight: (theme) => theme.spacing(1) }}
            />
            Edit
          </MenuItem>
        )}
        {permissions.canDelete && (
          <MenuItem onClick={handleDelete}>
            <DeleteIcon
              fontSize="small"
              sx={{ marginRight: (theme) => theme.spacing(1) }}
            />
            Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default ActionCell;
```

### 7.4 Modal and Drawer Design

Dialogs and drawers must define:

1. **Trigger Source**: Button, menu item, or programmatic
2. **Required Fields**: Form validation rules
3. **Validation Behavior**: Real-time or on-submit validation
4. **Confirmation Behavior**: Confirm before closing with unsaved changes
5. **Keyboard Accessibility**: ESC to close, TAB navigation

#### 7.4.1 Confirmation Dialog Example

```javascript
/**
 * Confirmation dialog component.
 *
 * @module components/dialogs/ConfirmDialog
 */

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

/**
 * Confirmation dialog with title, message, and actions.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.open - Dialog open state
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Dialog message
 * @param {string} [props.confirmLabel='Confirm'] - Confirm button label
 * @param {string} [props.cancelLabel='Cancel'] - Cancel button label
 * @param {Function} props.onConfirm - Confirm handler
 * @param {Function} props.onCancel - Cancel handler
 * @param {boolean} [props.loading=false] - Loading state
 * @returns {JSX.Element} Confirmation dialog component
 */
function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading}
          autoFocus
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
```

### 7.5 Upload and Preview Design

Upload flows must define:

1. **Allowed File Types**: PDF, images, documents
2. **File-Size Limits**: Maximum 25MB per file
3. **Retry Behavior**: Retry failed uploads
4. **Preview Behavior**: Image lightbox, PDF viewer
5. **Removal Behavior**: Delete uploaded files
6. **Visibility and Permission Rules**: Who can upload/view/delete

#### 7.5.1 File Dropzone Example

```javascript
/**
 * File dropzone component.
 *
 * @module components/uploads/FileDropzone
 */

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

/**
 * File dropzone with drag-and-drop support.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onDrop - File drop handler
 * @param {Array} [props.accept] - Accepted file types
 * @param {number} [props.maxSize=26214400] - Max file size (25MB default)
 * @param {boolean} [props.multiple=true] - Allow multiple files
 * @returns {JSX.Element} File dropzone component
 */
function FileDropzone({ onDrop, accept, maxSize = 26214400, multiple = true }) {
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
    accept,
    maxSize,
    multiple,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: (theme) => `2px dashed ${theme.palette.divider}`,
        borderRadius: (theme) => theme.shape.borderRadius,
        padding: (theme) => theme.spacing(4),
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: isDragActive
          ? (theme) => theme.palette.action.hover
          : "transparent",
        "&:hover": {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon
        sx={{ fontSize: 48, color: (theme) => theme.palette.text.secondary }}
      />
      <Typography
        variant="body1"
        sx={{ marginTop: (theme) => theme.spacing(2) }}
      >
        {isDragActive
          ? "Drop files here..."
          : "Drag and drop files here, or click to select"}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Maximum file size: 25MB
      </Typography>
    </Box>
  );
}

export default FileDropzone;
```

## 8. Domain-by-Domain Design Mapping

### 8.1 Identity and Access Domain

**Backend Components**:

- `routes/auth.routes.js` - Authentication routes
- `controllers/auth/` - Login, logout, refresh, invite, password, session controllers
- `validators/auth/` - Authentication validators
- `services/auth/` - Authentication services
- `models/userSession.model.js` - Session model integration

**Frontend Components**:

- `pages/auth/LoginPage.jsx` - Login page
- `pages/auth/ForgotPasswordPage.jsx` - Forgot password page
- `pages/auth/ResetPasswordPage.jsx` - Reset password page
- `pages/auth/InvitePage.jsx` - Invitation acceptance page
- `pages/auth/ProfilePage.jsx` - Profile and sessions page
- `domains/auth/` - Auth domain hooks, API, components

**Key Features**:

- JWT-based authentication with httpOnly refresh tokens
- Invitation acceptance workflow
- Password reset workflow
- Account lockout after 5 failed attempts
- Security notification emails
- Session management and revocation
- Protected route behavior

### 8.2 Administration Domain

**Backend Components**:

- Organizations: `routes/organizations.routes.js`, `controllers/organizations/`, `services/organizations/`, `models/organization.model.js`
- Properties: `routes/properties.routes.js`, `controllers/properties/`, `services/properties/`, `models/property.model.js`
- Locations: `routes/locations.routes.js`, `controllers/locations/`, `services/locations/`, `models/location.model.js`
- Roles: `routes/roles.routes.js`, `controllers/roles/`, `services/roles/`, `models/role.model.js`
- Users: `routes/users.routes.js`, `controllers/users/`, `services/users/`, `models/user.model.js`
- Teams: `routes/teams.routes.js`, `controllers/teams/`, `services/teams/`, `models/team.model.js`
- Settings: `routes/settings.routes.js`, `controllers/settings/`, `services/settings/`, `models/masterDataConfig.model.js`

**Frontend Components**:

- `pages/organizations/OrganizationSettingsPage.jsx` - Organization settings
- `pages/properties/PropertyListPage.jsx`, `PropertyDetailPage.jsx` - Property management
- `pages/locations/LocationTreePage.jsx`, `LocationDetailPage.jsx` - Location management
- `pages/users/UserListPage.jsx`, `UserDetailPage.jsx` - User management
- `pages/roles/RoleListPage.jsx`, `RoleDetailPage.jsx` - Role management
- `pages/teams/TeamListPage.jsx`, `TeamDetailPage.jsx` - Team management
- `pages/settings/MasterDataPage.jsx` - Master data configuration

**Key Features**:

- Organization-level settings and configuration
- Multi-property management
- Hierarchical location structure
- Built-in and custom roles
- User invitation and management
- Team-based work assignment
- Master data configuration (categories, statuses, priorities)
- Numbering rules
- Service windows and blackout windows

### 8.3 Operations Domains

#### 8.3.1 Dashboard Domain

**Backend Components**:

- `routes/dashboard.routes.js`
- `controllers/dashboard/` - KPI, charts, quick actions controllers
- `services/dashboard/` - Dashboard data aggregation services

**Frontend Components**:

- `pages/dashboard/DashboardPage.jsx` - Main dashboard
- `domains/dashboard/` - Dashboard widgets, KPI cards, charts

**Key Features**:

- Role-aware dashboard widgets
- KPI cards with drill-down
- Charts and graphs
- Quick actions
- Recent activity feed

#### 8.3.2 Assets Domain

**Backend Components**:

- `routes/assets.routes.js`, `routes/meters.routes.js`
- `controllers/assets/`, `controllers/meters/`
- `services/assets/`, `services/meters/`
- `models/asset.model.js`, `models/assetMeter.model.js`, `models/assetMeterReading.model.js`

**Frontend Components**:

- `pages/assets/AssetListPage.jsx`, `AssetDetailPage.jsx`
- `domains/assets/` - Asset management components, hooks, API

**Key Features**:

- Asset lifecycle management
- Asset hierarchies
- Meter tracking and readings
- Asset transfer and retirement
- Asset history and downtime tracking
- Document attachments
- QR code generation

#### 8.3.3 Requests Domain

**Backend Components**:

- `routes/requests.routes.js`
- `controllers/requests/`
- `services/requests/`
- `models/workRequest.model.js`

**Frontend Components**:

- `pages/requests/RequestListPage.jsx`, `RequestDetailPage.jsx`
- `pages/portal/RequestPortalPage.jsx` - Request portal for requesters
- `domains/requests/` - Request management components

**Key Features**:

- Request intake and submission
- Duplicate warning logic
- Request approval/rejection workflow
- Request clarification workflow
- Conversion to work orders
- Request portal for external requesters

#### 8.3.4 Work Orders Domain

**Backend Components**:

- `routes/workOrders.routes.js`
- `controllers/workOrders/`
- `services/workOrders/`
- `models/workOrder.model.js`

**Frontend Components**:

- `pages/workOrders/WorkOrderListPage.jsx`, `WorkOrderDetailPage.jsx`, `WorkOrderCreatePage.jsx`
- `domains/workOrders/` - Work order management components

**Key Features**:

- Work order lifecycle management
- Status transitions with validation
- Assignment and scheduling
- Labor tracking with timer
- Parts usage tracking
- Task management
- Comments and attachments
- Completion and verification
- Reopen and cancel workflows
- Guest impact and downtime tracking
- SLA tracking and escalation

#### 8.3.5 Preventive Maintenance Domain

**Backend Components**:

- `routes/pmPlans.routes.js`
- `controllers/preventiveMaintenance/`
- `services/preventiveMaintenance/`
- `models/preventiveMaintenancePlan.model.js`
- `jobs/pmGeneration.job.js` - PM work order generation job

**Frontend Components**:

- `pages/preventiveMaintenance/PMPlanListPage.jsx`, `PMPlanDetailPage.jsx`, `PMCalendarPage.jsx`
- `domains/preventiveMaintenance/` - PM management components

**Key Features**:

- PM plan creation and management
- Recurrence logic (time-based, meter-based, seasonal, hybrid)
- PM work order generation
- PM calendar and forecast views
- Defer, skip, pause, and missed behavior
- Occurrence uniqueness rules

#### 8.3.6 Inspections Domain

**Backend Components**:

- `routes/checklists.routes.js`, `routes/inspections.routes.js`
- `controllers/inspections/`
- `services/inspections/`
- `models/checklistTemplate.model.js`, `models/inspectionExecution.model.js`

**Frontend Components**:

- `pages/inspections/ChecklistListPage.jsx`, `InspectionExecutionPage.jsx`
- `domains/inspections/` - Inspection and checklist components

**Key Features**:

- Reusable checklist templates
- Versioned templates
- Step-type handling (pass/fail, yes/no, text, number, photo)
- Required task rules
- Conditional logic
- Signoff capture
- Failure-triggered work order creation

#### 8.3.7 Inventory Domain

**Backend Components**:

- `routes/parts.routes.js`, `routes/inventoryLines.routes.js`, `routes/inventoryTransactions.routes.js`
- `controllers/inventory/`
- `services/inventory/`
- `models/part.model.js`, `models/inventoryStockLine.model.js`, `models/inventoryTransaction.model.js`
- `jobs/lowStock.job.js` - Low stock alert job

**Frontend Components**:

- `pages/inventory/PartListPage.jsx`, `PartDetailPage.jsx`, `StockLineListPage.jsx`, `TransactionHistoryPage.jsx`
- `domains/inventory/` - Inventory management components

**Key Features**:

- Parts catalog management
- Stock line management by storeroom and bin
- Reservation, issue, return, transfer, adjustment, cycle count workflows
- Low stock alerts
- Part substitute logic
- Integration with work order costs

#### 8.3.8 Vendors Domain

**Backend Components**:

- `routes/vendors.routes.js`
- `controllers/vendors/`
- `services/vendors/`
- `models/vendor.model.js`

**Frontend Components**:

- `pages/vendors/VendorListPage.jsx`, `VendorDetailPage.jsx`
- `pages/portal/VendorPortalPage.jsx` - Vendor portal
- `domains/vendors/` - Vendor management components

**Key Features**:

- Vendor management
- Vendor compliance document tracking
- Vendor user invitation and restricted access
- Vendor assignment to work orders
- Vendor visibility filtering
- Vendor performance capture
- Vendor portal for external contractors

#### 8.3.9 Notifications Domain

**Backend Components**:

- `routes/notifications.routes.js`
- `controllers/notifications/`
- `services/notifications/`
- `models/notification.model.js`
- `jobs/notificationDispatch.job.js` - Email dispatch job
- `sockets/` - Socket.IO real-time notifications

**Frontend Components**:

- `pages/notifications/NotificationCenterPage.jsx`
- `domains/notifications/` - Notification components
- `services/sockets/` - Socket.IO client

**Key Features**:

- In-app notifications
- Email notifications
- Notification generation across all domains
- Unread/read synchronization
- Quiet hours handling
- Socket.IO real-time updates
- Notification preferences

#### 8.3.10 Reports Domain

**Backend Components**:

- `routes/reports.routes.js`
- `controllers/reports/`
- `services/reports/`

**Frontend Components**:

- `pages/reports/ReportsPage.jsx`, `ReportDetailPage.jsx`
- `domains/reports/` - Report components

**Key Features**:

- Report configuration and filtering
- CSV export
- PDF export with templates
- Widget-to-report drilldown
- Scheduled reports (future)

#### 8.3.11 Saved Views Domain

**Backend Components**:

- `routes/savedViews.routes.js`
- `controllers/savedViews/`
- `services/savedViews/`
- `models/savedView.model.js`

**Frontend Components**:

- Saved view components integrated into list screens
- `domains/savedViews/` - Saved view management

**Key Features**:

- Save filter, sort, and column configurations
- Personal and shared views
- Default view selection
- Quick view switching

#### 8.3.12 Imports Domain

**Backend Components**:

- `routes/imports.routes.js`
- `controllers/imports/`
- `services/imports/`
- `models/importJob.model.js`

**Frontend Components**:

- `pages/imports/ImportListPage.jsx`, `ImportCreatePage.jsx`
- `domains/imports/` - Import components

**Key Features**:

- CSV upload
- Dry run validation
- Row-level error reporting
- Commit workflow
- Import job history
- Error file download

#### 8.3.13 Audit Domain

**Backend Components**:

- `routes/auditLogs.routes.js`
- `controllers/audit/`
- `services/audit/`
- `models/auditLog.model.js`

**Frontend Components**:

- `pages/audit/AuditLogPage.jsx`
- `domains/audit/` - Audit log components

**Key Features**:

- Entity-based filtering
- Actor-based filtering
- Date filtering
- Change summary display
- Restricted access to sensitive data
- Immutable audit trail

### 8.4 Cross-Domain Support Capabilities

#### 8.4.1 Meters

**Ownership**: Assets domain
**Integration**: PM plans (meter-based triggers)

#### 8.4.2 Documents and Media

**Ownership**: Documents domain
**Integration**: All domains (assets, work orders, vendors, etc.)

**Backend Components**:

- `routes/documents.routes.js`
- `controllers/documents/`
- `services/documents/`
- `models/document.model.js`

**Frontend Components**:

- Document upload, preview, and management components
- Image lightbox
- PDF viewer

**Key Features**:

- File upload with multer (local disk storage)
- Allowed file types: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, GIF, MP4, MOV
- Maximum file size: 25MB
- File preview and download
- Soft delete
- Entity linkage (asset, work order, vendor, etc.)

#### 8.4.3 Saved Views

**Ownership**: Saved Views domain
**Integration**: All list screens (work orders, assets, requests, etc.)

## 9. API and Data Design

### 9.1 API Design Rules

1. **API Path Structure**: All APIs under `/api/v1` prefix
2. **Response Envelopes**: Consistent response structure
3. **Pagination**: All list APIs support pagination, filtering, and sorting
4. **Post-Mutation Payloads**: All mutating APIs return actionable data
5. **Authorization**: All protected APIs resolve authorization before returning data

#### 9.1.1 Response Envelope Structure

**Success Response**:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

**List Response with Pagination**:

```json
{
  "success": true,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 25,
    "total": 150,
    "pages": 6
  }
}
```

**Error Response**:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

#### 9.1.2 API Endpoint Patterns

**Resource CRUD**:

- `GET /api/v1/work-orders` - List work orders
- `GET /api/v1/work-orders/:id` - Get work order by ID
- `POST /api/v1/work-orders` - Create work order
- `PATCH /api/v1/work-orders/:id` - Update work order
- `DELETE /api/v1/work-orders/:id` - Delete work order (soft delete)

**Resource Actions**:

- `POST /api/v1/work-orders/:id/assign` - Assign work order
- `POST /api/v1/work-orders/:id/status` - Change work order status
- `POST /api/v1/work-orders/:id/complete` - Complete work order
- `POST /api/v1/work-orders/:id/verify` - Verify work order

**Nested Resources**:

- `GET /api/v1/work-orders/:id/tasks` - Get work order tasks
- `POST /api/v1/work-orders/:id/tasks` - Create work order task
- `GET /api/v1/work-orders/:id/labor` - Get work order labor entries
- `POST /api/v1/work-orders/:id/labor` - Create labor entry

#### 9.1.3 Query Parameters

**Filtering**:

- `?status=Open` - Filter by status
- `?priority=High,Urgent` - Filter by multiple priorities
- `?assignedTo=507f1f77bcf86cd799439011` - Filter by assigned user
- `?propertyId=507f1f77bcf86cd799439012` - Filter by property
- `?locationId=507f1f77bcf86cd799439013` - Filter by location
- `?dateFrom=2024-01-01&dateTo=2024-12-31` - Filter by date range

**Sorting**:

- `?sortBy=createdAt&sortOrder=desc` - Sort by created date descending
- `?sortBy=priority&sortOrder=asc` - Sort by priority ascending

**Pagination**:

- `?page=1&limit=25` - Page 1 with 25 items per page

**Search**:

- `?search=AC+unit` - Full-text search

### 9.2 Data Consistency Design

1. **Work Order Cost Fields**: Server-derived from labor, parts, and vendor costs
2. **Inventory Availability**: Server-derived from stock lines and transactions
3. **Asset-Derived Snapshots**: Maintained server-side (MTTR, MTBF, downtime)
4. **Audit Entries**: Immutable and write-only from application flows

#### 9.2.1 Server-Derived Fields

**Work Order Costs**:

```javascript
// Calculated on server, not editable by client
workOrder.laborCost = sum(laborEntries.map((e) => e.hours * e.hourlyRate));
workOrder.partsCost = sum(partsUsage.map((p) => p.quantity * p.unitCost));
workOrder.vendorCost = sum(vendorInvoices.map((i) => i.amount));
workOrder.totalCost =
  workOrder.laborCost + workOrder.partsCost + workOrder.vendorCost;
```

**Inventory Availability**:

```javascript
// Calculated on server, not editable by client
stockLine.quantityAvailable =
  stockLine.quantityOnHand - sum(reservations.map((r) => r.quantity));
```

**Asset Metrics**:

```javascript
// Calculated on server, not editable by client
asset.totalDowntime = sum(downtimeEvents.map((e) => e.duration));
asset.mttr = average(workOrders.map((wo) => wo.actualEnd - wo.actualStart));
asset.mtbf = average(timeBetweenFailures);
```

### 9.3 Real-Time Design

Socket.IO integration must:

1. Publish event names from shared backend event constant source
2. Expose frontend socket service that subscribes by user scope
3. Trigger targeted UI refreshes rather than brute-force full reloads

#### 9.3.1 Socket Event Names

**Backend Event Constants** (`backend/utils/constants.js`):

```javascript
export const SOCKET_EVENTS = {
  WORK_ORDER_CREATED: "work_order:created",
  WORK_ORDER_UPDATED: "work_order:updated",
  WORK_ORDER_ASSIGNED: "work_order:assigned",
  WORK_ORDER_STATUS_CHANGED: "work_order:status_changed",
  REQUEST_SUBMITTED: "request:submitted",
  REQUEST_APPROVED: "request:approved",
  NOTIFICATION_RECEIVED: "notification:received",
  PM_GENERATED: "pm:generated",
  LOW_STOCK_ALERT: "inventory:low_stock",
  // ... (all socket events)
};
```

#### 9.3.2 Backend Socket Emission

```javascript
/**
 * Emit socket event for work order creation.
 *
 * @param {Object} workOrder - Work order data
 */
export const emitWorkOrderCreated = (workOrder) => {
  const io = getSocketIO();

  // Emit to organization room
  io.to(`org:${workOrder.organizationId}`).emit(
    SOCKET_EVENTS.WORK_ORDER_CREATED,
    {
      workOrderId: workOrder._id,
      workOrderNumber: workOrder.workOrderNumber,
      title: workOrder.title,
      status: workOrder.status,
      priority: workOrder.priority,
      assignedTo: workOrder.assignedTo,
      propertyId: workOrder.propertyId,
    }
  );

  // Emit to assigned user room
  if (workOrder.assignedTo) {
    io.to(`user:${workOrder.assignedTo}`).emit(
      SOCKET_EVENTS.WORK_ORDER_ASSIGNED,
      {
        workOrderId: workOrder._id,
        workOrderNumber: workOrder.workOrderNumber,
        title: workOrder.title,
      }
    );
  }
};
```

#### 9.3.3 Frontend Socket Subscription

```javascript
/**
 * Socket service for real-time updates.
 *
 * @module services/sockets/socket
 */

import { io } from "socket.io-client";
import { SOCKET_EVENTS } from "../../utils/constants.js";

let socket = null;

/**
 * Initialize socket connection.
 *
 * @param {string} token - JWT access token
 * @param {string} userId - User ID
 * @param {string} organizationId - Organization ID
 */
export const initializeSocket = (token, userId, organizationId) => {
  socket = io(import.meta.env.VITE_API_URL, {
    auth: { token },
    query: { userId, organizationId },
  });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};

/**
 * Subscribe to work order events.
 *
 * @param {Function} callback - Event callback
 */
export const subscribeToWorkOrders = (callback) => {
  if (!socket) return;

  socket.on(SOCKET_EVENTS.WORK_ORDER_CREATED, callback);
  socket.on(SOCKET_EVENTS.WORK_ORDER_UPDATED, callback);
  socket.on(SOCKET_EVENTS.WORK_ORDER_ASSIGNED, callback);
  socket.on(SOCKET_EVENTS.WORK_ORDER_STATUS_CHANGED, callback);
};

/**
 * Unsubscribe from work order events.
 */
export const unsubscribeFromWorkOrders = () => {
  if (!socket) return;

  socket.off(SOCKET_EVENTS.WORK_ORDER_CREATED);
  socket.off(SOCKET_EVENTS.WORK_ORDER_UPDATED);
  socket.off(SOCKET_EVENTS.WORK_ORDER_ASSIGNED);
  socket.off(SOCKET_EVENTS.WORK_ORDER_STATUS_CHANGED);
};

/**
 * Disconnect socket.
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
```

## 10. Implementation Workflow and References

### 10.1 Mandatory Implementation Workflow

All implementation phases must follow the **six-step execution model** defined in `docs/task-execution-protocol.md`:

1. **Pre-Execution Git and Workspace Verification**

   - Check current Git state (`git status`, `git branch -vv`)
   - Update remote information (`git fetch origin`)
   - Handle uncommitted changes
   - Synchronize local with remote
   - Create feature branch
   - Verify clean state

2. **Comprehensive Source Analysis**

   - Read `docs/prd.md`, `docs/requirements.md`, `docs/design.md`, `docs/tasks.md`
   - Identify exact files and directories relevant to the phase
   - Identify related existing code patterns
   - Identify all PRD modules and workflows touched by the phase
   - Identify engineering constraints that govern the phase

3. **Previous Phase and Dependency Analysis**

   - Identify all completed prerequisite phases
   - Review repository artifacts produced by those phases
   - Review established patterns
   - Verify current phase will extend those patterns
   - Identify any missing prerequisite artifacts

4. **Phase Implementation Without Deviation**

   - Implement only what is in scope for the phase
   - Keep backend controllers thin
   - Keep backend business logic in services
   - Use `req.validated` and `req.user` correctly
   - Use backend constants from `backend/utils/constants.js`
   - Use frontend constants from `client/src/utils/constants.js`
   - Use JSDoc for every exported module
   - Use MUI `styled()` for reusable custom styling
   - Use theme tokens instead of hardcoded design values

5. **Self-Verification and User Review Preparation**

   - Compare implemented work against phase entry in `docs/tasks.md`
   - Compare against referenced requirement sections
   - Compare against referenced design sections
   - Review changed files carefully
   - Verify no prohibited pattern was introduced

6. **Post-Approval Git Finalization**
   - Verify current state
   - Stage and commit changes
   - Push feature branch
   - Checkout base branch
   - Merge feature branch
   - Push merged changes
   - Delete feature branch (local and remote)
   - Final synchronization verification

### 10.2 Repository Conventions

All implementation must follow the repository conventions defined in `docs/generation_prompt.md`:

1. **Governing Document Order**: `docs/prd.md` → `docs/requirements.md` → `docs/design.md` → `docs/tasks.md` → `docs/task-execution-protocol.md`
2. **Technology Baseline**: Use exact package versions from `backend/package.json` and `client/package.json`
3. **Backend Engineering Rules**: Controllers must never read raw `req.body/params/query`, only `req.validated`
4. **Frontend Engineering Rules**: No `react-router-dom`, no React Hook Form `watch()`, tree-shakable MUI imports only
5. **Mock Data Rule**: Mock data must not be introduced before Phase 17
6. **Current-Codebase-Aware**: Expand starter files instead of treating them as mature architecture

### 10.3 Theming Standards

All frontend styling must follow the **mandatory theming standards** defined in `docs/theming-protocol.md`:

1. **Centralized Theme Location**: All theme configuration in `client/src/theme/`
2. **Theme Provider**: Single `AppTheme.jsx` component wrapping entire application
3. **Color System**: Use brand colors, semantic palettes, and light/dark mode support
4. **Typography System**: Inter font family with defined typography scale
5. **Spacing System**: Use `theme.spacing()` for all spacing values (base unit: 8px)
6. **Shape System**: Use `theme.shape.borderRadius` for border radius
7. **Responsive Design**: Mobile-first approach using `theme.breakpoints.up()`
8. **Component Customization**: Use theme component overrides in `client/src/theme/customizations/`
9. **Styling API Preference**: Theme overrides → `styled()` → `sx` prop → component props
10. **Forbidden Practices**: No hardcoded colors, fonts, spacing, or non-tree-shakable imports

### 10.4 Cross-Document Traceability

The implementation must maintain traceability across all documentation:

1. **PRD to Requirements**: Every requirement maps to PRD functional requirements, workflows, business rules, data models, or acceptance criteria
2. **Requirements to Design**: Every design decision realizes one or more requirements
3. **Design to Tasks**: Every task implements specific design sections
4. **Tasks to Code**: Every code file maps to a task phase
5. **Traceability Matrix**: Use `docs/traceability-matrix.md` to verify cross-document alignment

### 10.5 Phase-Specific Rules

#### Background Jobs and System-Triggered Phases

Background jobs, schedulers, imports, and automated flows must:

1. Follow the same requirements and design analysis steps as HTTP-request phases
2. Pass a synthetic or service-layer actor context compatible with the `req.user` shape
3. Reuse the same constants, business rules, and audit pathways as interactive flows
4. Verify notification, escalation, retry, and idempotency behavior

#### Documentation and Alignment Phases

Documentation and alignment phases must:

1. Re-read all affected governing documents together
2. Correct section numbering, broken references, and wording defects
3. Preserve document precedence and update lower-priority documents
4. Verify every changed statement maps to a PRD requirement, design decision, or task-phase obligation

### 10.6 Reference Documents

**Primary Documentation**:

- `docs/prd.md` - Product Requirements Document
- `docs/requirements.md` - Implementation Requirements
- `docs/design.md` - Design Specifications
- `docs/tasks.md` - 18-Phase Implementation Plan
- `docs/task-execution-protocol.md` - Execution Workflow
- `docs/traceability-matrix.md` - Cross-Document Traceability
- `docs/generation_prompt.md` - Repository Conventions
- `docs/theming-protocol.md` - MUI v9 Theming Standards

**Package Specifications**:

- `backend/package.json` - Backend dependencies and exact versions
- `client/package.json` - Frontend dependencies and exact versions

**External References**:

- [MUI v9 Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Theming Guide](https://mui.com/material-ui/customization/theming/)
- [React Router v7 Documentation](https://reactrouter.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Express.js Documentation](https://expressjs.com/)

### 10.7 Enforcement and Compliance

**Mandatory Compliance Checks**:

1. ✅ All colors use `theme.palette.*`
2. ✅ All typography uses `theme.typography.*`
3. ✅ All spacing uses `theme.spacing()`
4. ✅ All border radius uses `theme.shape.borderRadius`
5. ✅ All breakpoints use `theme.breakpoints.*`
6. ✅ No hardcoded color values
7. ✅ No hardcoded font sizes
8. ✅ No hardcoded spacing values
9. ✅ Tree-shakable MUI imports only
10. ✅ Grid uses `size` prop (not `item`)
11. ✅ Dark mode tested and working
12. ✅ Mobile responsive tested
13. ✅ Accessibility standards met
14. ✅ Controllers use `req.validated` only
15. ✅ Controllers use `req.user` for actor context
16. ✅ Backend constants from `backend/utils/constants.js`
17. ✅ Frontend constants from `client/src/utils/constants.js`
18. ✅ JSDoc for all exported functions
19. ✅ No `react-router-dom` imports
20. ✅ No React Hook Form `watch()` usage

**Failure to comply** with these standards will result in:

- Incomplete requirement coverage
- Design drift
- Inconsistent repository structure
- Review churn
- Git confusion
- Accessibility violations
- Performance issues
- Maintenance difficulties

**Success in compliance** produces:

- Traceable delivery
- Predictable phase execution
- Cleaner review cycles
- Better architectural consistency
- Safer multi-phase implementation
- Accessible user interfaces
- Performant applications
- Maintainable codebase
