import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";

const AuthShellRoot = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: theme.spacing(3),
  background: `radial-gradient(circle at top, ${theme.palette.primary.light}1F, transparent 48%), ${theme.palette.background.default}`,
}));

const AuthCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.values.sm,
  padding: theme.spacing(4),
}));

/**
 * Shared auth-shell layout.
 *
 * @returns {JSX.Element} Auth layout.
 */
export const AuthLayout = () => (
  <AuthShellRoot>
    <AuthCard elevation={0}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            Hospitality CMMS
          </Typography>
          <Typography variant="h3">Authentication</Typography>
          <Typography variant="body1" color="text.secondary">
            Phase 03 provides the auth shell and route structure. Full session workflows arrive in Phase 04.
          </Typography>
        </Stack>
        <Outlet />
      </Stack>
    </AuthCard>
  </AuthShellRoot>
);

export default AuthLayout;
