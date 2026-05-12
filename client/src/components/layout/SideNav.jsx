import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import InventoryIcon from "@mui/icons-material/Inventory";
import RoomIcon from "@mui/icons-material/Room";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import ReportIcon from "@mui/icons-material/Report";
import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SecurityIcon from "@mui/icons-material/Security";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", path: "/app/dashboard", icon: <DashboardIcon /> },
  { label: "Requests", path: "/app/requests", icon: <AssignmentIcon /> },
  { label: "Work Orders", path: "/app/work-orders", icon: <BuildIcon /> },
  { label: "PM Plans", path: "/app/pm-plans", icon: <PrecisionManufacturingIcon /> },
  { label: "Assets", path: "/app/assets", icon: <InventoryIcon /> },
  { label: "Locations", path: "/app/locations", icon: <RoomIcon /> },
  { label: "Properties", path: "/app/properties", icon: <BusinessIcon /> },
  { label: "Inventory", path: "/app/inventory", icon: <InventoryIcon /> },
  { label: "Vendors", path: "/app/vendors", icon: <PeopleIcon /> },
  { label: "Notifications", path: "/app/notifications", icon: <NotificationsIcon /> },
  { label: "Reports", path: "/app/reports", icon: <ReportIcon /> },
  {
    label: "Administration",
    icon: <SettingsIcon />,
    children: [
      { label: "Users", path: "/app/users", icon: <PeopleIcon /> },
      { label: "Roles", path: "/app/roles", icon: <SecurityIcon /> },
      { label: "Teams", path: "/app/teams", icon: <BusinessIcon /> },
      { label: "Organization", path: "/app/settings/organization", icon: <BusinessIcon /> },
      { label: "Imports", path: "/app/imports", icon: <FileUploadIcon /> },
      { label: "Audit Log", path: "/app/audit-log", icon: <SecurityIcon /> },
    ],
  },
];

function NavItem({ item, depth }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = hasChildren
    ? item.children.some((c) => location.pathname.startsWith(c.path))
    : location.pathname === item.path;

  const handleClick = () => {
    if (hasChildren) {
      setOpen(!open);
    } else {
      navigate(item.path);
    }
  };

  return (
    <>
      <ListItemButton
        selected={isActive && !open}
        onClick={handleClick}
        sx={{ pl: 2 + depth * 2 }}
      >
        <ListItemIcon sx={{ minWidth: 40 }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.label} />
        {hasChildren ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children.map((child) => (
              <NavItem key={child.path} item={child} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

/**
 * Side navigation drawer — temporary on mobile, permanent on desktop.
 * @param {{ open: boolean, onClose: () => void }} props
 * @returns {JSX.Element}
 */
export function SideNav({ open, onClose }) {
  const drawerContent = (
    <Box>
      <Toolbar />
      <Divider />
      <List disablePadding>
        {navItems.map((item) => (
          <NavItem key={item.path || item.label} item={item} depth={0} />
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
