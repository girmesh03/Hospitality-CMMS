# Hospitality CMMS Design Specification

## 1. Design Purpose

This document defines how the system described in [prd.md](/mnt/e/1.Sapphire-work/1.Hospitality-CMMS/Hospitality-CMMS/docs/prd.md) and [requirements.md](/mnt/e/1.Sapphire-work/1.Hospitality-CMMS/Hospitality-CMMS/docs/requirements.md) must be designed in code, file structure, application architecture, UI composition, and implementation flow.

This document is implementation-facing. It is not a product brief. Its purpose is to remove ambiguity for developer AI.

## 2. Design Principles

### 2.1 Source-aligned design principles

1. The PRD remains the product source of truth.
2. The design must realize every required module and workflow without introducing architectural shortcuts that contradict the PRD.
3. The repository must stay JavaScript-only and ESM-based.
4. The implementation must optimize for clarity, traceability, and future feature scale.
5. Domain constants must live in dedicated constants sources of truth, not in scattered string literals.

### 2.2 Architectural design goals

1. Separate orchestration from business logic.
2. Keep backend services framework-light and reusable.
3. Keep frontend shared UI reusable while organizing feature logic by domain.
4. Ensure routes, APIs, models, and screens have clear one-to-one or one-to-many traceability.
5. Make responsive behavior explicit rather than incidental.

## 3. Target Repository Structure

### 3.1 Top-level structure

The repository must evolve into the following top-level structure:

```text
/
|-- backend/
|-- client/
|-- docs/
|-- README.md
|-- .gitignore
```

### 3.2 Target backend structure

The backend must be organized as follows:

```text
backend/
|-- app.js
|-- server.js
|-- package.json
|-- package-lock.json
|-- .env
|-- config/
|   |-- env.js
|   |-- database.js
|   |-- cors.js
|   |-- socket.js
|   |-- logger.js
|-- controllers/
|   |-- auth/
|   |-- organizations/
|   |-- dashboard/
|   |-- properties/
|   |-- locations/
|   |-- users/
|   |-- roles/
|   |-- teams/
|   |-- assets/
|   |-- meters/
|   |-- requests/
|   |-- workOrders/
|   |-- preventiveMaintenance/
|   |-- inspections/
|   |-- inventory/
|   |-- vendors/
|   |-- documents/
|   |-- notifications/
|   |-- reports/
|   |-- savedViews/
|   |-- settings/
|   |-- imports/
|   |-- audit/
|-- middlewares/
|   |-- auth/
|   |-- validation/
|   |-- security/
|   |-- error/
|   |-- request/
|-- models/
|   |-- organization.model.js
|   |-- property.model.js
|   |-- location.model.js
|   |-- role.model.js
|   |-- user.model.js
|   |-- team.model.js
|   |-- userSession.model.js
|   |-- asset.model.js
|   |-- assetMeter.model.js
|   |-- assetMeterReading.model.js
|   |-- workRequest.model.js
|   |-- workOrder.model.js
|   |-- preventiveMaintenancePlan.model.js
|   |-- checklistTemplate.model.js
|   |-- inspectionExecution.model.js
|   |-- part.model.js
|   |-- inventoryStockLine.model.js
|   |-- inventoryTransaction.model.js
|   |-- vendor.model.js
|   |-- document.model.js
|   |-- notification.model.js
|   |-- savedView.model.js
|   |-- masterDataConfig.model.js
|   |-- importJob.model.js
|   |-- auditLog.model.js
|-- routes/
|   |-- index.js
|   |-- auth.routes.js
|   |-- organizations.routes.js
|   |-- dashboard.routes.js
|   |-- properties.routes.js
|   |-- locations.routes.js
|   |-- roles.routes.js
|   |-- users.routes.js
|   |-- teams.routes.js
|   |-- assets.routes.js
|   |-- meters.routes.js
|   |-- requests.routes.js
|   |-- workOrders.routes.js
|   |-- pmPlans.routes.js
|   |-- checklists.routes.js
|   |-- inspections.routes.js
|   |-- parts.routes.js
|   |-- inventoryLines.routes.js
|   |-- inventoryTransactions.routes.js
|   |-- vendors.routes.js
|   |-- documents.routes.js
|   |-- notifications.routes.js
|   |-- reports.routes.js
|   |-- savedViews.routes.js
|   |-- settings.routes.js
|   |-- imports.routes.js
|   |-- auditLogs.routes.js
|-- services/
|   |-- auth/
|   |-- organizations/
|   |-- dashboard/
|   |-- properties/
|   |-- locations/
|   |-- users/
|   |-- roles/
|   |-- teams/
|   |-- assets/
|   |-- meters/
|   |-- requests/
|   |-- workOrders/
|   |-- preventiveMaintenance/
|   |-- inspections/
|   |-- inventory/
|   |-- vendors/
|   |-- documents/
|   |-- notifications/
|   |-- reports/
|   |-- savedViews/
|   |-- settings/
|   |-- imports/
|   |-- audit/
|-- validators/
|   |-- auth/
|   |-- organizations/
|   |-- dashboard/
|   |-- properties/
|   |-- locations/
|   |-- users/
|   |-- roles/
|   |-- teams/
|   |-- assets/
|   |-- meters/
|   |-- requests/
|   |-- workOrders/
|   |-- preventiveMaintenance/
|   |-- inspections/
|   |-- inventory/
|   |-- vendors/
|   |-- documents/
|   |-- notifications/
|   |-- reports/
|   |-- savedViews/
|   |-- settings/
|   |-- imports/
|   |-- audit/
|-- utils/
|   |-- constants.js
|   |-- http.js
|   |-- pagination.js
|   |-- query.js
|   |-- dates.js
|   |-- errors.js
|   |-- logger.js
|   |-- filenames.js
|-- jobs/
|   |-- pmGeneration.job.js
|   |-- slaEscalation.job.js
|   |-- lowStock.job.js
|   |-- notificationDispatch.job.js
|   |-- sessionCleanup.job.js
|-- sockets/
|   |-- index.js
|   |-- events.js
|-- mock/
|   |-- index.js
|   |-- organizations.mock.js
|   |-- properties.mock.js
|   |-- locations.mock.js
|   |-- roles.mock.js
|   |-- users.mock.js
|   |-- teams.mock.js
|   |-- assets.mock.js
|   |-- meters.mock.js
|   |-- documents.mock.js
|   |-- requests.mock.js
|   |-- workOrders.mock.js
|   |-- pmPlans.mock.js
|   |-- checklists.mock.js
|   |-- parts.mock.js
|   |-- inventory.mock.js
|   |-- vendors.mock.js
|   |-- notifications.mock.js
|   |-- savedViews.mock.js
|   |-- seed.js
```

### 3.3 Target frontend structure

The frontend must be organized as follows:

```text
client/
|-- package.json
|-- package-lock.json
|-- vite.config.js
|-- index.html
|-- public/
|-- src/
|   |-- main.jsx
|   |-- App.jsx
|   |-- app/
|   |   |-- router.jsx
|   |   |-- store.js
|   |   |-- providers.jsx
|   |   |-- theme/
|   |   |   |-- index.js
|   |   |   |-- palette.js
|   |   |   |-- typography.js
|   |   |   |-- spacing.js
|   |   |   |-- components.js
|   |-- assets/
|   |-- components/
|   |   |-- layout/
|   |   |-- feedback/
|   |   |-- navigation/
|   |   |-- dataDisplay/
|   |   |-- forms/
|   |   |-- dialogs/
|   |   |-- uploads/
|   |   |-- charts/
|   |-- domains/
|   |   |-- auth/
|   |   |-- organizations/
|   |   |-- dashboard/
|   |   |-- properties/
|   |   |-- users/
|   |   |-- roles/
|   |   |-- teams/
|   |   |-- requests/
|   |   |-- workOrders/
|   |   |-- preventiveMaintenance/
|   |   |-- assets/
|   |   |-- locations/
|   |   |-- inventory/
|   |   |-- vendors/
|   |   |-- notifications/
|   |   |-- reports/
|   |   |-- settings/
|   |   |-- imports/
|   |   |-- audit/
|   |   |-- portal/
|   |-- hooks/
|   |-- services/
|   |   |-- api/
|   |   |-- sockets/
|   |-- store/
|   |   |-- slices/
|   |   |-- selectors/
|   |-- utils/
|   |   |-- constants.js
|   |   |-- routes.js
|   |   |-- permissions.js
|   |   |-- formatting.js
|   |   |-- tables.js
|   |   |-- dates.js
|   |-- pages/
|   |   |-- auth/
|   |   |-- organizations/
|   |   |-- dashboard/
|   |   |-- properties/
|   |   |-- users/
|   |   |-- roles/
|   |   |-- teams/
|   |   |-- requests/
|   |   |-- workOrders/
|   |   |-- preventiveMaintenance/
|   |   |-- assets/
|   |   |-- locations/
|   |   |-- inventory/
|   |   |-- vendors/
|   |   |-- notifications/
|   |   |-- reports/
|   |   |-- settings/
|   |   |-- imports/
|   |   |-- audit/
|   |   |-- portal/
```

### 3.4 Documentation structure

The `docs/` directory must contain the full implementation flow:

1. `prd.md`
2. `requirements.md`
3. `design.md`
4. `tasks.md`
5. `task-execution-protocol.md`

## 4. Backend Design

### 4.1 Backend bootstrap design

`backend/server.js` responsibilities:

1. Load the app instance.
2. Create the HTTP server.
3. Bind the socket layer if enabled.
4. Start the server after environment and dependency initialization.

`backend/app.js` responsibilities:

1. Load environment configuration.
2. Build the Express app.
3. Register core middlewares.
4. Register routes under `/api/v1`.
5. Register 404 handling and error handling.

### 4.2 Middleware pipeline design

The backend middleware pipeline must be:

1. Environment bootstrap.
2. Request ID attachment.
3. Security headers.
4. CORS.
5. Compression.
6. Cookie parsing.
7. JSON parsing.
8. URL-encoded parsing where required.
9. Mongo sanitization.
10. Request logging.
11. Auth decoding where route scope requires it.
12. Authorization middleware where route scope requires it.
13. Validation middleware.
14. Validated-request normalization middleware attaching `req.validated`.
15. Controller execution.
16. Error translation middleware.

### 4.3 Request normalization design

The validated input contract is mandatory and must be realized as a dedicated middleware utility. The implementation must:

1. Run `express-validator` chains before normalization.
2. Evaluate validation results.
3. Reject invalid requests with structured error output.
4. Attach normalized validated input to `req.validated`.
5. Provide empty object defaults for missing locations.

Controller design rule:

1. Controllers may read `req.user`.
2. Controllers may read `req.validated`.
3. Controllers may not read raw `req.body`, `req.params`, or `req.query`.

### 4.4 Actor context design

The actor context must be designed as a stable object attached to `req.user` and reused by services and audit logging. The actor context must carry at minimum:

1. User ID.
2. Organization ID.
3. Property scope.
4. Role keys or role IDs.
5. Permission snapshot or equivalent resolved permissions.
6. Session ID where available.

### 4.5 Backend constants design

`backend/utils/constants.js` must export or aggregate all backend constants, including:

1. Role keys.
2. Permission keys.
3. Status enums.
4. Priority enums.
5. Severity enums.
6. Guest-impact enums.
7. Work-order type enums.
8. PM trigger enums.
9. Notification event names.
10. Audit action names.
11. Entity type names.
12. Route-independent business thresholds and labels.

The backend must not define a second canonical constants directory or duplicate canonical domain constants elsewhere. If internal constant fragments are ever split later for maintenance reasons, they must still be re-exported through `backend/utils/constants.js`, and that file remains the only approved import entry point for shared backend constants.

### 4.6 Backend service design

Each service domain must own business logic and coordinate:

1. Model reads and writes.
2. Validation beyond request-shape validation.
3. Permission-sensitive business rules.
4. Audit log creation.
5. Notification emission.
6. Transaction or multi-write coordination.

Services must be split by domain rather than by generic CRUD helper only.

### 4.7 Backend route and controller design

Each route file must:

1. Define endpoint paths.
2. Apply auth middleware.
3. Apply authorization middleware.
4. Apply validator chains.
5. Apply validated-request normalization.
6. Invoke a controller method.

Each controller file must:

1. Extract only `req.user` and `req.validated`.
2. Call one or more service methods.
3. Return normalized success responses.
4. Throw or pass structured errors to the centralized error layer.

### 4.8 Model design

Every model described in `docs/prd.md` section `11` must be implemented as a dedicated Mongoose model file with:

1. Full field set from the PRD.
2. Full enum validation from the PRD.
3. Required indexes from the PRD.
4. Shared audit and soft-delete fields where applicable.
5. JSDoc documenting purpose and field intent.

### 4.9 Background jobs design

The `backend/jobs/` area must isolate background tasks. At minimum:

1. PM generation job.
2. SLA escalation evaluator.
3. Low-stock alert job.
4. Notification dispatch or retry job.
5. Session cleanup job.

Jobs must call services rather than duplicating business rules.

### 4.10 Mock data design

The `backend/mock/` area must:

1. Mirror the domain model structure.
2. Use the same constants source of truth.
3. Produce realistic relationships across organizations, properties, locations, assets, work, PM, parts, vendors, and notifications.
4. Be introduced only after all primary models exist.

## 5. Frontend Design

### 5.1 Frontend app shell design

The app shell must include:

1. Global theme provider.
2. Router provider based on `react-router`.
3. Redux provider.
4. Persist gate or equivalent persisted state integration.
5. Toast provider.
6. Error boundary.

### 5.2 Frontend constants and routing design

`client/src/utils/constants.js` must contain frontend-shared constants, including:

1. Route keys.
2. Navigation section keys.
3. Filter keys.
4. Table column keys.
5. View mode keys.
6. UI option lists mirrored from backend domain enums where needed.

Additional helper modules may exist, but `client/src/utils/constants.js` remains the entry point single source of truth for frontend-shared constants.

### 5.3 Frontend theme design

The theme must be centralized under `client/src/app/theme/` and must define:

1. Palette tokens.
2. Typography tokens.
3. Spacing conventions.
4. Component overrides where needed.
5. Breakpoint usage.

Styling rules:

1. Reusable components use `styled()`.
2. Theme-driven styling uses `theme.palette`, `theme.typography`, `theme.spacing`, and `theme.breakpoints`.
3. Hardcoded token values are prohibited when theme values are available.

### 5.4 Frontend domain organization design

Feature logic must be domain-organized. Each domain folder should contain:

1. API calls or adapters.
2. Hooks.
3. Domain-specific components.
4. Local utilities if domain-specific.
5. Route/page composition helpers where needed.

Shared reusable components must not live inside domain folders unless they are strictly domain-specific.

The minimum frontend domain set is:

1. `auth`
2. `organizations`
3. `dashboard`
4. `properties`
5. `users`
6. `roles`
7. `teams`
8. `requests`
9. `workOrders`
10. `preventiveMaintenance`
11. `assets`
12. `locations`
13. `inventory`
14. `vendors`
15. `notifications`
16. `reports`
17. `settings`
18. `imports`
19. `audit`
20. `portal`

### 5.5 Reusable component design

Shared components must be organized by reuse type:

1. `layout/` for shells, section wrappers, page headers, side panels.
2. `feedback/` for empty states, loading states, error states, alert banners.
3. `navigation/` for menus, tabs, breadcrumbs, top bars, side nav.
4. `dataDisplay/` for cards, stat tiles, timeline items, key-value lists, data grids.
5. `forms/` for reusable field wrappers, RHF-integrated controls, filter bars.
6. `dialogs/` for confirmation dialogs and action drawers.
7. `uploads/` for file dropzones, preview lists, attachment tiles.
8. `charts/` for chart wrappers and chart legends.

### 5.6 Form design

Form architecture must use React Hook Form with these design rules:

1. No `watch()` usage.
2. Use `useWatch`, `Controller`, or `getValues` only when appropriate.
3. Use reusable form field wrappers for common patterns.
4. Keep validation messages consistent across the UI.
5. Surface server validation and conflict responses cleanly.

### 5.7 Data grid design

Data-grid usage must support:

1. Column visibility management.
2. Filter and sorting persistence.
3. Responsive adaptation on smaller screens.
4. Bulk selection and bulk actions where required.
5. Permission-aware action cells.

### 5.8 MUI v9 composition design

All MUI usage must:

1. Use tree-shakable imports.
2. Use the `size` prop for Grid.
3. Use the slots and `slotProps` APIs when customizing component internals.
4. Avoid deprecated v9 patterns and imports.

## 6. Route and Page Design

### 6.1 Route ownership

Each route from the PRD route map must map to:

1. One page entry component.
2. One or more domain hooks.
3. One or more API query or mutation helpers.
4. One permission model.
5. One set of loading, empty, and error states.

### 6.2 Screen families

Screen families are:

1. Auth screens.
2. Dashboard screens.
3. Operational list screens.
4. Detail screens.
5. Configuration screens.
6. Portal screens.

### 6.3 Shared screen composition pattern

List screens should follow:

1. Page header.
2. KPI strip if needed.
3. Filters and saved view controls.
4. Main data grid or list.
5. Secondary drawers or dialogs.

Detail screens should follow:

1. Header summary.
2. Primary action bar.
3. Key content tabs or panels.
4. Side metadata or activity panel on larger screens where appropriate.
5. Mobile stacked equivalents.

## 7. Responsive UI Design

### 7.1 Responsive strategy

The UI must be intentionally designed for three form factors:

1. Mobile first for constrained interaction flows.
2. Tablet intermediate density.
3. Desktop full operational density.

### 7.2 Dashboard responsiveness

Mobile:

1. KPI cards stack vertically.
2. Charts become full-width single-column sections.
3. Secondary widgets move below urgent widgets.

Tablet:

1. KPI cards may display in two or three columns.
2. Primary charts may sit side by side when legible.

Desktop:

1. KPI cards may display in four or more columns.
2. Dashboard widgets may use multi-column layouts based on role.

### 7.3 List-screen responsiveness

Mobile:

1. Filters move into drawers.
2. Dense tables transform to stacked rows or condensed key-value cards.
3. Bulk actions appear only when practical.

Tablet:

1. Tables retain more columns.
2. Filter rows may be partially inline.

Desktop:

1. Full table controls remain visible.
2. Secondary summaries and side-panels can coexist with primary content.

### 7.4 Detail-screen responsiveness

Mobile:

1. Detail sections stack vertically.
2. Secondary metadata is moved beneath primary action areas.
3. Drawer usage replaces side panels.

Tablet:

1. Two-column layouts may be used where readable.

Desktop:

1. Main content and side content may coexist.
2. Activity history may remain persistently visible where useful.

## 8. Widget and Interaction Design

### 8.1 KPI card design

Each KPI card must define:

1. Value.
2. Label.
3. Trend or status indicator if relevant.
4. Click behavior.
5. Loading state.
6. Empty state.
7. Permission-hidden state.

### 8.2 Chart design

Charts must define:

1. Series mapping.
2. Drilldown behavior.
3. Tooltip content.
4. Date range dependency.
5. Empty data behavior.

### 8.3 Data grid interaction design

Data grids must define:

1. Row click behavior.
2. Action-cell behavior.
3. Bulk selection behavior.
4. Export behavior.
5. Responsive column fallback behavior.

### 8.4 Modal and drawer design

Dialogs and drawers must define:

1. Trigger source.
2. Required fields.
3. Validation behavior.
4. Confirmation behavior.
5. Keyboard accessibility behavior.

### 8.5 Upload and preview design

Upload flows must define:

1. Allowed file types.
2. File-size limits.
3. Retry behavior.
4. Preview behavior.
5. Removal behavior.
6. Visibility and permission rules.

## 9. Domain-by-Domain Design Mapping

### 9.1 Identity and access domain

Backend components:

1. Auth routes.
2. Auth validators.
3. Auth controller.
4. Auth service.
5. Session model integration.

Frontend components:

1. Login page.
2. Forgot-password page.
3. Reset-password page.
4. Invite-acceptance page.
5. Profile and sessions page.

### 9.2 Administration domain

Backend components:

1. Organizations domain.
2. Properties domain.
3. Locations domain.
4. Roles domain.
5. Users domain.
6. Teams domain.
7. Settings domain.

Frontend components:

1. Organization settings pages.
2. Property settings pages.
3. Location tree/list/detail pages.
4. Users pages.
5. Roles pages.
6. Teams pages.
7. Master data pages.

### 9.3 Operations domains

Operations domains include:

1. Dashboard.
2. Assets.
3. Requests.
4. Work orders.
5. Preventive maintenance.
6. Inspections.
7. Inventory.
8. Vendors.
9. Reports.
10. Saved views.
11. Notifications.
12. Imports.
13. Audit.

Cross-domain support capabilities that must still have explicit architectural ownership include:

1. Meters.
2. Documents and media.
3. Saved views.

Each domain must have:

1. Backend route/controller/service/validator support or explicit shared-support ownership for cross-domain capabilities.
2. Frontend page coverage.
3. API client support.
4. Constants and permissions alignment.
5. Audit and notification integration where relevant.

## 10. API and Data Design

### 10.1 API design rules

1. API path structure must follow `docs/prd.md` section `13`.
2. Response envelopes must be consistent.
3. All list APIs must support pagination, filtering, and sorting where relevant.
4. All mutating APIs must return actionable post-mutation payloads.
5. All protected APIs must resolve authorization before returning data.

### 10.2 Data consistency design

1. Work-order cost fields are server-derived.
2. Inventory availability is server-derived.
3. Asset-derived snapshots are maintained server-side.
4. Audit entries are immutable and write-only from application flows.

### 10.3 Real-time design

Socket integration must:

1. Publish event names from a shared backend event constant source.
2. Expose a frontend socket service that subscribes by user scope.
3. Trigger targeted UI refreshes rather than brute-force full reloads.

## 11. Search, Reporting, Audit, and Import Design

### 11.1 Search design

Search must support:

1. Global search.
2. Module-specific search.
3. Search result typing.
4. Permission-based filtering of result types.

### 11.2 Reporting design

Reporting must define:

1. Report configuration keys.
2. Filter payload structure.
3. CSV export shape.
4. PDF export layout template.
5. Widget-to-report drilldown relationships.

### 11.3 Audit design

Audit display must support:

1. Entity-based filtering.
2. Actor-based filtering.
3. Date filtering.
4. Change summary display.
5. Restricted access to sensitive before/after payloads.

### 11.4 Import design

Import flows must support:

1. Upload.
2. Dry run.
3. Row-level validation report.
4. Commit.
5. Import job history.
6. Error-file download.

## 12. Mock Data Design

### 12.1 Mock data timing

Mock data design is a late-stage implementation artifact. It must not be built before:

1. All core models exist.
2. Constants sources of truth exist.
3. Domain validation rules exist.
4. Referential integrity rules are defined.

### 12.2 Mock data structure

The mock data layer must:

1. Use realistic hospitality naming and hierarchy.
2. Represent more than one property.
3. Include both guest-facing and BOH examples.
4. Include open and closed operational records.
5. Include inventory movements and vendor activity.

## 13. Design Traceability

Every implementation phase must be traceable to:

1. A PRD section.
2. A requirement section.
3. A design section.
4. A task phase.

No file or component should be introduced without a traceable reason.

## 14. Explicit Design Prohibitions

The following design choices are prohibited:

1. Backend business logic embedded directly in routes.
2. Controllers reading raw request containers.
3. Duplicated canonical enums across unrelated backend modules.
4. Frontend feature logic collapsed into a single `App.jsx`.
5. Shared components mixed indiscriminately with domain-specific components.
6. Hardcoded UI tokens in reusable components.
7. Non-tree-shakable MUI import patterns.
8. `react-router-dom` usage.
9. React Hook Form `watch()`.
10. Early mock-data injection before model completion.
