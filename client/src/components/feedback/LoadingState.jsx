import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const LoadingRoot = styled(Stack)(({ theme }) => ({
  minHeight: theme.spacing(24),
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  textAlign: "center",
}));

/**
 * Shared loading-state component.
 *
 * @param {{title?: string, description?: string}} props - Component props.
 * @returns {JSX.Element} Loading state.
 */
export const LoadingState = ({ title = "Loading workspace", description = "Preparing the next view." }) => (
  <LoadingRoot spacing={2}>
    <CircularProgress color="secondary" />
    <Stack spacing={0.5}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  </LoadingRoot>
);

export default LoadingState;
