import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(3),
  width: "100%",
  padding: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

/**
 * Shared page container for top-level screens.
 *
 * @param {{children: React.ReactNode}} props - Component props.
 * @returns {JSX.Element} Page container.
 */
export const PageContainer = ({ children }) => <StyledPageContainer>{children}</StyledPageContainer>;

export default PageContainer;
