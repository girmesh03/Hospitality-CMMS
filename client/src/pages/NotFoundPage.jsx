import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router";

/**
 * 404 page displayed for unmatched routes.
 * @returns {JSX.Element}
 */
export function NotFoundPage() {
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
      <Typography variant="h1" color="text.secondary" sx={{ fontSize: 96, fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h5" color="text.secondary">
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary">
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate("/app/dashboard")}>
        Go to Dashboard
      </Button>
    </Box>
  );
}
