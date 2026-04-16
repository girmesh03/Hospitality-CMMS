import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

/**
 * Shared key-value list component.
 *
 * @param {{items: Array<{label: string, value: React.ReactNode}>}} props - Component props.
 * @returns {JSX.Element} Key-value list.
 */
export const KeyValueList = ({ items }) => (
  <Stack divider={<Divider flexItem />} spacing={1}>
    {items.map((item) => (
      <Stack
        key={item.label}
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {item.label}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "right" }}>
          {item.value}
        </Typography>
      </Stack>
    ))}
  </Stack>
);

export default KeyValueList;
