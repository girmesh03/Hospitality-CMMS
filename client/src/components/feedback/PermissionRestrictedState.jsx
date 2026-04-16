import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

/**
 * Shared permission-restricted state.
 *
 * @param {{title?: string, description?: string}} props - Component props.
 * @returns {JSX.Element} Permission state.
 */
export const PermissionRestrictedState = ({
  title = "Access is limited",
  description = "This shell is respecting the current permission boundary for this workspace.",
}) => (
  <Alert severity="warning" variant="outlined">
    <AlertTitle>{title}</AlertTitle>
    {description}
  </Alert>
);

export default PermissionRestrictedState;
