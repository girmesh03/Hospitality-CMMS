import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import notFoundIllustration from "../../assets/notFound_404.svg";
import PageContainer from "../../components/layout/PageContainer.jsx";

/**
 * Shared not-found page.
 *
 * @returns {JSX.Element} Not-found view.
 */
export const NotFoundPage = () => (
  <PageContainer>
    <Stack spacing={3} sx={{ alignItems: "center", textAlign: "center" }}>
      <img src={notFoundIllustration} alt="Not found illustration" width="320" />
      <Stack spacing={1}>
        <Typography variant="h3">Route not found</Typography>
        <Typography variant="body1" color="text.secondary">
          The requested route is not part of the current frontend shell.
        </Typography>
      </Stack>
      <Button component={Link} to="/dashboard" variant="contained">
        Return to dashboard shell
      </Button>
    </Stack>
  </PageContainer>
);

export default NotFoundPage;
