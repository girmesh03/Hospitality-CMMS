import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

/**
 * 403 page displayed when user lacks permissions.
 * @returns {JSX.Element}
 */
export function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography variant="h1" color="error.main" sx={(theme) => ({ fontSize: theme.typography.pxToRem(96), fontWeight: theme.typography.fontWeightBold })}>
        403
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You do not have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/app/dashboard")}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
