import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

/**
 * Placeholder page for routes not yet implemented.
 * @param {{ title: string }} props
 * @returns {JSX.Element}
 */
export default function PagePlaceholder({ title }) {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        This page is under construction.
      </Typography>
    </Box>
  );
}
