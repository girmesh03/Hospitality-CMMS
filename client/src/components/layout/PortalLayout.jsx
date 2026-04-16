import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";

const PortalShellRoot = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));

/**
 * Shared requester/vendor portal layout without internal app navigation.
 *
 * @returns {JSX.Element} Portal layout.
 */
export const PortalLayout = () => (
  <PortalShellRoot>
    <Stack spacing={1}>
      <Typography variant="overline" color="text.secondary">
        Restricted Portal
      </Typography>
      <Typography variant="h3">External Access Shell</Typography>
      <Alert severity="info" variant="outlined">
        Portal routes intentionally omit internal navigation. Full requester and vendor portal behavior arrives in later phases.
      </Alert>
    </Stack>
    <Outlet />
  </PortalShellRoot>
);

export default PortalLayout;
