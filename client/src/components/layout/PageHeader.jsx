import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useLocation } from "react-router";

const pathLabels = {
  dashboard: "Dashboard",
  requests: "Requests",
  "work-orders": "Work Orders",
  "pm-plans": "PM Plans",
  assets: "Assets",
  locations: "Locations",
  inventory: "Inventory",
  vendors: "Vendors",
  notifications: "Notifications",
  reports: "Reports",
  settings: "Settings",
  imports: "Imports",
  "audit-log": "Audit Log",
  profile: "Profile",
  organization: "Organization",
  email: "Email Configuration",
  calendar: "Calendar",
};

/**
 * Page header with breadcrumbs, title, and action buttons.
 * @param {{ title: string, actions?: React.ReactNode, breadcrumbs?: Array<{ label: string, path: string }> }} props
 * @returns {JSX.Element}
 */
export function PageHeader({ title, actions, breadcrumbs }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems = breadcrumbs || pathnames.map((p) => ({
    label: pathLabels[p] || p.charAt(0).toUpperCase() + p.slice(1),
    path: p,
  }));

  return (
    <Box sx={{ mb: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        {breadcrumbItems.map((item, index) => (
          index < breadcrumbItems.length - 1 ? (
            <Link
              key={item.path}
              color="inherit"
              href={`/${item.path}`}
              underline="hover"
              fontSize="small"
            >
              {item.label}
            </Link>
          ) : (
            <Typography key={item.path} color="text.primary" fontSize="small">
              {item.label}
            </Typography>
          )
        ))}
      </Breadcrumbs>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4">{title}</Typography>
        {actions && <Box sx={{ display: "flex", gap: 1 }}>{actions}</Box>}
      </Box>
    </Box>
  );
}
