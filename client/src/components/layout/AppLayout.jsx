import { useState } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TopBar } from "./TopBar.jsx";
import { SideNav } from "./SideNav.jsx";
import { layoutConfig } from "../../app/theme/themePrimitives";

/**
 * Main application layout shell with TopBar, SideNav, and routed content outlet.
 * @returns {JSX.Element}
 */
export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        sx={(theme) => ({
          width: { md: `calc(100% - ${layoutConfig.drawerWidth}px)` },
          ml: { md: `${layoutConfig.drawerWidth}px` },
        })}
      >
        <TopBar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
      </AppBar>
      <SideNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          width: { md: `calc(100% - ${layoutConfig.drawerWidth}px)` },
          mt: theme.spacing(layoutConfig.headerHeight / 8),
          p: 3,
        })}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
