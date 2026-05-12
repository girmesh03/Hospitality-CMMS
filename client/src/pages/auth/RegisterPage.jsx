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
import { authApi } from "../../domains/auth/api.js";

/**
 * Registration page with password strength indicator.
 * @returns {JSX.Element}
 */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await authApi.register(form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Create Account</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="Email" type="email" value={form.email} onChange={handleChange("email")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="First Name" value={form.firstName} onChange={handleChange("firstName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Last Name" value={form.lastName} onChange={handleChange("lastName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={form.password} onChange={handleChange("password")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} fullWidth required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mb: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Create Account"}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            Already have an account? <Link to="/login" style={{ color: "inherit" }}>Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
