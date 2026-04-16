import { Navigate, createBrowserRouter } from "react-router";
import AppLayout from "../components/layout/AppLayout.jsx";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import PortalLayout from "../components/layout/PortalLayout.jsx";
import RouteErrorPage from "../components/feedback/RouteErrorPage.jsx";
import FeaturePlaceholderPage from "../pages/shared/FeaturePlaceholderPage.jsx";
import NotFoundPage from "../pages/shared/NotFoundPage.jsx";
import { ROUTES } from "../utils/constants.js";

/**
 * Converts absolute route constants into relative child-route paths.
 *
 * @param {string} path - Absolute route path.
 * @returns {string} Relative child-route path.
 */
const toRelativePath = (path) => path.replace(/^\//, "");

const authRouteEntries = [
  {
    path: ROUTES.LOGIN,
    routeKey: "LOGIN",
    title: "Login",
    description: "Authentication page shell for the future session workflow.",
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    routeKey: "FORGOT_PASSWORD",
    title: "Forgot Password",
    description: "Password reset initiation shell.",
  },
  {
    path: ROUTES.RESET_PASSWORD,
    routeKey: "RESET_PASSWORD",
    title: "Reset Password",
    description: "Token-based password reset shell.",
  },
  {
    path: ROUTES.ACCEPT_INVITE,
    routeKey: "ACCEPT_INVITE",
    title: "Accept Invite",
    description: "Invitation acceptance shell for first-time users.",
  },
];

const appRouteEntries = [
  {
    path: ROUTES.DASHBOARD,
    routeKey: "DASHBOARD",
    title: "Dashboard",
    description: "Role-aware dashboard shell with KPI, chart, and grid primitives.",
    highlights: ["KPI shell", "Chart shell", "Responsive grid"],
    showcase: "dashboard",
  },
  {
    path: ROUTES.REQUESTS,
    routeKey: "REQUESTS",
    title: "Requests",
    description: "Request intake shell with list filters and route wiring.",
    highlights: ["List screen", "Filters", "Request routing"],
  },
  {
    path: ROUTES.REQUEST_NEW,
    routeKey: "REQUEST_NEW",
    title: "New Request",
    description: "Internal request creation shell for later forms.",
    highlights: ["Form shell", "Validation wrappers"],
  },
  {
    path: ROUTES.REQUEST_DETAIL,
    routeKey: "REQUEST_DETAIL",
    title: "Request Detail",
    description: "Detail-screen shell for future triage and history views.",
    highlights: ["Detail shell", "Drawer actions"],
  },
  {
    path: ROUTES.WORK_ORDERS,
    routeKey: "WORK_ORDERS",
    title: "Work Orders",
    description: "Operational work-order list shell.",
    highlights: ["Grid shell", "Saved view-ready"],
  },
  {
    path: ROUTES.WORK_ORDER_NEW,
    routeKey: "WORK_ORDER_NEW",
    title: "New Work Order",
    description: "Direct work-order creation shell.",
    highlights: ["Form shell", "Action dialog"],
  },
  {
    path: ROUTES.WORK_ORDER_DETAIL,
    routeKey: "WORK_ORDER_DETAIL",
    title: "Work Order Detail",
    description: "Execution detail shell for later status, cost, and history flows.",
    highlights: ["Detail shell", "Activity-ready"],
  },
  {
    path: ROUTES.PM_PLANS,
    routeKey: "PM_PLANS",
    title: "PM Plans",
    description: "Preventive maintenance list shell.",
    highlights: ["List shell", "Calendar-ready"],
  },
  {
    path: ROUTES.PM_CALENDAR,
    routeKey: "PM_CALENDAR",
    title: "PM Calendar",
    description: "Calendar shell for future PM schedule visualization.",
    highlights: ["Calendar-ready", "Responsive layout"],
  },
  {
    path: ROUTES.PM_PLAN_DETAIL,
    routeKey: "PM_PLAN_DETAIL",
    title: "PM Plan Detail",
    description: "Detail shell for PM definition and history.",
    highlights: ["Detail shell", "History-ready"],
  },
  {
    path: ROUTES.ASSETS,
    routeKey: "ASSETS",
    title: "Assets",
    description: "Asset management shell with reusable grids and metadata panels.",
    highlights: ["Grid shell", "Metadata panel"],
  },
  {
    path: ROUTES.ASSET_DETAIL,
    routeKey: "ASSET_DETAIL",
    title: "Asset Detail",
    description: "Asset detail shell for future meters, history, and PM context.",
    highlights: ["Detail shell", "Attachment-ready"],
  },
  {
    path: ROUTES.LOCATIONS,
    routeKey: "LOCATIONS",
    title: "Locations",
    description: "Location list/tree shell for future hierarchy management.",
    highlights: ["Tree-ready", "Responsive list"],
  },
  {
    path: ROUTES.LOCATION_DETAIL,
    routeKey: "LOCATION_DETAIL",
    title: "Location Detail",
    description: "Location detail shell for linked work and operational configuration.",
    highlights: ["Detail shell", "Config-ready"],
  },
  {
    path: ROUTES.INVENTORY_PARTS,
    routeKey: "INVENTORY_PARTS",
    title: "Parts",
    description: "Inventory list shell for future stock visibility and actions.",
    highlights: ["Grid shell", "Bulk-action ready"],
  },
  {
    path: ROUTES.INVENTORY_PART_DETAIL,
    routeKey: "INVENTORY_PART_DETAIL",
    title: "Part Detail",
    description: "Part detail shell for stock lines and transaction history.",
    highlights: ["Detail shell", "History-ready"],
  },
  {
    path: ROUTES.INVENTORY_TRANSACTIONS,
    routeKey: "INVENTORY_TRANSACTIONS",
    title: "Inventory Transactions",
    description: "Transaction-history shell for later inventory flows.",
    highlights: ["Audit-ready", "Filters"],
  },
  {
    path: ROUTES.VENDORS,
    routeKey: "VENDORS",
    title: "Vendors",
    description: "Vendor list shell with responsive operational layout.",
    highlights: ["Grid shell", "Compliance-ready"],
  },
  {
    path: ROUTES.VENDOR_DETAIL,
    routeKey: "VENDOR_DETAIL",
    title: "Vendor Detail",
    description: "Vendor detail shell for later compliance and assignment views.",
    highlights: ["Detail shell", "Restricted access-ready"],
  },
  {
    path: ROUTES.REPORTS,
    routeKey: "REPORTS",
    title: "Reports",
    description: "Reports hub shell for future dashboards and exports.",
    highlights: ["Chart shell", "Export-ready"],
  },
  {
    path: ROUTES.SETTINGS_ORGANIZATION,
    routeKey: "SETTINGS_ORGANIZATION",
    title: "Organization Settings",
    description: "Organization configuration shell for operational setup.",
    highlights: ["Settings shell", "Master config-ready"],
  },
  {
    path: ROUTES.SETTINGS_PROPERTIES,
    routeKey: "SETTINGS_PROPERTIES",
    title: "Property Settings",
    description: "Property-specific configuration shell.",
    highlights: ["Settings shell", "Property scope-ready"],
  },
  {
    path: ROUTES.SETTINGS_MASTER_DATA,
    routeKey: "SETTINGS_MASTER_DATA",
    title: "Master Data",
    description: "Master-data settings shell for categories, SLAs, and business rules.",
    highlights: ["Settings shell", "Admin-ready"],
  },
  {
    path: ROUTES.SETTINGS_ROLES,
    routeKey: "SETTINGS_ROLES",
    title: "Roles",
    description: "Role management shell.",
    highlights: ["Admin shell", "Permissions-ready"],
  },
  {
    path: ROUTES.SETTINGS_TEAMS,
    routeKey: "SETTINGS_TEAMS",
    title: "Teams",
    description: "Team-management shell.",
    highlights: ["Admin shell", "Scope-ready"],
  },
  {
    path: ROUTES.SETTINGS_USERS,
    routeKey: "SETTINGS_USERS",
    title: "Users",
    description: "User-administration shell.",
    highlights: ["Admin shell", "Invite-ready"],
  },
  {
    path: ROUTES.IMPORTS,
    routeKey: "IMPORTS",
    title: "Imports",
    description: "Import job shell for later dry-run and commit flows.",
    highlights: ["Import shell", "Telemetry-ready"],
  },
  {
    path: ROUTES.AUDIT,
    routeKey: "AUDIT",
    title: "Audit Log",
    description: "Audit workspace shell.",
    highlights: ["Traceability", "Filters"],
  },
  {
    path: ROUTES.PROFILE,
    routeKey: "PROFILE",
    title: "My Profile",
    description: "Profile and session shell.",
    highlights: ["Profile shell", "Session-ready"],
  },
];

const portalRouteEntries = [
  {
    path: ROUTES.REQUEST_PORTAL,
    routeKey: "REQUEST_PORTAL",
    title: "Request Portal",
    description: "Restricted requester portal shell.",
  },
  {
    path: ROUTES.VENDOR_WORK_ORDERS,
    routeKey: "VENDOR_WORK_ORDERS",
    title: "Vendor Portal",
    description: "Restricted vendor portal shell.",
  },
];

/**
 * Builds a route object for the shared placeholder page shell.
 *
 * @param {{path: string, title: string, description: string, routeKey: string, milestone?: string, highlights?: string[], showcase?: string}} entry - Route metadata.
 * @param {"app" | "auth" | "portal"} layout - Layout shell key.
 * @returns {import("react-router").RouteObject} Route object.
 */
const buildPlaceholderRoute = (entry, layout) => ({
  path: toRelativePath(entry.path),
  element: (
    <FeaturePlaceholderPage
      title={entry.title}
      description={entry.description}
      routeKey={entry.routeKey}
      milestone="Detailed feature behavior is scheduled for later phases after the shared shell."
      highlights={entry.highlights || []}
      layout={layout}
      showcase={layout === "auth" ? "form" : layout === "portal" ? "portal" : entry.showcase || "dashboard"}
    />
  ),
  handle: {
    title: entry.title,
  },
});

/**
 * Shared React Router configuration for the Phase 03 app shell.
 */
export const appRouter = createBrowserRouter([
  {
    path: "/",
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.DASHBOARD} replace />,
      },
      {
        element: <AuthLayout />,
        children: authRouteEntries.map((entry) => buildPlaceholderRoute(entry, "auth")),
      },
      {
        element: <PortalLayout />,
        children: portalRouteEntries.map((entry) => buildPlaceholderRoute(entry, "portal")),
      },
      {
        element: <AppLayout />,
        children: appRouteEntries.map((entry) => buildPlaceholderRoute(entry, "app")),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default appRouter;
