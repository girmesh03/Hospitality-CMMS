import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

/**
 * Shared error-state component.
 *
 * @param {{title?: string, description?: string, actionLabel?: string, onAction?: (() => void) | null}} props - Component props.
 * @returns {JSX.Element} Error state.
 */
export const ErrorState = ({
  title = "Something went wrong",
  description = "The workspace could not be rendered with the current data.",
  actionLabel = "Try again",
  onAction = null,
}) => (
  <Stack spacing={2}>
    <Alert
      severity="error"
      action={
        onAction ? (
          <Button color="inherit" size="small" onClick={onAction}>
            {actionLabel}
          </Button>
        ) : null
      }
    >
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
  </Stack>
);

export default ErrorState;
