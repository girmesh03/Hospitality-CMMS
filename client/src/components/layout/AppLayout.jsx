import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { selectSidebarOpen } from "../../store/selectors/ui.selectors.js";
import { setSidebarOpen } from "../../store/slices/ui.slice.js";
import AppSidebar from "../navigation/AppSidebar.jsx";
import AppTopBar from "../navigation/AppTopBar.jsx";

const AppShellRoot = styled(Box)({
  display: "flex",
  minHeight: "100vh",
});

const AppShellContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minWidth: 0,
});

const drawerSx = {
  "& .MuiDrawer-paper": {
    width: (theme) => theme.spacing(35),
    boxSizing: "border-box",
  },
};

/**
 * Shared authenticated application layout.
 *
 * @returns {JSX.Element} App layout.
 */
export const AppLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const sidebarOpen = useSelector(selectSidebarOpen);

  const handleSidebarToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  return (
    <AppShellRoot>
      <Drawer
        variant={isDesktop ? "permanent" : "temporary"}
        open={isDesktop ? true : sidebarOpen}
        onClose={() => dispatch(setSidebarOpen(false))}
        sx={drawerSx}
      >
        <AppSidebar />
      </Drawer>
      <AppShellContent>
        <AppTopBar onMenuClick={handleSidebarToggle} />
        <Outlet />
      </AppShellContent>
    </AppShellRoot>
  );
};

export default AppLayout;
