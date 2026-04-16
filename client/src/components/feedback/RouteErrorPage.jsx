import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { ErrorState } from "./ErrorState.jsx";

/**
 * Route-level error page for React Router.
 *
 * @returns {JSX.Element} Route error view.
 */
export const RouteErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const description = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "An unexpected route error occurred.";

  return (
    <Stack spacing={2} padding={3}>
      <Typography variant="h4">Route Error</Typography>
      <ErrorState title="Unable to render this route" description={description} onAction={() => navigate(-1)} actionLabel="Go back" />
    </Stack>
  );
};

export default RouteErrorPage;
