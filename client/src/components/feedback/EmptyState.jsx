import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { styled } from "@mui/material/styles";

const EmptyStateRoot = styled(Stack)(({ theme }) => ({
  minHeight: theme.spacing(24),
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  textAlign: "center",
}));

/**
 * Shared empty-state component.
 *
 * @param {{title?: string, description?: string, icon?: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Empty state.
 */
export const EmptyState = ({
  title = "No records available",
  description = "This area will populate as data becomes available.",
  icon = <InboxOutlinedIcon color="disabled" fontSize="large" />,
}) => (
  <EmptyStateRoot spacing={2}>
    {icon}
    <Stack spacing={0.5}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  </EmptyStateRoot>
);

export default EmptyState;
