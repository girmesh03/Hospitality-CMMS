# Hospitality CMMS Implementation Tasks

## 1. Task Document Purpose

This document converts [requirements.md](/mnt/e/1.Sapphire-work/1.Hospitality-CMMS/Hospitality-CMMS/docs/requirements.md) and [design.md](/mnt/e/1.Sapphire-work/1.Hospitality-CMMS/Hospitality-CMMS/docs/design.md) into a phase-based implementation plan for developer AI execution.

This task plan is mandatory.

## 2. Phase Planning Rules

1. The implementation order is `prd.md -> requirements.md -> design.md -> tasks.md -> task-execution-protocol.md`.
2. Every phase must be executed using `docs/task-execution-protocol.md`.
3. Phases must be feature-based unless the phase is a prerequisite required to enable later feature work.
4. A later phase may not begin until the earlier phase completion gate is satisfied or an explicit document change reorders dependencies.
5. Mock data injection under `backend/mock/*` is prohibited until all models are implemented and the designated mock-data phase begins.

## 3. Phase Summary

| Phase | Name | Type | Depends On |
| --- | --- | --- | --- |
| 00 | Documentation Lock and Traceability Setup | Prerequisite | None |
| 01 | Repository Foundation and Shared Conventions | Prerequisite | 00 |
| 02 | Backend Core Infrastructure | Prerequisite | 01 |
| 03 | Frontend Core Infrastructure | Prerequisite | 01 |
| 04 | Authentication and Session Management | Feature | 02, 03 |
| 05 | Organization, Property, Location, and Master Data Foundations | Feature | 02, 03, 04 |
| 06 | Users, Roles, Teams, and Access Control | Feature | 05 |
| 07 | Assets, Meters, Documents, and Location Context | Feature | 05, 06 |
| 08 | Work Request Intake and Triage | Feature | 05, 06, 07 |
| 09 | Work Order Core Lifecycle | Feature | 08 |
| 10 | Preventive Maintenance | Feature | 07, 09 |
| 11 | Inspections, Checklists, and Procedures | Feature | 09, 10 |
| 12 | Inventory and Spare Parts | Feature | 07, 09 |
| 13 | Vendors and Restricted Contractor Access | Feature | 09, 12 |
| 14 | Notifications and Real-Time Synchronization | Feature | 08, 09, 10, 12, 13 |
| 15 | Dashboards, Search, Saved Views, Reporting, and Audit UX | Feature | 05 through 14 |
| 16 | Data Import, Export, and Migration Operations | Feature | 05 through 15 |
| 17 | Mock Data Injection and Demo Dataset Assembly | Late Support | 05 through 16 |
| 18 | Final Cross-Phase Alignment and Completion Gate | Completion | 00 through 17 |

## 4. Phase Traceability Matrix

| Phase | Primary PRD scope | Primary requirements scope | Primary design scope |
| --- | --- | --- | --- |
| 00 | PRD whole-document alignment | Requirements sections 1 to 16 | Design sections 1 to 14 |
| 01 | PRD `1.4`, `12.10`, `13.5.3`, `15.6.2`, `18.12` | Requirements sections 3, 4, 5 | Design sections 2 and 3 |
| 02 | PRD `13`, `15`, `16`, `18.12` | Requirements sections 4, 5, 11, 12 | Design section 4 |
| 03 | PRD `12`, `15.6.2`, `18.12` | Requirements sections 4, 5, 10, 12 | Design sections 5, 6, 7, and 8 |
| 04 | PRD `8.1`, `9.1`, `11.8`, `13.2`, `18.1` | Requirements sections 6.1 and 8.1 | Design sections 4, 5, and 9.1 |
| 05 | PRD `8.2`, `8.17`, `11.2`, `11.3`, `11.4`, `11.22` | Requirements sections 6.2 and 8.2 | Design sections 3, 4, 5, and 9.2 |
| 06 | PRD `8.3`, `11.5`, `11.6`, `11.7`, `18.1` | Requirements sections 6.3 and 8.2 | Design sections 4, 5, and 9.2 |
| 07 | PRD `8.5`, `8.13`, `11.9`, `11.10`, `11.19`, `18.6` | Requirements sections 6.5 and 8.4 | Design sections 4, 5, 6, and 9.3 |
| 08 | PRD `8.6`, `9.2`, `11.11`, `18.2` | Requirements sections 6.6 and 8.5 | Design sections 4, 5, 6, 7, 8, and 9.3 |
| 09 | PRD `8.7`, `9.3`, `9.4`, `11.12`, `18.3` | Requirements sections 6.7 and 8.6 | Design sections 4, 5, 6, 7, 8, and 9.3 |
| 10 | PRD `8.8`, `9.5`, `11.13`, `18.4` | Requirements sections 6.8 and 8.7 | Design sections 4, 5, 6, 7, and 9.3 |
| 11 | PRD `8.9`, `9.6`, `11.14`, `18.5` | Requirements sections 6.9 and 8.8 | Design sections 4, 5, 6, 7, 8, and 9.3 |
| 12 | PRD `8.10`, `9.7`, `11.15`, `11.16`, `11.17`, `18.7` | Requirements sections 6.10 and 8.9 | Design sections 4, 5, 6, 7, 8, and 9.3 |
| 13 | PRD `8.11`, `9.8`, `11.18`, `18.8` | Requirements sections 6.11 and 8.10 | Design sections 4, 5, 6, 7, 8, and 9.3 |
| 14 | PRD `8.12`, `13.11`, `13.12`, `14`, `18.9` | Requirements sections 6.12 and 12 | Design sections 4, 5, 8, 9.3, and 10 |
| 15 | PRD `8.4`, `8.14`, `8.15`, `8.16`, `11.20`, `11.21`, `11.24`, `18.10` | Requirements sections 6.4, 6.12, 10, and 12 | Design sections 5, 6, 7, 8, 9.3, 10, and 11 |
| 16 | PRD `8.18`, `9.10`, `11.23`, `18.11` | Requirements sections 6.12 and 11 | Design sections 4, 5, 10, and 11.4 |
| 17 | PRD `19.2`, `13.8`, `18.12` plus full model coverage | Requirements section 13 | Design section 12 |
| 18 | PRD whole-document completion and acceptance | Requirements sections 14 to 16 | Design sections 13 and 14 |

## 5. Detailed Phases

## Phase 00: Documentation Lock and Traceability Setup

### Objective

Freeze the implementation flow and ensure that every later change is traceable to PRD, requirements, design, and tasks.

### Tasks

- Read `docs/prd.md`, `docs/requirements.md`, `docs/design.md`, `docs/tasks.md`, and `docs/task-execution-protocol.md` together.
- Verify document precedence and resolve any contradictions before feature work starts.
- Create a traceability matrix artifact or equivalent working notes mapping PRD sections to requirement sections, design sections, and task phases.
- Confirm the explicit prohibitions and engineering constraints are understood.

### Deliverables

- Stable documentation set.
- Requirement-to-design-to-task traceability mapping.

### Completion gate

- No unresolved contradiction remains across the docs.
- Every PRD top-level requirement group maps to at least one phase.

## Phase 01: Repository Foundation and Shared Conventions

### Objective

Create the baseline repository structure required for scalable implementation.

### Tasks

- Create the required backend directory skeleton defined in `docs/design.md`.
- Create the required frontend directory skeleton defined in `docs/design.md`.
- Create `backend/utils/constants.js`.
- Create `client/src/utils/constants.js`.
- Create the centralized frontend theme structure under `client/src/app/theme/`.
- Establish shared utility placeholders for backend and frontend.
- Ensure all newly created modules use JSDoc.
- Keep the repo JavaScript-only.

### Required file groups

- Backend config directories.
- Backend controllers, services, validators, middlewares, models, routes, utils, jobs, sockets, and mock directories.
- Frontend app, domains, components, pages, services, store, hooks, utils, and theme directories.

### Completion gate

- Repository structure exists.
- Backend constants single source of truth exists.
- Frontend constants single source of truth exists.
- Centralized frontend theme exists.

## Phase 02: Backend Core Infrastructure

### Objective

Build the backend foundation that all feature domains depend on.

### Tasks

- Expand `backend/app.js` into a full app bootstrap.
- Expand `backend/server.js` into a startup entry with clean server initialization.
- Add environment configuration modules.
- Add database connection bootstrap.
- Add structured logger setup.
- Add request ID middleware.
- Add security middleware stack.
- Add centralized error classes and error middleware.
- Add response helpers or equivalent response normalization utilities.
- Add auth decoding middleware shell.
- Add authorization middleware shell.
- Add validation-result middleware.
- Add validated-request normalization middleware that attaches `req.validated`.
- Add base route registration under `/api/v1`.
- Add socket bootstrap shell.
- Add job bootstrap shell.

### Design-critical implementation rules

- Controllers must not read raw request containers.
- Middleware ordering must match `docs/design.md`.
- Shared constants must come from `backend/utils/constants.js`.

### Completion gate

- Backend app boots with structured middleware ordering.
- Validation middleware can attach `req.validated`.
- Error handling is centralized.
- Logging and request IDs are in place.

## Phase 03: Frontend Core Infrastructure

### Objective

Build the frontend shell and shared UI infrastructure required by all features.

### Tasks

- Expand `client/src/App.jsx` into an application shell entry.
- Create router configuration using `react-router`.
- Create Redux store and persistence integration.
- Create app-level providers.
- Build centralized MUI theme modules.
- Establish the base separation between shared reusable components and domain-owned frontend components.
- Create shared layout components.
- Create shared feedback components for loading, empty, and error states.
- Create shared form field wrappers compatible with React Hook Form.
- Create shared dialog and drawer primitives.
- Create shared data-grid wrappers and table helpers.
- Create shared API client modules using `axios`.
- Create shared socket service shell.
- Ensure all MUI imports are tree-shakable.
- Ensure Grid uses `size` prop patterns only.
- Ensure reusable styled components use MUI `styled()`.

### Completion gate

- Frontend app bootstraps through providers, router, store, and theme.
- Shared layout, form, feedback, and data-display primitives exist.
- No `react-router-dom` usage is introduced.
- No `watch()` usage is introduced.

## Phase 04: Authentication and Session Management

### Objective

Implement all authentication, invitation, password, session, and security-notification flows.

### Backend tasks

- Implement auth constants, validators, routes, controllers, and services.
- Implement user session model support.
- Implement invitation acceptance flow.
- Implement login and refresh-token session lifecycle.
- Implement logout and logout-all flows.
- Implement password reset flow.
- Implement account lockout and lockout release behavior.
- Implement security notification event generation.
- Implement session listing and revoke-current/revoke-specific support if applicable.

### Frontend tasks

- Build login page.
- Build forgot-password page.
- Build reset-password page.
- Build invitation acceptance page.
- Build profile/session management page.
- Build auth state handling and protected-route behavior.

### Completion gate

- All `docs/prd.md` `8.1`, `9.1`, `11.8`, and `18.1` requirements are implemented.

## Phase 05: Organization, Property, Location, and Master Data Foundations

### Objective

Implement the foundational administrative structures used by nearly every feature.

### Backend tasks

- Implement organization, property, location, and master-data models.
- Implement organization, property, and location routes, validators, controllers, and services.
- Implement master-data config routes, validators, controllers, and services.
- Implement numbering rule support.
- Implement service-window and blackout-window storage support.
- Implement location hierarchy logic and subtree filtering logic.

### Frontend tasks

- Build organization settings screens.
- Build property settings screens.
- Build location tree/list/detail screens.
- Build master-data settings screens.
- Implement location-tree selection and subtree filtering UI.
- Implement forms for service windows, quiet hours, holidays, and business rules.

### Completion gate

- Organization, properties, locations, and master data are manageable through UI and API.
- Location hierarchy and scope filtering work.
- Numbering and baseline configuration structures exist.

## Phase 06: Users, Roles, Teams, and Access Control

### Objective

Implement user administration, teams, roles, permissions, and scope assignment.

### Backend tasks

- Implement role, user, and team models and APIs.
- Implement built-in role provisioning.
- Implement custom role CRUD.
- Implement permission resolution utilities.
- Implement property-scope and location-scope assignment logic.
- Implement forced logout on permission-critical changes.
- Implement audit logging for access changes.

### Frontend tasks

- Build users management screens.
- Build roles management screens.
- Build teams management screens.
- Build permission assignment and scope assignment UI.
- Build user invite, disable, and force-logout actions.

### Completion gate

- Effective permissions are enforceable.
- Property and location scopes are assignable and respected.
- Role/team/user admin UI is functional.

## Phase 07: Assets, Meters, Documents, and Location Context

### Objective

Implement asset management, meter management, and core document support.

### Backend tasks

- Implement asset, asset meter, asset meter reading, and document models.
- Implement asset routes, validators, controllers, and services.
- Implement meter routes, validators, controllers, and services.
- Implement document upload/download/delete flows.
- Implement asset transfer, replacement, and retirement logic.
- Implement asset history aggregation logic.

### Frontend tasks

- Build assets list and detail screens.
- Build asset create/edit/transfer/retire flows.
- Build meter history displays and reading-entry flows.
- Build document upload and preview UI.
- Build asset history, downtime, and PM relation tabs.

### Completion gate

- Assets, meters, and documents are fully manageable.
- Asset history and location context are visible.

## Phase 08: Work Request Intake and Triage

### Objective

Implement request creation, request portal intake, duplicate warnings, and triage workflows.

### Backend tasks

- Implement work request model and APIs.
- Implement request duplicate-warning logic.
- Implement request approval, rejection, cancellation, clarification, and conversion logic.
- Implement requester-facing visibility restrictions.
- Implement request notification triggers.

### Frontend tasks

- Build request list screen.
- Build internal request create screen.
- Build request detail and triage screen.
- Build request portal screen structure.
- Build requester view of owned requests.

### Completion gate

- All request intake channels supported by version 1 are implemented.
- Triage workflow is usable end to end.

## Phase 09: Work Order Core Lifecycle

### Objective

Implement the central corrective and emergency work-order engine.

### Backend tasks

- Implement work-order model and APIs.
- Implement numbering logic.
- Implement status transitions and validation rules.
- Implement assignment, scheduling, rescheduling, and status-change actions.
- Implement labor entry and timer logic.
- Implement comments and attachment linkage.
- Implement completion, verification, reopen, cancel, and merge behavior.
- Implement guest-impact, downtime, and SLA handling.

### Frontend tasks

- Build work-order list screen.
- Build work-order create screen.
- Build work-order detail screen with panels for summary, schedule, tasks, labor, parts, attachments, comments, and activity.
- Build assignment, status-change, completion, verification, reopen, and cancel dialogs or drawers.
- Build emergency visibility treatment in UI.

### Completion gate

- Standard corrective lifecycle works end to end.
- Emergency lifecycle works end to end.
- Work-order detail supports all primary actions.

## Phase 10: Preventive Maintenance

### Objective

Implement PM plans, PM generation, PM calendars, and PM history.

### Backend tasks

- Implement preventive maintenance plan model and APIs.
- Implement recurrence logic for time, meter, seasonal, and hybrid plans.
- Implement PM generation job.
- Implement occurrence uniqueness rules.
- Implement defer, skip, pause, and missed behavior.

### Frontend tasks

- Build PM list screen.
- Build PM detail/edit screen.
- Build PM calendar screen.
- Build forecast UI.
- Surface PM history and occurrence state visibility.

### Completion gate

- PM plans can be created and managed.
- PM work orders can be generated correctly.
- Calendar and forecast views are functional.

## Phase 11: Inspections, Checklists, and Procedures

### Objective

Implement reusable templates, checklist execution, and failure-to-follow-up work behavior.

### Backend tasks

- Implement checklist template and inspection execution models and APIs.
- Implement step-type handling, required-task rules, conditional logic, and signoff capture.
- Implement failure-triggered request/work-order creation.
- Implement version-preserving execution behavior.

### Frontend tasks

- Build checklist template management screens.
- Build inspection execution UI.
- Build checklist rendering for work orders and PM.
- Build evidence capture and signoff UI.

### Completion gate

- Checklist templates are versioned and reusable.
- Inspection execution can create follow-up work where configured.

## Phase 12: Inventory and Spare Parts

### Objective

Implement the parts catalog and stock-control flows tied to work orders.

### Backend tasks

- Implement part, inventory stock line, and inventory transaction models and APIs.
- Implement reservation, issue, return, transfer, adjustment, and cycle-count flows.
- Implement low-stock logic.
- Implement part substitute logic.
- Integrate inventory usage with work-order cost summaries.

### Frontend tasks

- Build parts list screen.
- Build part detail screen.
- Build stock line management UI.
- Build inventory transaction history UI.
- Build reservation/issue/return/transfer/count actions from relevant screens.

### Completion gate

- Parts and inventory are operational.
- Work-order-linked part usage updates inventory and costs.

## Phase 13: Vendors and Restricted Contractor Access

### Objective

Implement vendor management and restricted external work participation.

### Backend tasks

- Implement vendor model and APIs.
- Implement vendor compliance document tracking.
- Implement vendor user invitation and restricted access behavior.
- Implement vendor assignment and vendor visibility filtering.
- Implement vendor performance capture inputs.

### Frontend tasks

- Build vendors list and detail screens.
- Build vendor compliance document UI.
- Build vendor assignment UX within work orders.
- Build restricted vendor portal screens.

### Completion gate

- Vendors can be maintained, assigned, and restricted correctly.
- Vendor portal access is limited to assigned work.

## Phase 14: Notifications and Real-Time Synchronization

### Objective

Implement the platform notification model and socket-driven UI freshness.

### Backend tasks

- Implement notification model and APIs.
- Implement notification generation across request, work-order, PM, inventory, and vendor events.
- Implement socket event emission categories.
- Implement email dispatch and retry integration.
- Implement quiet-hours handling.

### Frontend tasks

- Build notification center UI.
- Implement unread/read synchronization.
- Implement socket subscriptions and scoped UI refresh behavior.
- Integrate real-time updates into dashboard, request, work-order, PM, inventory, and vendor screens.

### Completion gate

- In-app notifications work.
- Email notifications work for required events.
- Socket-driven updates refresh the intended screens.

## Phase 15: Dashboards, Search, Saved Views, Reporting, and Audit UX

### Objective

Implement visibility and analysis features that sit on top of the operational system.

### Backend tasks

- Implement dashboard summary APIs.
- Implement report APIs and export flows.
- Implement search APIs.
- Implement saved-view APIs.
- Implement audit-log query APIs with scope restrictions.

### Frontend tasks

- Build role-aware dashboard screens.
- Build search surfaces.
- Build saved-view management UI.
- Build reports hub and report detail/filter/export UI.
- Build audit-log screens.

### Completion gate

- Dashboard widgets are functional and scoped.
- Reports can be filtered and exported.
- Audit logs are visible with correct restrictions.

## Phase 16: Data Import, Export, and Migration Operations

### Objective

Implement import and migration support after the core operational model exists.

### Backend tasks

- Implement import job model and APIs.
- Implement upload, dry-run validation, and commit flows.
- Implement CSV parsing strategy.
- Implement downloadable validation-error outputs.
- Implement historical work import support.

### Frontend tasks

- Build import jobs screen.
- Build import create/upload flows.
- Build dry-run results and commit UI.
- Build downloadable error-report UX.

### Completion gate

- CSV imports support dry run and commit.
- Row-level error feedback is available.

## Phase 17: Mock Data Injection and Demo Dataset Assembly

### Objective

Create realistic seed and demo data only after the full domain model exists.

### Preconditions

- All primary models are implemented.
- Shared constants are stable.
- Feature phases through import support are complete enough for relational mock data.

### Tasks

- Create `backend/mock/*` domain mock modules.
- Create realistic hospitality organizations, properties, and location hierarchies.
- Create users, roles, teams, and scope relationships.
- Create assets, meters, work requests, work orders, PM plans, inspections, parts, stock lines, transactions, vendors, notifications, and saved views.
- Create a seed entry point under `backend/mock/seed.js`.
- Ensure mock data uses the same constants source and validation rules as production code.

### Completion gate

- Mock data is comprehensive, relational, and realistic.
- Mock data exists only after all models are implemented.

## Phase 18: Final Cross-Phase Alignment and Completion Gate

### Objective

Close the loop across requirements, design, tasks, and implementation state.

### Tasks

- Reconcile implemented files and modules against `docs/requirements.md`.
- Reconcile repository structure against `docs/design.md`.
- Reconcile every completed feature against `docs/prd.md` acceptance criteria.
- Verify no prohibited implementation pattern was introduced.
- Verify constants sources of truth are actually used.
- Verify responsive design expectations are implemented for mobile, tablet, and desktop.
- Verify all required screens have matching route, UI, API, and data support.
- Verify mock data was introduced only in the designated late phase.
- Prepare the implementation summary for user review per `docs/task-execution-protocol.md`.

### Completion gate

- Cross-document alignment is confirmed.
- No mandatory requirement remains unimplemented.
- The phase package is ready for user review and approval.

## 6. File Ownership by Phase

### 6.1 Backend ownership summary

- Phases 01 through 03 create the infrastructure files.
- Phases 04 through 16 progressively fill domain files.
- Phase 17 adds `backend/mock/*`.

### 6.2 Frontend ownership summary

- Phases 01 and 03 create the app shell, theme, shared utilities, and component primitives.
- Phases 04 through 16 progressively fill pages, domain hooks, domain API adapters, and reusable UI elements.

### 6.3 Documentation ownership summary

- `docs/prd.md` remains the source product document.
- `docs/requirements.md`, `docs/design.md`, and `docs/tasks.md` guide implementation.
- `docs/task-execution-protocol.md` governs execution behavior for every phase.

## 7. Phase-Level Non-Negotiables

Every phase must obey the following:

1. Do not bypass `req.validated`.
2. Do not bypass `req.user`.
3. Do not hardcode backend domain constants outside the backend constants source of truth.
4. Do not hardcode frontend shared constants outside the frontend constants source of truth.
5. Do not use non-tree-shakable MUI imports.
6. Do not use `react-router-dom`.
7. Do not use React Hook Form `watch()`.
8. Do not use deprecated Grid `item` patterns.
9. Do not use hardcoded styling tokens where theme values are required.
10. Do not introduce mock data before Phase 17.
11. Any phase that touches the UI must implement and verify mobile, tablet, and desktop behavior for the screens and widgets it changes.
