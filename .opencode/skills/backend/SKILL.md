# Backend Development Skill — Hospitality CMMS

## Technology Stack
- **Runtime**: Node.js ESM
- **Framework**: Express 5
- **Database**: MongoDB 9 with Mongoose 9
- **Auth**: JWT (jsonwebtoken) + httpOnly cookies
- **Validation**: express-validator with `req.validated` contract
- **Security**: helmet, cors, express-rate-limit, express-mongo-sanitize, csrf
- **Password**: bcrypt (12 rounds)
- **Logging**: winston
- **Email**: nodemailer
- **Real-time**: Socket.IO 4
- **Jobs**: node-cron (guarded by `ENABLE_SCHEDULERS`)
- **Upload**: multer + sharp (images)
- **CSV**: csv-parse

## Prohibitions (NEVER do these)
- ❌ No TypeScript — all files are `.js` or `.jsx`
- ❌ No direct `req.body` / `req.params` / `req.query` reads in controllers
- ❌ No bypassing `req.validated` — controllers consume only validated input
- ❌ No bypassing `req.user` — actor context for auth, audit, notifications
- ❌ No business logic in routes or controllers — delegate to services
- ❌ No scattered string literals — use `backend/utils/constants.js`
- ❌ No second canonical constants file — `backend/utils/constants.js` is the single source of truth
- ❌ No mock data before Phase 17
- ❌ No PowerShell/CMD commands — use Git Bash/WSL only

## Architecture Patterns

### Directory Structure
```
backend/
├── app.js                        # Express app creation + middleware + routes
├── server.js                     # HTTP server + Socket.IO bootstrap
├── config/                       # env.js, database.js, cors.js, socket.js, logger.js
├── controllers/<domain>/         # Thin orchestration only
├── services/<domain>/            # Business logic, audit, notifications
├── middlewares/                   # auth/, validation/, security/, error/, request/
├── models/                       # Mongoose schemas
├── routes/                       # index.js + <domain>.routes.js
├── validators/<domain>/          # express-validator chains
├── utils/                        # constants.js (SSOT), http.js, pagination.js, errors.js, etc.
├── jobs/                         # Background jobs (node-cron)
├── sockets/                      # Socket.IO setup + events
└── mock/                         # Phase 17 only
```

### Middleware Order (in app.js)
1. `requestId` → 2. `helmet` → 3. `cors` → 4. `compression` → 5. `cookieParser` → 6. `json` → 7. `mongoSanitize` → 8. `requestLogger` → 9. `decodeToken` (conditional) → 10. routes → 11. `notFound` → 12. `errorHandler`

### Controller Pattern
```js
export const list = async (req, res, next) => {
  try {
    const result = await domainService.list(req.user, req.validated.query);
    res.status(200).json(successResponse(result));
  } catch (error) { next(error); }
};
```

### Validation Contract
```js
req.validated = {
  body: matchedData(req, { locations: ["body"] }),
  params: matchedData(req, { locations: ["params"] }),
  query: matchedData(req, { locations: ["query"] }),
};
```

### Route Pattern
```js
router.get("/", requireAuth, authorize("domain.view"), listValidator, validateRequest, normalizeValidated, list);
```

### Response Format (Success)
```json
{ "success": true, "data": { ... } }
```

### Response Format (Paginated)
```json
{ "success": true, "data": [...], "pagination": { "page": 1, "limit": 20, "total": 100, "totalPages": 5 } }
```

### Response Format (Error)
```json
{ "success": false, "error": "ERROR_CODE", "message": "Human-readable message" }
```

### Actor Context (req.user)
```js
{
  id: "userId",
  organizationId: "orgId",
  propertyIds: [...],
  roleKeys: [...],
  permissions: [...],
  sessionId: "sessionId"
}
```

### Model Conventions
- All models use `timestamps: true` (createdAt, updatedAt)
- All mutable models include `revision: { type: Number, default: 1 }` for optimistic concurrency
- All models include `createdBy` and `updatedBy` (ObjectId refs to User)
- Use `mongoose.Schema.Types.ObjectId` for refs
- Index all foreign keys and frequently-queried fields
- Use `trim: true` and `lowercase: true` on string fields where appropriate

### Error Classes
- `AppError(statusCode, errorCode, message)` — base class
- `NotFoundError(resource)` → 404
- `ValidationError(errors)` → 400
- `ConflictError(message)` → 409
- `UnauthorizedError(message)` → 401
- `ForbiddenError(message)` → 403

### API Prefix
All routes under `/api/v1/`

### Health Endpoint
`GET /api/v1/health` — unauthenticated, returns `{ success: true, data: { status: "ok", uptime, timestamp, dbStatus } }`

### Domain Constants
All enums, statuses, action keys, event names, permission keys in `backend/utils/constants.js`:
```js
export const ROLE_KEYS = { ... };
export const PERMISSIONS = { ... };
export const WO_STATUS = { ... };
export const WO_PRIORITY = { ... };
export const WO_SEVERITY = { ... };
export const GUEST_IMPACT = { ... };
export const ASSET_STATUS = { ... };
export const ASSET_CRITICALITY = { ... };
export const PM_TRIGGER = { ... };
export const NOTIFICATION_EVENTS = { ... };
export const AUDIT_ACTIONS = { ... };
export const ENTITY_TYPES = { ... };
```

### Background Jobs
- PM generation: daily, checks due PMs, generates work orders
- SLA escalation: periodic, checks at-risk/breached SLAs
- Low stock: periodic, sends low-stock notifications
- Notification dispatch: periodic, sends queued email notifications
- Session cleanup: periodic, removes expired sessions

### Upload Handling
- multer for multipart parsing
- sharp for image resizing (1920px max, 300px thumbnail)
- Local disk storage (`backend/uploads/`)
- Max file size: 10MB
- Allowed: jpg, jpeg, png, webp, gif, pdf, csv, xlsx, doc, docx

### Rate Limiting
- General API: 100 requests per minute per IP
- Auth (login/register): 5 requests per 15 minutes per IP
- Bootstrap: 5 requests per hour per IP

### Password Policy
- Min 12 chars, max 72 chars
- Must contain: uppercase, lowercase, digit, special character
- Cannot contain email address
- Cannot match last 8 password hashes
- bcrypt cost factor: 12

### Account Lockout
- 5 failed login attempts in 15 minutes → 30-minute lock
- Lockout duration doubles on subsequent lockout events (capped at 24h)
- Lockout release: automatic after duration, or manual by admin

### Audit Logging
All state-changing operations must create an audit log entry:
```js
{
  actor: { id, type, email },
  action: AUDIT_ACTIONS.SOME_ACTION,
  entity: { type: ENTITY_TYPES.SOMETHING, id: "..." },
  organizationId: "...",
  propertyId: "...",
  changes: { before: {...}, after: {...} },
  ip: "...",
  userAgent: "..."
}
```
