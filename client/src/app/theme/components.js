import { alpha } from "@mui/material/styles";

/**
 * Shared MUI component overrides for the Hospitality CMMS frontend.
 */

/**
 * Creates component overrides from the resolved MUI theme instance.
 *
 * @param {import("@mui/material/styles").Theme} theme - Resolved theme.
 * @returns {import("@mui/material/styles").Components} Component overrides.
 */
export const createAppComponentOverrides = (theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        margin: 0,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      },
      "#root": {
        minHeight: "100vh",
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        paddingInline: theme.spacing(2),
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
      outlined: {
        borderColor: alpha(theme.palette.primary.main, 0.12),
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius + 4,
      },
    },
  },
});

export default createAppComponentOverrides;
