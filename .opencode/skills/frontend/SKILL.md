# Frontend Development Skill — Hospitality CMMS

## Technology Stack
- **Framework**: React 19
- **Build**: Vite 8
- **UI**: MUI v9 (Material-UI 9)
- **Routing**: react-router 7 (NOT react-router-dom)
- **State**: Redux Toolkit 2 + redux-persist
- **Forms**: react-hook-form 7 (NO `watch()` — use `useWatch` / `Controller` / `getValues`)
- **HTTP**: axios
- **Real-time**: socket.io-client 4
- **Charts**: recharts + @mui/x-charts
- **Data Grid**: @mui/x-data-grid
- **PDF**: jsPDF + jspdf-autotable
- **Upload**: react-dropzone
- **Lightbox**: yet-another-react-lightbox
- **Photo Album**: react-photo-album
- **Notifications**: react-toastify
- **Error Boundaries**: react-error-boundary
- **Dates**: date-fns
- **Icons**: @mui/icons-material
- **Font**: Inter (@fontsource/inter)

## Prohibitions (NEVER do these)
- ❌ No `react-router-dom` — use `react-router` only
- ❌ No `react-hook-form` `watch()` — use `useWatch`, `Controller`, or `getValues`
- ❌ No non-tree-shakable MUI imports — always `import Button from "@mui/material/Button"`
- ❌ No deprecated MUI Grid `item` prop — use `size` prop
- ❌ No hardcoded color/font/spacing values — use theme tokens
- ❌ No CSS modules or separate CSS files for MUI components
- ❌ No inline `style` prop with hardcoded values
- ❌ No TypeScript — all files are `.js` or `.jsx`

## Architecture Patterns

### Directory Structure
```
client/src/
├── main.jsx                     # App entry, StrictMode, Inter font
├── App.jsx                      # Bootstrap detection + provider composition
├── app/
│   ├── router.jsx               # react-router route definitions
│   ├── store.js                 # Redux Toolkit store + persist
│   ├── providers.jsx            # Provider composition
│   └── theme/                   # Centralized theme
│       ├── index.js             # Theme creation entry
│       ├── AppTheme.jsx         # ThemeProvider wrapper
│       ├── themePrimitives.js   # Color, typography, spacing, shape
│       └── customizations/      # MUI component overrides
├── components/
│   ├── layout/                  # AppLayout, PageHeader, SideNav, TopBar
│   ├── feedback/                # LoadingState, EmptyState, ErrorState, AlertBanner
│   ├── navigation/              # Breadcrumbs, Tabs, Menu
│   ├── dataDisplay/             # KPICard, Timeline, StatTile, InfoList
│   ├── forms/                   # FormField, SelectField, DatePickerField
│   ├── dialogs/                 # ConfirmDialog, FormDialog
│   ├── uploads/                 # FileDropzone, FilePreview, ImageGallery
│   └── charts/                  # ChartWrapper, ChartLegend
├── domains/<name>/              # Feature-specific API, hooks, components
├── hooks/                       # Shared custom hooks
├── services/
│   ├── api/                     # axios client + domain API modules
│   └── sockets/                 # Socket.IO connection + events
├── store/
│   ├── slices/                  # Redux slices (auth, notifications, theme, etc.)
│   └── selectors/               # Redux selectors
├── utils/
│   ├── constants.js             # SSOT for route keys, filters, labels, enums
│   ├── routes.js                # Route path helpers
│   ├── permissions.js           # Permission checks
│   ├── formatting.js            # Date, currency, name formatting
│   └── dates.js                 # date-fns wrappers
└── assets/                      # Static assets (images, etc.)
```

### Theme Rules
- Theme lives at `client/src/app/theme/`
- Use `createTheme()` with `colorSchemes` for light + dark mode
- Use `theme.applyStyles('dark', {...})` for dark mode overrides
- All component overrides in `customizations/` directory
- Use `useMemo` for theme creation to prevent recalculation
- Ripple effects disabled (`disableRipple: true`, `disableTouchRipple: true`)
- `disableTransitionOnChange` on ThemeProvider

### Component State Rules
Every page/screen MUST handle these states:
1. **Loading**: Show `<LoadingState>` or `<Skeleton>` — never show nothing
2. **Empty**: Show `<EmptyState>` with illustration + message + CTA button
3. **Error**: Show `<ErrorState>` or `<Alert>` with retry button
4. **Permission Denied**: Show 403 message or hide elements

### Responsive Design
- Mobile-first: `theme.breakpoints.up('md')` for layout changes
- Navigation: drawer for mobile, persistent sidebar for desktop
- Tables: horizontal scroll on mobile
- Forms: single column on mobile, multi-column on desktop
- Test at: 320px, 768px, 1024px, 1440px

### Route Guards
- `<ProtectedRoute roles={[...]} />` — redirects to login if unauthenticated
- `<GuestRoute />` — redirects to dashboard if already authenticated
- Role checks against `req.user.permissions` or Redux auth state

### axios Client
```js
const client = axios.create({ baseURL: "/api/v1", withCredentials: true });
// Interceptor: refresh token on 401, retry original request
// Interceptor: attach CSRF header on mutating requests
```

### Redux Store Shape
```js
{
  auth: { user, isAuthenticated, loading },
  notifications: { items, unreadCount },
  theme: { mode: 'light' | 'dark' },
  // Domain-specific slices added per phase
}
```

### Form Patterns
```jsx
const { control, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
});
// ❌ NEVER use watch()
// ✅ Use Controller for each field
// ✅ Use useWatch for reactive values (e.g., password strength)
```

### MUI Grid Usage
```jsx
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>...</Grid>
  <Grid size={{ xs: 12, md: 6 }}>...</Grid>
</Grid>
```

### Styling Priority
1. Theme component overrides (in `customizations/`)
2. MUI `styled()` for reusable components
3. `sx` prop for one-off styling (always use theme tokens)
4. Component props for semantic styling (variant, color, size)
