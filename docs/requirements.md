# Hospitality CMMS Requirements Specification

## 1. Document Purpose

This document converts [prd.md](/mnt/e/1.Sapphire-work/1.Hospitality-CMMS/Hospitality-CMMS/docs/prd.md) into an implementation-facing requirements specification for developer AI execution.

This document is mandatory. It defines:

1. What must be built.
2. How the repository must be organized before and during implementation.
3. Which coding and UI rules are non-negotiable.
4. Which user stories, workflows, screens, entities, APIs, and behaviors must exist.
5. Which completion conditions define done for each area.

## 2. Document Precedence and Alignment

### 2.1 Source of truth order

The delivery flow is:

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

The current repository baseline is minimal. At the time of drafting:

1. `backend/app.js` and `backend/server.js` exist.
2. `client/src/main.jsx` and `client/src/App.jsx` exist.
3. `docs/prd.md`, `docs/generation_prompt.md`, and `docs/task-execution-protocol.md` exist.
4. The required shared constants files do not yet exist.
5. The required centralized frontend theme module does not yet exist.
6. The current repo does not yet contain the feature structure required for a production-grade hospitality CMMS.

### 3.2 Mandatory baseline packages

Backend runtime packages must remain aligned with `docs/prd.md`, including:

1. `express`
2. `mongoose`
3. `express-validator`
4. `jsonwebtoken`
5. `bcrypt`
6. `socket.io`
7. `winston`

Frontend runtime packages must remain aligned with `docs/prd.md`, including:

1. React `19.x`
2. `react-router`
3. `@mui/material` `9.x`
4. `@mui/x-data-grid`
5. `@mui/x-charts`
6. `@mui/x-date-pickers`
7. `react-hook-form`
8. `redux-persist`
9. `socket.io-client`

## 4. Mandatory Engineering Constraints

### 4.1 Global repository constraints

1. The codebase must remain JavaScript-only.
2. Every exported module and every non-trivial internal helper must use JSDoc.
3. Development instructions and task instructions must use Git Bash or WSL compatible commands only.
4. CMD-specific or PowerShell-specific command syntax is prohibited in the implementation flow and supporting docs.

### 4.2 Backend constraints

1. `backend/utils/constants.js` must be created and treated as the backend single source of truth.
2. Controllers must not read input from `req.body`, `req.params`, or `req.query`.
3. Controllers must only consume validated input from `req.validated.body`, `req.validated.params`, and `req.validated.query`.
4. The exact validated-input middleware contract must be:

```js
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```

5. The acting user or actor must be attached to `req.user`.
6. Services must not receive raw Express request or response objects.
7. Backend business constants must not be hardcoded repeatedly across modules.
8. Controllers must remain orchestration-only and delegate business logic to services.

### 4.3 Frontend constraints

1. `client/src/utils/constants.js` must be created and treated as the frontend single source of truth.
2. Components must never use hardcoded styling values where theme values are applicable.
3. Styling must use `theme.palette`, `theme.typography`, `theme.spacing`, and `theme.breakpoints`.
4. Reusable custom styling must use MUI `styled()`.
5. All MUI imports must be tree-shakable.
6. `react-router` must be used for router imports; `react-router-dom` is not allowed in this project.
7. React Hook Form `watch()` must never be used.
8. MUI Grid must use the `size` prop rather than the deprecated `item` prop pattern.
9. Custom rendering must prefer the MUI slots and `slotProps` APIs where available.
10. MUI usage must follow v9 syntax and deprecation guidance.

## 5. Required Repository Deliverables

### 5.1 Top-level repository requirements

The implementation must result in a repository that includes at minimum:

1. `backend/`
2. `client/`
3. `docs/`
4. `README.md`
5. `.gitignore`

### 5.2 Required documentation files

The `docs/` directory must contain at minimum:

1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`

### 5.3 Required backend deliverables

The backend implementation must create and maintain the following categories of files and directories:

1. Application bootstrap and server startup.
2. Configuration modules.
3. Constants source of truth.
4. Models matching the PRD data model.
5. Validation middleware and request normalization middleware.
6. Authentication middleware and authorization middleware.
7. Routes.
8. Controllers.
9. Services.
10. Utilities.
11. Schedulers or job runners required by the PRD background-processing scope, including PM generation, SLA escalation, low-stock evaluation, notification dispatch or retry, and session cleanup where those flows are part of the implementation baseline.
12. Mock data modules under `backend/mock/*` only after all models are fully implemented.

### 5.4 Required frontend deliverables

The frontend implementation must create and maintain the following categories of files and directories:

1. App bootstrap and app router.
2. Theme module.
3. Frontend constants source of truth.
4. Shared API client and request helpers.
5. Shared reusable components.
6. Domain-organized feature folders.
7. Domain pages and page-level containers.
8. Domain-specific components separated from reusable cross-domain components.
9. Redux store, slices, selectors, and persistence configuration.
10. Shared hooks, utilities, and layout primitives.
11. Asset files used by the product UI.

## 6. Required Functional Scope

All scope below is mandatory unless the PRD explicitly states otherwise.

### 6.1 Identity and Access

The system must support:

1. User invitation.
2. Email verification for invited accounts.
3. Login.
4. Refresh-token backed session management.
5. Logout current session.
6. Logout all sessions.
7. Password reset.
8. Account lockout.
9. Role-based and scope-based authorization.
10. Property-level and location-level visibility restrictions.

### 6.2 Organization, Property, and Location Administration

The system must support:

1. Organization-level settings.
2. Multi-property operation.
3. Hospitality-aware location hierarchy.
4. Building, floor, wing, zone, room, public-area, BOH, plant-room, storeroom, and bin structures.
5. Location statuses and service windows.
6. Location-based permissions.

### 6.3 User and Team Administration

The system must support:

1. Built-in roles.
2. Custom roles.
3. Teams.
4. Property scope assignment.
5. Location scope assignment.
6. Notification preferences.
7. Session visibility and forced logout.

### 6.4 Dashboard and Home Experience

The system must support:

1. Role-aware dashboards.
2. Multi-property rollups.
3. Open work visibility.
4. Overdue and emergency visibility.
5. Guest-impact visibility.
6. PM compliance visibility.
7. Critical asset and low-stock visibility.
8. Action-oriented widgets and quick navigation.

### 6.5 Asset and Meter Management

The system must support the full asset lifecycle, including:

1. Asset creation, edit, transfer, replacement, retirement, and archival behavior.
2. Asset hierarchies.
3. Warranties, manufacturer data, identifiers, and documents.
4. Meter creation and meter readings.
5. Downtime tracking.
6. Asset history views.

### 6.6 Work Request Intake

The system must support:

1. Internal request creation.
2. Request portal submissions.
3. Dispatcher on-behalf-of entry.
4. Duplicate warning logic.
5. Approval, rejection, cancellation, clarification, and conversion flows.
6. Guest-sensitive and occupied-room request context.

### 6.7 Work Order Management

The system must support:

1. Corrective, emergency, preventive, inspection follow-up, vendor, and planned work types.
2. Assignment, reassignment, team assignment, and vendor assignment.
3. Scheduling and rescheduling.
4. Status transitions defined in the PRD.
5. Tasks, checklists, labor tracking, timer behavior, parts usage, comments, attachments, completion, verification, reopen, and cancellation.
6. Guest-impact, SLA, downtime, and cost tracking.

### 6.8 Preventive Maintenance

The system must support:

1. Time-based PM plans.
2. Meter-based PM plans.
3. Seasonal PM plans.
4. Hybrid PM plans.
5. Forecasting and calendar visibility.
6. Missed, skipped, deferred, paused, and completed occurrence behavior.

### 6.9 Inspections and Checklists

The system must support:

1. Template versioning.
2. Required tasks.
3. Multiple response types.
4. Conditional logic.
5. Failure-triggered follow-up work creation.
6. Evidence capture and signoff.

### 6.10 Inventory and Spare Parts

The system must support:

1. Part masters.
2. Inventory lines by property/storeroom/bin.
3. Reservation, issue, return, transfer, count, and adjustment workflows.
4. Min/max/reorder controls.
5. Substitute parts.
6. Work-order-linked consumption and cost capture.

### 6.11 Vendors and Contractor Access

The system must support:

1. Vendor profiles.
2. Compliance document tracking.
3. Restricted vendor user access.
4. Vendor-performed work updates.
5. Vendor KPI reporting.

### 6.12 Notifications, Documents, Search, Reporting, Audit, Configuration, and Import

The system must support:

1. In-app notifications.
2. Email notifications.
3. Real-time socket updates.
4. Attachment management.
5. Global and module-level search.
6. Saved views.
7. Standard reports and exports.
8. Immutable audit logs.
9. Master data and numbering configuration.
10. CSV import and historical migration flows.

## 7. Mandatory User Stories

### 7.1 Corporate and administration stories

1. As an organization admin, I need to configure properties, roles, numbering rules, and master data so that all properties operate under one governed maintenance platform.
2. As a corporate engineering leader, I need to compare backlog, PM compliance, emergency volume, and downtime across properties so that I can manage portfolio-wide engineering performance.
3. As an auditor, I need immutable access to field-level history, actor identity, and timestamped records so that maintenance actions are defensible and reviewable.

### 7.2 Property operations stories

1. As a chief engineer, I need to review and route requests quickly so that guest-impact issues are assigned without delay.
2. As a maintenance supervisor, I need to assign technicians, teams, and vendors while respecting room-access restrictions and service windows so that work execution does not disrupt operations unnecessarily.
3. As a general manager, I need a read-only view of guest-impact issues and room downtime so that I can protect guest experience and revenue.

### 7.3 Technician and execution stories

1. As a technician, I need my assigned work, due work, labor timer, parts access, and checklist requirements in one place so that I can complete work without missing required data.
2. As a technician, I need to see room-access notes, DND state, and VIP warnings before starting work so that I do not violate guest-sensitive restrictions.
3. As a technician, I need to upload photos, add notes, enter labor, record parts, and complete required checklist items so that the work order can close without rework.

### 7.4 Requester stories

1. As a front office or housekeeping requester, I need a simple request form with clear location selection and status visibility so that I can report maintenance issues accurately and follow progress.
2. As a requester, I need acknowledgment and status-change notifications so that I do not have to chase engineering for updates.

### 7.5 Inventory and vendor stories

1. As an inventory controller, I need low-stock alerts, stock history, and transfer tools so that parts shortages do not block urgent repairs.
2. As a vendor coordinator, I need to assign vendors only when compliant and then verify external completion before closing work so that vendor execution stays controlled.
3. As a vendor user, I need a restricted portal showing only my assigned work and allowed attachments/comments so that I can complete work without access to unrelated internal data.

## 8. Detailed Product Requirements by Domain

### 8.1 Authentication and Session Requirements

The implementation must satisfy all requirements in `docs/prd.md` section `8.1` and `18.1`, including:

1. Invitation and first-login flows.
2. Email verification and password reset flows.
3. Password policy and password history enforcement.
4. Session storage and revocation.
5. Login failure handling and account lockout.
6. Security notification delivery.

### 8.2 Organization, Property, Location, User, Role, and Team Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.2`, `8.3`, and data model sections `11.2` through `11.7`, including:

1. Property configuration.
2. Hospitality location hierarchy.
3. Built-in roles plus custom role creation.
4. Property and location scope assignment.
5. Teams and team assignment.
6. Auditability of all access changes.

### 8.3 Dashboard Requirements

The implementation must satisfy all requirements in `docs/prd.md` section `8.4`, including:

1. KPI cards.
2. Charts.
3. Alert surfaces.
4. Quick actions.
5. Saved views or filters where applicable.
6. Scope-aware data aggregation.

### 8.4 Asset and Meter Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.5`, `11.9`, and `11.10`, including:

1. Asset categories, identifiers, and lifecycle states.
2. Asset hierarchies and relationships.
3. Warranty and service metadata.
4. Document and photo linkage.
5. Meter definitions and meter reading history.
6. Downtime and derived health metrics.

### 8.5 Request Intake Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.6`, `9.2`, and `11.11`, including:

1. Request channels.
2. Duplicate detection warnings.
3. Required and conditional fields.
4. Triage states.
5. Approval, rejection, cancellation, and conversion rules.
6. SLA start behavior.

### 8.6 Work Order Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.7`, `9.3`, `9.4`, and `11.12`, including:

1. Work-order numbering.
2. Work types, priorities, severities, guest-impact values, and statuses.
3. Assignment, scheduling, and dependency management.
4. Tasks, checklists, comments, attachments, labor, parts, cost, and downtime.
5. Completion, verification, reopen, cancel, and merge behavior.
6. SLA and escalation behavior.

### 8.7 Preventive Maintenance Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.8`, `9.5`, and `11.13`, including:

1. Time, meter, seasonal, and hybrid triggers.
2. Generation lead time and blackout handling.
3. Forecast and calendar behavior.
4. Missed, deferred, skipped, paused, and completed occurrence rules.
5. PM effectiveness reporting inputs.

### 8.8 Inspection and Checklist Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.9`, `9.6`, and `11.14`, including:

1. Template versions.
2. Required step completion.
3. Conditional steps.
4. Step types and failure behavior.
5. Signoff and evidence capture.

### 8.9 Inventory Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.10`, `9.7`, `11.15`, `11.16`, and `11.17`, including:

1. Part master records.
2. Inventory lines.
3. Inventory transactions.
4. Reservation and issue to work orders.
5. Returns, transfers, adjustments, and cycle counts.
6. Low-stock behavior and critical stock controls.

### 8.10 Vendor Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.11`, `9.8`, and `11.18`, including:

1. Vendor profile maintenance.
2. Compliance document tracking.
3. Vendor portal restrictions.
4. Vendor completion and verification.
5. Vendor KPI capture.

### 8.11 Shared Platform Requirements

The implementation must satisfy all requirements in `docs/prd.md` sections `8.12` through `8.18`, `11.19` through `11.24`, and sections `14` through `17`, including:

1. Notifications and real-time updates.
2. Attachments and media.
3. Search and saved views.
4. Reporting and exports.
5. Audit logs.
6. Master data and custom fields.
7. CSV imports and historical migration flows.
8. Security, performance, concurrency, and observability rules.

## 9. Workflow Requirements

The following workflows are mandatory and must be fully implemented:

1. User invitation and first login.
2. Internal request submission and triage.
3. Request portal submission and triage.
4. Standard corrective work-order lifecycle.
5. Emergency work dispatch lifecycle.
6. PM generation and PM completion lifecycle.
7. Inspection failure to follow-up work lifecycle.
8. Inventory reservation, issue, return, and transfer lifecycle.
9. Vendor assignment and restricted vendor execution lifecycle.
10. Asset transfer and retirement lifecycle.
11. Import dry-run and import commit lifecycle.

Each workflow must include:

1. Trigger.
2. Actors.
3. Preconditions.
4. Main path.
5. Alternate paths.
6. Exception paths.
7. Validation rules.
8. Notifications.
9. Output artifacts.
10. Audit events.

## 10. UI and Interaction Requirements

### 10.1 Global UI requirements

The product UI must:

1. Follow a consistent application shell.
2. Be permission-aware.
3. Be responsive across mobile, tablet, and desktop.
4. Support keyboard navigation and accessible interaction patterns.
5. Use MUI v9 consistently.

### 10.2 Required responsive breakpoints and layout expectations

#### Mobile

Mobile behavior must prioritize:

1. Single-column layouts.
2. Stacked summary cards.
3. Compact navigation patterns.
4. Slide-in drawers for filters and secondary actions.
5. Detail screens that collapse tables into readable stacked layouts.

#### Tablet

Tablet behavior must prioritize:

1. Split layouts where beneficial.
2. Wider table configurations than mobile.
3. Persistent filter panes where space allows.
4. Higher information density than mobile without using full desktop complexity.

#### Desktop

Desktop behavior must prioritize:

1. Full dashboard density.
2. Side-by-side panels where operationally useful.
3. Wide data grids with configurable columns.
4. Multi-panel detail layouts for work orders, assets, inventory, and vendors.

### 10.3 Widget interaction requirements

The UI must define interaction behavior for:

1. KPI cards.
2. Charts.
3. Data-grid rows.
4. Filter chips.
5. Saved views.
6. Modals and drawers.
7. File upload zones.
8. Lightbox or preview viewers.
9. Dashboard quick actions.
10. Notification center items.

Behavior rules:

1. KPI cards must link to filtered destination screens.
2. Chart segments and bars must be clickable when they represent drilldown data.
3. Filter chips must be removable individually.
4. Saved views must persist columns, sort, and filters.
5. Widget states must include loading, empty, error, and permission-restricted states.

### 10.4 Route and screen coverage requirements

The implementation must provide all route and screen coverage described in `docs/prd.md` section `12.1`.

At minimum, the UI must provide:

1. Login and password flows.
2. Dashboard.
3. Requests list/create/detail.
4. Work orders list/create/detail.
5. PM list/calendar/detail.
6. Assets list/detail.
7. Locations list/tree/detail.
8. Organization settings and property settings.
9. Users, roles, and teams administration.
10. Parts list/detail and inventory history.
11. Vendors list/detail.
12. Notification center.
13. Reports hub.
14. Settings areas, including master data, numbering, SLA, business hours, holidays, and related operational configuration.
15. Imports.
16. Audit log.
17. Request portal.
18. Vendor portal.

## 11. Data and API Requirements

### 11.1 Data model coverage

All entities defined in `docs/prd.md` section `11` are mandatory and must be implemented with the full field sets, validation rules, relationships, indexes, and derived fields defined there.

### 11.2 API coverage

All API domains and endpoints defined in `docs/prd.md` section `13` are mandatory unless the phase plan explicitly sequences them later as dependent work. No required domain may be dropped.

### 11.3 Response and error requirements

1. List responses must support pagination.
2. Detail responses must return screen-ready authorized data.
3. Validation errors must be field-specific.
4. Conflict errors must use `409`.
5. Authorization failures must not leak unauthorized data.

## 12. Security, Quality, and Operational Requirements

### 12.1 Security requirements

The implementation must satisfy all security requirements in `docs/prd.md` section `16`, including:

1. Secure password storage.
2. JWT secret management.
3. Session revocation.
4. Input validation and sanitization.
5. Upload controls.
6. Scope-aware authorization.
7. Audit of security-sensitive actions.

### 12.2 Non-functional requirements

The implementation must satisfy all non-functional requirements in `docs/prd.md` section `15`, including:

1. Performance targets.
2. Reliability expectations.
3. Concurrency handling.
4. Observability requirements.
5. Maintainability constraints.
6. Browser support.
7. Scalability assumptions.

### 12.3 Edge-case coverage requirements

The implementation must satisfy all edge-case requirements in `docs/prd.md` section `17`. No listed edge case may be ignored because it appears uncommon.

## 13. Mock Data and Demo Data Requirements

1. Mock data must live under `backend/mock/*`.
2. Mock data injection must not begin before the full model layer is implemented.
3. Mock data injection must occur only after all primary models, constants, and baseline validation rules are complete.
4. Mock data must reflect realistic hospitality operations, including:
   - Multiple properties.
   - Room and public-area issues.
   - Assets and meters.
   - PM plans and PM occurrences.
   - Work requests and work orders.
   - Inventory lines and stock transactions.
   - Vendors and vendor work.
5. Mock data must use the same domain constants and schema rules as production data.

## 14. Acceptance Requirements

The implementation must meet all acceptance criteria in `docs/prd.md` section `18`.

Additionally:

1. Each feature phase must have traceable requirement coverage.
2. Each delivered screen must have matching route, UI behavior, backend API, and authorized data support.
3. No phase may be marked complete if its required files, flows, and acceptance requirements are incomplete.

## 15. Explicit Prohibitions

The following are prohibited:

1. AI features.
2. TypeScript introduction.
3. Billing or pricing features.
4. Testing-strategy sections as a substitute for implementation detail.
5. Direct controller reads from raw request containers.
6. `react-router-dom` usage in the client.
7. Non-tree-shakable MUI imports.
8. React Hook Form `watch()`.
9. Deprecated MUI Grid `item` usage instead of the `size` prop.
10. Hardcoded UI design-token values when theme values should be used.
11. PowerShell- or CMD-specific command syntax in implementation instructions.

## 16. Requirement Completion Checklist

The implementation is not complete unless all items below are true:

1. Required repository structure exists.
2. Backend constants single source of truth exists and is used.
3. Frontend constants single source of truth exists and is used.
4. Centralized frontend theme exists and is used.
5. All PRD functional modules are implemented.
6. All PRD workflows are implemented.
7. All PRD entities are implemented.
8. Required UI routes and screens exist.
9. Responsive mobile, tablet, and desktop behavior is defined and implemented.
10. Notifications, audit logs, reports, imports, and configuration are implemented.
11. Mock data exists only after the full model layer exists.
12. The delivery follows `docs/task-execution-protocol.md`.
