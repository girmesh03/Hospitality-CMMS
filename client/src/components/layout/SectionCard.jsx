import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

/**
 * Shared section surface for page-level content blocks.
 *
 * @param {{title?: string, description?: string, actions?: React.ReactNode, children: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Section card.
 */
export const SectionCard = ({ title, description, actions = null, children }) => (
  <StyledCard>
    <CardContent>
      {(title || description || actions) && (
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            marginBottom: 3,
          }}
        >
          <Stack spacing={0.5}>
            {title && (
              <Typography variant="h6" component="h2">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </Stack>
          {actions}
        </Stack>
      )}
      {children}
    </CardContent>
  </StyledCard>
);

export default SectionCard;
