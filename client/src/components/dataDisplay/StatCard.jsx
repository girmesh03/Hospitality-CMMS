import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
}));

/**
 * Shared KPI/stat card.
 *
 * @param {{label: string, value: string, trend?: string, status?: string, onClick?: (() => void) | null}} props - Component props.
 * @returns {JSX.Element} Stat card.
 */
export const StatCard = ({ label, value, trend = "", status = "", onClick = null }) => {
  const content = (
    <CardContent>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Typography variant="subtitle2" color="text.secondary">
            {label}
          </Typography>
          {status && <Chip label={status} size="small" color="secondary" variant="outlined" />}
        </Stack>
        <Typography variant="h4">{value}</Typography>
        {trend && (
          <Typography variant="body2" color="text.secondary">
            {trend}
          </Typography>
        )}
      </Stack>
    </CardContent>
  );

  return <StyledCard>{onClick ? <CardActionArea onClick={onClick}>{content}</CardActionArea> : content}</StyledCard>;
};

export default StatCard;
