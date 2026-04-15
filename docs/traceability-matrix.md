# Hospitality CMMS Traceability Matrix

## Purpose

This artifact records the Phase 00 document-alignment decisions and preserves the top-level traceability path from PRD scope to requirements, design, and task phases.

Execution note:

1. Every implementation phase must still follow `docs/task-execution-protocol.md`.
2. Step 5 review is required at the end of each phase before any Step 6 Git finalization work proceeds.

## Phase 00 Normalization Decisions

| Decision area | Source basis | Locked outcome | Impacted phases |
| --- | --- | --- | --- |
| Notification delivery status | `docs/prd.md` `8.12` and `11.20` | `deliveryStatus` includes `queued`, `sent`, `delivered_if_known`, `failed`, and `read` | 14, 15, 18 |
| Organization API inventory | `docs/prd.md` `8.2`, `13.1`, `13.2` | Organization API coverage is `GET /organizations/current` and `PATCH /organizations/current` | 05, 18 |
| Saved-view API inventory | `docs/prd.md` `8.14`, `11.21`, `13.1`, `13.2` | Saved views are exposed through `/api/v1/saved-views` CRUD endpoints | 15, 18 |
| Admin route coverage | `docs/prd.md` `8.2`, `8.3`, `12.1`; `docs/requirements.md` `10.4` | Route map explicitly includes `/settings/organization` and `/settings/teams` | 05, 06, 18 |
| Backend package additions | `docs/prd.md` `1.1`, `13.8`, `19.2` | Add `multer`, `node-cron`, `csv-parse`, and `sharp` as the approved infrastructure additions | 02, 07, 10, 14, 16 |
| Attachment storage | `docs/prd.md` `8.13`, `11.19`, `19.2` | Use `multer` with a local-disk storage abstraction in the first implementation | 07, 13, 16 |
| Auth transport | `docs/prd.md` `8.1.3`, `8.1.4`, `16` | Access token lives in client memory only; refresh token uses an `httpOnly` cookie; mutating cookie-authenticated requests require CSRF protection | 02, 03, 04, 18 |
| Job topology | `docs/prd.md` `13.8`, `15.2`, `15.5` | Scheduled jobs run in-process with `node-cron` and are guarded by an environment flag such as `ENABLE_SCHEDULERS` | 02, 10, 12, 14, 16 |

## Top-Level Product Traceability

| PRD scope | Requirements mapping | Design mapping | Task phases | Implementation focus |
| --- | --- | --- | --- | --- |
| `1.4`, `13.5.1` to `13.5.4`, `15.6.2`, `18.12` | `3`, `4`, `5`, `11`, `12`, `15`, `16` | `2`, `3`, `4`, `5`, `13`, `14` | 00, 01, 02, 03, 18 | Repository conventions, constants policy, middleware contract, and cross-layer engineering rules |
| `8.1`, `9.1`, `11.8`, `18.1` | `6.1`, `8.1`, `11`, `12` | `4`, `5`, `9.1`, `10` | 04 | Identity, invitation, session lifecycle, and protected-route behavior |
| `8.2`, `8.3`, `8.17`, `11.2` to `11.7`, `11.22`, `18.1`, `18.11` | `6.2`, `6.3`, `8.2`, `11`, `12` | `3`, `4`, `5`, `6`, `9.2`, `10` | 05, 06 | Organizations, properties, locations, master data, roles, users, teams, and scoped access |
| `8.5`, `8.13`, `9.9`, `11.9`, `11.10`, `11.19`, `18.6` | `6.5`, `8.4`, `11`, `12` | `4`, `5`, `6`, `8`, `9.3`, `10` | 07 | Assets, meters, documents, transfer and retirement workflows, and asset history |
| `8.6`, `8.7`, `9.2`, `9.3`, `9.4`, `11.11`, `11.12`, `18.2`, `18.3` | `6.6`, `6.7`, `8.5`, `8.6`, `9`, `11`, `12` | `4`, `5`, `6`, `7`, `8`, `9.3`, `10` | 08, 09 | Request intake, triage, corrective work, emergency dispatch, lifecycle rules, and work execution UX |
| `8.8`, `8.9`, `9.5`, `9.6`, `11.13`, `11.14`, `18.4`, `18.5` | `6.8`, `6.9`, `8.7`, `8.8`, `9`, `11`, `12` | `4`, `5`, `6`, `7`, `8`, `9.3`, `10` | 10, 11 | Preventive maintenance, checklists, inspections, recurrence logic, and follow-up work generation |
| `8.10`, `8.11`, `9.7`, `9.8`, `11.15` to `11.18`, `18.7`, `18.8` | `6.10`, `6.11`, `8.9`, `8.10`, `9`, `11`, `12` | `4`, `5`, `6`, `7`, `8`, `9.3`, `10` | 12, 13 | Parts, inventory controls, vendor compliance, restricted vendor execution, and cost-linked operational flows |
| `8.4`, `8.12`, `8.14`, `8.15`, `8.16`, `11.20`, `11.21`, `11.24`, `14`, `18.9`, `18.10` | `6.4`, `6.12`, `8.3`, `8.11`, `10`, `11`, `12`, `14` | `5`, `6`, `7`, `8`, `9.3`, `10`, `11` | 14, 15 | Notifications, sockets, dashboards, search, saved views, reporting, exports, and audit UX |
| `8.18`, `9.10`, `11.23`, `18.11` | `6.12`, `8.11`, `9`, `11`, `12` | `4`, `5`, `10`, `11.4` | 16 | Imports, dry-run validation, commit flow, error artifacts, and historical migration support |
| `19.2`, `18.12` plus full model coverage | `13`, `14`, `16` | `12`, `13`, `14` | 17, 18 | Late-stage mock data, cross-phase reconciliation, and final completion gate |

## Artifact Expectations By Phase Family

| Phase family | Required artifact pattern |
| --- | --- |
| 00 to 03 | Documentation alignment, repository skeleton, constants entry points, app bootstrap, middleware pipeline, theme, router, providers, and shared primitives |
| 04 to 13 | Complete vertical slice per domain: models, validators, routes, controllers, services, APIs, pages, dialogs/drawers, and permission-aware states |
| 14 to 16 | Shared platform capabilities layered on top of operational domains, including real-time behavior, saved views, reports, audit, and imports |
| 17 to 18 | Mock-data assembly after model completion, then final cross-document and cross-repository verification |
