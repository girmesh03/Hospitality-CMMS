import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { authApi } from "../../domains/auth/api.js";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
      await authApi.resetPassword({ token, password: form.password });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
        <Card sx={{ maxWidth: 420, width: "100%" }}>
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Alert severity="error">Invalid reset link. No token provided.</Alert>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/forgot-password")}>Request New Link</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
        <Card sx={{ maxWidth: 420, width: "100%" }}>
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Alert severity="success">Password has been reset successfully.</Alert>
            <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/login")}>Sign In</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Reset Password</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="New Password" type="password" value={form.password} onChange={handleChange("password")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} fullWidth required sx={{ mb: 2 }} />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mb: 2 }}>
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </Box>

          <Typography variant="body2" align="center">
            <Link to="/login" style={{ color: "inherit" }}>Back to Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
