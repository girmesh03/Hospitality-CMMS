import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

/**
 * Alert banner for inline notifications.
 * @param {{ severity?: "error" | "warning" | "info" | "success", title?: string, message?: string, onClose?: () => void }} props
 * @returns {JSX.Element}
 */
export function AlertBanner({ severity, title, message, onClose }) {
  return (
    <Alert severity={severity || "info"} onClose={onClose} sx={{ mb: 2 }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {message}
    </Alert>
  );
}
