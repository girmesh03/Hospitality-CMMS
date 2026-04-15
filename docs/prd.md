# Hospitality CMMS PRD Based on UpKeep Maintenance Management

## 1. Document Control

| Item | Value |
| --- | --- |
| Title | Hospitality CMMS Web Application Product Requirements Document |
| Version | 1.0 |
| Status | Draft for implementation |
| Authoring approach | Official-source-grounded, implementation-first, hospitality-specific, AI-excluded, exhaustive by intent |
| Source basis | UpKeep official product and help-center content accessed on April 13, 2026, expanded into a hospitality-specific CMMS requirements set |
| Primary objective | Define all requirements necessary to build a production-grade hospitality maintenance-management platform for web use |
| Target stack context | Express + MongoDB + Mongoose backend; React + MUI frontend; JWT auth; Socket.IO real-time updates; Nodemailer email; jsPDF/PDF exports |
| Explicit exclusions | AI features, pricing/billing, subscription logic, licensing, TypeScript, testing strategy/tooling sections |

### 1.1 Assumptions

1. The product is a multi-tenant web application used by one or more hospitality organizations.
2. An organization may manage one property or many properties under a single account.
3. Each property operates in its own local timezone; all timestamps are stored in UTC and displayed in property-local time.
4. The initial implementation is web-only. Responsive mobile browser use is supported; native mobile applications are out of scope.
5. File attachments are required. One multipart upload package such as `multer` or an equivalent library will need to be added because file upload middleware is not present in the baseline package list.
6. Scheduled job execution is required for preventive maintenance generation, reminder emails, and SLA escalations. A scheduler package such as `node-cron` or an equivalent job mechanism will need to be added because scheduling is not present in the baseline package list.
7. CSV import is required. A CSV parsing library may need to be added if the team does not implement parsing manually.
8. Hospitality occupancy context is required for guest-room workflows. In version 1, occupancy and room-access states may be entered manually or imported by file; direct PMS integration is not required in scope.
9. Email is the only outbound message channel in scope. SMS, WhatsApp, and voice calling are out of scope.
10. The PRD treats maintenance management as the system of record for work intake, work execution, preventive maintenance, asset history, spare parts usage, vendor dispatch, and maintenance reporting.

### 1.2 Definitions

| Term | Definition |
| --- | --- |
| Organization | Top-level tenant entity that owns one or more hospitality properties |
| Property | An individual hotel, resort, club, serviced apartment, restaurant property, spa, or venue managed inside the platform |
| Location | A place within a property, such as a building, floor, wing, room, public space, kitchen, plant room, or bin location |
| Asset | A maintainable equipment item, system, component, fixture, or tracked facility element |
| Work Request | An intake record describing a maintenance issue that requires review, approval, rejection, or conversion into a work order |
| Work Order | An executable maintenance job record used to plan, assign, perform, and close work |
| PM Plan | A preventive maintenance plan that generates scheduled work orders |
| Inspection | A structured procedure or checklist execution used to assess condition, compliance, or readiness |
| Guest-impact issue | A maintenance issue that affects guest rooms, guest safety, guest comfort, guest-facing public areas, or service availability |
| Occupied-room restriction | A rule that limits when a work order may be performed in a guest room that is occupied, DND, VIP, or otherwise restricted |
| Service window | An allowed time range for work execution |
| Blackout window | A forbidden time range for planned work execution |
| Downtime event | A time-bounded event during which an asset, room, or area is partially or fully unavailable because of maintenance-related conditions |
| Inventory line | A stock record for a part at a specific storeroom and bin |
| Vendor | An external service company or supplier |
| Contractor | An external worker acting under a vendor or directly under a property agreement |
| SLA | Service level agreement timing policy used for response, start, and completion expectations |
| Master data | Configurable reference data such as categories, statuses, priorities, reasons, business hours, and custom field definitions |

### 1.3 Acronyms

| Acronym | Meaning |
| --- | --- |
| CMMS | Computerized Maintenance Management System |
| PM | Preventive Maintenance |
| SLA | Service Level Agreement |
| JWT | JSON Web Token |
| RBAC | Role-Based Access Control |
| UOM | Unit of Measure |
| QR | Quick Response code |
| CSV | Comma-Separated Values |
| PDF | Portable Document Format |
| MTTR | Mean Time To Repair |
| MTBF | Mean Time Between Failures |
| OOO | Out of Order |
| OOS | Out of Service |

### 1.4 Current Project Setup Baseline and Mandatory Repository Conventions

The PRD must be interpreted against the current repository baseline, not against an abstract future stack. As of this document revision, the implementation baseline is:

1. Documentation files: `docs/generation_prompt.md`, `docs/task-execution-protocol.md`, and `docs/prd.md`.
2. Backend entry points: `backend/server.js` and `backend/app.js`.
3. Frontend entry points: `client/src/main.jsx` and `client/src/App.jsx`.
4. Backend runtime: Node.js ESM with `express@5.2.1`, `mongoose@9.4.1`, `jsonwebtoken@9.0.3`, `express-validator@7.3.2`, and `socket.io@4.8.3`.
5. Frontend runtime: React `19.2.4`, Vite `8.0.4`, `react-router@7.14.1`, MUI core `9.0.0`, MUI X packages `9.0.x`, Redux Toolkit `2.11.2`, and React Hook Form `7.72.1`.
6. The repository currently does not yet contain `backend/utils/constants.js`, `client/src/utils/constants.js`, or a centralized frontend theme module. The PRD therefore defines them as mandatory foundational deliverables, not optional refactors.
7. The repository is JavaScript-only. All code standards in this PRD must be implemented in JavaScript with ESM syntax and comprehensive JSDoc coverage rather than by introducing TypeScript.

The following repository-wide conventions are mandatory:

1. All implementation work must follow `docs/task-execution-protocol.md`.
2. All shell commands used for development, documentation, onboarding notes, scripts, and task instructions must be Git Bash or WSL compatible.
3. CMD-specific and PowerShell-specific command syntax must not appear in the implementation guidance, setup guidance, or task procedures defined by this PRD.
4. `backend/utils/constants.js` must be the backend single source of truth for statuses, enums, labels, error codes, event names, permission keys, route-independent domain constants, and other shared backend constants.
5. `client/src/utils/constants.js` must be the frontend single source of truth for client-consumed enums, labels, route keys, filter keys, table column keys, UI option sets, and other shared frontend constants.
6. When a constant must exist in both layers, the backend canonical definition governs domain meaning and the frontend mirror must stay structurally aligned with the backend definition.

## 2. Executive Overview

### 2.1 Product Summary

The product is a hospitality-focused CMMS web application for managing maintenance requests, work orders, preventive maintenance, inspections, assets, spare parts, vendors, maintenance notifications, and maintenance reporting across one or many hospitality properties. The application is based on the breadth of UpKeep's maintenance-management feature set, but it is expanded for hospitality operations and excludes all AI capabilities.

### 2.2 Problem Statement

Hospitality maintenance teams must protect guest experience, room revenue, safety, and physical asset reliability while operating across 24/7 schedules, occupied rooms, quiet hours, public-area restrictions, brand standards, contractor access constraints, and multi-property reporting demands. Generic maintenance software often fails to model room access restrictions, guest-sensitive prioritization, operational blackout windows, property hierarchies, and hospitality-specific response expectations with enough precision for engineering operations.

### 2.3 Business Goals

1. Reduce time from issue reporting to dispatch.
2. Increase preventive maintenance compliance and reduce reactive breakdowns.
3. Improve maintenance visibility across corporate, regional, and property teams.
4. Reduce room and asset downtime that directly affects revenue or guest experience.
5. Improve spare parts availability and reduce stockout-driven delays.
6. Provide auditable maintenance history for assets, rooms, vendors, and properties.
7. Standardize maintenance operations across properties while preserving property-level configuration.

### 2.4 Operational Goals

1. Support rapid request intake from front office, housekeeping, engineering, food and beverage, spa, recreation, security, and event operations.
2. Support precise work scheduling around occupancy, guest sensitivity, event schedules, quiet hours, and restricted spaces.
3. Support technician assignment, team dispatch, vendor dispatch, and escalation management.
4. Support recurring room, public-area, plant, life-safety, kitchen, laundry, and seasonal maintenance programs.
5. Support full asset histories, meter readings, downtime tracking, and linked work.
6. Support storeroom stock control, work-order-driven parts consumption, and low-stock alerts.
7. Support dashboards and reports that matter to engineering leaders and operations leaders.

### 2.5 Why Hospitality-Specific CMMS Requirements Differ

1. Guest rooms produce revenue and cannot be treated like generic maintenance spaces.
2. Occupied rooms require access controls, preferred service windows, and coordination with front office and housekeeping.
3. Guest-facing public areas require rapid response and stricter noise, odor, cleanliness, and presentation standards.
4. Resorts and mixed-use properties often span multiple buildings, villas, pools, kitchens, clubs, and service areas across large campuses.
5. Seasonal properties require opening, closing, and weatherization programs.
6. Brand standards frequently require evidence capture, audit trails, prescribed procedures, and consistent KPI reporting across properties.
7. Engineering work often intersects with guest satisfaction, housekeeping readiness, room inventory status, and event operations.

### 2.6 Success Criteria

1. Request-to-first-assignment time for emergency issues is under 5 minutes for 95 percent of emergency requests.
2. PM compliance is at least 95 percent for active PM plans measured monthly.
3. Repeat corrective work within 30 days on the same asset or room decreases by at least 20 percent after adoption.
4. Guest-impact work orders are visible in real time to authorized stakeholders with status freshness under 60 seconds.
5. Inventory stockout events for defined critical spare parts are reduced by at least 30 percent.
6. Corporate and property users can generate property and cross-property KPI reports without manual spreadsheet consolidation.
7. All critical changes are auditable by actor, time, source, and changed fields.

### 2.7 Non-Goals

1. Guest messaging, guest mobile apps, or guest-facing service experience tools.
2. Subscription billing, contract pricing, license metering, or quote-to-cash features.
3. AI recommendations, AI copilots, AI summaries, predictive AI analytics, AI route optimization, or AI automations.
4. Full ERP, accounting, accounts payable, payroll, or invoice payment workflows.
5. Native mobile apps.
6. Full procurement suite beyond maintenance-linked vendor references and optional replenishment references.

## 3. Research Basis

### 3.1 Summary of UpKeep Research Findings

Official UpKeep product and help-center content reviewed on April 13, 2026 consistently presented a non-AI CMMS core composed of work requests, work order management, preventive maintenance, asset management, inspections and checklists, parts and inventory, reporting, user roles, location-based permissions, and external collaborator workflows. UpKeep's current high-level CMMS marketing also includes AI messaging. This PRD deliberately excludes those AI elements and retains the operational CMMS core only.

The research showed the following patterns:

1. Work management is centered on prioritized, assignable, trackable work orders with attachments, checklists, due dates, and status changes.
2. Request intake includes dedicated requesters and request portals, with approval and conversion steps before execution.
3. Preventive maintenance includes recurring schedules, meter-based triggers, and generated work orders.
4. Asset records are long-lived operational records with files, history, hierarchies, meters, and linked work.
5. Inventory is modeled as quantity-based parts with location-specific stock handling and work-order-linked consumption.
6. Permissions are role-based, customizable, and can be restricted by location or responsibility.
7. Reporting focuses on maintenance KPIs, backlog, costs, compliance, and asset reliability.
8. External service providers can be involved in restricted workflows.

### 3.2 Core Maintenance-Management Capabilities Identified

| Capability | UpKeep signal used as baseline | Hospitality interpretation used in this PRD |
| --- | --- | --- |
| Work order management | Official work-order product page and work-order help articles | Expanded to include guest-impact flags, room access rules, quiet-hour handling, verification rules, and cross-property rollups |
| Preventive maintenance | Official PM product page and PM overview help article | Expanded to include seasonal plans, guest-room service windows, blackout windows, and hospitality-specific occurrence handling |
| Asset management | Official asset-management page | Expanded to multi-building hospitality asset placement, room-linked asset context, downtime, warranties, and reliability metrics |
| Request intake | Request portal and request-approval help content | Expanded into property-specific intake channels, triage, duplicate detection, service windows, and guest-sensitive routing |
| Roles and permissions | User types, custom roles, and location-based permissions articles | Expanded into corporate/property/location scope, external contractor restrictions, and approval authority rules |
| Inventory and parts | Inventory quantity management articles and product positioning | Expanded into storeroom/bin stock control, work-order reservations, substitute parts, and critical-stock rules |
| Inspections and checklists | Checklist and inspection help content | Expanded into compliance evidence, conditional fields, room readiness checks, and follow-up issue creation |
| Reporting | Maintenance reporting product page | Expanded into hospitality KPIs such as room downtime, guest-impact backlog, and cross-property engineering visibility |

### 3.3 Hospitality-Specific Interpretation

This PRD intentionally extends beyond what is visible on a single vendor page in the following ways:

1. Location hierarchy is expanded from generic facility locations into hospitality-aware structures such as tower, villa cluster, guest room, suite, restaurant, ballroom, spa, laundry, pool plant, and service corridor.
2. Guest-sensitive work is treated as a first-class concept with flags, rules, and SLA behavior.
3. Room-access restrictions, blackout windows, and preferred service windows are explicit configuration objects instead of informal notes.
4. Maintenance KPIs include revenue-sensitive room availability and guest-experience-sensitive metrics.
5. Property, regional, and corporate views are explicitly separated by permissions and aggregation behavior.

### 3.4 Research Appendix

| URL | How it informed requirements |
| --- | --- |
| `https://upkeep.com/product/cmms-software/` | Confirmed the current breadth of UpKeep's CMMS positioning and non-AI core modules used as the baseline feature surface |
| `https://upkeep.com/work-order-software` | Informed work-order lifecycle, assignment, prioritization, and tracking expectations |
| `https://upkeep.com/product/preventive-maintenance/` | Informed PM scheduling, recurring work, and maintenance planning patterns |
| `https://upkeep.com/asset-management/` | Informed asset records, histories, hierarchies, files, and maintenance context |
| `https://upkeep.com/maintenance-reports` | Informed dashboard, analytics, and reporting expectations |
| `https://help.onupkeep.com/en/articles/108077-upkeep-s-user-types-roles-and-responsibilities-overview` | Informed the baseline role taxonomy and role-responsibility framing |
| `https://help.onupkeep.com/en/articles/6281944-how-to-create-custom-roles-for-upkeep-users` | Informed configurable RBAC requirements |
| `https://help.onupkeep.com/en/articles/6699722-location-based-permissions-for-users-in-upkeep` | Informed location-scoped access rules |
| `https://help.onupkeep.com/en/articles/1746936-how-to-create-manage-and-edit-work-orders` | Informed work-order fields, actions, and operational handling details |
| `https://help.onupkeep.com/en/articles/9621157-preventive-maintenance-section-overview` | Informed PM planning and PM section behavior |
| `https://help.onupkeep.com/en/articles/12158452-using-the-new-upkeep-request-portal` | Informed request-portal behavior and requester intake requirements |
| `https://help.onupkeep.com/en/articles/12325916-using-the-provider-portal-in-upkeep` | Informed external contractor access boundaries |
| `https://help.onupkeep.com/en/articles/13260846-use-required-tasks-in-checklists-and-work-orders` | Informed required checklist completion behavior |
| `https://help.onupkeep.com/en/articles/7988255-updating-quantities-across-your-inventory-lines` | Informed quantity adjustments, inventory-line logic, and stock transaction behavior |

## 4. Product Vision and Scope

### 4.1 In-Scope Domains

1. Authentication and session management.
2. Organization, property, and location hierarchy.
3. User, role, team, permission, and access control.
4. Dashboard and role-based home experience.
5. Asset and meter management.
6. Work request intake and triage.
7. Work order planning, assignment, execution, completion, verification, and closure.
8. Preventive maintenance plans, generation, and execution history.
9. Inspection templates, checklist templates, and procedure execution.
10. Inventory and spare-parts management.
11. Vendor and contractor management with restricted collaboration.
12. Notifications, comments, mentions, and real-time updates.
13. Documents, images, and attachment handling.
14. Search, filters, saved views, and bulk productivity operations.
15. Reporting, analytics, exports, and dashboard widgets.
16. Audit logging and traceability.
17. Master data, numbering rules, business hours, holidays, and SLA configuration.
18. Data import, migration, and export tooling.

### 4.2 Out-of-Scope Domains

1. AI features of any kind.
2. Subscription billing, contract billing, quote management, and price books.
3. Full procure-to-pay, invoice matching, or accounts payable.
4. Payroll and timekeeping for HR purposes.
5. Native mobile apps.
6. IoT sensor ingestion, BMS integration, and direct PLC connectivity in version 1.
7. Direct PMS, ERP, or finance integrations in version 1.
8. Capital planning, budgeting, and depreciation accounting beyond reference fields.
9. Guest messaging channels and guest service mobile apps.

### 4.3 MVP Scope and Later-Phase Scope

The document defines the production-grade target state. The following items are mandatory in the initial build because they are core to maintenance management: authentication, properties and locations, users and roles, work requests, work orders, PM, inspections, assets, inventory, vendors, documents, notifications, dashboards, reports, and audit logs.

Later-phase candidates that are intentionally not required for initial implementation are:

1. Direct PMS integration for occupancy and room status.
2. Direct ERP or procurement integrations.
3. Browser-native camera decoding for barcode scanning if keyboard wedge scanning and QR deep links are sufficient initially.
4. Browser push notifications beyond in-app real-time and email.

### 4.4 Boundary Decisions

1. The system is the source of truth for maintenance records, not for accounting or guest communications.
2. The system supports room status and room access context, but not full housekeeping or reservations workflows.
3. Inventory is maintenance-focused. Financial procurement is not the objective.
4. Vendor collaboration is limited to maintenance execution, status sharing, and evidence sharing.

## 5. Stakeholders and User Types

### 5.1 Ownership Model

1. The organization owns global configuration, corporate reporting, and master governance.
2. Each property owns its local work execution, local SLAs where allowed, local vendor roster where allowed, and local storeroom operations.
3. Corporate users may see and manage multiple properties based on scope.
4. Property users may act only within explicitly assigned properties and locations.

### 5.2 Personas

| Persona | Responsibilities | Goals | Pain points | Permission implications |
| --- | --- | --- | --- | --- |
| Corporate Administrator | Owns platform setup, roles, properties, global settings | Standardize operations across the portfolio | Inconsistent property practices, missing data, weak auditability | Full org configuration, user admin, reporting, audit access |
| Corporate Engineering Director | Oversees engineering performance across properties | Reduce downtime, improve PM compliance | Limited cross-property visibility, no standard KPI set | Cross-property read plus approval and reporting rights |
| Property Engineering Manager / Chief Engineer | Runs engineering at one property | Dispatch work fast, keep rooms and assets available | Reactive firefighting, poor request quality, vendor delays | Full property work control, PM, asset, vendor, inventory, user-team management |
| Maintenance Supervisor / Planner | Reviews requests, assigns work, monitors backlog | Balance workload, hit SLA, manage parts readiness | Duplicate issues, poor scheduling visibility | Create/assign/edit work orders, manage schedules, approve routine requests |
| Technician | Executes assigned work | Clear instructions, quick parts access, easy updates | Missing information, duplicate jobs, unclear priority | View and update assigned work, labor, comments, checklist responses, part requests |
| Housekeeping / Front Office / F&B / Security Requester | Reports issues | Fast reporting and visibility | No status transparency, rework from unclear location descriptions | Create requests, view owned requests, add clarifications |
| Inventory Controller / Storekeeper | Maintains spare-part accuracy | Prevent stockouts and shrinkage | Inaccurate counts, undocumented issues, slow replenishment | Manage parts, stock lines, counts, transfers, adjustments |
| Vendor Coordinator | Dispatches third-party services | Get vendors on site with proper context | Missing documents, no compliance visibility | Manage vendors, assign vendor work, review vendor updates |
| External Vendor / Contractor User | Performs assigned external work | See only required jobs, upload evidence, mark progress | Too much irrelevant data, unclear access scope | Restricted portal visibility only for assigned work |
| General Manager / Operations Leader | Needs high-level visibility | Protect guest experience and room availability | No consolidated maintenance status | Read-only dashboards and reports |
| Auditor / Compliance Reviewer | Reviews history and compliance evidence | Verify process adherence | Missing timestamps, missing attachments | Read-only access to approved scopes, audit logs, reports |

### 5.3 Property-Level vs Corporate-Level Users

1. Corporate users can aggregate across assigned properties.
2. Property users cannot see other properties unless a role explicitly grants cross-property scope.
3. Cross-property work assignment is allowed only for users assigned to multiple properties.
4. Vendor users are always scope-limited to explicitly assigned work and properties.

## 6. Hospitality Operating Context

### 6.1 Supported Property Types

1. Hotels.
2. Resorts.
3. Serviced apartments.
4. Vacation clubs.
5. Spas and wellness facilities.
6. Hospitality restaurants and bars.
7. Event venues and banquet facilities.
8. Mixed-use hospitality campuses.

### 6.2 Location Context

The system must support hierarchical locations such as:

1. Property.
2. Building or tower.
3. Wing or villa cluster.
4. Floor.
5. Zone or department area.
6. Room, suite, villa, outlet, hall, public area, or plant room.
7. Sub-location such as bathroom, rooftop unit zone, panel room, kitchen line, or bin.

### 6.3 Guest-Sensitive Maintenance Scenarios

1. Occupied guest room with preferred service window.
2. DND room where non-emergency work must wait.
3. VIP room where supervisor approval is required before dispatch.
4. Public lobby or restaurant issue during operating hours requiring low-noise scheduling.
5. Event-space issue during setup or live event window.
6. Pool, spa, or life-safety issue requiring immediate escalation and visibility.
7. OOO or OOS room return-to-service workflow where maintenance status affects room inventory.

### 6.4 Occupied-Room Restrictions

1. Planned work in occupied rooms must require an access window, coordination owner, and guest-impact indicator.
2. Emergency work may bypass access-window checks, but the system must still record reason and impacted departments.
3. DND flag blocks non-emergency scheduling.
4. VIP flag requires supervisor acknowledgment before status changes to `assigned` or `scheduled`.
5. If a room status changes from unoccupied to occupied after scheduling but before execution, the assignee must see an updated warning before starting work.

### 6.5 Service Windows and Blackout Rules

1. Every property can define quiet hours.
2. Every property can define standard engineering service windows by area type.
3. Every location can override service windows when justified.
4. PM generation must respect blackout windows where configured.
5. Emergency work ignores blackout windows but records the override in the audit log.

### 6.6 Seasonal Operations

The system must support seasonal opening and closing activities including:

1. Seasonal PM plans.
2. Seasonal asset reactivation and shutdown checklists.
3. Temporary closure status for locations and properties.
4. Carry-forward of deferred PM items when a property reopens.

### 6.7 Brand Standards

1. Checklists and procedures must be versioned.
2. Evidence attachments must support compliance proof.
3. Corporate users must be able to enforce mandatory categories, priorities, and reason codes.
4. Reports must support cross-property comparisons using standardized definitions.

## 7. Functional Architecture

### 7.1 Module Map

| Module | Purpose | Key dependencies |
| --- | --- | --- |
| Identity and Access | Authenticates users and enforces scope | Users, roles, sessions, audit logs |
| Organization and Property Admin | Defines org, property, settings, numbering, holidays, SLAs | Identity, locations, master data |
| Location Management | Maintains the hospitality location tree | Properties, permissions, assets, work |
| Asset Management | Maintains asset records, history, and meters | Locations, work orders, PM, documents |
| Request Intake | Accepts and triages maintenance requests | Users, locations, assets, notifications |
| Work Orders | Executes corrective and planned work | Requests, assets, PM, inventory, vendors, notifications |
| Preventive Maintenance | Defines schedules and generates planned work | Assets, locations, checklists, work orders |
| Inspections and Checklists | Runs repeatable procedures and captures evidence | Work orders, PM, assets, locations |
| Inventory and Parts | Tracks stock and work-order-linked consumption | Work orders, vendors, reporting |
| Vendors and Contractors | Manages external service partners and restricted portals | Work orders, documents, notifications |
| Reporting and Dashboards | Surfaces KPIs, trends, and exports | All operational modules |
| Notifications and Real-Time | Delivers in-app, email, and socket updates | Work, requests, PM, vendor, users |
| Audit and Master Data | Records change history and controls reference data | All mutable modules |
| Import and Migration | Loads legacy and bulk master/transactional data | Properties, locations, assets, parts, users |

### 7.2 User Journeys

1. Staff member submits a room issue request -> supervisor triages -> work order assigned -> technician completes -> manager verifies room returned to service.
2. PM plan for guest-room HVAC generates work orders only during allowed service windows -> technician completes checklist -> asset history updates.
3. Public-area lighting failure triggers emergency work -> supervisor dispatches on-call technician -> real-time updates visible to operations leaders.
4. Part shortage blocks a repair -> inventory controller receives low-stock alert -> substitute part or transfer is issued -> work resumes.
5. External elevator contractor receives restricted portal access for assigned work only -> uploads completion evidence -> property manager verifies and closes.

### 7.3 Operational Dependencies Across Modules

1. Requests may convert to work orders.
2. Work orders may consume parts, create downtime events, and update asset history.
3. PM plans generate work orders.
4. Inspection failures may generate work requests or work orders.
5. Vendor assignments change notification recipients and visibility rules.
6. Location access rules affect scheduling eligibility.
7. Custom fields and master data influence validation rules across forms and APIs.

## 8. Detailed Functional Requirements

### 8.1 Authentication and Session Management

#### 8.1.1 Account model

1. Every authenticated user must have a unique email address within an organization.
2. A user may belong to multiple properties under one organization.
3. A user status must be one of: `invited`, `active`, `locked`, `disabled`, `archived`.

#### 8.1.2 Login behavior

1. Login requires email and password.
2. Login must reject archived and disabled users.
3. Login must verify organization scope and active property assignments before issuing a session.
4. Login must return current user profile, scoped permissions, property access list, and initial notification counts.

#### 8.1.3 Session and JWT behavior

1. Access token must be a short-lived JWT with a 15-minute expiration.
2. Refresh token must be an httpOnly cookie with rolling renewal and a default idle timeout of 12 hours.
3. An optional `remember me` flag may extend refresh-token lifetime up to 30 days absolute.
4. JWT claims must include at minimum: `sub`, `organizationId`, `sessionId`, `roleIds`, `propertyScope`, `permissionHash`, `iat`, `exp`.
5. Refresh-token sessions must be persisted server-side with user agent, IP, issued time, last activity time, revoked flag, and revocation reason.
6. Sensitive permission changes must invalidate all active sessions for the affected user.

#### 8.1.4 Cookie and security behavior

1. Refresh-token cookies must be `httpOnly`, `secure` in production, and `sameSite=lax` by default.
2. Access tokens must not be stored in localStorage.
3. Mutating requests must include an anti-CSRF header when cookie-authenticated endpoints are used.

#### 8.1.5 Password policy

1. Minimum length: 12 characters.
2. Maximum accepted length: 72 characters to remain compatible with bcrypt input handling.
3. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.
4. Must not contain the full email address.
5. Must not match the last 8 stored password hashes.

#### 8.1.6 Logout and forced logout

1. Standard logout revokes the current session.
2. `Logout all sessions` revokes all sessions for the user.
3. Admin disable, password reset completion, role change, property-scope removal, or suspicious login must force logout from all sessions.

#### 8.1.7 Password reset and verification

1. Forgot-password flow sends a one-time email link with a 60-minute expiration.
2. Reset tokens must be single use.
3. Invitation and email-change verification links must also be single use.
4. Email verification is mandatory for invited users before first successful login.

#### 8.1.8 Lockout rules and security notifications

1. Ten failed attempts in 15 minutes must lock the account for 30 minutes.
2. Rate limiting must apply per IP and per account identifier.
3. Security emails must be sent for password reset initiation, password change completion, account lockout, and new-device login when the device fingerprint differs materially.

### 8.2 Organization, Property, and Location Hierarchy

#### 8.2.1 Organization structure

1. An organization record must own all users, properties, roles, master data, and numbering rules.
2. Organization-level settings must include default timezone, default currency, default language, logo/branding, and default business rules.

#### 8.2.2 Property hierarchy

1. Each property must belong to exactly one organization.
2. Property types must include at minimum: `hotel`, `resort`, `serviced_apartment`, `club`, `spa`, `restaurant`, `event_venue`, `mixed_use`.
3. Property settings must include timezone, address, standard quiet hours, operational status, default service windows, and default SLA policies.

#### 8.2.3 Location model

1. Locations must support parent-child hierarchy with a maximum depth of 8 levels.
2. Default location types must include: `building`, `tower`, `wing`, `floor`, `zone`, `room`, `suite`, `villa`, `public_area`, `restaurant`, `kitchen`, `bar`, `ballroom`, `meeting_room`, `spa_area`, `pool_area`, `laundry`, `plant_room`, `electrical_room`, `mechanical_room`, `roof`, `parking`, `external_ground`, `storeroom`, `bin`.
3. Custom location types must be configurable by organization admins.
4. Each location must have a status of `active`, `inactive`, `under_renovation`, `temporarily_closed`, or `archived`.

#### 8.2.4 Room and guest-area context

1. Rooms and suites must support room number, room class, room operational status, guest-sensitivity flag, and access restriction flags.
2. Public areas must support guest-facing flag and service-window rules.
3. Engineering and BOH locations must support restricted-access flags and safety notes.

#### 8.2.5 Location-based permissions and filtering

1. Permissions must support scope by property and by selected location subtrees.
2. Users limited to a location subtree must only view and act on records linked to that subtree.
3. Corporate users may be granted unrestricted property-level visibility without location restriction.

### 8.3 User, Role, Permission, and Access Control

#### 8.3.1 Role model

Built-in baseline roles must include:

1. `organization_admin`
2. `corporate_engineering_director`
3. `property_admin`
4. `engineering_manager`
5. `maintenance_supervisor`
6. `technician`
7. `limited_technician`
8. `requester`
9. `inventory_controller`
10. `vendor_coordinator`
11. `vendor_user`
12. `report_viewer`
13. `auditor`

#### 8.3.2 Permission granularity

Permission domains must include:

1. Dashboard.
2. Properties and locations.
3. Users and roles.
4. Assets and meters.
5. Requests.
6. Work orders.
7. PM plans.
8. Inspections and checklists.
9. Inventory.
10. Vendors.
11. Documents.
12. Notifications.
13. Reports and exports.
14. Imports.
15. Settings and master data.
16. Audit logs.

Each domain must support granular actions such as:

1. `view_scope`
2. `view_all`
3. `create`
4. `edit_scope`
5. `edit_all`
6. `assign`
7. `approve`
8. `verify_close`
9. `cancel`
10. `reopen`
11. `delete`
12. `export`
13. `configure`

#### 8.3.3 Approval authority

1. Request approval requires `requests.approve`.
2. Work-order cancellation requires `work_orders.cancel`.
3. Work-order verification and closure override require `work_orders.verify_close`.
4. Inventory adjustments above configurable thresholds require `inventory.approve_adjustment`.
5. Vendor assignment for critical work requires `vendors.assign_critical` or equivalent admin rights.

#### 8.3.4 Auditability of access changes

1. Role assignment changes must create immutable audit events.
2. Property-scope changes must create immutable audit events.
3. Permission-set updates must record before and after values.
4. Forced logout from access changes must be recorded.

### 8.4 Dashboard and Home Experience

1. Dashboard content must be role-aware and scope-aware.
2. Corporate users must see multi-property rollups.
3. Property users must see property-specific operational cards.
4. Technicians must see assigned work, due work, and recently updated work.
5. Requesters must see their open requests and latest status changes.
6. Inventory controllers must see low stock, pending counts, and transfer needs.
7. Vendor coordinators must see vendor-assigned open work and compliance expirations.

Required KPI cards must include:

1. Open work orders.
2. Overdue work orders.
3. Emergency open work orders.
4. Guest-impact open work orders.
5. PM due today.
6. PM overdue.
7. Critical assets down.
8. Low-stock critical parts.
9. OOO/OOS room maintenance count.

Required charts must include:

1. Work orders by status.
2. Work orders by priority.
3. PM compliance trend.
4. Mean completion time by property.
5. Guest-impact incidents by area.
6. Top recurring asset failures.
7. Parts usage by category.

### 8.5 Asset Management

#### 8.5.1 Core asset record

Each asset must support:

1. System ID.
2. Human-readable asset code.
3. Name.
4. Category.
5. Subcategory.
6. Asset class.
7. Parent asset reference.
8. Property and location linkage.
9. Manufacturer.
10. Model.
11. Serial number.
12. Barcode or QR code value.
13. Lifecycle status.
14. Operational status.
15. Criticality.
16. Install date.
17. Purchase date.
18. Warranty start and end.
19. Useful life years.
20. Replacement cost reference.
21. Service contract reference.
22. Linked documents.
23. Linked photos.
24. Custom fields.

#### 8.5.2 Asset hierarchies and relationships

1. Parent-child relationships must be supported.
2. The system must support unlimited logical parent-child references, but the UI must support at least 8 displayed levels.
3. Assets may be linked to replacement successor assets.
4. Assets may be linked to related assets without parent-child hierarchy.

#### 8.5.3 Asset status lifecycle

Lifecycle status must be one of:

1. `planned`
2. `active`
3. `standby`
4. `out_of_service`
5. `under_repair`
6. `decommission_pending`
7. `retired`
8. `archived`

#### 8.5.4 Meter support

1. Assets may have zero or many meters.
2. Meter types must include `running_hours`, `cycles`, `distance`, `count`, `usage_hours`, and `custom_numeric`.
3. Meter readings may be entered manually or by import.
4. Decreasing readings must be blocked unless a rollover flag is enabled.
5. Meter history must be stored and auditable.

#### 8.5.5 Transfer, replacement, and retirement

1. Asset transfer must update location, property if allowed, and all downstream visibility.
2. Transfer between properties requires org-level permission and full audit capture.
3. Retiring an asset with open work orders or open PM-generated occurrences must be blocked unless those records are reassigned or closed.
4. Replacement workflow must allow linking a successor asset while preserving old history.

#### 8.5.6 Downtime and health indicators

1. Asset downtime events must be linkable to work orders.
2. Downtime must support planned and unplanned classification.
3. Derived non-AI health indicators must include: open WO count, overdue PM count, downtime hours in last 30 days, MTTR, MTBF, last failure date, last PM completion date.

#### 8.5.7 Search, import, export, and duplicate rules

1. Asset code must be unique within a property.
2. Duplicate serial number within the same property must raise a warning.
3. Bulk import must support create and update modes.
4. Export must include current filters and only authorized fields.

### 8.6 Work Request Intake

#### 8.6.1 Supported request channels

1. Authenticated internal web form.
2. Requester portal for limited requester users.
3. Property-specific or location-specific request portal links.
4. Manual dispatcher entry on behalf of a caller or radio request.
5. Inspection-generated request.

Anonymous public submission is not in scope for version 1.

#### 8.6.2 Required and optional fields

Required fields:

1. Property.
2. Location.
3. Title.
4. Description.
5. Category.
6. Requester identity or on-behalf-of contact.

Conditionally required fields:

1. Room number if location type is room-like.
2. Asset if the request is asset-specific and the reporter selects a known asset.
3. Guest-impact reason if `guestImpact=true`.
4. Emergency reason if `priorityRequested=emergency`.
5. Preferred service window if occupied-room flag is true.

Optional fields:

1. Photos.
2. Attachment documents.
3. Contact phone.
4. Access notes.
5. Floor/wing notes if location is broad.
6. Duplicate-related comment when a user overrides a duplicate warning.

#### 8.6.3 Request statuses

Request status must be one of:

1. `submitted`
2. `under_review`
3. `needs_clarification`
4. `approved`
5. `rejected`
6. `converted`
7. `cancelled`

#### 8.6.4 Triage and duplicate logic

1. Newly submitted requests start in `submitted`.
2. Triage users may move requests to `under_review` or `needs_clarification`.
3. Duplicate warning logic must check open requests and work orders in the same property using exact location, exact asset when present, and matching category/subcategory within a configurable time window.
4. Duplicate warnings must not silently merge records. Authorized users may explicitly merge or convert with reference.

#### 8.6.5 Conversion, rejection, and cancellation

1. Approved requests may be converted to one work order.
2. One request may spawn multiple work orders only if a supervisor explicitly uses a split action.
3. Rejection requires a rejection reason.
4. Requester cancellation requires a cancellation reason if the request is already under review.

#### 8.6.6 Notifications and SLA start

1. Submission triggers acknowledgment to the requester when an email exists.
2. Emergency requests trigger immediate notification to defined responders.
3. SLA timer starts at submission for emergency requests.
4. SLA timer starts at approval for non-emergency requests when an approval workflow is enabled.

### 8.7 Work Order Management

#### 8.7.1 Work order types and sources

Work order types must include:

1. `corrective`
2. `emergency`
3. `preventive`
4. `inspection_follow_up`
5. `planned_project`
6. `vendor_service`

Sources must include:

1. Manual creation.
2. Request conversion.
3. PM generation.
4. Inspection failure.
5. Duplicate split.
6. Import.

#### 8.7.2 Numbering scheme

1. Default format must be `WO-{PROPERTYCODE}-{YYYY}-{SEQUENCE}`.
2. Sequence must be property-scoped by default and reset yearly.
3. Sequence numbers must never be reused after deletion, cancellation, or archival.

#### 8.7.3 Priority, severity, and guest-impact

Priority values must be:

1. `emergency`
2. `urgent`
3. `high`
4. `medium`
5. `low`

Severity values must be:

1. `life_safety`
2. `guest_service_critical`
3. `operational_critical`
4. `standard`
5. `cosmetic`

Guest-impact values must be:

1. `none`
2. `low`
3. `moderate`
4. `high`
5. `revenue_blocking`

#### 8.7.4 Work order statuses

Statuses must include:

1. `draft`
2. `open`
3. `assigned`
4. `scheduled`
5. `in_progress`
6. `on_hold`
7. `awaiting_parts`
8. `awaiting_access`
9. `awaiting_vendor`
10. `completed_pending_verification`
11. `closed`
12. `cancelled`

#### 8.7.5 Assignment and dispatch

1. A work order may have one primary assignee.
2. A work order may have multiple additional assignees.
3. A work order may also be assigned to one team and one vendor.
4. Supervisor-only auto-assignment rules may be added later, but version 1 assignment is user-directed and rule-based, not AI-driven.

#### 8.7.6 Scheduling

1. Work orders may have planned start and planned end.
2. Work orders may have a preferred service window.
3. Occupied-room work cannot start outside the allowed service window unless the work is emergency.
4. Rescheduling requires a reason when the work order is already assigned or later.

#### 8.7.7 Tasks, checklists, labor, and parts

1. Work orders may contain subtasks.
2. Work orders may attach one or many checklist templates.
3. Required checklist tasks must be completed before closure unless an authorized user uses an override action with reason.
4. Labor entries must support manual entries and timer-based entries.
5. Only one active timer per user is allowed at a time.
6. Parts may be reserved, issued, returned, and marked as non-stock procurement reference.

#### 8.7.8 Comments, notes, and attachments

1. Comments must support internal visibility and vendor-visible visibility.
2. Work notes separate from comments may be maintained for structured fields such as cause and resolution.
3. Photos and documents must be attachable directly on the work order and on checklist line items when applicable.

#### 8.7.9 Completion, verification, and reopen

Closure requirements must include:

1. Status moved to `completed_pending_verification` or `closed`.
2. Completion summary.
3. Cause code.
4. Resolution code.
5. Labor summary.
6. Required checklist completion.
7. Asset downtime end time when applicable.

Verification is mandatory when:

1. The work is vendor-performed.
2. The work is guest-impact `high` or `revenue_blocking`.
3. The work order type or category is configured to require supervisor verification.

Reopen rules:

1. Closed work orders may be reopened by authorized users within a configurable window.
2. Reopening increments `reopenCount`.
3. Reopening preserves prior closure timestamps and adds a new active lifecycle segment.

#### 8.7.10 Cancellation and duplicate merge

1. Cancellation requires a cancellation reason.
2. Work orders with issued parts require a reversal or explicit write-off before cancellation.
3. Duplicate merge must preserve child audit history and redirect links to the surviving record.

#### 8.7.11 Cost, downtime, SLA, and guest communication

1. Labor cost must be captured using configured labor rates or zero-cost if rates are disabled.
2. Parts cost uses issue-time unit cost.
3. Vendor cost may be entered manually and flagged as estimated or actual.
4. Downtime start and end must be recorded for affected assets or rooms.
5. SLA clocks must track response due, start due, and completion due.
6. Guest communication flags must record whether front office, housekeeping, security, or outlet operations were informed.

#### 8.7.12 Bulk and export behavior

1. Bulk actions must include assign, change priority, change status where valid, change due date, add label, and export.
2. Printable work orders must include number, title, location, asset, priority, assignee, checklist summary, parts, labor, and notes.

### 8.8 Preventive Maintenance

#### 8.8.1 PM plan model

Each PM plan must support:

1. Plan number.
2. Title.
3. Status.
4. Plan type.
5. Scope target: asset, asset group, location, or location group.
6. Assigned team or default assignee.
7. Default priority.
8. Estimated labor hours.
9. Required checklist.
10. Planned parts kit.
11. Next trigger date or reading.
12. Lead-time generation window.
13. Blackout window handling.

#### 8.8.2 Supported PM trigger types

1. Time-based recurring.
2. Meter-based recurring.
3. Seasonal fixed-date.
4. Hybrid time-or-meter, whichever occurs first.

#### 8.8.3 Recurrence and generation rules

1. Time recurrence must support daily, weekly, monthly, quarterly, semiannual, annual, every-X-days, and nth-weekday rules.
2. Seasonal plans must support start month/day and end month/day context.
3. Generation lead time must be configurable in days.
4. PM generation must not create a duplicate open PM work order for the same plan and occurrence.
5. PM generation must respect property timezone.

#### 8.8.4 Missed, deferred, skipped, and paused behavior

1. A PM occurrence becomes `missed` when due date passes without acceptable completion or approved deferment.
2. Deferred PM requires defer reason, defer approver, and new target date.
3. Skipped PM requires skip reason and authorized user.
4. Pausing a PM plan stops future generation but does not delete history.

#### 8.8.5 Forecast, history, and effectiveness

1. Forecast views must support 30, 60, 90, and 365-day horizons.
2. Calendar view must show generated, upcoming, missed, deferred, and completed occurrences.
3. PM effectiveness metrics must include on-time completion rate, overdue rate, repeat-failure-after-PM rate, and PM-generated work share.

### 8.9 Inspections, Checklists, and Procedures

1. Templates must be reusable across work orders, PM plans, assets, and locations.
2. Step types must include `checkbox`, `pass_fail`, `numeric`, `short_text`, `long_text`, `single_select`, `multi_select`, `date`, `time`, `photo_required`, `signature_required`, and `meter_reading`.
3. Steps may be mandatory or optional.
4. Steps may contain conditional display logic based on prior answers.
5. A failed or out-of-range answer may auto-create a work request or work order when configured.
6. Procedures must be versioned. Existing in-flight work keeps the version attached at assignment time.
7. Digital signoff must capture signer, timestamp, and signature image or typed confirmation based on configuration.

### 8.10 Inventory and Spare Parts Management

#### 8.10.1 Part master

Each part must support:

1. Part number or SKU.
2. Name.
3. Description.
4. Category.
5. Stock type: `stock`, `non_stock`, `consumable`, `serialized_if_enabled`.
6. UOM.
7. Criticality.
8. Default cost.
9. Manufacturer.
10. Supplier reference.
11. Substitute parts.
12. Status.
13. Attachments and manuals.

#### 8.10.2 Inventory line behavior

1. Inventory must be tracked per property, storeroom, and bin.
2. Every stock line must maintain on-hand, reserved, available, and last-counted values.
3. Available quantity equals on-hand minus reserved.
4. Negative stock is blocked by default.
5. Authorized users may override negative stock only with a reason and audit event.

#### 8.10.3 Transaction types

Transaction types must include:

1. `initial_load`
2. `receipt`
3. `issue_to_work_order`
4. `return_from_work_order`
5. `adjustment_increase`
6. `adjustment_decrease`
7. `transfer_out`
8. `transfer_in`
9. `reservation`
10. `reservation_release`
11. `cycle_count_variance`

#### 8.10.4 Inventory controls

1. Min, max, reorder point, and reorder quantity must be configurable per inventory line.
2. Low-stock alerts trigger when available quantity is less than or equal to reorder point.
3. Cycle counts must support full and partial counts.
4. Transfers must require source and destination lines.
5. Returns from work orders must restore stock and reverse consumed cost if configured.

#### 8.10.5 Supplier linkage and replenishment boundary

1. Parts may link to preferred suppliers.
2. Restock recommendation and replenishment reference tracking are in scope.
3. Full purchase order approval, invoicing, and payment are out of scope.

### 8.11 Vendors and Contractors

1. Vendors must support company profile, contacts, service categories, covered properties, service regions, emergency contact method, insurance expiry, compliance documents, and status.
2. Contractor users must authenticate with restricted vendor-user permissions.
3. Vendor visibility must be limited to assigned work orders and explicitly shared attachments/comments.
4. Vendor completion does not auto-close the work order; internal verification may still be required.
5. Vendor performance metrics must include response time, completion time, recall rate, and overdue rate.

### 8.12 Notifications and Communications

1. Channels in scope are in-app notifications, real-time socket events, and email.
2. Trigger events must include new request, request approved/rejected, work order assigned, work order status changed, comment added, PM generated, PM overdue, vendor assigned, low stock, and compliance document expiry.
3. Users must manage preferences by event category and channel where allowed by role.
4. Quiet hours must suppress non-emergency emails until the next allowed send window.
5. Emergency events must bypass quiet hours.
6. Notification delivery status must track `queued`, `sent`, `delivered_if_known`, `failed`, and `read` where relevant.

### 8.13 Documents, Attachments, and Media

1. Supported file types must include `jpg`, `jpeg`, `png`, `webp`, `pdf`, `csv`, `txt`, `doc`, `docx`, `xls`, and `xlsx`.
2. Executable files are blocked.
3. Default maximum file size must be 25 MB per file.
4. Default maximum upload batch must be 20 files per action.
5. Images must preserve original upload and support thumbnails.
6. Attachments may link to properties, locations, assets, requests, work orders, PM plans, inspections, parts, and vendors.
7. Download permission must inherit parent-record permissions and attachment visibility rules.
8. Attachment categories must include `photo`, `manual`, `warranty`, `estimate`, `vendor_document`, `inspection_evidence`, `floor_plan`, `other`.

### 8.14 Search, Filters, Saved Views, and Productivity Tools

1. Global search must return matching requests, work orders, assets, locations, parts, vendors, and PM plans within the user's authorized scope.
2. Module-level search must support exact code search and broad text search.
3. Saved views must persist selected filters, sort order, and visible columns.
4. Users may pin favorite views.
5. Bulk actions must be permission-aware and reject mixed-scope selections when a user lacks rights for any selected row.
6. Keyboard focus shortcut for search and standard multi-select behavior are required.

### 8.15 Reporting, Analytics, and Exports

Required standard reports must include:

1. Open work order backlog.
2. Overdue work order backlog.
3. SLA attainment.
4. Response time and completion time trends.
5. PM compliance.
6. PM overdue detail.
7. Asset downtime summary.
8. Asset reliability summary.
9. Room maintenance downtime.
10. Guest-impact issue summary.
11. Parts consumption by category and property.
12. Low stock report.
13. Vendor performance report.
14. Labor utilization report.

Export formats in scope:

1. CSV.
2. PDF.

### 8.16 Auditability, Logs, and Traceability

1. Audit events must exist for create, update, delete, status change, assignment, approval, rejection, verification, export, login, logout, permission change, inventory transaction, file upload/delete, and import commit.
2. Field-level before/after capture is required for critical fields on users, roles, properties, locations, assets, requests, work orders, PM plans, parts, and vendor profiles.
3. Audit timestamps must be immutable and stored in UTC.
4. Actor identity must capture user ID, display name, role snapshot, session ID, and source channel where available.

### 8.17 System Configuration and Master Data

Configurable master data must include:

1. Request categories and subcategories.
2. Work-order categories and cause codes.
3. Resolution codes.
4. Priorities.
5. Status lists where organization-configurable.
6. Business hours.
7. Holiday calendars.
8. SLA policies.
9. Numbering rules.
10. Custom field definitions.
11. Vendor categories.
12. Part categories.
13. Failure codes.
14. Defer, skip, cancel, reject, and hold reasons.

### 8.18 Data Import, Export, and Migration

1. CSV import templates are required for properties, locations, assets, parts, users, vendors, PM plans, and historical work orders.
2. Every import must support a validation-only dry run before commit.
3. Import jobs must report row-level success, failure, warnings, and duplicate matches.
4. Imports must support strict mode and partial-accept mode.
5. Strict mode aborts the entire import on any fatal row error.
6. Partial-accept mode imports valid rows and rejects invalid rows with a downloadable error file.
7. Historical work import must preserve original created/completed timestamps where provided and clearly mark imported source data.

## 9. Detailed Workflow Definitions

### 9.1 User Invitation and First Login

- Trigger: Admin invites a new user.
- Actors: Admin, invited user, auth service.
- Preconditions: User record exists in `invited` status; email service operational.
- Main flow:
1. Admin creates user and assigns roles, properties, and optional location scopes.
2. System sends one-time invitation link.
3. User opens link, verifies email identity, sets password, accepts terms if configured, and completes login.
4. System creates first session and stores audit events.
- Alternate flows:
1. Admin resends invitation before expiration.
2. User changes password immediately after first login.
- Exception flows:
1. Expired invite requires resend.
2. Disabled user cannot complete activation.
- Validations: Unique email, valid role assignment, active property scope.
- Notifications: Invitation email, security notification for first password set.
- Outputs: Active user account, initial session.
- Downstream effects: User becomes eligible for notifications and assignment.
- Audit events: User created, invite sent, invite accepted, password set, session created.

### 9.2 Work Request Submission and Triage

- Trigger: Requester submits maintenance issue.
- Actors: Requester, triage supervisor, notification service.
- Preconditions: Requester has portal access or dispatcher rights; property and location are valid.
- Main flow:
1. Requester selects property and location and enters issue details.
2. System validates required fields and checks for duplicates.
3. Request is saved in `submitted`.
4. Triage users are notified.
5. Supervisor reviews request, may ask for clarification, approve, reject, or convert.
- Alternate flows:
1. Dispatcher submits request on behalf of a phone caller.
2. Emergency request bypasses normal review queue and raises immediate alert.
- Exception flows:
1. Duplicate warning presented; requester confirms or stops.
2. Invalid location or archived location blocks submission.
- Validations: Category allowed for property, access-window requirement for occupied room, contact details for portal requester.
- Notifications: Submission acknowledgement, triage alert, clarification request, approval/rejection notice.
- Outputs: Triage-ready request or converted work order.
- Downstream effects: SLA clocks start, dashboards update.
- Audit events: Request created, status changes, conversion, rejection, cancellation.

### 9.3 Standard Corrective Work Order Lifecycle

- Trigger: Supervisor creates or converts a work order.
- Actors: Supervisor, technician, requester, notification service.
- Preconditions: Valid property, location, category; assignee or team exists if assignment occurs.
- Main flow:
1. Work order is created with priority, scope, due expectations, and linked records.
2. Supervisor assigns technician/team and optionally schedules work.
3. Technician starts work, records labor, adds notes and attachments, uses parts, and completes checklist tasks.
4. Technician submits completion.
5. If verification required, supervisor verifies; otherwise work closes directly.
- Alternate flows:
1. Work pauses for parts, access, or vendor dependency.
2. Work is reassigned or rescheduled.
- Exception flows:
1. Required checklist task incomplete blocks completion.
2. No stock available for reserved part triggers exception.
3. Occupancy restriction prevents start.
- Validations: Allowed status transitions, assignee permission scope, mandatory close fields, cost and downtime consistency.
- Notifications: Assignment, reassignment, on-hold reason, completion, verification, closure.
- Outputs: Closed work history and updated asset/location records.
- Downstream effects: Asset history updated, inventory decremented, SLA results recorded, dashboards refreshed.
- Audit events: Create, assign, reschedule, status changes, part issue, completion, verification, close.

### 9.4 Emergency Work Order Dispatch

- Trigger: Emergency request or emergency work order creation.
- Actors: Requester, supervisor, on-call technician, operations viewers.
- Preconditions: Emergency priority selected with reason.
- Main flow:
1. Emergency record is created.
2. System immediately notifies on-call recipients.
3. Supervisor assigns responder.
4. Technician begins work; guest-impact and safety fields remain visible until closure.
- Alternate flows:
1. External vendor is assigned instead of internal responder.
- Exception flows:
1. No on-call technician configured; system escalates to property admin and corporate engineering recipient.
- Validations: Emergency reason mandatory, guest-impact or safety impact mandatory where applicable.
- Notifications: Real-time and email bypass quiet hours.
- Outputs: Active emergency work order with escalation trail.
- Downstream effects: Dashboard emergency counters update.
- Audit events: Emergency created, escalated, acknowledged, assigned, closed.

### 9.5 PM Generation and Completion

- Trigger: Scheduler reaches lead-time threshold or meter threshold.
- Actors: Scheduler, supervisor, technician.
- Preconditions: PM plan is active; target asset/location active; no duplicate open occurrence exists.
- Main flow:
1. Scheduler evaluates active PM plans.
2. Eligible occurrences are generated as work orders.
3. Work is assigned per plan defaults.
4. Technician completes checklist, labor, and required readings.
5. Completion updates last-completed date and recalculates next trigger.
- Alternate flows:
1. Occurrence deferred with approved reason.
2. Occurrence skipped with approved reason.
- Exception flows:
1. Asset retired or archived blocks generation and logs exception.
2. Blackout window delays generation or due date according to policy.
- Validations: Meter reading progression, occurrence uniqueness, checklist requirements.
- Notifications: New PM-generated work, overdue PM alerts, deferred PM alerts.
- Outputs: PM work order history and next due calculation.
- Downstream effects: Asset compliance metrics update.
- Audit events: Plan created/updated, occurrence generated, deferred, skipped, completed.

### 9.6 Inspection Failure to Follow-Up Work

- Trigger: Inspection answer fails or reading falls outside configured range.
- Actors: Inspector, supervisor, work-order system.
- Preconditions: Inspection template configured with failure behavior.
- Main flow:
1. Inspector executes checklist.
2. Failed step requires comment and photo if configured.
3. System creates linked request or work order per template behavior.
4. Linked record inherits property, location, asset, category, and evidence.
- Alternate flows:
1. Failure is informational only and does not create work.
- Exception flows:
1. Mandatory evidence missing blocks completion.
- Validations: Step-level requirement rules, threshold ranges, signoff requirements.
- Notifications: Supervisor alerted to generated follow-up work.
- Outputs: Completed inspection and linked follow-up record.
- Downstream effects: Compliance dashboards update.
- Audit events: Inspection started, failed result recorded, follow-up created.

### 9.7 Inventory Reservation, Issue, Return, and Transfer

- Trigger: Planner reserves part; technician issues or returns part; storekeeper performs transfer or count.
- Actors: Supervisor, technician, inventory controller.
- Preconditions: Part and inventory line exist; user has inventory rights.
- Main flow:
1. Planner reserves required quantity against a work order.
2. Storekeeper or technician issues quantity to the work order.
3. Work order consumes quantity and records cost.
4. Unused quantity may be returned.
5. Stock transfer moves quantity between lines.
- Alternate flows:
1. Substitute part used after authorized approval.
- Exception flows:
1. Insufficient stock blocks issue unless override permission exists.
2. Transfer destination missing blocks transfer.
- Validations: Non-negative stock, valid UOM, valid reason codes.
- Notifications: Low stock alert, critical stockout alert.
- Outputs: Updated line balances and transaction history.
- Downstream effects: Work cost updates, dashboards update.
- Audit events: Reservation, issue, return, transfer, adjustment, count reconciliation.

### 9.8 Vendor Work Assignment and Restricted Execution

- Trigger: Internal user assigns vendor to work order.
- Actors: Vendor coordinator, vendor user, verifier.
- Preconditions: Vendor active and compliant; work order assignable.
- Main flow:
1. Coordinator assigns vendor and shares allowed fields.
2. Vendor user views assigned work in restricted portal.
3. Vendor updates status, adds evidence, and marks ready for review.
4. Internal verifier reviews and closes or reopens.
- Alternate flows:
1. Vendor is allowed to upload estimate document before work starts.
- Exception flows:
1. Vendor insurance expired blocks new assignment.
- Validations: Scope restriction, compliance document validity, required evidence on completion.
- Notifications: Vendor assignment, vendor updates, ready-for-review alert.
- Outputs: Reviewed vendor-completed work.
- Downstream effects: Vendor KPI metrics update.
- Audit events: Vendor assigned, portal access used, vendor status updates, verification.

### 9.9 Asset Transfer and Retirement

- Trigger: Authorized manager transfers or retires an asset.
- Actors: Asset manager, supervisor, system.
- Preconditions: User has asset-admin permission; blocking open records resolved.
- Main flow:
1. User initiates transfer or retirement.
2. System checks open work and PM dependencies.
3. If no blockers remain, location or status updates are applied.
4. Asset history records transfer or retirement reason.
- Alternate flows:
1. Successor asset linked during retirement.
- Exception flows:
1. Open PM occurrence blocks retirement.
- Validations: Scope permissions, destination property status, successor link validity.
- Notifications: Stakeholders for affected asset receive notice if configured.
- Outputs: Updated asset state and history.
- Downstream effects: PM generation eligibility changes.
- Audit events: Transfer, retirement, replacement-link creation.

### 9.10 Import Job

- Trigger: Authorized user uploads import file.
- Actors: Import administrator, import service.
- Preconditions: Supported file type; selected template mapping.
- Main flow:
1. User uploads file and selects import type.
2. System validates file structure and row content.
3. User reviews validation result.
4. User commits import.
5. System writes rows and produces summary.
- Alternate flows:
1. User downloads error file and retries later.
- Exception flows:
1. Duplicate conflicts exceed chosen strategy and block commit.
- Validations: Required columns, enum values, reference existence, uniqueness rules.
- Notifications: Import completion email or in-app notice.
- Outputs: Import summary and created/updated records.
- Downstream effects: Audit logs and dashboards may update after commit.
- Audit events: File uploaded, validation run, import committed, import failed.

## 10. Business Rules

| ID | Rule |
| --- | --- |
| BR-001 | A user may only view data for properties and locations included in their scope. |
| BR-002 | Cross-property dashboard aggregation is available only when the user has multi-property scope. |
| BR-003 | Occupied-room work orders require a preferred service window unless priority is `emergency`. |
| BR-004 | DND room status blocks scheduled and in-progress transitions for non-emergency work. |
| BR-005 | VIP room status requires supervisor acknowledgment before dispatch. |
| BR-006 | Request rejection, cancellation, skip, defer, hold, and reopen actions always require a reason code. |
| BR-007 | Work-order completion requires mandatory closure fields and required checklist items. |
| BR-008 | Work orders in `awaiting_parts`, `awaiting_access`, or `awaiting_vendor` pause completion SLA unless the SLA policy explicitly forbids pause. |
| BR-009 | Emergency work cannot be suppressed by quiet hours. |
| BR-010 | Asset retirement is blocked when open work orders or active PM obligations still reference the asset. |
| BR-011 | Negative stock is blocked unless the acting user has explicit override permission. |
| BR-012 | Inventory adjustments beyond configured value or quantity thresholds require approval-capable permission. |
| BR-013 | Duplicate request detection warns but does not auto-merge. |
| BR-014 | Duplicate work-order merge preserves surviving record identity and redirects links from merged records. |
| BR-015 | Numbering sequences are immutable and non-reusable. |
| BR-016 | Audit logs are immutable after creation. |
| BR-017 | Soft deletion is allowed only for records with no dependent active operational links; otherwise records are archived instead. |
| BR-018 | Imported historical records must be clearly marked with source and import job reference. |
| BR-019 | PM generation must not create more than one open occurrence for the same plan occurrence key. |
| BR-020 | Meter readings must not regress unless a rollover configuration is active and the user provides a rollover reason. |
| BR-021 | Vendor users can view only work orders explicitly assigned to them and only attachments/comments marked vendor-visible. |
| BR-022 | Report exports must respect field-level and module-level permission rules. |
| BR-023 | Location status `archived` blocks creation of new requests or work orders at that location. |
| BR-024 | Property status `inactive` or `temporarily_closed` blocks new planned work generation unless an override is configured. |
| BR-025 | `completed_pending_verification` may transition only to `closed` or back to `open` through reopen/verification rejection. |
| BR-026 | A work order may have only one active primary assignee at a time. |
| BR-027 | Only one active timer may exist per user across all work orders. |
| BR-028 | Requesters may view only their own requests unless granted broader departmental visibility. |
| BR-029 | Guest-impact `revenue_blocking` automatically surfaces the work order on manager dashboards. |
| BR-030 | Overdue logic is computed from due timestamps and paused-clock rules, not from status labels alone. |

## 11. Data Model Requirements

### 11.1 Modeling Conventions

1. MongoDB collections must use ObjectId primary keys.
2. All timestamps are stored in UTC.
3. All mutable collections must include the following common fields unless explicitly exempted:

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `_id` | ObjectId | Yes | Primary key |
| `organizationId` | ObjectId | Usually | Omitted only where the collection itself is the organization root |
| `createdAt` | Date | Yes | UTC timestamp |
| `updatedAt` | Date | Yes | UTC timestamp |
| `createdByUserId` | ObjectId | No | Null when created by system or import with no user identity |
| `updatedByUserId` | ObjectId | No | Last editing user |
| `isDeleted` | Boolean | Yes | Soft-delete flag, default `false` |
| `deletedAt` | Date | No | Null unless soft deleted |
| `deletedByUserId` | ObjectId | No | Null unless deleted by a user |
| `archivedAt` | Date | No | Used when records should be hidden from operational views without deletion |
| `revision` | Number | Yes | Optimistic-concurrency counter, default `1` |

4. Enumerated fields must be validated at the API layer and Mongoose schema layer.
5. High-volume collections must use `mongoose-paginate-v2`.
6. Default pagination size is 25 rows, maximum size is 200 rows unless an export endpoint is used.
7. All list endpoints must support stable sorting using a tie-breaker on `_id`.

### 11.2 `organizations`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `code` | String | Yes | Unique, uppercase, 2 to 20 chars |
| `name` | String | Yes | Display name |
| `legalName` | String | No | Legal entity name |
| `defaultTimezone` | String | Yes | IANA timezone |
| `defaultCurrency` | String | Yes | ISO currency code |
| `defaultLanguage` | String | Yes | Locale code |
| `logoDocumentId` | ObjectId | No | Linked document |
| `branding` | Object | No | Colors, header title, support email |
| `status` | String | Yes | `active`, `inactive`, `archived` |
| `contactEmail` | String | No | Org support contact |
| `contactPhone` | String | No | Org support contact |
| `notes` | String | No | Internal admin notes |

Indexes:

1. Unique on `code`.
2. Index on `status`.

### 11.3 `properties`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `code` | String | Yes | Unique within organization |
| `name` | String | Yes | Property display name |
| `type` | String | Yes | Enum from supported property types |
| `brand` | String | No | Brand or flag |
| `timezone` | String | Yes | IANA timezone |
| `addressLine1` | String | No | Address |
| `addressLine2` | String | No | Address |
| `city` | String | No | Address |
| `stateProvince` | String | No | Address |
| `postalCode` | String | No | Address |
| `countryCode` | String | No | ISO country code |
| `latitude` | Number | No | Geolocation |
| `longitude` | Number | No | Geolocation |
| `operationalStatus` | String | Yes | `active`, `temporarily_closed`, `inactive`, `archived` |
| `quietHoursStart` | String | No | Local time `HH:mm` |
| `quietHoursEnd` | String | No | Local time `HH:mm` |
| `defaultBusinessHoursId` | ObjectId | No | Ref to config |
| `defaultHolidayCalendarId` | ObjectId | No | Ref to config |
| `defaultSlaPolicyId` | ObjectId | No | Ref to config |
| `roomCount` | Number | No | Informational only |
| `notes` | String | No | Internal notes |
| `tags` | [String] | No | Searchable labels |

Indexes:

1. Unique on `organizationId + code`.
2. Index on `operationalStatus`.
3. Index on `type`.

### 11.4 `locations`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `propertyId` | ObjectId | Yes | Parent property |
| `parentLocationId` | ObjectId | No | Null for top-level property child |
| `locationType` | String | Yes | Configured type enum |
| `code` | String | Yes | Unique within property |
| `name` | String | Yes | Display name |
| `alternateName` | String | No | Optional alias |
| `roomNumber` | String | No | For room-like spaces |
| `hierarchyPath` | [ObjectId] | Yes | Ordered ancestor path |
| `depth` | Number | Yes | 1 to 8 |
| `status` | String | Yes | `active`, `inactive`, `under_renovation`, `temporarily_closed`, `archived` |
| `guestSensitive` | Boolean | Yes | Default `false` |
| `restrictedAccess` | Boolean | Yes | Default `false` |
| `defaultServiceWindowStart` | String | No | `HH:mm` local |
| `defaultServiceWindowEnd` | String | No | `HH:mm` local |
| `blackoutWindows` | [Object] | No | Each object: name, day rules, start, end, reason |
| `accessNotes` | String | No | Access instructions |
| `tags` | [String] | No | Search/filter |
| `customFields` | Object | No | Property- or org-defined schema |

Indexes:

1. Unique on `propertyId + code`.
2. Index on `propertyId + parentLocationId`.
3. Index on `propertyId + locationType + status`.
4. Text index on `code`, `name`, `alternateName`, `roomNumber`.

### 11.5 `roles`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `key` | String | Yes | System-safe identifier |
| `name` | String | Yes | UI label |
| `description` | String | No | Human-readable explanation |
| `isSystemRole` | Boolean | Yes | Built-in or custom |
| `permissionMap` | Object | Yes | Domain-action boolean matrix |
| `scopeMode` | String | Yes | `organization`, `property`, `location_scoped`, `vendor_restricted` |
| `isActive` | Boolean | Yes | Default `true` |

Indexes:

1. Unique on `organizationId + key`.
2. Index on `isSystemRole`.

### 11.6 `users`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `email` | String | Yes | Lowercased, unique within org |
| `firstName` | String | Yes | User profile |
| `lastName` | String | Yes | User profile |
| `displayName` | String | Yes | UI display |
| `phone` | String | No | Contact |
| `jobTitle` | String | No | Optional |
| `employeeId` | String | No | Optional external ID |
| `status` | String | Yes | `invited`, `active`, `locked`, `disabled`, `archived` |
| `passwordHash` | String | No | Null until invite accepted |
| `emailVerifiedAt` | Date | No | Set when invite accepted or email change verified |
| `lastLoginAt` | Date | No | Updated on successful login |
| `passwordChangedAt` | Date | No | Security tracking |
| `roleIds` | [ObjectId] | Yes | One or many roles |
| `propertyScopeIds` | [ObjectId] | Yes | Assigned properties |
| `locationScopeIds` | [ObjectId] | No | Optional restrictions |
| `teamIds` | [ObjectId] | No | Assigned teams |
| `notificationPreferences` | Object | No | Event-category to channel preferences |
| `inviteSentAt` | Date | No | Activation tracking |
| `avatarDocumentId` | ObjectId | No | Optional avatar |

Indexes:

1. Unique on `organizationId + email`.
2. Index on `status`.
3. Index on `propertyScopeIds`.

### 11.7 `teams`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `propertyId` | ObjectId | Yes | Team belongs to one property |
| `name` | String | Yes | Team label |
| `description` | String | No | Optional |
| `leadUserId` | ObjectId | No | Team lead |
| `memberUserIds` | [ObjectId] | No | Team members |
| `skillTags` | [String] | No | Search and planning aid |
| `isActive` | Boolean | Yes | Default `true` |

Indexes:

1. Unique on `propertyId + name`.
2. Index on `leadUserId`.

### 11.8 `user_sessions`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `userId` | ObjectId | Yes | Owner |
| `sessionType` | String | Yes | `web` only in v1 |
| `refreshTokenHash` | String | Yes | Server-side revocation key |
| `ipAddress` | String | No | Captured on auth actions |
| `userAgent` | String | No | Browser signature |
| `deviceLabel` | String | No | Derived display name |
| `issuedAt` | Date | Yes | Session start |
| `lastActivityAt` | Date | Yes | Activity time |
| `expiresAt` | Date | Yes | Absolute expiry |
| `isRevoked` | Boolean | Yes | Default `false` |
| `revokedAt` | Date | No | When revoked |
| `revokedReason` | String | No | Logout, forced logout, role change, suspicious activity |

Indexes:

1. Index on `userId + isRevoked`.
2. Index on `expiresAt`.

### 11.9 `assets`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `propertyId` | ObjectId | Yes | Asset property |
| `locationId` | ObjectId | Yes | Current location |
| `parentAssetId` | ObjectId | No | Parent hierarchy |
| `replacementSuccessorAssetId` | ObjectId | No | Optional successor |
| `assetCode` | String | Yes | Unique within property |
| `name` | String | Yes | Asset name |
| `category` | String | Yes | Configured category |
| `subcategory` | String | No | Configured subcategory |
| `assetClass` | String | No | Optional higher-level grouping |
| `criticality` | String | Yes | `life_safety`, `guest_service_critical`, `business_critical`, `standard`, `low` |
| `lifecycleStatus` | String | Yes | From approved asset status set |
| `operationalStatus` | String | Yes | Day-to-day current condition |
| `manufacturer` | String | No | Optional |
| `model` | String | No | Optional |
| `serialNumber` | String | No | Optional |
| `barcodeValue` | String | No | Scan token |
| `qrCodeValue` | String | No | Scan token |
| `installDate` | Date | No | Optional |
| `purchaseDate` | Date | No | Optional |
| `warrantyStartDate` | Date | No | Optional |
| `warrantyEndDate` | Date | No | Optional |
| `usefulLifeYears` | Number | No | Reference only |
| `replacementCost` | Number | No | Reference only |
| `serviceContractReference` | String | No | Vendor or contract reference |
| `lastPmCompletedAt` | Date | No | Derived snapshot |
| `nextPmDueAt` | Date | No | Derived snapshot |
| `openWorkOrderCount` | Number | No | Derived snapshot |
| `documentIds` | [ObjectId] | No | Linked docs |
| `photoDocumentIds` | [ObjectId] | No | Linked images |
| `tags` | [String] | No | Search labels |
| `customFields` | Object | No | Configurable per org/property |

Indexes:

1. Unique on `propertyId + assetCode`.
2. Index on `propertyId + locationId`.
3. Index on `propertyId + category + criticality + lifecycleStatus`.
4. Text index on `assetCode`, `name`, `manufacturer`, `model`, `serialNumber`.

### 11.10 `asset_meters` and `asset_meter_readings`

`asset_meters`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `assetId` | ObjectId | Yes | Parent asset |
| `name` | String | Yes | Meter display name |
| `meterType` | String | Yes | Approved meter enum |
| `unitLabel` | String | Yes | `hours`, `cycles`, `count`, custom |
| `currentReading` | Number | Yes | Latest accepted reading |
| `rolloverEnabled` | Boolean | Yes | Default `false` |
| `isActive` | Boolean | Yes | Default `true` |

`asset_meter_readings`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `meterId` | ObjectId | Yes | Parent meter |
| `assetId` | ObjectId | Yes | Denormalized for queries |
| `readingValue` | Number | Yes | Reading amount |
| `readingAt` | Date | Yes | Effective timestamp |
| `enteredByUserId` | ObjectId | No | Null if import/system |
| `sourceType` | String | Yes | `manual`, `import`, `system_adjustment` |
| `note` | String | No | Optional |

Indexes:

1. Index on `assetId + meterId + readingAt desc`.

### 11.11 `work_requests`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `requestNumber` | String | Yes | Unique within property |
| `propertyId` | ObjectId | Yes | Request property |
| `locationId` | ObjectId | Yes | Request location |
| `assetId` | ObjectId | No | Optional asset |
| `channel` | String | Yes | `internal_form`, `request_portal`, `dispatcher`, `inspection` |
| `sourcePortalSlug` | String | No | For portal submissions |
| `requesterUserId` | ObjectId | No | If authenticated |
| `requesterName` | String | Yes | Preserve origin identity |
| `requesterEmail` | String | No | Optional contact |
| `requesterPhone` | String | No | Optional contact |
| `submittedOnBehalfOf` | String | No | Caller or department label |
| `title` | String | Yes | Short summary |
| `description` | String | Yes | Detailed issue |
| `category` | String | Yes | Configured category |
| `subcategory` | String | No | Configured subcategory |
| `priorityRequested` | String | Yes | Requested priority |
| `guestImpact` | String | Yes | Guest-impact enum |
| `occupiedRoomFlag` | Boolean | Yes | Context flag |
| `preferredServiceWindowStart` | String | No | Local time |
| `preferredServiceWindowEnd` | String | No | Local time |
| `accessNotes` | String | No | Entry instructions |
| `status` | String | Yes | Request status enum |
| `triageUserId` | ObjectId | No | Reviewing user |
| `triageNotes` | String | No | Review notes |
| `rejectionReason` | String | No | Required when rejected |
| `cancellationReason` | String | No | Required when cancelled |
| `convertedWorkOrderId` | ObjectId | No | Linked work order |
| `submittedAt` | Date | Yes | Creation time |
| `reviewedAt` | Date | No | First review time |
| `approvedAt` | Date | No | Approval time |
| `attachmentDocumentIds` | [ObjectId] | No | Linked documents |

Indexes:

1. Unique on `propertyId + requestNumber`.
2. Index on `propertyId + status + submittedAt`.
3. Index on `propertyId + locationId + category`.

### 11.12 `work_orders`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `workOrderNumber` | String | Yes | Unique within property |
| `propertyId` | ObjectId | Yes | Primary property |
| `locationId` | ObjectId | Yes | Primary location |
| `assetId` | ObjectId | No | Optional main asset |
| `type` | String | Yes | Work order type enum |
| `sourceType` | String | Yes | `manual`, `request`, `pm`, `inspection`, `import`, `split` |
| `sourceId` | ObjectId | No | Request/PM/inspection ref |
| `title` | String | Yes | Summary |
| `description` | String | Yes | Detailed work scope |
| `category` | String | Yes | Configured category |
| `subcategory` | String | No | Configured subcategory |
| `priority` | String | Yes | Priority enum |
| `severity` | String | Yes | Severity enum |
| `guestImpact` | String | Yes | Guest-impact enum |
| `status` | String | Yes | Work-order status enum |
| `statusReasonCode` | String | No | Hold, cancel, reopen, verify rejection reason |
| `requesterUserId` | ObjectId | No | Original requester if known |
| `primaryAssigneeUserId` | ObjectId | No | Single primary user |
| `secondaryAssigneeUserIds` | [ObjectId] | No | Additional assignees |
| `assignedTeamId` | ObjectId | No | Team |
| `assignedVendorId` | ObjectId | No | External vendor |
| `assignedAt` | Date | No | Assignment time |
| `plannedStartAt` | Date | No | Schedule |
| `plannedEndAt` | Date | No | Schedule |
| `actualStartAt` | Date | No | Execution |
| `actualEndAt` | Date | No | Execution |
| `dueAt` | Date | No | Business due date |
| `responseDueAt` | Date | No | SLA derived |
| `startDueAt` | Date | No | SLA derived |
| `completionDueAt` | Date | No | SLA derived |
| `slaPausedSegments` | [Object] | No | Each object: startAt, endAt, reasonCode |
| `occupiedRoomFlag` | Boolean | Yes | Context |
| `dndFlag` | Boolean | No | Snapshot at planning or start |
| `vipFlag` | Boolean | No | Snapshot at planning or start |
| `preferredServiceWindowStart` | String | No | Local time |
| `preferredServiceWindowEnd` | String | No | Local time |
| `guestCommunicationFlags` | Object | No | Booleans for front office, housekeeping, security, operations informed |
| `taskItems` | [Object] | No | Each object: title, status, required, completedAt, completedByUserId |
| `checklistExecutionIds` | [ObjectId] | No | Linked inspection/checklist executions |
| `laborEntries` | [Object] | No | Each object: userId, startedAt, endedAt, minutes, laborType, note, costRate, costAmount |
| `partUsageLines` | [Object] | No | Each object: partId, inventoryLineId, reservedQty, issuedQty, returnedQty, unitCost, totalCost |
| `costSummary` | Object | No | Labor cost, parts cost, vendor cost, total cost |
| `downtime` | Object | No | startAt, endAt, scopeType, scopeId, plannedFlag |
| `causeCode` | String | No | Required at completion |
| `resolutionCode` | String | No | Required at completion |
| `completionSummary` | String | No | Required at completion |
| `verificationRequired` | Boolean | Yes | Derived or configured |
| `verifiedByUserId` | ObjectId | No | Verifier |
| `verifiedAt` | Date | No | Verification time |
| `reopenCount` | Number | Yes | Default `0` |
| `cancellationReason` | String | No | Required if cancelled |
| `attachmentDocumentIds` | [ObjectId] | No | Linked docs |
| `tags` | [String] | No | Search labels |
| `customFields` | Object | No | Configurable |

Indexes:

1. Unique on `propertyId + workOrderNumber`.
2. Index on `propertyId + status + priority + dueAt`.
3. Index on `propertyId + primaryAssigneeUserId + status`.
4. Index on `propertyId + assignedTeamId + status`.
5. Index on `propertyId + assignedVendorId + status`.
6. Index on `propertyId + assetId + createdAt`.
7. Text index on `workOrderNumber`, `title`, `description`.

### 11.13 `preventive_maintenance_plans`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `planNumber` | String | Yes | Unique within property |
| `propertyId` | ObjectId | Yes | Owning property |
| `scopeType` | String | Yes | `asset`, `asset_group`, `location`, `location_group` |
| `targetAssetId` | ObjectId | No | When scopeType is asset |
| `targetLocationId` | ObjectId | No | When scopeType is location |
| `title` | String | Yes | Plan title |
| `status` | String | Yes | `draft`, `active`, `paused`, `archived` |
| `triggerType` | String | Yes | `time`, `meter`, `seasonal`, `hybrid` |
| `timeRule` | Object | No | Recurrence config |
| `meterRule` | Object | No | meterId, threshold, lead amount |
| `seasonRule` | Object | No | opening/closing dates or months |
| `priority` | String | Yes | Default generated priority |
| `defaultAssigneeUserId` | ObjectId | No | Optional |
| `defaultTeamId` | ObjectId | No | Optional |
| `estimatedLaborMinutes` | Number | No | Planning aid |
| `plannedPartKit` | [Object] | No | partId, plannedQty |
| `checklistTemplateId` | ObjectId | No | Required procedure |
| `leadTimeDays` | Number | Yes | Default generation lead time |
| `blackoutBehavior` | String | Yes | `delay`, `generate_anyway_with_warning`, `skip_with_flag` |
| `lastGeneratedAt` | Date | No | Scheduler history |
| `lastCompletedAt` | Date | No | History |
| `nextDueAt` | Date | No | Derived |
| `isVerificationRequired` | Boolean | Yes | Generated WO default |

Indexes:

1. Unique on `propertyId + planNumber`.
2. Index on `propertyId + status + nextDueAt`.
3. Index on `targetAssetId` and `targetLocationId`.

### 11.14 `checklist_templates` and `inspection_executions`

`checklist_templates`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `name` | String | Yes | Template title |
| `moduleContext` | String | Yes | `work_order`, `pm`, `inspection`, `asset`, `location` |
| `version` | Number | Yes | Starts at 1 |
| `status` | String | Yes | `draft`, `active`, `archived` |
| `steps` | [Object] | Yes | Each step contains label, type, required flag, options, range, conditional logic, failure action |
| `signoffRequired` | Boolean | Yes | Default `false` |

`inspection_executions`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `templateId` | ObjectId | Yes | Source template |
| `templateVersion` | Number | Yes | Frozen version |
| `contextType` | String | Yes | `work_order`, `pm`, `asset`, `location`, `standalone` |
| `contextId` | ObjectId | No | Linked record |
| `propertyId` | ObjectId | Yes | Property |
| `locationId` | ObjectId | No | Optional |
| `assetId` | ObjectId | No | Optional |
| `startedByUserId` | ObjectId | Yes | Actor |
| `startedAt` | Date | Yes | Start time |
| `completedAt` | Date | No | Completion time |
| `responses` | [Object] | Yes | StepId, answer, note, photoIds, failedFlag |
| `status` | String | Yes | `in_progress`, `completed`, `cancelled` |
| `generatedRequestIds` | [ObjectId] | No | Follow-up records |
| `generatedWorkOrderIds` | [ObjectId] | No | Follow-up records |
| `signoffByUserId` | ObjectId | No | Signoff actor |
| `signoffAt` | Date | No | Signoff time |

Indexes:

1. Index on `templateId + version`.
2. Index on `propertyId + status + completedAt`.

### 11.15 `parts`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `partNumber` | String | Yes | Unique within organization |
| `name` | String | Yes | Display name |
| `description` | String | No | Optional |
| `category` | String | Yes | Configured category |
| `stockType` | String | Yes | `stock`, `non_stock`, `consumable`, `serialized_if_enabled` |
| `uom` | String | Yes | Unit of measure |
| `criticality` | String | Yes | `critical`, `standard`, `low` |
| `defaultUnitCost` | Number | No | Cost reference |
| `manufacturer` | String | No | Optional |
| `preferredVendorId` | ObjectId | No | Optional |
| `substitutePartIds` | [ObjectId] | No | Alternatives |
| `status` | String | Yes | `active`, `restricted`, `obsolete`, `archived` |
| `documentIds` | [ObjectId] | No | Manuals/specs |
| `tags` | [String] | No | Search labels |

Indexes:

1. Unique on `organizationId + partNumber`.
2. Index on `status + category`.
3. Text index on `partNumber`, `name`, `description`.

### 11.16 `inventory_stock_lines`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `partId` | ObjectId | Yes | Parent part |
| `propertyId` | ObjectId | Yes | Property |
| `storeroomLocationId` | ObjectId | Yes | Storeroom location |
| `binLocationId` | ObjectId | No | Optional bin |
| `status` | String | Yes | `active`, `quarantine`, `archived` |
| `onHandQty` | Number | Yes | Physical units |
| `reservedQty` | Number | Yes | Allocated to work |
| `availableQty` | Number | Yes | Derived from on-hand minus reserved |
| `minQty` | Number | No | Min threshold |
| `maxQty` | Number | No | Max threshold |
| `reorderPoint` | Number | No | Alert threshold |
| `reorderQty` | Number | No | Recommendation |
| `unitCost` | Number | No | Current weighted or standard cost |
| `lastCountedAt` | Date | No | Inventory control |
| `lastTransactionAt` | Date | No | Activity timestamp |
| `notes` | String | No | Optional |

Indexes:

1. Unique on `partId + storeroomLocationId + binLocationId`.
2. Index on `propertyId + status`.
3. Index on `availableQty`.

### 11.17 `inventory_transactions`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `partId` | ObjectId | Yes | Part |
| `inventoryLineId` | ObjectId | Yes | Primary line |
| `transactionType` | String | Yes | Approved transaction enum |
| `quantity` | Number | Yes | Positive quantity |
| `unitCost` | Number | No | Snapshot cost |
| `totalCost` | Number | No | Derived |
| `sourceLineId` | ObjectId | No | For transfers |
| `destinationLineId` | ObjectId | No | For transfers |
| `relatedWorkOrderId` | ObjectId | No | For issues/returns |
| `reasonCode` | String | No | Adjustment or override reason |
| `performedByUserId` | ObjectId | No | Actor |
| `transactionAt` | Date | Yes | UTC timestamp |
| `note` | String | No | Optional |

Indexes:

1. Index on `inventoryLineId + transactionAt desc`.
2. Index on `relatedWorkOrderId`.

### 11.18 `vendors`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `vendorType` | String | Yes | `vendor`, `contractor`, `service_partner` |
| `companyName` | String | Yes | Display name |
| `status` | String | Yes | `active`, `probation`, `suspended`, `inactive` |
| `serviceCategories` | [String] | No | Work types handled |
| `propertyScopeIds` | [ObjectId] | No | Allowed properties |
| `serviceRegions` | [String] | No | Human-readable regional coverage |
| `primaryContactName` | String | No | Main contact |
| `primaryContactEmail` | String | No | Main contact |
| `primaryContactPhone` | String | No | Main contact |
| `afterHoursPhone` | String | No | Emergency contact |
| `insuranceExpiryDate` | Date | No | Compliance tracking |
| `complianceDocumentIds` | [ObjectId] | No | Linked certificates |
| `portalUserIds` | [ObjectId] | No | Restricted vendor users |
| `defaultResponseTargetMinutes` | Number | No | Operational expectation |
| `notes` | String | No | Internal notes |

Indexes:

1. Unique on `organizationId + companyName`.
2. Index on `status`.
3. Index on `insuranceExpiryDate`.

### 11.19 `documents`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `entityType` | String | Yes | Parent module name |
| `entityId` | ObjectId | Yes | Parent record ID |
| `category` | String | Yes | Attachment category |
| `fileName` | String | Yes | Original file name |
| `mimeType` | String | Yes | Validated MIME type |
| `sizeBytes` | Number | Yes | Stored size |
| `storageKey` | String | Yes | Filesystem or object-store path |
| `visibility` | String | Yes | `internal`, `vendor_visible` |
| `uploadedByUserId` | ObjectId | No | Uploader |
| `uploadedAt` | Date | Yes | Upload time |
| `checksum` | String | No | Integrity/reference |
| `thumbnailStorageKey` | String | No | For image previews |

Indexes:

1. Index on `entityType + entityId`.
2. Index on `uploadedAt`.

### 11.20 `notifications`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `recipientUserId` | ObjectId | Yes | User receiving notice |
| `eventType` | String | Yes | Notification event enum |
| `channel` | String | Yes | `in_app`, `email` |
| `entityType` | String | No | Linked entity type |
| `entityId` | ObjectId | No | Linked entity ID |
| `title` | String | Yes | Short title |
| `bodySnippet` | String | Yes | Short body |
| `deliveryStatus` | String | Yes | `queued`, `sent`, `failed`, `read` |
| `readAt` | Date | No | Null until read |
| `sentAt` | Date | No | Null until sent |
| `failedReason` | String | No | Optional failure text |

Indexes:

1. Index on `recipientUserId + deliveryStatus + createdAt desc`.
2. Index on `entityType + entityId`.

### 11.21 `saved_views`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `ownerUserId` | ObjectId | Yes | Owner |
| `moduleKey` | String | Yes | `requests`, `work_orders`, `assets`, `pm`, `parts`, `vendors`, `reports` |
| `name` | String | Yes | View label |
| `filters` | Object | Yes | Stored filter definition |
| `sort` | Object | Yes | Stored sort definition |
| `visibleColumns` | [String] | No | Column keys |
| `isPinned` | Boolean | Yes | Default `false` |
| `isShared` | Boolean | Yes | Default `false` |
| `sharedRoleIds` | [ObjectId] | No | Shared visibility if allowed |

Indexes:

1. Unique on `ownerUserId + moduleKey + name`.
2. Index on `isPinned`.

### 11.22 `master_data_configs`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `configType` | String | Yes | `category`, `priority`, `status`, `reason_code`, `business_hours`, `holiday_calendar`, `sla_policy`, `numbering_rule`, `custom_field_definition` |
| `scopeLevel` | String | Yes | `organization` or `property` |
| `propertyId` | ObjectId | No | Required when scopeLevel is property |
| `key` | String | Yes | Stable identifier |
| `label` | String | Yes | UI display label |
| `payload` | Object | Yes | Type-specific details |
| `isActive` | Boolean | Yes | Default `true` |
| `version` | Number | Yes | Increment on update |

Indexes:

1. Unique on `organizationId + scopeLevel + propertyId + configType + key`.
2. Index on `configType + isActive`.

### 11.23 `import_jobs`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `jobType` | String | Yes | `properties`, `locations`, `assets`, `parts`, `users`, `vendors`, `pm_plans`, `historical_work_orders` |
| `fileName` | String | Yes | Original file name |
| `storageKey` | String | Yes | Stored file path |
| `status` | String | Yes | `uploaded`, `validated`, `validation_failed`, `committed`, `commit_failed` |
| `strictMode` | Boolean | Yes | User selection |
| `summary` | Object | No | Total rows, success count, fail count, warnings |
| `errorDocumentId` | ObjectId | No | Downloadable error report |
| `initiatedByUserId` | ObjectId | Yes | Actor |
| `validatedAt` | Date | No | Validation complete time |
| `committedAt` | Date | No | Commit complete time |

Indexes:

1. Index on `organizationId + status + createdAt desc`.

### 11.24 `audit_logs`

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `entityType` | String | Yes | Module name |
| `entityId` | ObjectId | Yes | Affected record |
| `action` | String | Yes | Create, update, delete, assign, approve, etc. |
| `actorUserId` | ObjectId | No | Null for system actions |
| `actorDisplayName` | String | No | Snapshot |
| `actorRoleKeys` | [String] | No | Snapshot |
| `sourceChannel` | String | Yes | `web_app`, `request_portal`, `scheduler`, `import_job`, `vendor_portal` |
| `ipAddress` | String | No | Optional |
| `sessionId` | ObjectId | No | Optional |
| `before` | Object | No | Critical field snapshot |
| `after` | Object | No | Critical field snapshot |
| `summary` | String | Yes | Human-readable one-line summary |

Indexes:

1. Index on `organizationId + entityType + entityId + createdAt desc`.
2. Index on `actorUserId + createdAt desc`.

### 11.25 Derived Fields, Metrics, and Archival Behavior

1. `inventory_stock_lines.availableQty` is derived and must be recalculated after each relevant transaction.
2. `assets.lastPmCompletedAt`, `assets.nextPmDueAt`, and `assets.openWorkOrderCount` are derived snapshots for fast display.
3. `work_orders.costSummary.totalCost` is derived from labor, parts, and vendor cost components.
4. `work_orders.reopenCount` increments per reopen action and is not manually editable.
5. Operational collections use soft delete only where deletion is safe. Otherwise records must be archived and excluded from default list queries.
6. Audit logs are never deleted through the application UI.

## 12. Frontend Requirements

### 12.1 Route Map

| Route | Screen | Purpose |
| --- | --- | --- |
| `/login` | Login | User authentication |
| `/forgot-password` | Forgot Password | Reset initiation |
| `/reset-password/:token` | Reset Password | Password reset completion |
| `/accept-invite/:token` | Invite Acceptance | First-time password setup |
| `/dashboard` | Dashboard | Role-based overview |
| `/requests` | Requests List | Intake queue and requester view |
| `/requests/new` | New Request | Internal request creation |
| `/requests/:requestId` | Request Detail | Triage and history |
| `/work-orders` | Work Orders List | Operational execution list |
| `/work-orders/new` | New Work Order | Direct WO creation |
| `/work-orders/:workOrderId` | Work Order Detail | Execution, cost, parts, history |
| `/pm` | PM Plans List | PM management |
| `/pm/calendar` | PM Calendar | Schedule visualization |
| `/pm/:planId` | PM Plan Detail | Plan definition and history |
| `/assets` | Assets List | Asset management |
| `/assets/:assetId` | Asset Detail | Asset record, history, meters |
| `/locations` | Locations Tree/List | Hierarchy management |
| `/locations/:locationId` | Location Detail | Location settings and linked work |
| `/inventory/parts` | Parts List | Part master and stock summary |
| `/inventory/parts/:partId` | Part Detail | Stock lines and transactions |
| `/inventory/transactions` | Inventory Transactions | Stock history |
| `/vendors` | Vendors List | Vendor management |
| `/vendors/:vendorId` | Vendor Detail | Profile, compliance, assigned work |
| `/reports` | Reports Hub | Standard reports and exports |
| `/settings/users` | Users | User management |
| `/settings/roles` | Roles | Role management |
| `/settings/master-data` | Master Data | Categories, priorities, reasons, SLAs |
| `/settings/properties/:propertyId` | Property Settings | Property-specific config |
| `/imports` | Import Jobs | Data import and migration |
| `/audit` | Audit Log | Traceability view |
| `/profile` | My Profile | Session and preference management |
| `/portal/:portalSlug` | Request Portal | Restricted requester intake |
| `/vendor/work-orders` | Vendor Portal List | External assigned work |

### 12.2 Screen-Level Requirements

#### 12.2.1 Requests List

Columns:

1. Request number.
2. Status.
3. Property.
4. Location.
5. Category.
6. Title.
7. Guest impact.
8. Requested priority.
9. Submitted by.
10. Submitted at.
11. Linked work order.

Filters:

1. Property.
2. Location subtree.
3. Status.
4. Category.
5. Guest impact.
6. Emergency only.
7. Date range.
8. Requester.

Actions:

1. View detail.
2. Create request.
3. Approve.
4. Reject.
5. Request clarification.
6. Convert to work order.
7. Export current view.

#### 12.2.2 Work Orders List

Columns:

1. Work order number.
2. Status.
3. Priority.
4. Severity.
5. Guest impact.
6. Property.
7. Location.
8. Asset.
9. Type.
10. Primary assignee.
11. Team or vendor.
12. Due at.
13. Overdue indicator.
14. Total cost.

Filters:

1. Property.
2. Location subtree.
3. Assignee.
4. Team.
5. Vendor.
6. Status.
7. Priority.
8. Type.
9. Guest impact.
10. Due date range.
11. Overdue only.
12. PM-generated only.

Actions:

1. Bulk assign.
2. Bulk change priority.
3. Bulk export.
4. Open detail.
5. Print work card.

#### 12.2.3 Work Order Detail

Panels:

1. Header summary.
2. Assignment and schedule.
3. Status timeline.
4. Description and closure fields.
5. Checklist and tasks.
6. Labor entries.
7. Parts and inventory usage.
8. Attachments and photos.
9. Comments and mentions.
10. Audit and activity history.

Detail actions:

1. Assign or reassign.
2. Change status.
3. Start timer.
4. Pause timer.
5. Add manual labor.
6. Reserve part.
7. Issue part.
8. Return part.
9. Upload attachment.
10. Complete.
11. Verify or reject verification.
12. Reopen.
13. Cancel.

#### 12.2.4 PM List and Calendar

List columns:

1. Plan number.
2. Title.
3. Status.
4. Trigger type.
5. Asset or location.
6. Next due.
7. Last completed.
8. Assigned team or user.
9. Overdue count.

Calendar behaviors:

1. Month, week, and agenda views.
2. Color coding by status and priority.
3. Click-through to plan or generated work order.

#### 12.2.5 Assets List and Detail

Assets list columns:

1. Asset code.
2. Name.
3. Category.
4. Location.
5. Criticality.
6. Lifecycle status.
7. Warranty end.
8. Open work count.
9. Next PM due.

Asset detail tabs:

1. Overview.
2. Work history.
3. PM plans.
4. Meter readings.
5. Documents.
6. Downtime history.
7. Audit history.

#### 12.2.6 Inventory Screens

Parts list columns:

1. Part number.
2. Name.
3. Category.
4. Status.
5. Preferred vendor.
6. Total on hand.
7. Total reserved.
8. Total available.
9. Low-stock flag.

Part detail sections:

1. Part master data.
2. Stock lines grid.
3. Transactions history.
4. Substitute parts.
5. Linked work-order usage.
6. Documents.

#### 12.2.7 Vendor Screens

Vendor list columns:

1. Company name.
2. Status.
3. Service categories.
4. Properties covered.
5. Insurance expiry.
6. Open assigned work count.
7. On-time completion percentage.

Vendor detail sections:

1. Profile.
2. Contacts.
3. Compliance documents.
4. Assigned work.
5. KPI summary.

### 12.3 Forms and Validation

1. All required fields must be visibly marked.
2. Validation errors must display inline and in a form summary area.
3. Invalid enum values from stale client state must be rejected and refreshed from server data.
4. Autosave draft behavior is required only for long-running forms such as PM plan creation and asset editing; request and work-order create forms may rely on explicit save.

### 12.4 Modal and Drawer Behavior

1. Quick actions such as assignment, status change, part issue, transfer, and verification should use drawers or modals when the full detail page context is already open.
2. Modals must trap focus and support keyboard close.
3. Destructive actions require confirmation and reason entry when a reason is mandatory.

### 12.5 Error, Empty, and Loading States

1. Every list screen must define loading skeletons, empty-state messaging, and retry behavior.
2. Empty-state content must be permission-aware. A user without create permission must not be shown create CTAs.
3. Conflict errors from stale revisions must surface a non-destructive refresh-and-compare workflow.

### 12.6 Permission-Aware UI

1. UI must hide or disable unavailable actions based on effective permissions and record status.
2. Hidden actions must not be the only layer of protection; APIs remain authoritative.
3. Vendor portal views must not expose navigation to unavailable modules.

### 12.7 Responsive and Accessibility Requirements

1. The application must support desktop and tablet layouts as primary experiences and mobile-browser layouts as secondary responsive experiences.
2. Critical detail screens must be usable at 360 px width without horizontal page scrolling outside data grids.
3. Tables on narrow screens must support column collapse, stacked key-value sections, or slide-in detail views.
4. Accessibility requirements include keyboard navigation, visible focus indicators, semantic labels, ARIA for dialogs, sufficient color contrast, and screen-reader-readable error messages.

### 12.8 Upload Components and Media UI

1. Upload controls must support drag-and-drop and file picker selection.
2. Image uploads must show thumbnails.
3. Failed files must show per-file retry or remove options.
4. PDF and image preview must open in a dedicated viewer or drawer.

### 12.9 Reporting and PDF UI Flows

1. Standard report pages must support filter changes before export.
2. PDF export must use a branded header, report filters summary, generation timestamp, and page numbering.
3. CSV export must respect visible and authorized columns.

### 12.10 Frontend Architecture, Styling, and Component Standards

The frontend requirements in this PRD are implementation-mandatory and must be enforced consistently across all screens, shared components, and feature modules.

#### 12.10.1 Frontend single source of truth and shared utility structure

1. `client/src/utils/constants.js` must be created and treated as the single source of truth for frontend constants.
2. No component may redefine domain enums, route keys, navigation keys, status labels, priority labels, guest-impact labels, report identifiers, table column keys, or filter keys inline if those values belong in `client/src/utils/constants.js`.
3. Theme tokens must not be duplicated inside feature folders. Shared design tokens must be read from the MUI theme, not from ad hoc local objects.
4. If frontend formatting helpers, option builders, or mapping helpers depend on shared domain constants, those helpers must consume `client/src/utils/constants.js` rather than creating parallel constant sets.

#### 12.10.2 Styling and theming rules

1. Components must never use hardcoded styling values for color, spacing, typography scale, border radius, shadows, or breakpoints when a theme-driven value is appropriate.
2. Components must use `theme.palette`, `theme.typography`, and `theme.spacing` for styling decisions.
3. Responsive behavior must use `theme.breakpoints`.
4. Custom component styling must use the MUI `styled()` API as the default styling mechanism for reusable components and screen-level layout wrappers.
5. The implementation must include a centralized frontend theme module so that `styled()` components and screen-level layout code consume one consistent theme object.
6. The existing Inter font bootstrapping in `client/src/main.jsx` must remain aligned with the theme typography definition rather than bypassing it with component-level font overrides.
7. Inline style objects may be used only for narrowly scoped dynamic values that cannot be represented cleanly in `styled()`; they must still derive from theme values and must not introduce hardcoded design tokens.
8. `sx` usage is allowed only for local, non-reusable, theme-derived adjustments. Reusable styling logic must be promoted into `styled()` components.

#### 12.10.3 MUI v9 usage rules

1. All MUI usage must follow MUI v9 syntax and deprecation guidance.
2. All MUI imports must be tree-shakable. Example: `import Button from "@mui/material/Button";`.
3. Barrel imports such as `import { Button } from "@mui/material";` are not allowed.
4. React Router imports must come from `react-router`, not `react-router-dom`, because the current project depends on `react-router`.
5. MUI Grid usage must follow v9 conventions. The deprecated `item` prop must not be used; the `size` prop must be used instead.
6. Custom rendering hooks exposed by MUI components must prefer the slots and `slotProps` APIs where MUI v9 provides them.
7. New work must avoid deprecated MUI props or composition patterns even if they still function at runtime.

#### 12.10.4 React Hook Form rules

1. `watch()` must never be used.
2. Any requirement that would usually be implemented with `watch()` must instead use one of the following, chosen deliberately by context:
   - `useWatch` when field-level subscription is required inside a component.
   - `Controller` render-prop values when the dependency is local to a controlled field.
   - `getValues` for one-time reads during event handling or submission.
   - Derived state from Redux or route state when the value is not form-owned.
3. Form architecture must avoid broad rerender patterns that `watch()` commonly introduces.

#### 12.10.5 Documentation and JSDoc rules for frontend code

1. All exported components, hooks, utilities, Redux slices, selectors, and non-trivial internal helper functions must use JSDoc.
2. Complex prop contracts must be described in JSDoc even though the codebase is JavaScript-only.
3. Shared constants modules and theme modules must also use JSDoc to define intent and allowed values.

## 13. Backend Requirements

### 13.1 API Domain Structure

Base path: `/api/v1`

Domain groups:

1. `/auth`
2. `/dashboard`
3. `/organizations`
4. `/properties`
5. `/locations`
6. `/roles`
7. `/users`
8. `/teams`
9. `/assets`
10. `/meters`
11. `/requests`
12. `/work-orders`
13. `/pm-plans`
14. `/checklists`
15. `/inspections`
16. `/parts`
17. `/inventory-lines`
18. `/inventory-transactions`
19. `/vendors`
20. `/documents`
21. `/notifications`
22. `/reports`
23. `/settings`
24. `/imports`
25. `/audit-logs`

### 13.2 Endpoint Inventory

| Domain | Core endpoints |
| --- | --- |
| Auth | `POST /auth/login`, `POST /auth/logout`, `POST /auth/logout-all`, `POST /auth/refresh`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `POST /auth/accept-invite`, `GET /auth/me`, `PATCH /auth/me/password`, `GET /auth/sessions`, `DELETE /auth/sessions/:sessionId` |
| Dashboard | `GET /dashboard/summary`, `GET /dashboard/widgets/:widgetKey` |
| Properties | `GET /properties`, `POST /properties`, `GET /properties/:propertyId`, `PATCH /properties/:propertyId` |
| Locations | `GET /locations/tree`, `GET /locations`, `POST /locations`, `GET /locations/:locationId`, `PATCH /locations/:locationId`, `POST /locations/:locationId/archive` |
| Roles | `GET /roles`, `POST /roles`, `GET /roles/:roleId`, `PATCH /roles/:roleId` |
| Users | `GET /users`, `POST /users`, `GET /users/:userId`, `PATCH /users/:userId`, `POST /users/:userId/resend-invite`, `POST /users/:userId/disable`, `POST /users/:userId/force-logout` |
| Teams | `GET /teams`, `POST /teams`, `GET /teams/:teamId`, `PATCH /teams/:teamId` |
| Assets | `GET /assets`, `POST /assets`, `GET /assets/:assetId`, `PATCH /assets/:assetId`, `POST /assets/:assetId/transfer`, `POST /assets/:assetId/retire`, `GET /assets/:assetId/history` |
| Meters | `POST /assets/:assetId/meters`, `PATCH /meters/:meterId`, `POST /meters/:meterId/readings`, `GET /meters/:meterId/readings` |
| Requests | `GET /requests`, `POST /requests`, `GET /requests/:requestId`, `PATCH /requests/:requestId`, `POST /requests/:requestId/approve`, `POST /requests/:requestId/reject`, `POST /requests/:requestId/cancel`, `POST /requests/:requestId/convert` |
| Work Orders | `GET /work-orders`, `POST /work-orders`, `GET /work-orders/:workOrderId`, `PATCH /work-orders/:workOrderId`, `POST /work-orders/:workOrderId/assign`, `POST /work-orders/:workOrderId/schedule`, `POST /work-orders/:workOrderId/status`, `POST /work-orders/:workOrderId/labor-entries`, `POST /work-orders/:workOrderId/parts/reserve`, `POST /work-orders/:workOrderId/parts/issue`, `POST /work-orders/:workOrderId/parts/return`, `POST /work-orders/:workOrderId/complete`, `POST /work-orders/:workOrderId/verify`, `POST /work-orders/:workOrderId/reopen`, `POST /work-orders/:workOrderId/cancel`, `POST /work-orders/:workOrderId/comments`, `GET /work-orders/:workOrderId/print` |
| PM Plans | `GET /pm-plans`, `POST /pm-plans`, `GET /pm-plans/:planId`, `PATCH /pm-plans/:planId`, `POST /pm-plans/:planId/activate`, `POST /pm-plans/:planId/pause`, `GET /pm-plans/:planId/forecast`, `GET /pm-plans/:planId/history` |
| Checklists/Inspections | `GET /checklists`, `POST /checklists`, `PATCH /checklists/:templateId`, `POST /inspections`, `GET /inspections/:executionId`, `PATCH /inspections/:executionId` |
| Parts and Inventory | `GET /parts`, `POST /parts`, `GET /parts/:partId`, `PATCH /parts/:partId`, `GET /inventory-lines`, `POST /inventory-lines`, `PATCH /inventory-lines/:lineId`, `POST /inventory-transactions`, `POST /inventory-transactions/transfer`, `POST /inventory-transactions/cycle-count` |
| Vendors | `GET /vendors`, `POST /vendors`, `GET /vendors/:vendorId`, `PATCH /vendors/:vendorId`, `POST /vendors/:vendorId/invite-user` |
| Documents | `POST /documents/upload`, `GET /documents/:documentId`, `GET /documents/:documentId/download`, `DELETE /documents/:documentId` |
| Notifications | `GET /notifications`, `POST /notifications/:notificationId/read`, `POST /notifications/mark-all-read`, `PATCH /notifications/preferences` |
| Reports | `GET /reports`, `GET /reports/:reportKey`, `POST /reports/:reportKey/export` |
| Settings | `GET /settings/:configType`, `POST /settings/:configType`, `PATCH /settings/:configType/:configId` |
| Imports | `POST /imports`, `GET /imports`, `GET /imports/:jobId`, `POST /imports/:jobId/validate`, `POST /imports/:jobId/commit` |
| Audit | `GET /audit-logs` |

### 13.3 Request Payload and Response Expectations

1. All create and update payloads must accept JSON except multipart document uploads.
2. Standard list responses must follow a conceptual envelope:

```json
{
  "success": true,
  "data": {
    "items": [],
    "page": 1,
    "limit": 25,
    "totalItems": 0,
    "totalPages": 0
  },
  "meta": {
    "requestId": "string"
  }
}
```

3. Standard detail responses must return the full authorized entity and any lightweight related summaries required by the detail screen.
4. Mutations must return the updated entity or the minimum refreshed summary needed by the client.
5. Validation failures must return structured field-level errors.
6. Revision conflicts must return HTTP `409`.

### 13.4 Query Parameters

Every list endpoint must support relevant combinations of:

1. `page`
2. `limit`
3. `sortBy`
4. `sortOrder`
5. `search`
6. `propertyId`
7. `locationId`
8. `status`
9. `category`
10. `priority`
11. `from`
12. `to`
13. `includeArchived`

### 13.5 Validation Rules

1. `express-validator` must validate required fields, enum values, date ranges, and ID formats.
2. `validator` must validate email, URLs where used, and string sanitization helpers.
3. `express-mongo-sanitize` must protect against operator injection.
4. Cross-entity validation must occur in service layer logic after basic request validation.

### 13.5.1 Mandatory validated-request contract

The backend must implement a validation middleware pattern that normalizes controller input into `req.validated`. Controllers must not interpret raw request containers directly.

Mandatory contract:

```js
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```

Mandatory rules:

1. Controllers must not read from `req.body`, `req.params`, or `req.query`.
2. Controllers must only consume `req.validated.body`, `req.validated.params`, and `req.validated.query`.
3. Validation middleware must populate `req.validated` after all `express-validator` checks have run and before controller execution.
4. Services must receive only the sanitized and validated data needed for the operation, not the raw `req` object.
5. If no validated values are present for a location, the middleware must still attach that location key with an empty object so controllers can rely on a stable shape.
6. Controllers that bypass this contract are non-compliant with the PRD.

### 13.5.2 Actor attachment contract

1. The authenticated actor must be attached to `req.user`.
2. Internal controllers and services must treat `req.user` as the authoritative actor context for authorization checks, audit attribution, notification attribution, and tenant scoping.
3. Middleware must attach `req.user` before any controller requiring actor context executes.
4. For system-triggered operations such as schedulers, imports, or automated escalation jobs, the execution context must attach a synthetic actor object compatible with the `req.user` shape or an equivalent service-layer actor context so downstream audit logic remains structurally consistent.
5. Controllers must not look up the acting user again from ad hoc request fields once `req.user` has been established.

### 13.5.3 Backend single source of truth and constants policy

1. `backend/utils/constants.js` must be created and treated as the single source of truth for backend domain constants.
2. Status enums, lifecycle enums, priority values, severity values, guest-impact values, notification event names, audit action names, permission keys, role keys, and route-independent business constants must be defined there or in backend constant modules re-exported through it.
3. Controllers, services, validators, schedulers, and report builders must import constants from the backend constants source instead of redefining string literals inline.
4. Hardcoded domain strings repeated across modules are not allowed when they belong in the constants source of truth.

### 13.5.4 Controller, middleware, and service layering rules

1. Controllers must remain thin orchestration layers.
2. Controllers must read actor context from `req.user` and request data from `req.validated`.
3. Controllers must delegate business logic to services.
4. Middleware must handle authentication, authorization, validation, request normalization, request ID attachment, and error translation responsibilities.
5. Services must not depend on Express request or response objects.
6. Audit logging, notification emission, and transaction coordination must occur in services or dedicated orchestration helpers, not in route definitions.

### 13.6 Auth Middleware and Authorization Checks

1. Auth middleware must verify JWT, session state, user status, and organization scope.
2. Authorization middleware must verify domain action permission and property or location scope.
3. Record-level fetches must enforce organization boundary before returning not-found vs forbidden responses.
4. Vendor portal middleware must further restrict visible fields and actions.

### 13.7 Service Responsibilities

1. `authService`: login, logout, refresh, session lifecycle, password reset, invite acceptance.
2. `propertyService`: properties, business hours linkage, default rules.
3. `locationService`: hierarchy management, tree queries, scope filtering.
4. `assetService`: CRUD, transfer, retire, meter linkage, history aggregation.
5. `requestService`: create, review, approve, reject, convert, duplicate detection.
6. `workOrderService`: create, assign, schedule, status transitions, cost rollups, completion and verification.
7. `pmService`: plan CRUD, next-due calculation, occurrence generation rules.
8. `inventoryService`: parts, stock lines, transactions, reservations, transfers, counts.
9. `vendorService`: vendor management, compliance checks, restricted access.
10. `notificationService`: in-app writes, socket emission, email dispatch and retry.
11. `reportService`: dashboard queries, report builders, export jobs.
12. `auditService`: structured immutable event creation.
13. `importService`: file parsing, row validation, dry-run and commit.

### 13.8 Background Processing Needs

Required scheduled or asynchronous processes:

1. PM generation scheduler.
2. SLA breach evaluator.
3. Notification email dispatcher with retry.
4. Daily or periodic digest compiler if enabled.
5. Low-stock threshold evaluator.
6. Session cleanup for expired sessions.
7. Import validation and commit worker for large files.
8. Report export generator.

Justified additional packages:

1. Multipart upload middleware such as `multer`.
2. Scheduler package such as `node-cron` or equivalent.
3. CSV parsing library for import processing if manual parsing is not implemented.

### 13.9 Logging Expectations

1. `winston` must produce structured logs with level, message, requestId, userId when available, route, response code, and duration.
2. `morgan` may be used in development only.
3. Sensitive fields such as password hashes and refresh tokens must never be logged.

### 13.10 Rate Limiting

Minimum rate limits:

1. Login: 10 attempts per 15 minutes per IP and identifier.
2. Forgot password: 5 attempts per hour per identifier.
3. Request portal submission: 10 submissions per hour per IP and portal.
4. Export generation: 5 running exports per user.
5. Uploads: configurable limit per minute per user.

### 13.11 Socket Event Categories

1. `notification.created`
2. `request.created`
3. `request.updated`
4. `work_order.created`
5. `work_order.updated`
6. `work_order.comment_added`
7. `pm.generated`
8. `inventory.low_stock`
9. `vendor.updated`

### 13.12 Email Event Categories

1. Invitation.
2. Password reset.
3. Security alert.
4. Request acknowledgment.
5. Request approved.
6. Request rejected.
7. Work assigned.
8. Work overdue.
9. PM generated.
10. Low stock.
11. Vendor assignment.
12. Compliance expiry.

### 13.13 Documentation and JSDoc Requirements for Backend Code

1. All exported backend modules must use JSDoc.
2. All controllers, middleware, services, validators, utilities, schedulers, constants modules, and model helper functions must use JSDoc.
3. JSDoc must document input shapes, output shapes, side effects, thrown errors where relevant, and actor-context expectations.
4. The JavaScript-only nature of the repo does not reduce the JSDoc requirement; JSDoc is mandatory because the project is JavaScript-only.

## 14. Real-Time and Notification Requirements

| Event | Recipients | Reactive screens | Fallback when sockets disconnect |
| --- | --- | --- | --- |
| New request submitted | Triage users, property managers | Dashboard, requests list | Refetch on focus and 60-second polling |
| Request status changed | Requester, triage users | Request detail, requester dashboard | Refetch request detail on focus |
| Work order assigned | Assignee, supervisor | Dashboard, work-order list/detail | Poll assigned-work endpoint every 60 seconds |
| Work order status changed | Watchers, requester if allowed, managers | Work-order detail, dashboard widgets | Detail refetch on page focus |
| Comment added | Followers and assignees | Work-order detail | Incremental fetch of comments list |
| PM generated | Assigned team, planners | PM calendar, work-order list | PM list refresh every 5 minutes |
| Low stock triggered | Inventory controllers, managers | Inventory dashboard, parts list | Poll low-stock endpoint every 5 minutes |
| Vendor updated work | Vendor coordinator, verifiers | Work-order detail, vendor dashboard | Detail refetch on focus |

Additional rules:

1. In-app notifications must be unread by default.
2. Marking a notification as read must synchronize across browser tabs for the same user.
3. A socket reconnect must trigger a lightweight synchronization call to refresh counts and last-updated records.

## 15. Non-Functional Requirements

### 15.1 Performance

1. Standard create and update API calls should complete within 750 ms at p95 under normal operating load.
2. Filtered list endpoints for up to 50 rows should complete within 2 seconds at p95.
3. Dashboard initial load should complete within 3 seconds at p95.
4. Standard search queries should complete within 2 seconds at p95.
5. PDF report generation for common operational reports should complete within 30 seconds for moderate data volumes.

### 15.2 Reliability

1. Target application availability is 99.5 percent monthly excluding planned maintenance windows.
2. Scheduled jobs must be idempotent where duplicate execution would otherwise create duplicate PM or duplicate notifications.
3. Critical state-changing operations must either fully succeed or fail without partial hidden side effects.

### 15.3 Concurrency

1. Mutable operational records must use optimistic concurrency with `revision`.
2. Simultaneous conflicting saves must return `409 conflict`.
3. Inventory transactions that update the same stock line must be serialized or protected by atomic update logic.

### 15.4 Data Integrity

1. Cross-entity references must be validated before write.
2. Derived quantities and totals must be recalculated server-side.
3. Work-order costs must not trust client-provided totals.
4. Critical multi-document workflows should use Mongo transactions where available.

### 15.5 Observability

1. Every API request must have a request ID.
2. Errors must be logged with request context and sanitized payload context.
3. Scheduler runs must produce success/failure summary logs.
4. Export and import jobs must write job-level telemetry.

### 15.6 Maintainability

1. Backend code must be separated into routes, validators, controllers, services, and models.
2. Frontend code must use feature-based state slices and route boundaries.
3. Master data must be configuration-driven to minimize hard-coded business logic.

### 15.6.1 Mandatory engineering execution protocol

1. All implementation phases must follow `docs/task-execution-protocol.md`.
2. The protocol is mandatory for documentation work, architecture work, feature implementation, refactoring, and bug fixes defined under this product scope.
3. If the protocol and a feature implementation choice appear to conflict, the task must stop until the conflict is resolved explicitly; silent deviation is not allowed.

### 15.6.2 Cross-repository coding standards

1. Shared business meaning must not be encoded in repeated string literals across backend and frontend modules.
2. JSDoc is mandatory across the entire codebase, including constants, helpers, hooks, middleware, service methods, and reusable components.
3. Repository instructions, scripts, and developer documentation must use Git Bash or WSL compatible commands only.
4. Platform-specific Windows CMD or PowerShell command syntax must not be relied on in implementation instructions, onboarding instructions, or task procedures.

### 15.7 Browser Support

1. Current and previous major versions of Chrome, Edge, Firefox, and Safari are supported.
2. iOS Safari and Android Chrome responsive usage are supported for core task execution and updates.

### 15.8 Scalability Assumptions

The system must be designed to support at least:

1. 500 properties in one organization.
2. 100,000 locations across the organization.
3. 250,000 assets across the organization.
4. 5,000 active users across the organization.
5. 3,000,000 cumulative work orders.
6. 50,000 PM plans.
7. 200,000 parts and stock lines combined.

## 16. Security Requirements

1. Passwords must be stored with `bcrypt` using a cost factor appropriate for production performance, with 12 as the baseline.
2. JWT signing secrets must be environment-configured and rotatable.
3. `helmet` must be enabled with a restrictive default configuration.
4. `cors` must use an explicit allowlist, not wildcard production origins.
5. Refresh tokens must be revocable server-side through session storage.
6. Authorization must be deny-by-default.
7. Input validation and sanitization are mandatory on all mutating endpoints.
8. File uploads must validate MIME type, extension, size, and authorization before persistence.
9. Direct object reference attacks must be prevented by enforcing organization and scope checks before returning records.
10. Sensitive fields such as password hashes, refresh token hashes, and internal-only audit details must never be exposed in API responses.
11. Public-facing requester portal routes must be rate-limited and must not expose internal navigation or internal-only data.
12. Vendor portal routes must hide internal comments, internal-only attachments, and unrelated records.
13. Session fixation must be mitigated by rotating session identity at login and key security transitions.
14. Audit logs must capture security-sensitive events such as login failures, lockouts, password resets, permission changes, and forced logouts.

## 17. Error Handling and Edge Cases

1. Login for a locked or disabled user must return a generic auth error and not disclose whether the email exists.
2. Changing a user's permissions while that user is editing a record must invalidate the next write and require reauthentication or a refreshed permission check.
3. Requests created against archived locations must be rejected.
4. Request conversion must fail gracefully if the selected asset is retired between submission and approval.
5. Duplicate detection must tolerate near-simultaneous submissions without auto-merging unrelated records.
6. Starting work in an occupied room after the room becomes DND must be blocked unless the work is emergency and the user confirms override reason.
7. Completing a work order without ending an active downtime event must surface a blocking validation.
8. Closing a work order with an active timer must stop or cancel the timer before completion.
9. Reopening a work order after inventory has already been returned must preserve prior inventory history and allow new part issues.
10. PM generation during daylight-saving transitions must compute due dates using property-local rules and store the UTC result.
11. PM plans targeting archived assets must not generate new work and must log exception records.
12. Meter readings imported out of chronological order must be flagged for review.
13. Inventory issue must fail if reserved quantity is insufficient and no override right exists.
14. Inventory transfer must fail if source and destination lines are identical.
15. A vendor whose insurance expires must remain able to view already assigned work if policy allows, but new assignments must be blocked.
16. File upload partial failure must report which files succeeded and which failed.
17. Failed email notifications must not delete the in-app notification record.
18. Export requests exceeding permission scope must return only authorized columns and rows.
19. Attempting to archive a property with active open work or PM plans must be blocked.
20. Deleting a custom field definition in use must be blocked or converted to inactive state.
21. Simultaneous edits to the same work order from two browsers must produce a revision conflict instead of silent overwrite.
22. Work-order merge must prevent merging records from different properties.
23. Import jobs with invalid foreign keys must produce row-level error details.
24. Requester portal submissions without contactable identity must be blocked when the portal is configured to require follow-up contact.
25. Notification quiet-hour rules must not suppress emergency events.
26. Asset transfer between properties must be blocked if PM plans remain property-scoped and unresolved.
27. A user losing access to a property must no longer receive notifications for that property.
28. A part set to `obsolete` must remain searchable in history but blocked for new reservations unless override is granted.
29. Closing a PM-generated work order after the due date must mark the occurrence late, not retroactively on time.
30. Audit-log fetches must hide sensitive before/after payloads from roles without audit detail permission.

## 18. Acceptance Criteria

### 18.1 Authentication and Access

1. Users can log in, refresh sessions, log out, and force-logout other sessions according to scope and status rules.
2. Locked, disabled, and archived users cannot authenticate.
3. Property and location scoping visibly and API-level restricts unauthorized data.

### 18.2 Requests

1. Authorized users can submit requests with required fields and receive duplicate warnings where applicable.
2. Triage users can approve, reject, request clarification, cancel, or convert requests.
3. Emergency requests generate immediate visible alerts.

### 18.3 Work Orders

1. Authorized users can create, assign, schedule, execute, complete, verify, reopen, and cancel work orders following status rules.
2. Work orders capture labor, parts, attachments, comments, and closure data.
3. Occupied-room restrictions and guest-impact fields affect scheduling and validation behavior.

### 18.4 Preventive Maintenance

1. PM plans can be created for time, meter, seasonal, and hybrid triggers.
2. Scheduler-generated PM work orders do not duplicate active occurrences.
3. PM history clearly shows completed, missed, skipped, and deferred occurrences.

### 18.5 Inspections and Checklists

1. Templates support required tasks and structured answer types.
2. Inspection failures can create linked follow-up work.
3. Template versioning preserves in-flight execution history.

### 18.6 Assets

1. Assets can be created, updated, transferred, retired, and linked to work and PM records.
2. Asset history shows work, downtime, documents, and meter readings.
3. Duplicate asset code creation within a property is blocked.

### 18.7 Inventory

1. Parts and stock lines support reservations, issues, returns, adjustments, transfers, and counts.
2. Negative stock is blocked by default.
3. Work-order part usage updates stock quantities and work-order cost totals.

### 18.8 Vendors

1. Vendors can be maintained with compliance documents and service scopes.
2. Restricted vendor users can see only assigned work and allowed content.
3. Vendor performance metrics can be reported.

### 18.9 Notifications and Real-Time

1. Assigned users and stakeholders receive in-app and email alerts for configured events.
2. Socket-driven updates refresh affected views without full page reload where possible.
3. Read/unread notification state stays synchronized across tabs.

### 18.10 Reporting and Auditability

1. Standard reports can be filtered, viewed, and exported to CSV or PDF.
2. Audit logs show actor, timestamp, source, and change summary for critical events.
3. Report and export results honor permissions and scopes.

### 18.11 Import and Configuration

1. Admins can dry-run and commit CSV imports with row-level error reporting.
2. Master data can be configured without direct code changes.
3. Numbering, SLA, business hours, holidays, and reason codes affect operational behavior after configuration updates.

### 18.12 Engineering Standards and Repository Compliance

1. The implementation explicitly references and follows `docs/task-execution-protocol.md`.
2. Backend controllers read request input only from `req.validated.body`, `req.validated.params`, and `req.validated.query`.
3. Backend controllers do not read input directly from `req.body`, `req.params`, or `req.query`.
4. Authenticated actor context is consistently available through `req.user`.
5. `backend/utils/constants.js` exists and is used as the backend single source of truth for shared domain constants.
6. `client/src/utils/constants.js` exists and is used as the frontend single source of truth for shared frontend constants.
7. Exported JavaScript modules across backend and frontend use JSDoc.
8. Frontend components do not use hardcoded design-token values when a theme token is applicable.
9. Frontend styling uses MUI theme values, `styled()`, and breakpoint APIs consistently.
10. MUI imports are tree-shakable, React Router imports come from `react-router`, Grid usage follows the `size` API, and custom rendering uses slots APIs where provided by MUI v9.
11. React Hook Form implementations do not use `watch()`.

## 19. Assumptions, Dependencies, and Risks

### 19.1 Assumptions

1. Property engineering teams will maintain accurate property, location, and asset master data.
2. The organization will define standard categories, priorities, and SLA policies before rollout.
3. Room access and occupancy constraints will be entered manually or imported by file if no PMS integration exists.

### 19.2 Implementation Dependencies

1. SMTP or equivalent email infrastructure.
2. Multipart upload handling package.
3. Scheduler mechanism for PM and notifications.
4. Persistent file storage strategy for attachments.
5. CSV parsing capability for imports.
6. Creation of `backend/utils/constants.js` before domain module build-out.
7. Creation of `client/src/utils/constants.js` and a centralized MUI theme module before broad frontend screen implementation.
8. Establishment of shared validation middleware that populates `req.validated`.

### 19.3 Operational Dependencies

1. Governance for user-role assignment and periodic access review.
2. Storeroom process discipline for accurate inventory balances.
3. Supervisor process discipline for request triage and closure verification.

### 19.4 Data Dependencies

1. Clean property codes and location codes.
2. Initial asset register with criticality and location placement.
3. Initial parts catalog and stock counts.
4. Existing historical work data if migration is required.

### 19.5 Risks

1. Manual room-access state maintenance may reduce accuracy if PMS integration is delayed.
2. Excessive custom fields or status customization can make cross-property reporting inconsistent.
3. Weak inventory discipline can reduce trust in stock data and work cost reporting.
4. Large attachment growth may affect storage cost and backup strategy.
5. Cross-property timezone complexity can create confusion if local and UTC representations are not handled consistently.
6. Because the current repository is still skeletal, failing to create constants, theme, validation-normalization middleware, and route architecture early will cause expensive rewrites later.
7. Allowing direct controller access to raw request containers will create inconsistent validation behavior and audit gaps.
8. Allowing hardcoded UI values during early screen development will cause theme drift and inconsistent responsive behavior across the product.

## 20. Out-of-Scope Items

1. AI features of any kind, including recommendations, summaries, copilots, predictive models, and autonomous workflows.
2. Product pricing, subscription billing, invoicing, and license management.
3. TypeScript migration or TypeScript-specific design decisions.
4. Testing strategy, testing plans, test tooling, or test case sections.
5. Native mobile applications.
6. Full procure-to-pay and accounts payable.
7. Direct PMS, ERP, or BMS integrations in version 1.
8. Guest messaging, guest portals, or guest mobile apps.
9. Financial depreciation accounting, budgeting, and capital planning modules.
10. Direct controller consumption of `req.body`, `req.params`, or `req.query`.
11. Use of `react-router-dom` imports in the frontend implementation.
12. Use of non-tree-shakable MUI imports.
13. Use of React Hook Form `watch()`.
14. Use of deprecated MUI Grid `item` prop patterns instead of the v9 `size` API.
15. Use of hardcoded styling values where theme tokens should be used.
16. Use of CMD-specific or PowerShell-specific command syntax in developer-facing implementation instructions.
