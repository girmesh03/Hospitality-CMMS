# Requirements Document

## Introduction

This requirements document defines the complete functional and non-functional requirements for the Hospitality CMMS (Computerized Maintenance Management System) web application. This system is designed specifically for hospitality operations including hotels, resorts, serviced apartments, vacation clubs, spas, restaurants, event venues, and mixed-use hospitality campuses.

**Source Documents**:

- docs/prd.md - Product Requirements Document
- docs/requirements.md - Implementation Requirements
- docs/design.md - Design Specifications
- docs/tasks.md - 18-Phase Implementation Plan
- docs/task-execution-protocol.md - Execution Workflow
- docs/traceability-matrix.md - Cross-Document Traceability
- docs/generation_prompt.md - Repository Conventions
- docs/theming-protocol.md - MUI v9 Theming Standards

**Technology Stack**:

**Backend** (exact versions from `backend/package.json`):

- Runtime: Node.js (ESM modules)
- Framework: express 5.2.1
- Database: MongoDB with mongoose 9.4.1
- Authentication: JWT with httpOnly refresh tokens (jsonwebtoken 9.0.3)
- Validation: express-validator 7.3.2
- Async Handlers: express-async-handler 1.2.0
- Security: helmet 8.1.0, express-mongo-sanitize 2.2.0, express-rate-limit 8.3.2, cors 2.8.6
- Password Hashing: bcrypt 6.0.0
- Logging: winston 3.19.0
- Email: nodemailer 8.0.5
- Real-time: socket.io 4.8.3
- Utilities: compression 1.8.1, cookie 1.1.1, cookie-parser 1.4.7, dayjs 1.11.20, dotenv 17.4.2, validator 13.15.35, mongoose-paginate-v2 1.9.4
- Development: morgan 1.10.1, nodemon 3.1.14

**Frontend** (exact versions from `client/package.json`):

- Framework: react 19.2.4, react-dom 19.2.4
- UI Library: @mui/material 9.0.0
- MUI Extensions: @mui/icons-material 9.0.0, @mui/lab 9.0.0-beta.2, @mui/x-data-grid 9.0.1, @mui/x-charts 9.0.1, @mui/x-date-pickers 9.0.0
- Styling: @emotion/react 11.14.0, @emotion/styled 11.14.1
- Routing: react-router 7.14.1 (NOT react-router-dom)
- State Management: @reduxjs/toolkit 2.11.2, react-redux 9.2.0, redux-persist 6.0.0
- Forms: react-hook-form 7.72.1 (NO watch() usage)
- HTTP Client: axios 1.15.0
- Real-time: socket.io-client 4.8.3
- File Upload: react-dropzone 15.0.0
- PDF Generation: jspdf 4.2.1, jspdf-autotable 5.0.7
- Image Handling: react-photo-album 3.6.0, yet-another-react-lightbox 3.31.0
- Notifications: react-toastify 11.0.5
- Error Boundaries: react-error-boundary 6.1.1
- Typography: @fontsource/inter 5.2.8
- Utilities: dayjs 1.11.20, dotenv 17.4.2
- Development: vite 8.0.4, @vitejs/plugin-react 6.0.1, eslint 9.39.4, @eslint/js 9.39.4, eslint-plugin-react-hooks 7.0.1, eslint-plugin-react-refresh 0.5.2, globals 17.4.0

**Engineering Constraints**:

- JavaScript-only (no TypeScript)
- ESM syntax throughout
- Comprehensive JSDoc documentation required
- Git Bash/WSL compatible commands only (no PowerShell/CMD)
- Task Execution Protocol: All phases must follow six-step execution model from `docs/task-execution-protocol.md`
- Backend constants: `backend/utils/constants.js` (single source of truth)
- Frontend constants: `client/src/utils/constants.js` (single source of truth)
- No direct controller reads from req.body/params/query (use req.validated)
- No React Hook Form watch() (use useWatch, Controller, or getValues)
- Tree-shakable MUI imports only (e.g., `import Button from "@mui/material/Button"`)
- MUI v9 Grid size prop (not deprecated item prop)
- No react-router-dom (use react-router)
- Theme tokens required (use theme.palette, theme.typography, theme.spacing, theme.breakpoints)
- Theming Protocol: All frontend styling must follow `docs/theming-protocol.md`

## Glossary

### System Terms

- **Organization**: Top-level tenant entity that owns one or more hospitality properties
- **Property**: An individual hotel, resort, club, serviced apartment, restaurant property, spa, or venue managed inside the platform
- **Location**: A place within a property, such as a building, floor, wing, room, public space, kitchen, plant room, or bin location
- **Asset**: A maintainable equipment item, system, component, fixture, or tracked facility element
- **Work_Request**: An intake record describing a maintenance issue that requires review, approval, rejection, or conversion into a work order
- **Work_Order**: An executable maintenance job record used to plan, assign, perform, and close work
- **PM_Plan**: A preventive maintenance plan that generates scheduled work orders
- **Inspection**: A structured procedure or checklist execution used to assess condition, compliance, or readiness
- **Guest_Impact_Issue**: A maintenance issue that affects guest rooms, guest safety, guest comfort, guest-facing public areas, or service availability
- **Occupied_Room_Restriction**: A rule that limits when a work order may be performed in a guest room that is occupied, DND, VIP, or otherwise restricted
- **Service_Window**: An allowed time range for work execution
- **Blackout_Window**: A forbidden time range for planned work execution
- **Downtime_Event**: A time-bounded event during which an asset, room, or area is partially or fully unavailable because of maintenance-related conditions
- **Inventory_Line**: A stock record for a part at a specific storeroom and bin
- **Vendor**: An external service company or supplier
- **Contractor**: An external worker acting under a vendor or directly under a property agreement
- **SLA**: Service level agreement timing policy used for response, start, and completion expectations
- **Master_Data**: Configurable reference data such as categories, statuses, priorities, reasons, business hours, and custom field definitions
- **Actor_Context**: The authenticated user or system context carrying user ID, organization ID, property scope, role keys, permissions, and session ID
- **Validator**: Express-validator middleware chain that validates and sanitizes request input
- **Service_Layer**: Backend business logic layer that coordinates models, permissions, audit, and notifications
- **Theme_Token**: MUI theme design value from palette, typography, spacing, or breakpoints
- **Domain_Component**: Frontend component specific to a feature domain (auth, workOrders, assets, etc.)
- **Shared_Component**: Reusable frontend component used across multiple domains (layout, feedback, forms, etc.)

### Acronyms

- **CMMS**: Computerized Maintenance Management System
- **PM**: Preventive Maintenance
- **SLA**: Service Level Agreement
- **JWT**: JSON Web Token
- **RBAC**: Role-Based Access Control
- **UOM**: Unit of Measure
- **QR**: Quick Response code
- **CSV**: Comma-Separated Values
- **PDF**: Portable Document Format
- **MTTR**: Mean Time To Repair
- **MTBF**: Mean Time Between Failures
- **OOO**: Out of Order
- **OOS**: Out of Service
- **DND**: Do Not Disturb
- **VIP**: Very Important Person
- **BOH**: Back of House
- **F&B**: Food and Beverage
- **HVAC**: Heating, Ventilation, and Air Conditioning
- **PMS**: Property Management System
- **ERP**: Enterprise Resource Planning
- **BMS**: Building Management System
- **PLC**: Programmable Logic Controller
- **CSRF**: Cross-Site Request Forgery
- **CORS**: Cross-Origin Resource Sharing
- **ESM**: ECMAScript Modules
- **JSDoc**: JavaScript Documentation
- **MUI**: Material-UI
- **RHF**: React Hook Form
- **RTK**: Redux Toolkit

## Requirements

### Requirement 0: System Bootstrap

**User Story:** As a system administrator deploying a fresh instance, I want an in-application bootstrap mechanism, so that I can create the first organization and administrator user without relying on external database insertion or pre-existing actors.

#### Acceptance Criteria

1. WHEN the system is deployed for the first time with an empty database, THE System SHALL provide a bootstrap endpoint accessible without authentication
2. THE Bootstrap_Status_Endpoint `GET /api/v1/bootstrap/status` SHALL return whether bootstrap is required (organization count is zero)
3. THE Bootstrap_Initialize_Endpoint `POST /api/v1/bootstrap/initialize` SHALL accept organization data and admin user data
4. THE Organization_Data SHALL include: name (required, 3-100 characters), subdomain (optional, lowercase alphanumeric with hyphens), timezone (required, valid IANA timezone), currency (optional, 3-letter ISO 4217 code, defaults to USD)
5. THE Admin_User_Data SHALL include: email (required, valid email), firstName (required, 1-50 characters), lastName (required, 1-50 characters), password (required, minimum 8 characters with uppercase, lowercase, number, and special character), confirmPassword (required, must match password)
6. WHEN bootstrap is requested and organization count is greater than zero, THE System SHALL return 409 Conflict with error "BOOTSTRAP_ALREADY_COMPLETED"
7. WHEN bootstrap is requested with valid data, THE System SHALL create organization, Super_Admin role, and admin user atomically in a single database transaction
8. THE Bootstrap_Transaction SHALL create organization with status "active"
9. THE Bootstrap_Transaction SHALL create or ensure Super_Admin role exists with permissions ["*"] (all permissions)
10. THE Bootstrap_Transaction SHALL create admin user with emailVerified=true (pre-verified, no email verification required)
11. THE Bootstrap_Transaction SHALL hash the admin password using bcrypt before storage
12. THE Bootstrap_Transaction SHALL log a SYSTEM_BOOTSTRAP audit event with IP address and user agent
13. WHEN bootstrap transaction fails at any step, THE System SHALL rollback all changes and return error
14. THE Bootstrap_Endpoint SHALL be rate-limited to 5 attempts per hour per IP address
15. THE Bootstrap_Endpoint SHALL validate timezone using Intl.DateTimeFormat
16. THE Bootstrap_Endpoint SHALL validate currency code format (3 uppercase letters)
17. THE Bootstrap_Endpoint SHALL validate subdomain format (lowercase alphanumeric with hyphens only)
18. THE Bootstrap_Endpoint SHALL normalize email to lowercase
19. WHEN bootstrap succeeds, THE System SHALL return 201 Created with organizationId, adminUserId, and organizationName
20. THE Frontend SHALL detect bootstrap requirement on app load by calling bootstrap status endpoint
21. WHEN bootstrap is required, THE Frontend SHALL display Bootstrap Page instead of login page
22. THE Bootstrap_Page SHALL present a form with organization and admin user fields
23. THE Bootstrap_Page SHALL validate all fields client-side matching backend validation rules
24. THE Bootstrap_Page SHALL show password strength indicator
25. THE Bootstrap_Page SHALL auto-detect user's timezone as default value
26. WHEN bootstrap succeeds, THE Frontend SHALL display success message and redirect to login page
27. WHEN bootstrap fails, THE Frontend SHALL display clear error message
28. THE Bootstrap_Page SHALL be responsive and work on mobile, tablet, and desktop
29. THE Bootstrap_Page SHALL use MUI theme tokens for consistent styling
30. THE Bootstrap_Mechanism SHALL be independent of Phase 17 mock data and work in production environments
31. THE Bootstrap_Implementation_Phase SHALL be Phase 03.5 (after infrastructure, before authentication)
32. THE System SHALL log bootstrap attempts (success and failure) to audit log with IP address
33. THE Bootstrap_Service SHALL use synthetic actor context with actorId="SYSTEM" and actorType="system"
34. THE Bootstrap_Constants SHALL include AUDIT_ACTIONS.SYSTEM_BOOTSTRAP and ENTITY_TYPES.SYSTEM
35. THE Bootstrap_Routes SHALL be registered before authentication routes in main router

#### Implementation Notes

- Bootstrap is a **production mechanism**, not a development convenience
- Bootstrap must be implemented in **Phase 03.5** (after core infrastructure, before authentication)
- Bootstrap endpoints are **intentionally unauthenticated** (no users exist yet)
- Primary security control is **organization count check** (bootstrap only works when count is zero)
- Bootstrap uses **atomic transaction** to prevent partial state
- Bootstrap admin user is **pre-verified** (no email verification required)
- Bootstrap is **independent of mock data** (Phase 17)
- Frontend must **detect bootstrap requirement** on app load
- Bootstrap page must be **accessible without authentication**

### Requirement 1: User Authentication and Session Management

**User Story:** As a system user, I want secure authentication and session management, so that I can access the system safely and my sessions are properly controlled.

#### Acceptance Criteria

1. WHEN a new user receives an invitation email, THE System SHALL send an email containing a secure invitation link with a time-limited token
2. WHEN an invited user clicks the invitation link, THE System SHALL present an account setup form requiring email verification, password creation, and profile completion
3. THE Password_Policy SHALL enforce minimum 12 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
4. WHEN a user submits valid login credentials, THE System SHALL return an access token (stored in client memory) and an httpOnly refresh token cookie
5. THE Access_Token SHALL expire after 15 minutes
6. THE Refresh_Token SHALL expire after 7 days
7. WHEN an access token expires, THE System SHALL use the refresh token to issue a new access token without requiring re-login
8. WHEN a user requests password reset, THE System SHALL send a password reset email with a time-limited token valid for 1 hour
9. WHEN a user changes their password, THE System SHALL invalidate all existing sessions except the current session
10. WHEN a user logs out, THE System SHALL invalidate the current session and clear the refresh token cookie
11. WHEN a user selects "logout all sessions", THE System SHALL invalidate all sessions for that user across all devices
12. WHEN a user fails login 5 times within 15 minutes, THE System SHALL lock the account for 30 minutes
13. WHEN an account is locked, THE System SHALL send a security notification email to the user
14. WHEN a user logs in from a new device or location, THE System SHALL send a security notification email
15. THE System SHALL store session records in the database with user ID, device info, IP address, login time, last activity time, and expiration time
16. WHEN a session is inactive for 24 hours, THE Background_Job SHALL automatically expire and remove the session
17. THE System SHALL support viewing active sessions with device, location, and last activity information
18. THE System SHALL support revoking specific sessions by session ID
19. WHEN a user's role or permissions change, THE System SHALL force logout all active sessions for that user
20. THE System SHALL log all authentication events (login, logout, password change, account lockout) to the audit log

### Requirement 2: Organization and Property Management

**User Story:** As a corporate administrator, I want to manage organization settings and multiple properties, so that I can standardize operations across the portfolio while allowing property-level configuration.

#### Acceptance Criteria

1. THE System SHALL support one organization per deployment instance
2. THE Organization SHALL have a name, timezone, default language, logo, and contact information
3. WHEN an organization is created, THE System SHALL automatically create default roles, statuses, priorities, and categories
4. THE System SHALL support multiple properties under one organization
5. THE Property SHALL have a name, code, type, address, timezone, contact information, and operational status
6. THE Property_Type SHALL be one of: Hotel, Resort, Serviced_Apartment, Vacation_Club, Spa, Restaurant, Event_Venue, Mixed_Use
7. THE Property_Status SHALL be one of: Active, Seasonal_Closed, Temporarily_Closed, Under_Renovation, Inactive
8. WHEN a property is created, THE System SHALL automatically create a root location for that property
9. THE System SHALL support property-specific business hours configuration
10. THE System SHALL support property-specific holiday calendar configuration
11. THE System SHALL support property-specific quiet hours configuration (e.g., 10 PM - 7 AM)
12. THE System SHALL support property-specific service windows by location type (e.g., guest rooms: 9 AM - 5 PM)
13. THE System SHALL support property-specific blackout windows for planned maintenance
14. THE System SHALL support property-specific SLA policies
15. THE System SHALL support property-specific numbering rules for work orders, requests, assets, and PMs
16. THE System SHALL support property-specific custom fields for work orders, assets, and locations
17. WHEN a property is deactivated, THE System SHALL prevent new work creation but preserve historical data
18. THE System SHALL support cross-property reporting for corporate users with appropriate scope
19. THE System SHALL enforce property-level data isolation for property-scoped users
20. THE System SHALL log all organization and property configuration changes to the audit log

### Requirement 3: Location Hierarchy Management

**User Story:** As a property manager, I want to manage a hierarchical location structure, so that I can organize maintenance work by building, floor, room, and sub-location.

#### Acceptance Criteria

1. THE System SHALL support hierarchical locations with parent-child relationships
2. THE Location_Type SHALL be one of: Property, Building, Tower, Wing, Villa_Cluster, Floor, Zone, Department_Area, Room, Suite, Villa, Outlet, Hall, Public_Area, Plant_Room, Kitchen, Laundry, Pool, Spa_Area, Gym, Ballroom, Conference_Room, Restaurant, Bar, Lobby, Corridor, Storeroom, Bin, Bathroom, Rooftop_Unit_Zone, Panel_Room, Kitchen_Line, Other
3. THE Location SHALL have a name, code, type, parent location, property, description, area size, capacity, and operational status
4. THE Location_Status SHALL be one of: Active, Out_Of_Service, Out_Of_Order, Under_Maintenance, Temporarily_Closed, Seasonal_Closed, Inactive
5. WHEN a location is a guest room, THE System SHALL support room-specific attributes: room number, room type, occupancy status, DND flag, VIP flag, housekeeping status
6. THE Room_Occupancy_Status SHALL be one of: Vacant, Occupied, Checkout, Blocked
7. THE Housekeeping_Status SHALL be one of: Clean, Dirty, Inspected, Out_Of_Order
8. THE System SHALL support location-specific service windows that override property defaults
9. THE System SHALL support location-specific access restrictions
10. THE System SHALL support location-specific contact information (e.g., department manager)
11. THE System SHALL support location-specific custom fields
12. WHEN a location is created, THE System SHALL validate that the parent location exists and belongs to the same property
13. WHEN a location is deactivated, THE System SHALL prevent new work assignment but preserve historical data
14. THE System SHALL support location tree navigation with expand/collapse functionality
15. THE System SHALL support location search by name, code, type, or parent location
16. THE System SHALL support location filtering by property, type, status, or custom fields
17. THE System SHALL support bulk location import via CSV
18. THE System SHALL support location QR code generation for mobile scanning
19. THE System SHALL enforce location-based permissions for users with location scope restrictions
20. THE System SHALL log all location changes to the audit log

### Requirement 4: User and Role Management

**User Story:** As a corporate administrator, I want to manage users, roles, and permissions, so that I can control access and enforce security policies across the organization.

#### Acceptance Criteria

1. THE System SHALL support built-in roles: Super_Admin, Corporate_Admin, Corporate_Engineering_Director, Property_Manager, Chief_Engineer, Maintenance_Supervisor, Maintenance_Planner, Technician, Inventory_Controller, Vendor_Coordinator, Requester, Vendor_User, Read_Only_User
2. THE System SHALL support custom role creation with configurable permissions
3. THE Permission_Key SHALL include: view_dashboard, create_request, view_request, edit_request, delete_request, approve_request, create_work_order, view_work_order, edit_work_order, delete_work_order, assign_work_order, complete_work_order, verify_work_order, create_pm_plan, view_pm_plan, edit_pm_plan, delete_pm_plan, create_asset, view_asset, edit_asset, delete_asset, transfer_asset, retire_asset, create_part, view_part, edit_part, delete_part, adjust_inventory, transfer_inventory, create_vendor, view_vendor, edit_vendor, delete_vendor, assign_vendor_work, view_report, export_report, view_audit_log, manage_users, manage_roles, manage_properties, manage_locations, manage_settings, manage_master_data
4. THE User SHALL have first name, last name, email, phone, job title, employee ID, status, and profile photo
5. THE User_Status SHALL be one of: Active, Inactive, Locked, Pending_Invitation
6. THE User SHALL be assigned to one or more properties
7. THE User SHALL be assigned to one or more locations (optional, for location-scoped access)
8. THE User SHALL be assigned to one or more roles
9. THE User SHALL be assigned to one or more teams (optional)
10. WHEN a user is created, THE System SHALL send an invitation email
11. WHEN a user is deactivated, THE System SHALL immediately revoke all active sessions
12. WHEN a user's role changes, THE System SHALL immediately revoke all active sessions and require re-login
13. WHEN a user's property scope changes, THE System SHALL immediately revoke all active sessions and require re-login
14. THE System SHALL support user search by name, email, role, property, or status
15. THE System SHALL support user filtering by role, property, location, team, or status
16. THE System SHALL support bulk user import via CSV
17. THE System SHALL support user profile editing by the user (name, phone, photo, notification preferences)
18. THE System SHALL support user password change by the user
19. THE System SHALL support forced password reset by administrators
20. THE System SHALL log all user and role changes to the audit log

### Requirement 5: Team Management

**User Story:** As a maintenance supervisor, I want to organize users into teams, so that I can assign work to teams and manage workload distribution.

#### Acceptance Criteria

1. THE Team SHALL have a name, description, property, team lead, and members
2. THE Team SHALL belong to one property
3. THE Team SHALL have one team lead (optional)
4. THE Team SHALL have multiple members
5. WHEN a team is created, THE System SHALL validate that all members belong to the same property
6. THE System SHALL support team-based work order assignment
7. WHEN a work order is assigned to a team, THE System SHALL notify all team members
8. THE System SHALL support team-based workload reporting
9. THE System SHALL support team-based performance metrics
10. THE System SHALL support team search by name or property
11. THE System SHALL support team filtering by property or team lead
12. THE System SHALL log all team changes to the audit log

### Requirement 6: Asset Management

**User Story:** As a chief engineer, I want to manage assets with full lifecycle tracking, so that I can maintain equipment history, warranties, and maintenance records.

#### Acceptance Criteria

1. THE Asset SHALL have a name, asset tag, serial number, model number, manufacturer, category, subcategory, description, purchase date, purchase cost, warranty expiration, location, parent asset, status, criticality, and custom fields
2. THE Asset_Category SHALL be configurable master data (e.g., HVAC, Plumbing, Electrical, Kitchen_Equipment, Laundry_Equipment, Pool_Equipment, Elevator, Fire_Safety, Security, IT_Equipment, Furniture, Fixture)
3. THE Asset_Status SHALL be one of: Active, In_Service, Out_Of_Service, Under_Maintenance, Awaiting_Repair, Awaiting_Parts, Retired, Disposed
4. THE Asset_Criticality SHALL be one of: Critical, High, Medium, Low
5. THE System SHALL support asset hierarchies (parent-child relationships)
6. THE System SHALL support asset-location assignment
7. WHEN an asset is assigned to a location, THE System SHALL validate that the location exists and is active
8. THE System SHALL support asset transfer between locations
9. WHEN an asset is transferred, THE System SHALL create an audit log entry with old location, new location, transfer date, and actor
10. THE System SHALL support asset replacement workflow
11. WHEN an asset is replaced, THE System SHALL link the old asset to the new asset and transfer work history references
12. THE System SHALL support asset retirement workflow
13. WHEN an asset is retired, THE System SHALL prevent new work assignment but preserve historical data
14. THE System SHALL support asset document attachments (manuals, warranties, photos, diagrams)
15. THE System SHALL support asset QR code generation for mobile scanning
16. THE System SHALL support asset search by name, tag, serial number, model, manufacturer, category, location, or status
17. THE System SHALL support asset filtering by property, location, category, status, criticality, or custom fields
18. THE System SHALL support bulk asset import via CSV
19. THE System SHALL display asset work history (all work orders linked to the asset)
20. THE System SHALL display asset downtime history (all downtime events linked to the asset)
21. THE System SHALL display asset cost history (all work order costs linked to the asset)
22. THE System SHALL calculate asset MTTR (Mean Time To Repair)
23. THE System SHALL calculate asset MTBF (Mean Time Between Failures)
24. THE System SHALL log all asset changes to the audit log

### Requirement 7: Asset Meter Management

**User Story:** As a maintenance planner, I want to track asset meters and readings, so that I can trigger meter-based preventive maintenance.

#### Acceptance Criteria

1. THE Asset_Meter SHALL have a name, unit of measure, meter type, current reading, last reading date, and asset
2. THE Meter_Type SHALL be one of: Hours, Cycles, Miles, Kilometers, Gallons, Liters, Kilowatt_Hours, Other
3. THE Asset SHALL support multiple meters
4. THE System SHALL support meter reading entry with reading value, reading date, and notes
5. WHEN a meter reading is entered, THE System SHALL validate that the reading value is greater than or equal to the previous reading
6. THE System SHALL support meter reading history display
7. THE System SHALL support meter-based PM plan triggers
8. WHEN a meter reading reaches a PM trigger threshold, THE System SHALL generate a PM work order
9. THE System SHALL support meter reading import via CSV
10. THE System SHALL log all meter and reading changes to the audit log

### Requirement 8: Document and Attachment Management

**User Story:** As a technician, I want to attach photos, documents, and files to work orders and assets, so that I can provide evidence and reference materials.

#### Acceptance Criteria

1. THE Document SHALL have a filename, file type, file size, upload date, uploaded by, description, and entity reference
2. THE Entity_Reference SHALL link to: Asset, Work_Order, Work_Request, PM_Plan, Inspection, Vendor, Location, User
3. THE System SHALL support file upload via drag-and-drop or file picker
4. THE System SHALL support multiple file upload
5. THE Allowed_File_Types SHALL include: PDF, DOC, DOCX, XLS, XLSX, JPG, JPEG, PNG, GIF, MP4, MOV
6. THE Maximum_File_Size SHALL be 25 MB per file
7. THE System SHALL validate file type and size before upload
8. THE System SHALL store files on local disk with unique filenames
9. THE System SHALL support file download
10. THE System SHALL support file preview for images and PDFs
11. THE System SHALL support file deletion with permission check
12. WHEN a file is deleted, THE System SHALL move the file to a soft-delete state and log the deletion
13. THE System SHALL support image lightbox viewing with zoom and navigation
14. THE System SHALL support document search by filename or description
15. THE System SHALL log all document changes to the audit log

### Requirement 9: Work Request Intake and Triage

**User Story:** As a requester, I want to submit maintenance requests easily, so that issues are reported quickly and routed to the right team.

#### Acceptance Criteria

1. THE Work_Request SHALL have a title, description, location, asset, priority, category, requester, request date, due date, status, assigned to, and custom fields
2. THE Request_Priority SHALL be one of: Emergency, Urgent, High, Medium, Low
3. THE Request_Status SHALL be one of: Draft, Submitted, Under_Review, Approved, Rejected, Cancelled, Converted_To_Work_Order
4. THE Request_Category SHALL be configurable master data (e.g., HVAC, Plumbing, Electrical, Carpentry, Painting, Cleaning, Pest_Control, Landscaping, Security, IT, Other)
5. WHEN a requester submits a request, THE System SHALL validate required fields: title, description, location, priority, category
6. WHEN a request is submitted, THE System SHALL check for duplicate requests in the same location within the last 7 days
7. WHEN a potential duplicate is found, THE System SHALL display a warning with similar requests and allow the requester to proceed or cancel
8. WHEN a request is submitted, THE System SHALL send a notification to the assigned dispatcher or supervisor
9. THE System SHALL support request approval workflow
10. WHEN a request is approved, THE System SHALL allow conversion to a work order
11. WHEN a request is converted to a work order, THE System SHALL copy all request data to the work order and link the request to the work order
12. WHEN a request is rejected, THE System SHALL require a rejection reason and send a notification to the requester
13. WHEN a request is cancelled, THE System SHALL require a cancellation reason and send a notification to relevant parties
14. THE System SHALL support request clarification workflow
15. WHEN a dispatcher requests clarification, THE System SHALL send a notification to the requester and change status to Under_Review
16. THE System SHALL support request portal for external requesters (housekeeping, front office, F&B, etc.)
17. THE Request_Portal SHALL display only the requester's own requests
18. THE System SHALL support request search by title, description, location, asset, requester, or status
19. THE System SHALL support request filtering by property, location, priority, category, status, or date range
20. THE System SHALL support bulk request import via CSV
21. THE System SHALL log all request changes to the audit log

### Requirement 10: Work Order Core Lifecycle

**User Story:** As a maintenance supervisor, I want to manage work orders through their complete lifecycle, so that I can plan, assign, track, and close maintenance work efficiently.

#### Acceptance Criteria

1. THE Work_Order SHALL have a work order number, title, description, work type, priority, severity, guest impact, location, asset, assigned to, assigned team, scheduled start, scheduled end, actual start, actual end, status, completion notes, verification notes, and custom fields
2. THE Work_Order_Number SHALL follow property-specific numbering rules (e.g., WO-2024-001234)
3. THE Work_Type SHALL be one of: Corrective, Emergency, Preventive, Inspection_Follow_Up, Vendor, Planned, Project
4. THE Work_Priority SHALL be one of: Emergency, Urgent, High, Medium, Low
5. THE Work_Severity SHALL be one of: Critical, Major, Moderate, Minor
6. THE Guest_Impact SHALL be one of: High, Medium, Low, None
7. THE Work_Status SHALL be one of: Draft, Open, Assigned, Scheduled, In_Progress, On_Hold, Awaiting_Parts, Awaiting_Approval, Completed, Verified, Closed, Cancelled
8. WHEN a work order is created, THE System SHALL auto-generate a unique work order number
9. WHEN a work order is created from a request, THE System SHALL copy request data and link to the source request
10. WHEN a work order is created from a PM plan, THE System SHALL copy PM plan data and link to the source PM plan
11. THE System SHALL support work order assignment to a user or team
12. WHEN a work order is assigned, THE System SHALL send a notification to the assignee
13. WHEN a work order is reassigned, THE System SHALL send notifications to both old and new assignees
14. THE System SHALL support work order scheduling with start and end date/time
15. WHEN a work order is scheduled for an occupied room, THE System SHALL validate service window compliance
16. WHEN a work order is scheduled for a DND room, THE System SHALL block scheduling unless work type is Emergency
17. WHEN a work order is scheduled for a VIP room, THE System SHALL require supervisor approval before status changes to Assigned or Scheduled
18. THE System SHALL support work order status transitions with validation rules
19. THE Status_Transition_Rules SHALL enforce: Draft → Open → Assigned → Scheduled → In_Progress → Completed → Verified → Closed
20. THE System SHALL allow status changes to On_Hold, Awaiting_Parts, or Cancelled from most statuses
21. WHEN a work order status changes to In_Progress, THE System SHALL record actual start time
22. WHEN a work order status changes to Completed, THE System SHALL require completion notes and record actual end time
23. WHEN a work order status changes to Completed, THE System SHALL validate that all required checklist tasks are completed
24. WHEN a work order status changes to Verified, THE System SHALL require verification notes
25. WHEN a work order status changes to Closed, THE System SHALL prevent further edits except by administrators
26. THE System SHALL support work order reopening from Closed status
27. WHEN a work order is reopened, THE System SHALL require a reopen reason and create an audit log entry
28. THE System SHALL support work order cancellation with reason
29. WHEN a work order is cancelled, THE System SHALL send notifications to relevant parties
30. THE System SHALL support work order merging
31. WHEN work orders are merged, THE System SHALL combine all data, link to the primary work order, and close duplicate work orders
32. THE System SHALL support work order tasks (sub-tasks within a work order)
33. THE Task SHALL have a description, assigned to, status, and completion notes
34. THE System SHALL support work order checklists
35. THE Checklist SHALL have multiple checklist items with response types: Pass_Fail, Yes_No, Text, Number, Photo
36. THE System SHALL support required checklist items that must be completed before work order completion
37. THE System SHALL support work order labor tracking
38. THE Labor_Entry SHALL have a user, start time, end time, duration, and notes
39. THE System SHALL support labor timer functionality (start/stop timer)
40. THE System SHALL calculate total labor hours from all labor entries
41. THE System SHALL support work order parts usage tracking
42. THE Parts_Usage SHALL have a part, quantity used, unit cost, and total cost
43. THE System SHALL calculate total parts cost from all parts usage entries
44. THE System SHALL calculate total work order cost (labor cost + parts cost + vendor cost)
45. THE System SHALL support work order comments
46. THE Comment SHALL have a user, timestamp, comment text, and visibility (internal or external)
47. THE System SHALL support @mentions in comments to notify specific users
48. THE System SHALL support work order attachments (photos, documents, videos)
49. THE System SHALL support work order downtime tracking
50. THE Downtime_Event SHALL have a start time, end time, duration, reason, and impact level
51. THE System SHALL calculate total downtime from all downtime events
52. THE System SHALL support work order SLA tracking
53. THE SLA_Metrics SHALL include: response time, start time, completion time, and SLA status (Met, At_Risk, Breached)
54. WHEN an SLA is breached, THE System SHALL send escalation notifications
55. THE System SHALL support work order search by work order number, title, description, location, asset, assignee, or status
56. THE System SHALL support work order filtering by property, location, work type, priority, severity, guest impact, status, assignee, date range, or custom fields
57. THE System SHALL support work order bulk actions: assign, reassign, change status, add to schedule
58. THE System SHALL support work order export to CSV and PDF
59. THE System SHALL log all work order changes to the audit log

### Requirement 11: Preventive Maintenance Plans

**User Story:** As a maintenance planner, I want to create and manage preventive maintenance plans, so that I can automate recurring maintenance work and improve asset reliability.

#### Acceptance Criteria

1. THE PM_Plan SHALL have a name, description, plan type, trigger type, frequency, location, asset, assigned to, assigned team, checklist template, estimated duration, parts list, status, and custom fields
2. THE Plan_Type SHALL be one of: Time_Based, Meter_Based, Seasonal, Hybrid
3. THE Trigger_Type SHALL be one of: Calendar, Meter_Reading, Seasonal_Event, Manual
4. THE PM_Status SHALL be one of: Active, Paused, Inactive, Archived
5. THE Frequency SHALL support: Daily, Weekly, Biweekly, Monthly, Quarterly, Semiannual, Annual, Custom_Interval
6. WHEN a PM plan is time-based, THE System SHALL require frequency and start date
7. WHEN a PM plan is meter-based, THE System SHALL require meter, trigger threshold, and reset behavior
8. WHEN a PM plan is seasonal, THE System SHALL require seasonal trigger dates (e.g., opening date, closing date)
9. WHEN a PM plan is hybrid, THE System SHALL support multiple trigger types
10. THE System SHALL support PM plan generation lead time (e.g., generate work orders 7 days before due date)
11. THE System SHALL support PM plan blackout windows
12. WHEN a PM generation date falls within a blackout window, THE System SHALL skip to the next available date
13. THE System SHALL support PM plan service window compliance
14. WHEN a PM plan is for a guest room, THE System SHALL generate work orders only during allowed service windows
15. THE System SHALL support PM plan checklist template assignment
16. WHEN a PM work order is generated, THE System SHALL copy the checklist template to the work order
17. THE System SHALL support PM plan parts list
18. WHEN a PM work order is generated, THE System SHALL copy the parts list to the work order
19. THE System SHALL support PM plan document attachments (procedures, diagrams, safety instructions)
20. THE System SHALL support PM occurrence tracking
21. THE PM_Occurrence SHALL have a due date, generated date, work order, status, and completion date
22. THE Occurrence_Status SHALL be one of: Scheduled, Generated, In_Progress, Completed, Missed, Skipped, Deferred
23. WHEN a PM occurrence is missed, THE System SHALL send a notification to the planner
24. WHEN a PM occurrence is skipped, THE System SHALL require a skip reason
25. WHEN a PM occurrence is deferred, THE System SHALL require a defer reason and new due date
26. THE System SHALL support PM plan calendar view
27. THE PM_Calendar SHALL display all PM occurrences by month with color coding by status
28. THE System SHALL support PM plan forecast view
29. THE PM_Forecast SHALL display upcoming PM occurrences for the next 90 days
30. THE System SHALL support PM plan effectiveness metrics
31. THE PM_Effectiveness_Metrics SHALL include: compliance rate, on-time completion rate, average completion time, cost per occurrence
32. THE System SHALL support PM plan search by name, description, location, asset, or status
33. THE System SHALL support PM plan filtering by property, location, plan type, trigger type, status, or assigned to
34. THE System SHALL support PM plan bulk actions: activate, pause, deactivate
35. THE System SHALL support PM plan export to CSV and PDF
36. THE System SHALL log all PM plan changes to the audit log

### Requirement 12: Inspections and Checklists

**User Story:** As a quality manager, I want to create inspection templates and execute inspections, so that I can ensure compliance and capture evidence.

#### Acceptance Criteria

1. THE Checklist_Template SHALL have a name, description, version, category, location type, asset type, checklist items, and status
2. THE Template_Status SHALL be one of: Draft, Active, Archived
3. THE Checklist_Item SHALL have a sequence number, description, response type, required flag, conditional logic, pass criteria, and fail action
4. THE Response_Type SHALL be one of: Pass_Fail, Yes_No, Text, Number, Photo, Signature, Date, Time, Dropdown, Checkbox
5. THE Fail_Action SHALL be one of: None, Create_Request, Create_Work_Order, Block_Completion
6. THE System SHALL support checklist template versioning
7. WHEN a checklist template is updated, THE System SHALL create a new version and preserve the old version
8. WHEN a checklist is executed, THE System SHALL use the template version active at execution time
9. THE System SHALL support required checklist items
10. WHEN a checklist has required items, THE System SHALL prevent completion until all required items are completed
11. THE System SHALL support conditional checklist items
12. WHEN a checklist item has conditional logic, THE System SHALL show or hide the item based on previous responses
13. THE System SHALL support checklist item pass/fail criteria
14. WHEN a checklist item fails, THE System SHALL execute the configured fail action
15. WHEN a fail action is Create_Request, THE System SHALL automatically create a work request with checklist context
16. WHEN a fail action is Create_Work_Order, THE System SHALL automatically create a work order with checklist context
17. WHEN a fail action is Block_Completion, THE System SHALL prevent work order completion until the item passes
18. THE System SHALL support inspection execution
19. THE Inspection_Execution SHALL have a checklist template, inspector, inspection date, location, asset, responses, overall result, and notes
20. THE Overall_Result SHALL be one of: Pass, Pass_With_Deficiencies, Fail
21. THE System SHALL support inspection response capture with photos and notes
22. THE System SHALL support inspection signature capture
23. THE System SHALL support inspection export to PDF with all responses and photos
24. THE System SHALL support inspection search by template, inspector, location, asset, or date
25. THE System SHALL support inspection filtering by property, location, template, result, or date range
26. THE System SHALL log all checklist template and inspection changes to the audit log

### Requirement 13: Inventory and Spare Parts Management

**User Story:** As an inventory controller, I want to manage spare parts inventory, so that I can prevent stockouts and track parts usage.

#### Acceptance Criteria

1. THE Part SHALL have a part number, name, description, category, manufacturer, model, unit of measure, unit cost, reorder point, reorder quantity, critical flag, substitute parts, and custom fields
2. THE Part_Category SHALL be configurable master data (e.g., HVAC_Parts, Plumbing_Parts, Electrical_Parts, Kitchen_Parts, Laundry_Parts, Pool_Parts, General_Supplies)
3. THE Unit_Of_Measure SHALL be one of: Each, Box, Case, Gallon, Liter, Pound, Kilogram, Foot, Meter, Roll, Set, Pair, Other
4. THE System SHALL support part master records shared across properties
5. THE System SHALL support part substitute relationships
6. WHEN a part is out of stock, THE System SHALL suggest substitute parts
7. THE Inventory_Stock_Line SHALL have a part, property, storeroom, bin, quantity on hand, quantity reserved, quantity available, min quantity, max quantity, and reorder point
8. THE Quantity_Available SHALL be calculated as: Quantity_On_Hand - Quantity_Reserved
9. THE System SHALL support multiple stock lines per part (one per property/storeroom/bin combination)
10. THE System SHALL support inventory transaction tracking
11. THE Inventory_Transaction SHALL have a transaction type, part, stock line, quantity, unit cost, total cost, reference (work order, vendor, etc.), transaction date, and performed by
12. THE Transaction_Type SHALL be one of: Receipt, Issue, Return, Transfer, Adjustment, Cycle_Count
13. WHEN a part is issued to a work order, THE System SHALL create an Issue transaction and reduce quantity on hand
14. WHEN a part is returned from a work order, THE System SHALL create a Return transaction and increase quantity on hand
15. WHEN a part is transferred between storerooms, THE System SHALL create Transfer transactions for both source and destination
16. WHEN a part quantity is adjusted, THE System SHALL create an Adjustment transaction with reason
17. WHEN a cycle count is performed, THE System SHALL create a Cycle_Count transaction with counted quantity and variance
18. THE System SHALL support inventory reservation for work orders
19. WHEN a work order requires parts, THE System SHALL allow reserving parts from available inventory
20. WHEN parts are reserved, THE System SHALL increase quantity reserved and decrease quantity available
21. WHEN a work order is completed or cancelled, THE System SHALL release reserved parts
22. THE System SHALL support low stock alerts
23. WHEN quantity available falls below reorder point, THE System SHALL send a notification to inventory controllers
24. WHEN a critical part falls below min quantity, THE System SHALL send an urgent notification
25. THE System SHALL support inventory replenishment workflow
26. THE Replenishment_Request SHALL have a part, requested quantity, vendor, expected delivery date, and status
27. THE System SHALL support inventory search by part number, name, description, category, or manufacturer
28. THE System SHALL support inventory filtering by property, storeroom, category, low stock, critical, or custom fields
29. THE System SHALL support inventory valuation reporting (total value, value by category, value by property)
30. THE System SHALL support inventory transaction history reporting
31. THE System SHALL support inventory turnover metrics
32. THE System SHALL support bulk inventory import via CSV
33. THE System SHALL log all inventory changes to the audit log

### Requirement 14: Vendor and Contractor Management

**User Story:** As a vendor coordinator, I want to manage vendors and assign external work, so that I can track vendor performance and ensure compliance.

#### Acceptance Criteria

1. THE Vendor SHALL have a name, vendor code, vendor type, contact name, email, phone, address, tax ID, insurance expiration, license expiration, compliance documents, status, and custom fields
2. THE Vendor_Type SHALL be one of: Service_Provider, Supplier, Contractor, Consultant, Other
3. THE Vendor_Status SHALL be one of: Active, Inactive, Suspended, Pending_Approval
4. THE System SHALL support vendor compliance document tracking
5. THE Compliance_Document SHALL have a document type, document number, issue date, expiration date, and file attachment
6. THE Document_Type SHALL be configurable master data (e.g., Insurance_Certificate, Business_License, Safety_Certification, Background_Check)
7. WHEN a compliance document expires within 30 days, THE System SHALL send a notification to vendor coordinators
8. WHEN a compliance document expires, THE System SHALL prevent new work assignment to that vendor
9. THE System SHALL support vendor user accounts with restricted access
10. THE Vendor_User SHALL have access only to work orders assigned to their vendor
11. THE Vendor_User SHALL be able to view work order details, add comments, upload attachments, and update status
12. THE Vendor_User SHALL NOT be able to view other vendors' work or internal work orders
13. THE System SHALL support vendor work order assignment
14. WHEN a work order is assigned to a vendor, THE System SHALL send a notification to the vendor contact and vendor users
15. THE System SHALL support vendor work order completion workflow
16. WHEN a vendor completes work, THE System SHALL require completion notes and attachments
17. WHEN a vendor marks work as completed, THE System SHALL send a notification to the vendor coordinator for verification
18. THE System SHALL support vendor performance tracking
19. THE Vendor_Performance_Metrics SHALL include: total work orders, on-time completion rate, average completion time, average cost, quality rating
20. THE System SHALL support vendor rating by work order
21. THE Work_Order_Rating SHALL have a rating (1-5 stars), quality score, timeliness score, and comments
22. THE System SHALL support vendor search by name, vendor code, type, or status
23. THE System SHALL support vendor filtering by property, type, status, or compliance status
24. THE System SHALL support vendor export to CSV and PDF
25. THE System SHALL log all vendor changes to the audit log

### Requirement 15: Notifications and Real-Time Updates

**User Story:** As a system user, I want to receive timely notifications and see real-time updates, so that I can respond quickly to important events.

#### Acceptance Criteria

1. THE Notification SHALL have a recipient, notification type, event type, entity reference, title, message, delivery channel, delivery status, read status, and timestamp
2. THE Notification_Type SHALL be one of: Info, Warning, Alert, Success, Error
3. THE Event_Type SHALL include: Request_Created, Request_Approved, Request_Rejected, Work_Order_Created, Work_Order_Assigned, Work_Order_Reassigned, Work_Order_Status_Changed, Work_Order_Completed, Work_Order_Verified, Work_Order_Overdue, PM_Generated, PM_Missed, Inspection_Failed, Part_Low_Stock, Part_Out_Of_Stock, Vendor_Assigned, Vendor_Completed, User_Mentioned, Document_Uploaded, Comment_Added, SLA_At_Risk, SLA_Breached, Compliance_Document_Expiring, Compliance_Document_Expired
4. THE Delivery_Channel SHALL be one of: In_App, Email, Both
5. THE Delivery_Status SHALL be one of: Queued, Sent, Delivered_If_Known, Failed, Read
6. THE System SHALL support user notification preferences
7. THE Notification_Preference SHALL allow users to enable/disable notifications by event type and delivery channel
8. THE System SHALL support quiet hours for email notifications
9. WHEN a notification is generated during quiet hours, THE System SHALL queue the notification and send after quiet hours end
10. THE System SHALL support notification batching for email
11. WHEN multiple notifications are queued for the same user, THE System SHALL batch them into a single email digest
12. THE System SHALL support in-app notification center
13. THE Notification_Center SHALL display all notifications for the current user with unread count
14. THE System SHALL support notification marking as read/unread
15. THE System SHALL support notification deletion
16. THE System SHALL support notification filtering by type, read status, or date range
17. THE System SHALL support real-time updates via Socket.IO
18. THE Socket_Event SHALL include: work_order_updated, request_updated, pm_generated, notification_received, user_mentioned, comment_added
19. WHEN a socket event is received, THE System SHALL update the relevant UI component without full page reload
20. THE System SHALL support socket room subscriptions by property and user
21. THE System SHALL log all notification delivery attempts to the audit log

### Requirement 16: Dashboard and Home Experience

**User Story:** As a system user, I want a role-aware dashboard, so that I can see relevant KPIs and quick actions for my role.

#### Acceptance Criteria

1. THE Dashboard SHALL display role-specific widgets and KPIs
2. THE Super_Admin_Dashboard SHALL display: total properties, total users, total work orders, system health metrics
3. THE Corporate_Admin_Dashboard SHALL display: cross-property KPIs, property comparison charts, compliance metrics
4. THE Property_Manager_Dashboard SHALL display: property overview, open work orders, overdue work orders, PM compliance, guest impact issues, critical assets, low stock alerts
5. THE Chief_Engineer_Dashboard SHALL display: work order backlog, technician workload, PM schedule, asset downtime, parts usage
6. THE Maintenance_Supervisor_Dashboard SHALL display: assigned work orders, team workload, today's schedule, pending approvals
7. THE Technician_Dashboard SHALL display: my assigned work orders, my schedule, my labor hours, my completed work
8. THE Inventory_Controller_Dashboard SHALL display: low stock alerts, recent transactions, inventory value, reorder requests
9. THE Vendor_Coordinator_Dashboard SHALL display: vendor work orders, vendor performance, compliance expiring, vendor ratings
10. THE Requester_Dashboard SHALL display: my requests, request status, recent updates
11. THE KPI_Card SHALL display: value, label, trend indicator, comparison period, and click action
12. THE Chart_Widget SHALL support: bar chart, line chart, pie chart, donut chart, area chart
13. THE Chart SHALL support drilldown to filtered list views
14. WHEN a KPI card is clicked, THE System SHALL navigate to a filtered list view
15. WHEN a chart segment is clicked, THE System SHALL navigate to a filtered list view
16. THE Dashboard SHALL support date range filtering (today, this week, this month, this quarter, this year, custom range)
17. THE Dashboard SHALL support property filtering for multi-property users
18. THE Dashboard SHALL support widget refresh without full page reload
19. THE Dashboard SHALL support widget customization (show/hide, reorder)
20. THE System SHALL log dashboard views to analytics

### Requirement 17: Search and Saved Views

**User Story:** As a system user, I want to search across entities and save my favorite views, so that I can find information quickly and reuse common filters.

#### Acceptance Criteria

1. THE System SHALL support global search across: work orders, requests, assets, locations, users, vendors, parts
2. THE Search_Result SHALL display: entity type, entity name, entity ID, location, status, and relevance score
3. THE Search SHALL support fuzzy matching and partial word matching
4. THE Search SHALL support filtering by entity type
5. THE Search SHALL support sorting by relevance or date
6. THE System SHALL support module-specific search
7. THE Module_Search SHALL support advanced filters specific to each module
8. THE System SHALL support saved views
9. THE Saved_View SHALL have a name, description, module, filters, sort order, visible columns, and owner
10. THE Saved_View SHALL be private (visible only to owner) or shared (visible to all users in property)
11. THE System SHALL support saved view creation from current filter/sort/column state
12. THE System SHALL support saved view editing and deletion
13. THE System SHALL support saved view quick access from module list views
14. THE System SHALL support default saved view per module per user
15. THE System SHALL log saved view usage to analytics

### Requirement 18: Reporting and Analytics

**User Story:** As a corporate engineering director, I want comprehensive reports and analytics, so that I can measure performance and identify improvement opportunities.

#### Acceptance Criteria

1. THE System SHALL support standard reports: Work Order Summary, Work Order Backlog, Work Order Aging, PM Compliance, Asset Downtime, Asset Reliability, Inventory Valuation, Inventory Turnover, Vendor Performance, Labor Hours, Cost Analysis, SLA Performance, Guest Impact Analysis
2. THE Report SHALL support filtering by: property, location, date range, work type, priority, status, assignee, category
3. THE Report SHALL support grouping by: property, location, work type, priority, status, assignee, category, month, quarter, year
4. THE Report SHALL support sorting by any column
5. THE Report SHALL support export to CSV and PDF
6. THE PDF_Export SHALL include: report title, filters applied, generation date, data table, and charts
7. THE System SHALL support scheduled reports
8. THE Scheduled_Report SHALL have a report type, filters, recipients, frequency, and delivery time
9. THE System SHALL support report email delivery
10. WHEN a scheduled report is generated, THE System SHALL email the report to all recipients
11. THE System SHALL support cross-property reporting for corporate users
12. THE Cross_Property_Report SHALL aggregate data across multiple properties with property breakdown
13. THE System SHALL support custom report builder (future phase)
14. THE System SHALL log all report generation to analytics

### Requirement 19: Audit Logging and Traceability

**User Story:** As an auditor, I want complete audit trails, so that I can verify compliance and investigate issues.

#### Acceptance Criteria

1. THE Audit_Log SHALL have a timestamp, actor, action, entity type, entity ID, property, old values, new values, IP address, and user agent
2. THE Action SHALL include: Create, Update, Delete, Login, Logout, Approve, Reject, Assign, Complete, Verify, Close, Cancel, Transfer, Adjust, Import, Export
3. THE Entity_Type SHALL include: User, Role, Team, Property, Location, Asset, Work_Order, Work_Request, PM_Plan, Inspection, Part, Inventory_Line, Vendor, Document, Notification, Saved_View, Master_Data
4. THE System SHALL log all create, update, and delete operations
5. THE System SHALL log all authentication events
6. THE System SHALL log all permission-sensitive operations
7. THE System SHALL log all status changes
8. THE System SHALL log all assignment changes
9. THE System SHALL log all inventory transactions
10. THE System SHALL log all document uploads and deletions
11. THE Audit_Log SHALL be immutable (no updates or deletes allowed)
12. THE System SHALL support audit log search by actor, action, entity type, entity ID, or date range
13. THE System SHALL support audit log filtering by property, action, entity type, or date range
14. THE System SHALL support audit log export to CSV
15. THE System SHALL enforce audit log access restrictions based on user role and scope
16. THE System SHALL retain audit logs for minimum 7 years

### Requirement 20: Master Data and Configuration Management

**User Story:** As a corporate administrator, I want to configure master data and system settings, so that I can standardize operations across properties.

#### Acceptance Criteria

1. THE System SHALL support configurable master data categories: Work_Order_Categories, Request_Categories, Asset_Categories, Part_Categories, Location_Types, Priority_Levels, Status_Values, Reason_Codes, Custom_Fields
2. THE Master_Data_Config SHALL have a category, code, label, description, sort order, active flag, and property scope
3. THE Property_Scope SHALL be: Global (all properties) or Property_Specific
4. THE System SHALL support master data CRUD operations
5. THE System SHALL support master data import via CSV
6. THE System SHALL support master data export to CSV
7. THE System SHALL support custom field definitions
8. THE Custom_Field SHALL have a field name, field type, entity type, required flag, default value, validation rules, and property scope
9. THE Field_Type SHALL be one of: Text, Number, Date, Time, DateTime, Dropdown, Checkbox, Radio, Textarea
10. THE Entity_Type SHALL be one of: Work_Order, Work_Request, Asset, Location, Part, Vendor
11. THE System SHALL support numbering rule configuration
12. THE Numbering_Rule SHALL have an entity type, prefix, suffix, sequence start, sequence increment, and reset frequency
13. THE Reset_Frequency SHALL be one of: Never, Daily, Monthly, Yearly
14. THE System SHALL support business hours configuration
15. THE Business_Hours SHALL have a property, day of week, open time, close time, and active flag
16. THE System SHALL support holiday calendar configuration
17. THE Holiday SHALL have a property, holiday name, holiday date, and recurring flag
18. THE System SHALL support SLA policy configuration
19. THE SLA_Policy SHALL have a name, work type, priority, response time, start time, completion time, and escalation rules
20. THE Escalation_Rule SHALL have a trigger condition, delay, and notification recipients
21. THE System SHALL log all master data and configuration changes to the audit log

### Requirement 21: Data Import, Export, and Migration

**User Story:** As a system administrator, I want to import and export data in bulk, so that I can migrate from legacy systems and perform data maintenance.

#### Acceptance Criteria

1. THE System SHALL support CSV import for: properties, locations, users, roles, teams, assets, parts, inventory lines, vendors, work orders, work requests, PM plans
2. THE Import_Job SHALL have a job ID, import type, filename, uploaded by, upload date, status, total rows, successful rows, failed rows, and error file
3. THE Import_Status SHALL be one of: Uploaded, Validating, Validation_Failed, Validation_Passed, Importing, Import_Failed, Import_Completed
4. THE System SHALL support import dry-run mode
5. WHEN an import is in dry-run mode, THE System SHALL validate all rows without committing data
6. THE System SHALL generate a validation report with row-level errors
7. THE Validation_Error SHALL have a row number, column name, error message, and error type
8. THE Error_Type SHALL be one of: Required_Field_Missing, Invalid_Format, Invalid_Value, Duplicate_Key, Reference_Not_Found, Business_Rule_Violation
9. WHEN validation passes, THE System SHALL allow import commit
10. WHEN an import is committed, THE System SHALL create all records and log to audit log
11. WHEN an import fails, THE System SHALL rollback all changes and generate an error report
12. THE System SHALL support downloadable error file with all validation errors
13. THE System SHALL support import history view
14. THE System SHALL support CSV export for all list views
15. THE Export SHALL include all visible columns and applied filters
16. THE System SHALL support PDF export for: work orders, assets, reports, inspections
17. THE PDF_Export SHALL include entity details, related data, and attachments
18. THE System SHALL support bulk export via background job for large datasets
19. THE System SHALL log all import and export operations to the audit log

### Requirement 22: Security and Access Control

**User Story:** As a security administrator, I want robust security controls, so that I can protect sensitive data and prevent unauthorized access.

#### Acceptance Criteria

1. THE System SHALL enforce HTTPS for all connections
2. THE System SHALL use bcrypt for password hashing with salt rounds = 12
3. THE System SHALL use JWT for access tokens with HS256 algorithm
4. THE System SHALL use httpOnly cookies for refresh tokens
5. THE System SHALL require CSRF token for all mutating requests using refresh token authentication
6. THE System SHALL sanitize all user input to prevent XSS attacks
7. THE System SHALL sanitize all MongoDB queries to prevent NoSQL injection
8. THE System SHALL enforce rate limiting: 100 requests per minute per IP for API endpoints
9. THE System SHALL enforce rate limiting: 5 login attempts per 15 minutes per email
10. THE System SHALL enforce file upload limits: 25 MB per file, 100 MB per request
11. THE System SHALL validate file types using MIME type and file extension
12. THE System SHALL scan uploaded files for malware (future phase)
13. THE System SHALL enforce property-level data isolation
14. WHEN a user queries data, THE System SHALL filter results by user's property scope
15. THE System SHALL enforce location-level data isolation for location-scoped users
16. WHEN a user queries data, THE System SHALL filter results by user's location scope
17. THE System SHALL enforce permission checks before all operations
18. WHEN a user attempts an operation, THE System SHALL verify the user has the required permission
19. THE System SHALL log all security events to the audit log
20. THE System SHALL support security headers: X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Strict-Transport-Security, Content-Security-Policy

### Requirement 23: Performance and Scalability

**User Story:** As a system administrator, I want the system to perform well under load, so that users have a responsive experience.

#### Acceptance Criteria

1. THE System SHALL respond to API requests within 500ms for 95th percentile
2. THE System SHALL respond to dashboard page loads within 2 seconds for 95th percentile
3. THE System SHALL support 100 concurrent users per property
4. THE System SHALL support 1000 work orders per property per month
5. THE System SHALL support 10,000 assets per property
6. THE System SHALL support 100,000 audit log entries per property per year
7. THE System SHALL use database indexes for all frequently queried fields
8. THE System SHALL use pagination for all list views with page size = 50
9. THE System SHALL use lazy loading for large datasets
10. THE System SHALL use caching for frequently accessed data (user permissions, master data)
11. THE System SHALL use compression for API responses
12. THE System SHALL use CDN for static assets (future phase)
13. THE System SHALL use background jobs for long-running operations (imports, exports, reports)
14. THE System SHALL monitor API response times and log slow queries
15. THE System SHALL support horizontal scaling (future phase)

### Requirement 24: Reliability and Error Handling

**User Story:** As a system user, I want the system to handle errors gracefully, so that I understand what went wrong and can recover.

#### Acceptance Criteria

1. THE System SHALL return structured error responses with error code, error message, and field-level errors
2. THE Error_Code SHALL be one of: VALIDATION_ERROR, AUTHENTICATION_ERROR, AUTHORIZATION_ERROR, NOT_FOUND, CONFLICT, INTERNAL_ERROR, SERVICE_UNAVAILABLE
3. THE System SHALL log all errors to the application log with stack trace
4. THE System SHALL display user-friendly error messages in the UI
5. THE System SHALL support error boundary components in React to catch rendering errors
6. WHEN an error boundary catches an error, THE System SHALL display a fallback UI and log the error
7. THE System SHALL support retry logic for transient errors (network errors, database connection errors)
8. THE System SHALL support graceful degradation when non-critical services are unavailable
9. THE System SHALL support database transaction rollback on error
10. THE System SHALL support email notification for critical errors (future phase)

### Requirement 25: Observability and Monitoring

**User Story:** As a system administrator, I want comprehensive logging and monitoring, so that I can troubleshoot issues and monitor system health.

#### Acceptance Criteria

1. THE System SHALL use Winston for structured logging
2. THE Log_Level SHALL be one of: Error, Warn, Info, Debug
3. THE System SHALL log all API requests with: request ID, method, path, status code, response time, user ID
4. THE System SHALL log all errors with: error message, stack trace, request context, user context
5. THE System SHALL log all background job executions with: job name, start time, end time, status, error message
6. THE System SHALL support log rotation with daily rotation and 30-day retention
7. THE System SHALL support log aggregation (future phase with ELK stack or similar)
8. THE System SHALL support application metrics: request count, error count, response time, active users, database connections
9. THE System SHALL support health check endpoint: GET /health
10. THE Health_Check SHALL return: status (healthy/unhealthy), database status, cache status, uptime

### Requirement 26: Browser Support and Accessibility

**User Story:** As a system user, I want the system to work on modern browsers and be accessible, so that all users can use the system effectively.

#### Acceptance Criteria

1. THE System SHALL support: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
2. THE System SHALL support responsive design for: desktop (1920x1080), tablet (768x1024), mobile (375x667)
3. THE System SHALL support keyboard navigation for all interactive elements
4. THE System SHALL support screen reader compatibility (WCAG 2.1 Level AA)
5. THE System SHALL support focus indicators for all interactive elements
6. THE System SHALL support color contrast ratios: 4.5:1 for normal text, 3:1 for large text
7. THE System SHALL support touch targets: minimum 44x44 pixels on mobile
8. THE System SHALL support alt text for all images
9. THE System SHALL support ARIA labels for all interactive elements
10. THE System SHALL support form validation with clear error messages

### Requirement 27: Internationalization and Localization (Future Phase)

**User Story:** As a global user, I want the system to support my language and locale, so that I can use the system in my preferred language.

#### Acceptance Criteria

1. THE System SHALL support multiple languages: English, Spanish, French, German, Chinese, Japanese (future phase)
2. THE System SHALL support locale-specific date formats
3. THE System SHALL support locale-specific number formats
4. THE System SHALL support locale-specific currency formats
5. THE System SHALL support timezone conversion for all timestamps
6. THE System SHALL display all timestamps in user's property timezone
7. THE System SHALL store all timestamps in UTC in the database
8. THE System SHALL support language selection in user profile
9. THE System SHALL support RTL (right-to-left) languages (future phase)
10. THE System SHALL support translation management (future phase)

### Requirement 28: Mobile Responsiveness

**User Story:** As a mobile user, I want the system to work well on my phone, so that I can access critical functions on the go.

#### Acceptance Criteria

1. THE System SHALL support mobile-first responsive design
2. THE Mobile_Layout SHALL use single-column layouts for forms and lists
3. THE Mobile_Layout SHALL use stacked cards for dashboard widgets
4. THE Mobile_Layout SHALL use slide-in drawers for filters and secondary actions
5. THE Mobile_Layout SHALL use bottom navigation for primary navigation
6. THE Mobile_Layout SHALL use collapsible sections for detail views
7. THE Mobile_Layout SHALL support touch gestures: swipe, pinch-to-zoom, long-press
8. THE Mobile_Layout SHALL support mobile-optimized data grids with horizontal scroll
9. THE Mobile_Layout SHALL support mobile-optimized file upload with camera access
10. THE Mobile_Layout SHALL support mobile-optimized photo capture and preview
11. THE Mobile_Layout SHALL support mobile-optimized QR code scanning (future phase)
12. THE Mobile_Layout SHALL support offline mode for critical functions (future phase)

### Requirement 29: Email Notifications

**User Story:** As a system user, I want to receive email notifications, so that I stay informed of important events.

#### Acceptance Criteria

1. THE System SHALL use Nodemailer for email delivery
2. THE System SHALL support SMTP configuration: host, port, secure, auth (username, password)
3. THE System SHALL support email templates for all notification types
4. THE Email_Template SHALL include: subject, body (HTML and plain text), variables
5. THE System SHALL support email variable substitution: user name, work order number, location name, etc.
6. THE System SHALL support email attachments for reports and exports
7. THE System SHALL support email delivery retry with exponential backoff
8. THE System SHALL log all email delivery attempts to the audit log
9. THE System SHALL support email unsubscribe link (future phase)
10. THE System SHALL support email preference management in user profile

### Requirement 30: Background Jobs and Schedulers

**User Story:** As a system administrator, I want automated background jobs, so that recurring tasks are executed reliably.

#### Acceptance Criteria

1. THE System SHALL use node-cron for job scheduling
2. THE System SHALL support in-process job execution
3. THE System SHALL support job enable/disable via environment variable: ENABLE_SCHEDULERS
4. THE System SHALL support the following scheduled jobs: PM Generation, SLA Escalation, Low Stock Evaluation, Notification Dispatch, Session Cleanup
5. THE PM_Generation_Job SHALL run daily at 2:00 AM property local time
6. THE PM_Generation_Job SHALL generate PM work orders for all active PM plans with due dates in the next 7 days
7. THE SLA_Escalation_Job SHALL run every 15 minutes
8. THE SLA_Escalation_Job SHALL evaluate all open work orders for SLA breaches and send escalation notifications
9. THE Low_Stock_Evaluation_Job SHALL run daily at 6:00 AM property local time
10. THE Low_Stock_Evaluation_Job SHALL check all inventory lines for low stock and send notifications
11. THE Notification_Dispatch_Job SHALL run every 5 minutes
12. THE Notification_Dispatch_Job SHALL send queued email notifications
13. THE Session_Cleanup_Job SHALL run daily at 3:00 AM
14. THE Session_Cleanup_Job SHALL delete expired sessions older than 7 days
15. THE System SHALL log all job executions to the application log
16. THE System SHALL support job execution history view (future phase)
17. THE System SHALL support manual job trigger (future phase)

## Traceability Matrix

### Requirements to PRD Mapping

| Requirement                                               | PRD Section                          | PRD Acceptance Criteria       |
| --------------------------------------------------------- | ------------------------------------ | ----------------------------- |
| Requirement 1: User Authentication and Session Management | 8.1, 9.1, 11.8, 18.1                 | AC 18.1.1 through 18.1.20     |
| Requirement 2: Organization and Property Management       | 8.2, 11.2, 11.3, 18.1                | AC 18.1.21 through 18.1.40    |
| Requirement 3: Location Hierarchy Management              | 8.2, 11.4, 18.1                      | AC 18.1.41 through 18.1.60    |
| Requirement 4: User and Role Management                   | 8.3, 11.5, 11.6, 18.1                | AC 18.1.61 through 18.1.80    |
| Requirement 5: Team Management                            | 8.3, 11.7, 18.1                      | AC 18.1.81 through 18.1.92    |
| Requirement 6: Asset Management                           | 8.5, 11.9, 18.6                      | AC 18.6.1 through 18.6.24     |
| Requirement 7: Asset Meter Management                     | 8.5, 11.10, 18.6                     | AC 18.6.25 through 18.6.34    |
| Requirement 8: Document and Attachment Management         | 8.13, 11.19, 18.6                    | AC 18.6.35 through 18.6.49    |
| Requirement 9: Work Request Intake and Triage             | 8.6, 9.2, 11.11, 18.2                | AC 18.2.1 through 18.2.21     |
| Requirement 10: Work Order Core Lifecycle                 | 8.7, 9.3, 9.4, 11.12, 18.3           | AC 18.3.1 through 18.3.59     |
| Requirement 11: Preventive Maintenance Plans              | 8.8, 9.5, 11.13, 18.4                | AC 18.4.1 through 18.4.36     |
| Requirement 12: Inspections and Checklists                | 8.9, 9.6, 11.14, 18.5                | AC 18.5.1 through 18.5.26     |
| Requirement 13: Inventory and Spare Parts Management      | 8.10, 9.7, 11.15, 11.16, 11.17, 18.7 | AC 18.7.1 through 18.7.33     |
| Requirement 14: Vendor and Contractor Management          | 8.11, 9.8, 11.18, 18.8               | AC 18.8.1 through 18.8.25     |
| Requirement 15: Notifications and Real-Time Updates       | 8.12, 14, 18.9                       | AC 18.9.1 through 18.9.21     |
| Requirement 16: Dashboard and Home Experience             | 8.4, 12.1, 18.10                     | AC 18.10.1 through 18.10.20   |
| Requirement 17: Search and Saved Views                    | 8.14, 11.21, 18.10                   | AC 18.10.21 through 18.10.35  |
| Requirement 18: Reporting and Analytics                   | 8.15, 11.20, 18.10                   | AC 18.10.36 through 18.10.49  |
| Requirement 19: Audit Logging and Traceability            | 8.16, 11.24, 18.10                   | AC 18.10.50 through 18.10.65  |
| Requirement 20: Master Data and Configuration Management  | 8.17, 11.22, 18.11                   | AC 18.11.1 through 18.11.21   |
| Requirement 21: Data Import, Export, and Migration        | 8.18, 9.10, 11.23, 18.11             | AC 18.11.22 through 18.11.40  |
| Requirement 22: Security and Access Control               | 16, 18.12                            | AC 18.12.1 through 18.12.20   |
| Requirement 23: Performance and Scalability               | 15.1, 15.2, 18.12                    | AC 18.12.21 through 18.12.35  |
| Requirement 24: Reliability and Error Handling            | 15.3, 17, 18.12                      | AC 18.12.36 through 18.12.45  |
| Requirement 25: Observability and Monitoring              | 15.4, 18.12                          | AC 18.12.46 through 18.12.55  |
| Requirement 26: Browser Support and Accessibility         | 15.6, 18.12                          | AC 18.12.56 through 18.12.65  |
| Requirement 27: Internationalization and Localization     | 15.7, 18.12                          | AC 18.12.66 through 18.12.75  |
| Requirement 28: Mobile Responsiveness                     | 12.2, 15.6, 18.12                    | AC 18.12.76 through 18.12.87  |
| Requirement 29: Email Notifications                       | 14.2, 18.9                           | AC 18.9.22 through 18.9.31    |
| Requirement 30: Background Jobs and Schedulers            | 13.8, 15.5, 18.12                    | AC 18.12.88 through 18.12.104 |

### Requirements to Design Mapping

| Requirement                                               | Design Section          | Design Components                                                                                          |
| --------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------- |
| Requirement 1: User Authentication and Session Management | 4.1, 4.2, 4.3, 4.4, 9.1 | Auth middleware, session model, auth routes, auth service, login page, profile page                        |
| Requirement 2: Organization and Property Management       | 4.1, 9.2                | Organization model, property model, organization routes, property routes, settings pages                   |
| Requirement 3: Location Hierarchy Management              | 4.1, 9.2                | Location model, location routes, location service, location tree component, location pages                 |
| Requirement 4: User and Role Management                   | 4.1, 4.4, 9.2           | User model, role model, user routes, role routes, user service, role service, user pages, role pages       |
| Requirement 5: Team Management                            | 4.1, 9.2                | Team model, team routes, team service, team pages                                                          |
| Requirement 6: Asset Management                           | 4.1, 9.3                | Asset model, asset routes, asset service, asset pages, asset detail tabs                                   |
| Requirement 7: Asset Meter Management                     | 4.1, 9.3                | Asset meter model, meter reading model, meter routes, meter service, meter components                      |
| Requirement 8: Document and Attachment Management         | 4.1, 4.9, 9.3           | Document model, document routes, document service, upload components, preview components                   |
| Requirement 9: Work Request Intake and Triage             | 4.1, 9.3                | Work request model, request routes, request service, request pages, request portal                         |
| Requirement 10: Work Order Core Lifecycle                 | 4.1, 4.6, 9.3           | Work order model, work order routes, work order service, work order pages, work order detail               |
| Requirement 11: Preventive Maintenance Plans              | 4.1, 4.9, 9.3           | PM plan model, PM routes, PM service, PM pages, PM calendar, PM forecast                                   |
| Requirement 12: Inspections and Checklists                | 4.1, 9.3                | Checklist template model, inspection model, checklist routes, inspection service, inspection pages         |
| Requirement 13: Inventory and Spare Parts Management      | 4.1, 9.3                | Part model, inventory line model, transaction model, inventory routes, inventory service, inventory pages  |
| Requirement 14: Vendor and Contractor Management          | 4.1, 9.3                | Vendor model, vendor routes, vendor service, vendor pages, vendor portal                                   |
| Requirement 15: Notifications and Real-Time Updates       | 4.1, 4.10, 10           | Notification model, notification routes, socket service, notification center, socket events                |
| Requirement 16: Dashboard and Home Experience             | 6.1, 6.2, 8.1, 9.3      | Dashboard routes, dashboard service, dashboard pages, KPI cards, chart widgets                             |
| Requirement 17: Search and Saved Views                    | 11.1, 11.2              | Search routes, saved view model, search service, search components, saved view components                  |
| Requirement 18: Reporting and Analytics                   | 11.2, 11.3              | Report routes, report service, report pages, export service, PDF generation                                |
| Requirement 19: Audit Logging and Traceability            | 4.1, 11.3               | Audit log model, audit routes, audit service, audit pages, audit middleware                                |
| Requirement 20: Master Data and Configuration Management  | 4.1, 9.2                | Master data model, settings routes, settings service, settings pages, custom field support                 |
| Requirement 21: Data Import, Export, and Migration        | 11.4                    | Import job model, import routes, import service, import pages, CSV parser, export service                  |
| Requirement 22: Security and Access Control               | 4.2, 4.3, 4.4           | Auth middleware, authorization middleware, CSRF middleware, security headers, input sanitization           |
| Requirement 23: Performance and Scalability               | 4.1, 4.2, 10.2          | Database indexes, pagination, caching, compression, background jobs                                        |
| Requirement 24: Reliability and Error Handling            | 4.2, 5.8                | Error middleware, error classes, error boundary components, retry logic, transaction handling              |
| Requirement 25: Observability and Monitoring              | 4.1, 4.2                | Logger configuration, request logging, error logging, health check endpoint, metrics                       |
| Requirement 26: Browser Support and Accessibility         | 5.1, 5.7, 7             | Responsive design, keyboard navigation, ARIA labels, focus indicators, color contrast                      |
| Requirement 27: Internationalization and Localization     | 5.1                     | Language support, locale formatting, timezone conversion, translation management                           |
| Requirement 28: Mobile Responsiveness                     | 5.7, 7.3, 7.4           | Mobile layouts, touch gestures, mobile navigation, mobile data grids, mobile file upload                   |
| Requirement 29: Email Notifications                       | 4.1, 4.10               | Email service, email templates, email queue, email delivery tracking                                       |
| Requirement 30: Background Jobs and Schedulers            | 4.1, 4.9                | Job scheduler, PM generation job, SLA escalation job, low stock job, notification job, session cleanup job |

### Requirements to Tasks Mapping

| Requirement                                               | Task Phase           | Phase Name                                                                    |
| --------------------------------------------------------- | -------------------- | ----------------------------------------------------------------------------- |
| Requirement 1: User Authentication and Session Management | Phase 04             | Authentication and Session Management                                         |
| Requirement 2: Organization and Property Management       | Phase 05             | Organization, Property, Location, and Master Data Foundations                 |
| Requirement 3: Location Hierarchy Management              | Phase 05             | Organization, Property, Location, and Master Data Foundations                 |
| Requirement 4: User and Role Management                   | Phase 06             | Users, Roles, Teams, and Access Control                                       |
| Requirement 5: Team Management                            | Phase 06             | Users, Roles, Teams, and Access Control                                       |
| Requirement 6: Asset Management                           | Phase 07             | Assets, Meters, Documents, and Location Context                               |
| Requirement 7: Asset Meter Management                     | Phase 07             | Assets, Meters, Documents, and Location Context                               |
| Requirement 8: Document and Attachment Management         | Phase 07             | Assets, Meters, Documents, and Location Context                               |
| Requirement 9: Work Request Intake and Triage             | Phase 08             | Work Request Intake and Triage                                                |
| Requirement 10: Work Order Core Lifecycle                 | Phase 09             | Work Order Core Lifecycle                                                     |
| Requirement 11: Preventive Maintenance Plans              | Phase 10             | Preventive Maintenance                                                        |
| Requirement 12: Inspections and Checklists                | Phase 11             | Inspections, Checklists, and Procedures                                       |
| Requirement 13: Inventory and Spare Parts Management      | Phase 12             | Inventory and Spare Parts                                                     |
| Requirement 14: Vendor and Contractor Management          | Phase 13             | Vendors and Restricted Contractor Access                                      |
| Requirement 15: Notifications and Real-Time Updates       | Phase 14             | Notifications and Real-Time Synchronization                                   |
| Requirement 16: Dashboard and Home Experience             | Phase 15             | Dashboards, Search, Saved Views, Reporting, and Audit UX                      |
| Requirement 17: Search and Saved Views                    | Phase 15             | Dashboards, Search, Saved Views, Reporting, and Audit UX                      |
| Requirement 18: Reporting and Analytics                   | Phase 15             | Dashboards, Search, Saved Views, Reporting, and Audit UX                      |
| Requirement 19: Audit Logging and Traceability            | Phase 15             | Dashboards, Search, Saved Views, Reporting, and Audit UX                      |
| Requirement 20: Master Data and Configuration Management  | Phase 05             | Organization, Property, Location, and Master Data Foundations                 |
| Requirement 21: Data Import, Export, and Migration        | Phase 16             | Data Import, Export, and Migration Operations                                 |
| Requirement 22: Security and Access Control               | Phase 02, 04         | Backend Core Infrastructure, Authentication and Session Management            |
| Requirement 23: Performance and Scalability               | Phase 02, 03         | Backend Core Infrastructure, Frontend Core Infrastructure                     |
| Requirement 24: Reliability and Error Handling            | Phase 02, 03         | Backend Core Infrastructure, Frontend Core Infrastructure                     |
| Requirement 25: Observability and Monitoring              | Phase 02             | Backend Core Infrastructure                                                   |
| Requirement 26: Browser Support and Accessibility         | Phase 03             | Frontend Core Infrastructure                                                  |
| Requirement 27: Internationalization and Localization     | Future Phase         | Future Enhancement                                                            |
| Requirement 28: Mobile Responsiveness                     | Phase 03             | Frontend Core Infrastructure                                                  |
| Requirement 29: Email Notifications                       | Phase 14             | Notifications and Real-Time Synchronization                                   |
| Requirement 30: Background Jobs and Schedulers            | Phase 02, 10, 12, 14 | Backend Core Infrastructure, Preventive Maintenance, Inventory, Notifications |

## Engineering Constraints and Standards

### Backend Engineering Constraints

1. **JavaScript-Only**: No TypeScript. All code must be JavaScript with ESM syntax.
2. **JSDoc Required**: Every exported module and non-trivial helper must have comprehensive JSDoc documentation.
3. **Constants Source of Truth**: `backend/utils/constants.js` is the single source of truth for all backend constants.
4. **No Direct Request Container Access**: Controllers must never read from `req.body`, `req.params`, or `req.query` directly.
5. **Validated Input Contract**: Controllers must only consume validated input from `req.validated.body`, `req.validated.params`, and `req.validated.query`.
6. **Actor Context**: All operations must use `req.user` for actor context (user ID, organization ID, property scope, role keys, permissions, session ID).
7. **Service Layer**: Business logic must live in services, not controllers or routes.
8. **Middleware Ordering**: Must follow the exact order defined in design.md.
9. **Audit Logging**: All create, update, delete, and permission-sensitive operations must be logged to audit log.
10. **Error Handling**: All errors must be handled by centralized error middleware with structured error responses.

### Frontend Engineering Constraints

1. **JavaScript-Only**: No TypeScript. All code must be JavaScript.
2. **Constants Source of Truth**: `client/src/utils/constants.js` is the single source of truth for all frontend constants.
3. **Theme Tokens**: No hardcoded styling values. Must use `theme.palette`, `theme.typography`, `theme.spacing`, and `theme.breakpoints`.
4. **Tree-Shakable Imports**: All MUI imports must be tree-shakable (e.g., `import Button from '@mui/material/Button'`).
5. **No react-router-dom**: Must use `react-router` for router imports.
6. **No watch()**: React Hook Form `watch()` is prohibited. Use `useWatch`, `Controller`, or `getValues` instead.
7. **Grid size Prop**: MUI Grid must use `size` prop, not deprecated `item` prop.
8. **Slots API**: Custom rendering must prefer MUI `slots` and `slotProps` APIs.
9. **MUI v9 Syntax**: Must follow MUI v9 syntax and deprecation guidance.
10. **Responsive Design**: All screens must implement mobile, tablet, and desktop layouts.

### Repository Conventions

1. **Git Bash/WSL Commands**: All shell commands must be Git Bash or WSL compatible. No CMD or PowerShell-specific syntax.
2. **Task Execution Protocol**: All implementation must follow `docs/task-execution-protocol.md`.
3. **Phase Order**: Implementation must follow the exact phase order defined in `docs/tasks.md`.
4. **No Mock Data Early**: Mock data must not be introduced before Phase 17.
5. **Documentation Precedence**: `docs/prd.md` > `docs/requirements.md` > `docs/design.md` > `docs/tasks.md` > `docs/task-execution-protocol.md`.

## Acceptance Criteria Summary

### Phase 00-03: Foundation (Prerequisites)

- Repository structure matches design.md
- Backend constants source of truth exists and is used
- Frontend constants source of truth exists and is used
- Centralized theme exists and is used
- Middleware pipeline is complete and ordered correctly
- Validated input contract is implemented
- Actor context is implemented
- Error handling is centralized
- Logging is structured
- App shell, router, store, and providers are complete

### Phase 04: Authentication

- All 20 acceptance criteria for Requirement 1 are met
- Invitation, login, password reset, and session management work end-to-end
- Security notifications are sent
- Account lockout works
- Session listing and revocation work

### Phase 05: Organization, Property, Location, Master Data

- All 20 acceptance criteria for Requirement 2 are met
- All 20 acceptance criteria for Requirement 3 are met
- All 21 acceptance criteria for Requirement 20 are met
- Multi-property support works
- Location hierarchy works
- Master data configuration works
- Numbering rules work
- Business hours and holidays work
- SLA policies work

### Phase 06: Users, Roles, Teams

- All 20 acceptance criteria for Requirement 4 are met
- All 12 acceptance criteria for Requirement 5 are met
- Built-in and custom roles work
- Permission enforcement works
- Property and location scope assignment works
- Team management works

### Phase 07: Assets, Meters, Documents

- All 24 acceptance criteria for Requirement 6 are met
- All 10 acceptance criteria for Requirement 7 are met
- All 15 acceptance criteria for Requirement 8 are met
- Asset lifecycle works (create, transfer, replace, retire)
- Meter tracking works
- Document upload, preview, and download work

### Phase 08: Work Requests

- All 21 acceptance criteria for Requirement 9 are met
- Request submission works
- Duplicate detection works
- Approval/rejection/conversion workflow works
- Request portal works

### Phase 09: Work Orders

- All 59 acceptance criteria for Requirement 10 are met
- Work order lifecycle works (create, assign, schedule, execute, complete, verify, close)
- Status transitions work with validation
- Room access restrictions work
- Labor tracking works
- Parts usage tracking works
- Comments and attachments work
- Downtime tracking works
- SLA tracking works

### Phase 10: Preventive Maintenance

- All 36 acceptance criteria for Requirement 11 are met
- PM plan creation works
- PM generation works (time-based, meter-based, seasonal, hybrid)
- PM calendar and forecast work
- PM occurrence tracking works
- PM effectiveness metrics work

### Phase 11: Inspections and Checklists

- All 26 acceptance criteria for Requirement 12 are met
- Checklist template creation works
- Template versioning works
- Required and conditional items work
- Fail actions work (create request, create work order, block completion)
- Inspection execution works
- Inspection export to PDF works

### Phase 12: Inventory

- All 33 acceptance criteria for Requirement 13 are met
- Part master management works
- Inventory line management works
- Transaction tracking works (receipt, issue, return, transfer, adjustment, cycle count)
- Reservation works
- Low stock alerts work
- Inventory valuation and turnover metrics work

### Phase 13: Vendors

- All 25 acceptance criteria for Requirement 14 are met
- Vendor management works
- Compliance document tracking works
- Vendor user restricted access works
- Vendor work assignment works
- Vendor performance tracking works

### Phase 14: Notifications and Real-Time

- All 21 acceptance criteria for Requirement 15 are met
- All 10 acceptance criteria for Requirement 29 are met
- In-app notifications work
- Email notifications work
- Socket.IO real-time updates work
- Notification preferences work
- Quiet hours work

### Phase 15: Dashboard, Search, Reports, Audit

- All 20 acceptance criteria for Requirement 16 are met
- All 15 acceptance criteria for Requirement 17 are met
- All 14 acceptance criteria for Requirement 18 are met
- All 16 acceptance criteria for Requirement 19 are met
- Role-aware dashboards work
- KPI cards and charts work with drilldown
- Global and module search work
- Saved views work
- Standard reports work
- Report export to CSV and PDF works
- Audit log query and export work

### Phase 16: Import/Export

- All 19 acceptance criteria for Requirement 21 are met
- CSV import works with dry-run validation
- Import error reporting works
- Import commit works
- CSV and PDF export work

### Phase 17: Mock Data

- Mock data exists for all domains
- Mock data uses constants source of truth
- Mock data is realistic and relational
- Mock data covers multiple properties

### Phase 18: Final Alignment

- All requirements are implemented
- All acceptance criteria are met
- Repository structure matches design.md
- No prohibited patterns exist
- Responsive design is implemented
- Cross-document traceability is verified

## Implementation Standards and Workflow

### Mandatory Execution Workflow

All implementation phases must follow the **six-step execution model** defined in `docs/task-execution-protocol.md`:

1. **Pre-Execution Git and Workspace Verification**: Check Git state, handle uncommitted changes, create feature branch
2. **Comprehensive Source Analysis**: Read all governing documents, identify files and patterns
3. **Previous Phase and Dependency Analysis**: Review prerequisite phases, verify pattern consistency
4. **Phase Implementation Without Deviation**: Implement exactly as defined, follow all constraints
5. **Self-Verification and User Review Preparation**: Compare against requirements, design, and tasks
6. **Post-Approval Git Finalization**: Commit, push, merge, delete branches, verify synchronization

### Repository Conventions

All implementation must follow conventions defined in `docs/generation_prompt.md`:

1. **Governing Document Order**: `docs/prd.md` → `docs/requirements.md` → `docs/design.md` → `docs/tasks.md` → `docs/task-execution-protocol.md`
2. **Technology Baseline**: Use exact package versions from `backend/package.json` and `client/package.json`
3. **JavaScript-Only**: No TypeScript conversion allowed
4. **ESM Syntax**: All modules use ES6 import/export
5. **JSDoc Required**: All exported functions must have JSDoc documentation
6. **Git Bash/WSL Compatible**: All commands must work in Git Bash or WSL

### Backend Engineering Standards

1. **Constants Single Source of Truth**: `backend/utils/constants.js` is the ONLY approved import entry point
2. **No Raw Request Access**: Controllers MUST NOT read `req.body`, `req.params`, or `req.query` directly
3. **Use req.validated**: Controllers MUST ONLY consume validated input from `req.validated`
4. **Use req.user**: Controllers MUST use `req.user` for actor context
5. **Thin Controllers**: Controllers orchestrate only; business logic lives in services
6. **Service Layer Required**: All business logic, audit logging, and notification emission happens in services
7. **Actor Context Compatibility**: Background jobs must pass synthetic actor context compatible with `req.user`

### Frontend Engineering Standards

1. **Constants Single Source of Truth**: `client/src/utils/constants.js` is the ONLY approved import entry point
2. **No react-router-dom**: Use `react-router` imports only
3. **No React Hook Form watch()**: Use `useWatch`, `Controller`, or `getValues` instead
4. **Tree-Shakable MUI Imports**: Import components individually (e.g., `import Button from "@mui/material/Button"`)
5. **MUI v9 Grid size Prop**: Use `size` prop, NOT deprecated `item` prop
6. **Theme Tokens Required**: Use `theme.palette`, `theme.typography`, `theme.spacing`, `theme.breakpoints`
7. **MUI styled() API**: Use MUI `styled()` for reusable custom styling
8. **Slots and SlotProps**: Use `slots` and `slotProps` APIs for MUI component customization
9. **Responsive Design**: All screens must work on mobile, tablet, and desktop
10. **Inter Font Only**: No other fonts allowed

### Theming Standards

All frontend styling must follow the **mandatory theming standards** defined in `docs/theming-protocol.md`:

1. **Centralized Theme Location**: All theme configuration in `client/src/theme/`
2. **Theme Provider**: Single `AppTheme.jsx` component with `useMemo` for theme creation
3. **Color System**: Use brand colors, semantic palettes, light/dark mode support
4. **Typography System**: Inter font family with defined typography scale
5. **Spacing System**: Use `theme.spacing()` for all spacing values (base unit: 8px)
6. **Shape System**: Use `theme.shape.borderRadius` for border radius
7. **Responsive Design**: Mobile-first approach using `theme.breakpoints.up()`
8. **Component Customization**: Use theme component overrides in `client/src/theme/customizations/`
9. **Styling API Preference**: Theme overrides → `styled()` → `sx` prop → component props
10. **Forbidden Practices**: No hardcoded colors, fonts, spacing, or non-tree-shakable imports
11. **Dark Mode Support**: Use `theme.applyStyles('dark', {...})` for dark mode overrides
12. **Accessibility Standards**: WCAG AA contrast ratios, visible focus states, 44x44px touch targets on mobile
13. **Performance Optimization**: Theme memoization, disabled ripple effects, disabled transitions

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

### Cross-Document Traceability

The implementation must maintain traceability across all documentation:

1. **PRD to Requirements**: Every requirement maps to PRD functional requirements, workflows, business rules, data models, or acceptance criteria
2. **Requirements to Design**: Every design decision realizes one or more requirements
3. **Design to Tasks**: Every task implements specific design sections
4. **Tasks to Code**: Every code file maps to a task phase
5. **Traceability Matrix**: Use `docs/traceability-matrix.md` to verify cross-document alignment

### Phase-Specific Rules

#### Bootstrap Phase (Phase 03.5)

- Implement bootstrap mechanism before authentication
- Bootstrap endpoints are intentionally unauthenticated
- Use atomic transaction for organization + admin user creation
- Bootstrap admin user is pre-verified (no email verification required)
- Frontend must detect bootstrap requirement on app load
- Bootstrap is independent of Phase 17 mock data

#### Background Jobs and System-Triggered Phases

- Follow same requirements and design analysis as HTTP-request phases
- Pass synthetic actor context compatible with `req.user` shape
- Reuse same constants, business rules, and audit pathways
- Verify notification, escalation, retry, and idempotency behavior

#### Mock Data Phase (Phase 17)

- Mock data must not be introduced before Phase 17
- Mock data must use constants source of truth
- Mock data must represent realistic hospitality operations
- Mock data must cover multiple properties, locations, assets, work, PM, parts, vendors

### Compliance Checks

**Mandatory Compliance Checks Before Code Review**:

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

## Conclusion

This requirements document defines **31 comprehensive requirements** with over **835 acceptance criteria** covering all aspects of the Hospitality CMMS system, including:

- **Requirement 0**: System Bootstrap (35 criteria) - Production mechanism for first-time setup
- **Requirements 1-30**: Complete CMMS functionality (800+ criteria)

All requirements are traceable to:

- `docs/prd.md` - Product Requirements Document
- `docs/requirements.md` - Implementation Requirements
- `docs/design.md` - Design Specifications
- `docs/tasks.md` - 18-Phase Implementation Plan (including Phase 03.5 for bootstrap)
- `docs/task-execution-protocol.md` - Six-step execution workflow
- `docs/traceability-matrix.md` - Cross-document traceability
- `docs/generation_prompt.md` - Repository conventions
- `docs/theming-protocol.md` - MUI v9 theming standards

All engineering constraints and standards are clearly defined. This document serves as the complete specification for implementation.
