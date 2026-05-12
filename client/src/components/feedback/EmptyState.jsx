import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InboxIcon from "@mui/icons-material/Inbox";

/**
 * Empty state placeholder with optional action button.
 * @param {{ title?: string, message?: string, actionLabel?: string, onAction?: () => void }} props
 * @returns {JSX.Element}
 */
export function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 200,
        gap: 1,
        py: 6,
      }}
    >
      <InboxIcon sx={{ fontSize: 48, color: "text.secondary", mb: 1 }} />
      <Typography variant="h6" color="text.secondary">
        {title || "No data found"}
      </Typography>
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
      {actionLabel && onAction && (
        <Button variant="contained" onClick={onAction} sx={{ mt: 1 }}>
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
