import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SectionCard from "../layout/SectionCard.jsx";

const ChartCanvas = styled(Box)(({ theme }) => ({
  minHeight: theme.spacing(28),
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(135deg, ${theme.palette.primary.light}22, ${theme.palette.secondary.light}22)`,
  border: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

/**
 * Shared chart wrapper shell.
 *
 * @param {{title: string, description?: string, children?: React.ReactNode, footer?: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Chart panel.
 */
export const ChartPanel = ({ title, description, children = null, footer = null }) => (
  <SectionCard title={title} description={description}>
    <Stack spacing={2}>
      <ChartCanvas>
        {children || (
          <Typography variant="body2" color="text.secondary">
            Chart integration will attach here in later phases.
          </Typography>
        )}
      </ChartCanvas>
      {footer}
    </Stack>
  </SectionCard>
);

export default ChartPanel;
