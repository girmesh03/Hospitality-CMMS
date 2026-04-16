import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useMatches } from "react-router";

/**
 * Shared breadcrumbs component derived from route handles.
 *
 * @returns {JSX.Element | null} Breadcrumbs when handle metadata exists.
 */
export const AppBreadcrumbs = () => {
  const matches = useMatches().filter((match) => Boolean(match.handle?.title));

  if (matches.length === 0) {
    return null;
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {matches.map((match, index) => {
        const isLast = index === matches.length - 1;
        const label = match.handle.title;

        if (isLast) {
          return (
            <Typography key={match.id} color="text.primary">
              {label}
            </Typography>
          );
        }

        return (
          <Link key={match.id} component={RouterLink} color="inherit" underline="hover" to={match.pathname}>
            {label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumbs;
