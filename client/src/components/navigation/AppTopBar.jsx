import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AppBar from "@mui/material/AppBar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/selectors/auth.selectors.js";
import AppBreadcrumbs from "./AppBreadcrumbs.jsx";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: "none",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * Shared top-bar component for the authenticated shell.
 *
 * @param {{onMenuClick: () => void}} props - Component props.
 * @returns {JSX.Element} App top bar.
 */
export const AppTopBar = ({ onMenuClick }) => {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <StyledAppBar position="sticky">
      <Toolbar>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", width: "100%" }}>
          <IconButton edge="start" onClick={onMenuClick} aria-label="Open navigation">
            <MenuOutlinedIcon />
          </IconButton>
          <Stack spacing={0.5} sx={{ flexGrow: 1 }}>
            <Typography variant="h6">Hospitality CMMS</Typography>
            <AppBreadcrumbs />
          </Stack>
          <Chip label="Phase 03 Shell" size="small" color="secondary" variant="outlined" />
          <IconButton aria-label="Notifications shell">
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <Chip
            icon={<PersonOutlineOutlinedIcon />}
            label={currentUser?.name || "Anonymous"}
            size="small"
            variant="outlined"
          />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppTopBar;
