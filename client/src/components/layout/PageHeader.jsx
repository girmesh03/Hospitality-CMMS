import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const HeaderRoot = styled(Stack)(({ theme }) => ({
  paddingBottom: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

/**
 * Shared page-header component.
 *
 * @param {{eyebrow?: string, title: string, description?: string, actions?: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Page header.
 */
export const PageHeader = ({ eyebrow, title, description, actions = null }) => (
  <HeaderRoot
    direction={{ xs: "column", lg: "row" }}
    spacing={2}
    sx={{
      justifyContent: "space-between",
      alignItems: { xs: "flex-start", lg: "flex-end" },
    }}
  >
    <Stack spacing={1}>
      {eyebrow && <Chip label={eyebrow} color="secondary" variant="outlined" size="small" />}
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      {description && (
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      )}
    </Stack>
    {actions}
  </HeaderRoot>
);

export default PageHeader;
