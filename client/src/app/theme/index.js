import { createTheme } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { inputsCustomizations } from "./customizations";
import { dataDisplayCustomizations } from "./customizations";
import { feedbackCustomizations } from "./customizations";
import { navigationCustomizations } from "./customizations";
import { surfacesCustomizations } from "./customizations";
import { chartsCustomizations } from "./customizations";
import { dataGridCustomizations } from "./customizations";
import { datePickersCustomizations } from "./customizations";

/**
 * Create the MUI theme instance with all customizations.
 * @returns {import("@mui/material/styles").Theme}
 */
export function createAppTheme() {
  return createTheme({
    cssVariables: {
      colorSchemeSelector: "data-mui-color-scheme",
      cssVarPrefix: "template",
    },
    colorSchemes,
    typography,
    shadows,
    shape,
    components: {
      ...inputsCustomizations,
      ...dataDisplayCustomizations,
      ...feedbackCustomizations,
      ...navigationCustomizations,
      ...surfacesCustomizations,
      ...chartsCustomizations,
      ...dataGridCustomizations,
      ...datePickersCustomizations,
    },
  });
}
