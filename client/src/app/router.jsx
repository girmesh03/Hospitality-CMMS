import { createBrowserRouter, Navigate } from "react-router";
import { ProtectedRoute } from "../components/navigation/ProtectedRoute.jsx";
import { GuestRoute } from "../components/navigation/GuestRoute.jsx";
import { AppLayout } from "../components/layout/AppLayout.jsx";
import { NotFoundPage } from "../pages/NotFoundPage.jsx";
import { ForbiddenPage } from "../pages/ForbiddenPage.jsx";
import PagePlaceholder from "../pages/PagePlaceholder.jsx";
import LandingPage from "../pages/LandingPage.jsx";
import BootstrapPage from "../pages/bootstrap/BootstrapPage.jsx";
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage.jsx";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage.jsx";
import DashboardPage from "../pages/dashboard/DashboardPage.jsx";
import RequestListPage from "../pages/requests/RequestListPage.jsx";
import WorkOrderListPage from "../pages/workOrders/WorkOrderListPage.jsx";
import PMListPage from "../pages/preventiveMaintenance/PMListPage.jsx";
import AssetListPage from "../pages/assets/AssetListPage.jsx";
import LocationTreePage from "../pages/locations/LocationTreePage.jsx";
import InventoryListPage from "../pages/inventory/InventoryListPage.jsx";
import VendorListPage from "../pages/vendors/VendorListPage.jsx";
import NotificationCenterPage from "../pages/notifications/NotificationCenterPage.jsx";
import ReportsHubPage from "../pages/reports/ReportsHubPage.jsx";
import ProfilePage from "../pages/settings/ProfilePage.jsx";
import ImportListPage from "../pages/imports/ImportListPage.jsx";
import AuditLogPage from "../pages/audit/AuditLogPage.jsx";
import PropertyListPage from "../pages/properties/PropertyListPage.jsx";
import UserListPage from "../pages/users/UserListPage.jsx";
import RoleListPage from "../pages/roles/RoleListPage.jsx";
import TeamListPage from "../pages/teams/TeamListPage.jsx";
import OrganizationSettingsPage from "../pages/organizations/OrganizationSettingsPage.jsx";
import RequestPortalPage from "../pages/portal/RequestPortalPage.jsx";
import VendorPortalPage from "../pages/portal/VendorPortalPage.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/bootstrap", element: <GuestRoute><BootstrapPage /></GuestRoute> },
  { path: "/login", element: <GuestRoute><LoginPage /></GuestRoute> },
  { path: "/register", element: <GuestRoute><RegisterPage /></GuestRoute> },
  { path: "/forgot-password", element: <GuestRoute><ForgotPasswordPage /></GuestRoute> },
  { path: "/reset-password", element: <GuestRoute><ResetPasswordPage /></GuestRoute> },
  {
    path: "/app",
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "requests", element: <RequestListPage /> },
      { path: "work-orders", element: <WorkOrderListPage /> },
      { path: "pm-plans", element: <PMListPage /> },
      { path: "pm-plans/calendar", element: <PagePlaceholder title="PM Calendar" /> },
      { path: "assets", element: <AssetListPage /> },
      { path: "locations", element: <LocationTreePage /> },
      { path: "properties", element: <PropertyListPage /> },
      { path: "inventory", element: <InventoryListPage /> },
      { path: "vendors", element: <VendorListPage /> },
      { path: "users", element: <UserListPage /> },
      { path: "roles", element: <RoleListPage /> },
      { path: "teams", element: <TeamListPage /> },
      { path: "notifications", element: <NotificationCenterPage /> },
      { path: "reports", element: <ReportsHubPage /> },
      { path: "settings/profile", element: <ProfilePage /> },
      { path: "settings/organization", element: <OrganizationSettingsPage /> },
      { path: "settings/email", element: <PagePlaceholder title="Email Configuration" /> },
      { path: "imports", element: <ImportListPage /> },
      { path: "imports/new", element: <PagePlaceholder title="New Import" /> },
      { path: "audit-log", element: <AuditLogPage /> },
      { path: "portal/requests", element: <RequestPortalPage /> },
      { path: "portal/vendor", element: <VendorPortalPage /> },
    ],
  },
  { path: "/403", element: <ForbiddenPage /> },
  { path: "*", element: <NotFoundPage /> },
]);
