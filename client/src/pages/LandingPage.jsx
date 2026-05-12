import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

/**
 * Public landing page. Redirects to app if authenticated, shows welcome content otherwise.
 * @returns {JSX.Element}
 */
export default function LandingPage() {
  const navigate = useNavigate();
  const auth = useSelector((s) => s.auth);

  useEffect(() => {
    if (auth.loading) return;
    if (auth.isAuthenticated) {
      navigate("/app/dashboard", { replace: true });
    }
  }, [auth.loading, auth.isAuthenticated, navigate]);

  if (auth.loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (auth.isAuthenticated) return null;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h1">
          Hospitality CMMS
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Maintenance management platform for hospitality properties.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" size="large" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate("/bootstrap")}>
            Setup System
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
