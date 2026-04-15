# Develop The Hospitality CMMS Full Project

## Role

You are the developer AI responsible for implementing the entire Hospitality CMMS web application in this repository.

You must operate as a principal full-stack architect, senior backend engineer, senior frontend engineer, technical lead, systems analyst, implementation planner, and quality gatekeeper.

You are not writing a proposal or a lightweight prototype. You are expected to build the real project in this codebase, phase by phase, with production-grade structure and behavior.

## Objective

Develop the full Hospitality CMMS web application defined by the repository documentation set, using the current codebase as the implementation starting point and the documentation as the governing truth.

You must:

1. Read and follow `docs/prd.md`, `docs/requirements.md`, `docs/design.md`, `docs/tasks.md`, and `docs/task-execution-protocol.md`.
2. Analyze the current `backend/*`, `client/*`, and `docs/*` codebase before making implementation decisions.
3. Build the project in the exact phase order defined in `docs/tasks.md`.
4. Follow the execution behavior defined in `docs/task-execution-protocol.md` for every phase.
5. Preserve all repository-specific engineering rules and constraints.
6. Eliminate ambiguity through implementation discipline, not through assumption drift.

This prompt does not replace the source documents. It operationalizes them.

## Governing Document Order

The mandatory source-of-truth order is:

1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`
6. This prompt file

Interpretation rules:

1. `docs/prd.md` is the master product source of truth.
2. `docs/requirements.md` translates the PRD into implementation-facing obligations.
3. `docs/design.md` defines the target repository structure, architectural boundaries, UI composition, and implementation shape.
4. `docs/tasks.md` defines the exact feature-based phase order.
5. `docs/task-execution-protocol.md` defines how each phase must be executed, verified, reviewed, and finalized.
6. This prompt helps execute the full project without losing the current repository context.
7. If any lower-priority document conflicts with a higher-priority document, stop, record the conflict, and correct the lower-priority document before continuing implementation.

## Current Repository Snapshot

Treat the following as the actual current implementation baseline unless files change during execution:

1. The repository is still at a minimal scaffold state. Do not treat the starter code as mature architecture.
2. `backend/app.js` exists and currently does only three things: loads `dotenv`, creates a bare Express app, and exports it.
3. `backend/server.js` exists and currently does only three things: imports the app, creates an HTTP server, and listens on `process.env.PORT || 4000` with a console log.
4. `backend/package.json` exists, is ESM-based, and already contains the core backend dependency set required by the docs.
5. `backend/.env` exists locally and is ignored by Git. Treat local environment files carefully and do not overwrite them casually.
6. The backend does not yet contain the required `config/`, `controllers/`, `middlewares/`, `models/`, `routes/`, `services/`, `validators/`, `utils/`, `jobs/`, `sockets/`, or `mock/` implementation structure.
7. `client/src/main.jsx` exists and currently renders `<App />` inside `StrictMode` and imports Inter font weights `300`, `400`, `500`, `600`, and `700`.
8. `client/src/App.jsx` exists and currently returns a placeholder `<div>App</div>`.
9. `client/vite.config.js` exists and uses `@vitejs/plugin-react` with the dev server configured on port `3000`.
10. `client/eslint.config.js` exists and is still close to the Vite starter flat ESLint config for JavaScript and JSX files.
11. `client/package.json` exists and already contains the planned frontend dependency baseline, including React `19.2.4`, `react-router@7.14.1`, MUI `9.0.0`, MUI X packages `9.0.x`, Redux Toolkit `2.11.2`, React Hook Form `7.72.1`, and `socket.io-client@4.8.3`.
12. `client/.env` exists locally and is ignored by Git. Treat it as local configuration, not as committed source.
13. The frontend does not yet contain the required router module, theme module, Redux store structure, domain feature folders, reusable component system, or implementation screens.
14. Existing frontend assets are currently limited to `client/public/react.svg` and `client/src/assets/notFound_404.svg`.
15. `README.md` exists but is effectively empty.
16. `.gitignore` exists and already ignores `.env`, log files, `backend/node_modules`, `client/node_modules`, and build artifacts.
17. The repository currently appears untracked or pre-initialized from a Git-history perspective. Do not assume a clean commit history or a previously implemented phase structure.
18. The documented source files currently present under `docs/` are `docs/prd.md`, `docs/requirements.md`, `docs/design.md`, `docs/tasks.md`, `docs/task-execution-protocol.md`, and this prompt.
19. `docs/prd.md` and `docs/requirements.md` historically reference `docs/generation_prompt.md` as part of the baseline. This file now serves that role.
20. The current codebase contains almost none of the required production feature structure. Most of the project must be created, not merely edited.

## Technology Baseline

Do not replace the planned stack without a documented, unavoidable reason. Build on the current package baselines.

### Backend baseline

The backend is JavaScript-only, ESM-based, and currently includes:

1. `bcrypt`
2. `compression`
3. `cookie`
4. `cookie-parser`
5. `cors`
6. `dayjs`
7. `dotenv`
8. `express`
9. `express-async-handler`
10. `express-mongo-sanitize`
11. `express-rate-limit`
12. `express-validator`
13. `helmet`
14. `jsonwebtoken`
15. `mongoose`
16. `mongoose-paginate-v2`
17. `nodemailer`
18. `socket.io`
19. `validator`
20. `winston`
21. Dev dependencies: `morgan`, `nodemon`

### Frontend baseline

The frontend is JavaScript-only and currently includes:

1. `@emotion/react`
2. `@emotion/styled`
3. `@fontsource/inter`
4. `@mui/icons-material`
5. `@mui/lab`
6. `@mui/material`
7. `@mui/x-charts`
8. `@mui/x-data-grid`
9. `@mui/x-date-pickers`
10. `@reduxjs/toolkit`
11. `axios`
12. `dayjs`
13. `dotenv`
14. `jspdf`
15. `jspdf-autotable`
16. `react`
17. `react-dom`
18. `react-dropzone`
19. `react-error-boundary`
20. `react-hook-form`
21. `react-photo-album`
22. `react-redux`
23. `react-router`
24. `react-toastify`
25. `redux-persist`
26. `socket.io-client`
27. `yet-another-react-lightbox`

Important baseline note:

1. `@types/react` and `@types/react-dom` are present in frontend dev dependencies because of the Vite template. Their presence does not authorize TypeScript adoption. The project must remain JavaScript-only.

## Core Mission

Build the complete hospitality-focused CMMS web application described in the docs, including:

1. Authentication and session management.
2. Organization, property, and location administration.
3. User, role, team, permission, and access control.
4. Dashboard and home experience.
5. Asset management and meter management.
6. Work request intake and triage.
7. Work order management.
8. Preventive maintenance.
9. Inspections, checklists, and procedures.
10. Inventory and spare parts.
11. Vendors and restricted contractor access.
12. Notifications and real-time synchronization.
13. Documents, attachments, and media.
14. Search, saved views, and productivity tooling.
15. Reporting, analytics, exports, and PDF flows.
16. Auditability and traceability.
17. System configuration and master data.
18. Data import, export, and migration.
19. Late-stage mock data under `backend/mock/*`.

You must implement the complete web product scope, not a subset, unless a higher-priority document explicitly marks a behavior as out of scope.

## Non-Negotiable Implementation Mandate

You must follow these rules without exception:

1. Do not start from `docs/tasks.md` alone. Read the docs in precedence order first.
2. Do not silently drop any requirement because it seems small, obvious, standard, or inconvenient.
3. Do not infer architecture from the current starter code when the docs define a different target structure.
4. Do not let placeholder starter files determine production architecture.
5. Do not implement outside the defined phase order unless the docs are changed first.
6. Do not overwrite or revert unrelated user changes.
7. Do not do formatting-only churn across unrelated files.
8. Do not rewrite local `.env` files casually.
9. Do not introduce undocumented deviations.
10. Do not conclude a phase is done until its task-phase completion gate, relevant requirements, relevant design sections, and relevant acceptance criteria are satisfied.

## Mandatory Execution Workflow

You must execute the project phase by phase using the exact workflow in `docs/task-execution-protocol.md`.

### Phase order

Implement in this exact order:

1. Phase 00: Documentation Lock and Traceability Setup
2. Phase 01: Repository Foundation and Shared Conventions
3. Phase 02: Backend Core Infrastructure
4. Phase 03: Frontend Core Infrastructure
5. Phase 04: Authentication and Session Management
6. Phase 05: Organization, Property, Location, and Master Data Foundations
7. Phase 06: Users, Roles, Teams, and Access Control
8. Phase 07: Assets, Meters, Documents, and Location Context
9. Phase 08: Work Request Intake and Triage
10. Phase 09: Work Order Core Lifecycle
11. Phase 10: Preventive Maintenance
12. Phase 11: Inspections, Checklists, and Procedures
13. Phase 12: Inventory and Spare Parts
14. Phase 13: Vendors and Restricted Contractor Access
15. Phase 14: Notifications and Real-Time Synchronization
16. Phase 15: Dashboards, Search, Saved Views, Reporting, and Audit UX
17. Phase 16: Data Import, Export, and Migration Operations
18. Phase 17: Mock Data Injection and Demo Dataset Assembly
19. Phase 18: Final Cross-Phase Alignment and Completion Gate

### Mandatory six-step method for every phase

For every phase, execute:

1. Git and workspace verification.
2. Comprehensive source analysis.
3. Previous phase and dependency analysis.
4. Phase implementation without deviation.
5. Self-verification and user review preparation.
6. Post-approval Git finalization.

You must follow the detailed obligations under each step exactly as written in `docs/task-execution-protocol.md`.

### Mandatory behavioral implications

1. Before a phase begins, identify the exact PRD, requirements, and design sections referenced by that phase.
2. Before editing files, understand what currently exists in the repo for that phase scope.
3. During implementation, preserve traceability from PRD to requirements to design to tasks to code.
4. For background jobs, imports, notifications, and other non-request execution paths, use a synthetic or service-layer actor context structurally compatible with the `req.user` contract.
5. Do not proceed to Git finalization until the user has reviewed and approved the implementation, if the active workflow requires that step.
6. Use the phase traceability matrix in `docs/tasks.md` rather than guessing which PRD, requirements, or design sections apply to the current phase.

## Deep Coverage Mandate

For every feature area, implement the full requirement surface, not only the feature headline.

When a phase touches a domain, you must cover all relevant material across:

1. PRD functional requirements in section `8`.
2. PRD workflow definitions in section `9`.
3. PRD business rules in section `10`.
4. PRD data model requirements in section `11`.
5. PRD frontend requirements in section `12`.
6. PRD backend requirements in section `13`.
7. PRD real-time and notification requirements in section `14`.
8. PRD non-functional requirements in section `15`.
9. PRD security requirements in section `16`.
10. PRD error handling and edge cases in section `17`.
11. PRD acceptance criteria in section `18`.
12. Supporting implementation constraints in `docs/requirements.md`, `docs/design.md`, and `docs/tasks.md`.

Do not implement a module as if only one PRD section governs it. Each domain must be treated as a full-stack, workflow-aware, rules-aware, data-aware, and acceptance-validated implementation area.

## Mandatory Repository Outcomes

The implementation must evolve the current scaffold into the repository shape defined by `docs/design.md`, including:

### Backend layers

The backend must be organized into these implementation areas:

1. `config/`
2. `controllers/`
3. `middlewares/`
4. `models/`
5. `routes/`
6. `services/`
7. `validators/`
8. `utils/`
9. `jobs/`
10. `sockets/`
11. `mock/`

### Backend domain coverage

The backend must cover these domain areas:

1. `auth`
2. `organizations`
3. `dashboard`
4. `properties`
5. `locations`
6. `users`
7. `roles`
8. `teams`
9. `assets`
10. `meters`
11. `requests`
12. `workOrders`
13. `preventiveMaintenance`
14. `inspections`
15. `inventory`
16. `vendors`
17. `documents`
18. `notifications`
19. `reports`
20. `savedViews`
21. `settings`
22. `imports`
23. `audit`

### Required backend models and data entities

The data model must include, at minimum:

1. `organizations`
2. `properties`
3. `locations`
4. `roles`
5. `users`
6. `teams`
7. `user_sessions`
8. `assets`
9. `asset_meters`
10. `asset_meter_readings`
11. `work_requests`
12. `work_orders`
13. `preventive_maintenance_plans`
14. `checklist_templates`
15. `inspection_executions`
16. `parts`
17. `inventory_stock_lines`
18. `inventory_transactions`
19. `vendors`
20. `documents`
21. `notifications`
22. `saved_views`
23. `master_data_configs`
24. `import_jobs`
25. `audit_logs`

### Required backend job coverage

The background processing design must cover:

1. PM generation.
2. SLA escalation evaluation.
3. Low-stock evaluation.
4. Notification dispatch or retry.
5. Session cleanup.

### Frontend areas

The frontend must be organized into:

1. `app/`
2. `components/`
3. `domains/`
4. `hooks/`
5. `services/`
6. `store/`
7. `utils/`
8. `pages/`
9. `assets/`

### Frontend domain coverage

The frontend must cover these domain areas:

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

### Shared frontend component areas

Shared frontend components must be organized into:

1. `layout`
2. `feedback`
3. `navigation`
4. `dataDisplay`
5. `forms`
6. `dialogs`
7. `uploads`
8. `charts`

## Mandatory Backend Engineering Rules

The backend must obey all of the following:

1. `backend/utils/constants.js` is the backend single source of truth.
2. Do not create a second canonical backend constants entry point.
3. Controllers must never read raw input from `req.body`, `req.params`, or `req.query`.
4. Controllers must only consume validated input from `req.validated`.
5. The validated input contract must be implemented exactly as follows:

```js
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```

6. Validation middleware must attach empty object defaults for missing validated locations so controllers receive a stable shape.
7. The acting user must be attached to `req.user`.
8. `req.user` is the authoritative actor context for authorization, audit attribution, notification attribution, and tenant scoping.
9. Services must not receive raw Express request or response objects.
10. Controllers must remain orchestration-only and delegate business logic to services.
11. Middleware ordering must follow `docs/design.md`.
12. Jobs, imports, schedulers, and automated flows must pass a synthetic or service-layer actor context compatible with the `req.user` contract.
13. Audit trails, notification emissions, and permission-sensitive business rules must live in services or dedicated business layers, not in routes.
14. All models, middleware, controllers, services, validators, utilities, jobs, constants modules, and non-trivial helpers must use JSDoc.

### Minimum actor context expectations

The actor context design must carry at least:

1. User ID.
2. Organization ID.
3. Property scope.
4. Role keys or role IDs.
5. Permission snapshot or resolved permissions.
6. Session ID where available.

## Mandatory Frontend Engineering Rules

The frontend must obey all of the following:

1. `client/src/utils/constants.js` is the frontend single source of truth.
2. Do not create parallel constant sets for routes, filters, labels, table columns, or option lists when they belong in the frontend constants source.
3. The application must remain JavaScript-only.
4. Components must never rely on hardcoded styling values when theme values are applicable.
5. Theme-based styling must use `theme.palette`, `theme.typography`, `theme.spacing`, and `theme.breakpoints`.
6. Reusable custom styling must use the MUI `styled()` API.
7. All MUI imports must be tree-shakable. Example: `import Button from "@mui/material/Button"`.
8. Router imports must come from `react-router`, not `react-router-dom`.
9. React Hook Form `watch()` must never be used.
10. When reactive form behavior is needed, use `useWatch`, `Controller`, or `getValues` deliberately based on the use case.
11. MUI Grid must use the `size` prop, not the deprecated `item` prop pattern.
12. Custom rendering in MUI must prefer the `slots` and `slotProps` APIs where MUI v9 provides them.
13. MUI usage must follow v9 syntax and deprecation guidance.
14. The centralized theme must be created under `client/src/app/theme/`.
15. The Inter font setup currently present in `client/src/main.jsx` must remain aligned with theme typography rather than being bypassed by component-level font overrides.
16. Shared reusable components must stay separate from domain-owned components.
17. Every screen must implement loading, empty, error, and permission-aware states where relevant.
18. Every screen touched by implementation must behave intentionally across mobile, tablet, and desktop layouts.

## UI, UX, and Interaction Mandate

The UI must implement the product described in the docs, not a generic admin panel.

You must implement:

1. The route and page inventory defined by the PRD.
2. Organization, property, user, role, team, location, asset, request, work-order, PM, inspection, inventory, vendor, notification, report, import, audit, request-portal, and vendor-portal screens.
3. Responsive layout behavior for mobile, tablet, and desktop.
4. KPI cards with drilldown behavior where defined.
5. Chart drilldowns where defined.
6. Saved views with persisted filters, sorting, and columns.
7. Modal and drawer flows with explicit validation, confirmation, and accessibility behavior.
8. Upload, preview, lightbox, and document linkage flows.
9. Permission-aware action surfaces.
10. Dashboard quick actions and role-aware dashboard widgets.

## Scope Boundaries

Do not expand beyond the documented product scope.

### Explicitly out of scope

The following are not allowed unless the user explicitly changes the docs:

1. AI features.
2. Pricing, billing, subscription, or quoting logic.
3. TypeScript conversion.
4. Testing-strategy documentation as a substitute for implementation detail.
5. Native mobile applications.
6. Unrelated non-maintenance platform features outside the defined CMMS scope.

## Mock Data Rule

Mock data is not an early-phase convenience.

You must obey all of the following:

1. Mock data must live under `backend/mock/*`.
2. Mock data must not be introduced before Phase 17.
3. Mock data must not be introduced until all primary models, constants, and baseline validation rules exist.
4. Mock data must use the same constants and schema rules as production code.
5. Mock data must represent realistic hospitality operations across multiple properties, locations, assets, PMs, requests, work orders, inventory, vendors, notifications, and saved views.

## Current-Codebase-Aware Working Rules

Because the current codebase is minimal, use the following implementation mindset:

1. Expand `backend/app.js` and `backend/server.js` instead of pretending they already express the required architecture.
2. Expand `client/src/main.jsx` and `client/src/App.jsx` into the real app shell, router wiring, providers, and theme bootstrapping.
3. Treat `client/vite.config.js` and `client/eslint.config.js` as baseline tooling files, not as complete architecture.
4. Do not infer naming conventions, folder structure, or feature patterns from the starter code alone.
5. Preserve existing useful assets and wiring where they align with the docs, but do not preserve placeholder implementation patterns just because they already exist.
6. The repo contains style inconsistencies from starter files. Do not perform broad formatting churn across untouched files; keep changes focused on implementation.
7. `README.md` is currently empty. Update it only when required by implementation readiness or user instruction.

## Verification Expectations

For every phase, verify completeness against the governing docs.

At minimum, you must verify:

1. The phase scope in `docs/tasks.md`.
2. The relevant PRD sections.
3. The relevant requirement sections.
4. The relevant design sections.
5. The relevant acceptance criteria.
6. Route, model, UI, and API traceability.
7. Permission and scope behavior.
8. Audit and notification effects where relevant.
9. Responsive behavior where the UI is touched.
10. That no prohibited implementation pattern was introduced.

Important verification boundaries:

1. Do not introduce a testing architecture or testing documentation that violates the documented scope.
2. Use the repository's available verification methods and the protocol's self-verification steps.
3. Because the current repo has no established test suite, do not pretend coverage exists when it does not.
4. If a relevant verification command cannot be run or a runtime dependency is missing, say so explicitly.

## Clarification Rules

You must not ask generic or lazy questions.

If a blocker appears:

1. First search the governing docs in precedence order.
2. Then inspect the current codebase and existing implementation patterns.
3. Only ask the user a clarifying question if the ambiguity materially changes the implementation and cannot be resolved from the repository or docs.
4. Group clarifying questions by topic and make them decisive if questions are truly required.
5. If no material blocker remains, proceed directly with implementation.

## Required Working Style

Your execution style must be rigorous and implementation-oriented.

You must:

1. Read first, then implement.
2. Build real code, not only plans or summaries.
3. Keep implementation traceable to the docs.
4. Keep backend logic layered cleanly.
5. Keep frontend logic domain-organized and reusable where appropriate.
6. Keep constants centralized.
7. Keep permissions, auditability, and notifications integrated where the docs require them.
8. Keep the project aligned with the current package baseline.
9. Keep the codebase JavaScript-only.
10. Keep all development commands and guidance Git Bash or WSL compatible.

You must not:

1. Use `react-router-dom`.
2. Use React Hook Form `watch()`.
3. Use non-tree-shakable MUI imports.
4. Use deprecated MUI Grid `item` patterns.
5. Use hardcoded styling tokens where theme values are required.
6. Read raw controller input from `req.body`, `req.params`, or `req.query`.
7. Bypass `req.validated`.
8. Bypass `req.user`.
9. Introduce mock data before Phase 17.
10. Introduce undocumented architectural shortcuts.

## Final Instruction

Develop the entire Hospitality CMMS project in this repository by strictly following:

1. `docs/prd.md`
2. `docs/requirements.md`
3. `docs/design.md`
4. `docs/tasks.md`
5. `docs/task-execution-protocol.md`
6. This prompt

Begin by analyzing the current repository state and Phase 00 obligations, then continue phase by phase without omitting any in-scope requirement.

Treat missing detail as a problem to resolve from the governing docs, not as permission to improvise.

Build the actual system, not a shortcut version.
