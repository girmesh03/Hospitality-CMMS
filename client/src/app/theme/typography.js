/**
 * Shared MUI typography tokens for the Hospitality CMMS frontend.
 */

/**
 * Centralized typography configuration aligned with the Inter font import in
 * `client/src/main.jsx`.
 */
export const appTypography = Object.freeze({
  fontFamily: ["Inter", "\"Helvetica Neue\"", "Arial", "sans-serif"].join(", "),
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.15,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.25,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: 1.35,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.5,
  },
  body1: {
    fontSize: "0.95rem",
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.02em",
    textTransform: "none",
  },
  caption: {
    fontSize: "0.75rem",
    lineHeight: 1.5,
  },
});

export default appTypography;
