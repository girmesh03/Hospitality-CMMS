import { useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

export default function BootstrapPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    orgName: "",
    subdomain: "",
    timezone: "UTC",
    currency: "USD",
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
    setLoading(true);

    try {
      await axios.post("/api/v1/bootstrap/initialize", form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Initialization failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
        <Card sx={{ maxWidth: 500, width: "100%" }}>
          <CardContent sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="h4" gutterBottom>System Initialized</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Your organization has been created. You can now log in with your admin credentials.
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate("/login")}>
              Continue to Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ maxWidth: 600, width: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Welcome to Hospitality CMMS</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Set up your organization to get started.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Organization</Typography>
            <TextField label="Organization Name" value={form.orgName} onChange={handleChange("orgName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Subdomain" value={form.subdomain} onChange={handleChange("subdomain")} fullWidth sx={{ mb: 2 }} />
            <TextField label="Timezone" value={form.timezone} onChange={handleChange("timezone")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Currency" value={form.currency} onChange={handleChange("currency")} fullWidth sx={{ mb: 2 }} />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Admin Account</Typography>
            <TextField label="Email" type="email" value={form.email} onChange={handleChange("email")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="First Name" value={form.firstName} onChange={handleChange("firstName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Last Name" value={form.lastName} onChange={handleChange("lastName")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Password" type="password" value={form.password} onChange={handleChange("password")} fullWidth required sx={{ mb: 2 }} />
            <TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={handleChange("confirmPassword")} fullWidth required sx={{ mb: 3 }} />

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Initialize System"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
