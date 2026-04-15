import { createTheme } from "@mui/material/styles";
import createAppComponentOverrides from "./components.js";
import appPalette from "./palette.js";
import { APP_SHAPE, APP_SPACING } from "./spacing.js";
import appTypography from "./typography.js";

/**
 * Centralized MUI theme for the Hospitality CMMS frontend.
 */

const baseTheme = createTheme({
  palette: appPalette,
  typography: appTypography,
  spacing: APP_SPACING,
  shape: APP_SHAPE,
});

/**
 * Resolved application theme with component overrides.
 */
export const appTheme = createTheme(baseTheme, {
  components: createAppComponentOverrides(baseTheme),
});

export default appTheme;
