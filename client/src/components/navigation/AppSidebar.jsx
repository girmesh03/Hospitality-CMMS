import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import BuildCircleOutlinedIcon from "@mui/icons-material/BuildCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MoveToInboxOutlinedIcon from "@mui/icons-material/MoveToInboxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Link as RouterLink, useLocation } from "react-router";
import { APP_NAV_ITEMS } from "../../utils/constants.js";
import { formatLabelFromKey } from "../../utils/formatting.js";
import { getRoutePath } from "../../utils/routes.js";

const SidebarRoot = styled(Stack)(({ theme }) => ({
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledNavButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  "&.Mui-selected": {
    backgroundColor: `${theme.palette.primary.main}14`,
    color: theme.palette.primary.dark,
  },
}));

const navIconMap = {
  dashboard: <DashboardOutlinedIcon />,
  request: <MoveToInboxOutlinedIcon />,
  workOrder: <HandymanOutlinedIcon />,
  pm: <TuneOutlinedIcon />,
  asset: <BuildCircleOutlinedIcon />,
  location: <LocationOnOutlinedIcon />,
  inventory: <Inventory2OutlinedIcon />,
  vendor: <StorefrontOutlinedIcon />,
  report: <AssessmentOutlinedIcon />,
  settings: <SettingsOutlinedIcon />,
  import: <SourceOutlinedIcon />,
  audit: <VerifiedUserOutlinedIcon />,
};

/**
 * Shared authenticated navigation sidebar.
 *
 * @returns {JSX.Element} App sidebar.
 */
export const AppSidebar = () => {
  const location = useLocation();
  const groupedItems = APP_NAV_ITEMS.reduce((groups, item) => {
    const sectionKey = item.section;
    const currentItems = groups[sectionKey] || [];

    return {
      ...groups,
      [sectionKey]: [...currentItems, item],
    };
  }, {});

  return (
    <SidebarRoot spacing={2}>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Multi-property maintenance
        </Typography>
        <Typography variant="h5">Operations Shell</Typography>
      </Box>
      <Divider />
      {Object.entries(groupedItems).map(([sectionKey, items]) => (
        <Stack key={sectionKey} spacing={1}>
          <Typography variant="overline" color="text.secondary">
            {formatLabelFromKey(sectionKey)}
          </Typography>
          <List disablePadding>
            {items.map((item) => {
              const targetPath = item.routeKey === "SETTINGS_ORGANIZATION" ? "/settings" : getRoutePath(item.routeKey);

              return (
                <StyledNavButton
                  key={item.routeKey}
                  component={RouterLink}
                  to={getRoutePath(item.routeKey)}
                  selected={location.pathname.startsWith(targetPath)}
                >
                  <ListItemIcon>{navIconMap[item.icon]}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </StyledNavButton>
              );
            })}
          </List>
        </Stack>
      ))}
    </SidebarRoot>
  );
};

export default AppSidebar;
