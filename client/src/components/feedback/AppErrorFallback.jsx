import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { ErrorState } from "./ErrorState.jsx";

/**
 * Global error-boundary fallback component.
 *
 * @param {{error: Error, resetErrorBoundary: () => void}} props - Component props.
 * @returns {JSX.Element} Error-boundary fallback.
 */
export const AppErrorFallback = ({ error, resetErrorBoundary }) => (
  <Stack spacing={2} padding={3}>
    <ErrorState
      title="The application shell crashed"
      description={error?.message || "An unexpected rendering error occurred."}
      actionLabel="Reset shell"
      onAction={resetErrorBoundary}
    />
    <Button variant="outlined" onClick={() => window.location.assign("/")}>
      Reload application
    </Button>
  </Stack>
);

export default AppErrorFallback;
