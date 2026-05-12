import { useState } from "react";
import { Link } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { authApi } from "../../domains/auth/api.js";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await authApi.forgotPassword({ email });
      setSent(true);
    } catch (err) {
      setError(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", p: 2 }}>
      <Card sx={{ maxWidth: 420, width: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>Forgot Password</Typography>

          {sent ? (
            <Alert severity="success">If the email exists, a reset link has been sent.</Alert>
          ) : (
            <>
              {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required sx={{ mb: 2 }} />
                <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ mb: 2 }}>
                  {loading ? <CircularProgress size={24} /> : "Send Reset Link"}
                </Button>
              </Box>
            </>
          )}

          <Typography variant="body2" align="center">
            <Link to="/login" style={{ color: "inherit" }}>Back to Sign In</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
