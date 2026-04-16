import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const DrawerBody = styled(Stack)(({ theme }) => ({
  width: theme.spacing(52),
  maxWidth: "100vw",
  height: "100%",
  padding: theme.spacing(3),
  gap: theme.spacing(3),
}));

/**
 * Shared action drawer shell.
 *
 * @param {{open: boolean, title: string, description?: string, onClose: () => void, children: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Action drawer.
 */
export const ActionDrawer = ({ open, title, description, onClose, children }) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <DrawerBody>
      <Stack spacing={1}>
        <Typography variant="h5">{title}</Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </Stack>
      {children}
    </DrawerBody>
  </Drawer>
);

export default ActionDrawer;
