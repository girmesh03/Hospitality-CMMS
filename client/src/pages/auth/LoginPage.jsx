import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { authApi } from "../../domains/auth/api.js";

/**
 * Login page with email/password form and remember-me toggle.
 * @returns {JSX.Element}
 */
export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "", rememberMe: false });

  const handleChange = (field) => (e) => {
    const value = field === "rememberMe" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authApi.login(form);
      if (res.data.data?.csrfToken) {
        sessionStorage.setItem("csrfToken", res.data.data.csrfToken);
      }
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Sign In</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="Email" type="email" value={form.email} onChange={handleChange("email")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={form.password} onChange={handleChange("password")} fullWidth required sx={{ mb: 1 }} />
            <FormControlLabel control={<Checkbox checked={form.rememberMe} onChange={handleChange("rememberMe")} />} label="Remember me" sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mb: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Sign In"}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            <Link to="/forgot-password" style={{ color: "inherit" }}>Forgot password?</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
