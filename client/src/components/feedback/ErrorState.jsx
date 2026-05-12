import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * Error state display with optional retry button.
 * @param {{ title?: string, message?: string, onRetry?: () => void }} props
 * @returns {JSX.Element}
 */
export function ErrorState({ title, message, onRetry }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: (theme) => theme.spacing(25),
        gap: 1,
        py: 6,
      }}
    >
      <ErrorIcon sx={(theme) => ({ fontSize: theme.typography.pxToRem(48), color: "error.main", mb: 1 })} />
      <Typography variant="h6" color="error.main">
        {title || "An error occurred"}
      </Typography>
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
      {onRetry && (
        <Button variant="outlined" onClick={onRetry} sx={{ mt: 1 }}>
          Try Again
        </Button>
      )}
    </Box>
  );
}
