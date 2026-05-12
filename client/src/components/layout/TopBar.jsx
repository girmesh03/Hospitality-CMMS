import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { layoutConfig } from "../../app/theme/themePrimitives";
import { toggleTheme } from "../../store/slices/themeSlice";

/**
 * Application top bar with navigation toggle, logo, search, notifications, and theme toggle.
 * @param {{ onMenuToggle: () => void }} props
 * @returns {JSX.Element}
 */
export function TopBar({ onMenuToggle }) {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);

  return (
    <Toolbar
      sx={(theme) => ({
        px: { xs: 1, sm: 2 },
        minHeight: `${layoutConfig.headerHeight}px !important`,
        borderBottom: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      })}
    >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="toggle navigation"
        onClick={onMenuToggle}
        sx={{ mr: 1, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Box
        component="img"
        src="/logo.svg"
        alt="Logo"
        sx={(theme) => ({ height: theme.spacing(4), mr: 2, display: { xs: "none", sm: "block" } })}
      />
      <Typography
        variant="h6"
        noWrap
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        Hospitality CMMS
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton color="inherit" aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton color="inherit" aria-label="notifications">
        <Badge badgeContent={0} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="toggle theme"
        onClick={() => dispatch(toggleTheme())}
      >
        {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Toolbar>
  );
}
