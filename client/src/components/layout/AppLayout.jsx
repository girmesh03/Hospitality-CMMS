import { useState } from "react";
import { Outlet } from "react-router";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { TopBar } from "./TopBar.jsx";
import { SideNav } from "./SideNav.jsx";

const DRAWER_WIDTH = 240;

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
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
        }}
      >
        <TopBar onMenuToggle={() => setMobileOpen(!mobileOpen)} />
      </AppBar>
      <SideNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          mt: "64px",
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
