/**
 * Returns the auth slice.
 *
 * @param {{auth: Record<string, unknown>}} state - Redux state.
 * @returns {Record<string, unknown>} Auth slice.
 */
export const selectAuthState = (state) => state.auth;

/**
 * Returns the in-memory access token.
 *
 * @param {{auth: {accessToken: string | null}}} state - Redux state.
 * @returns {string | null} Access token.
 */
export const selectAccessToken = (state) => state.auth.accessToken;

/**
 * Returns the CSRF token.
 *
 * @param {{auth: {csrfToken: string | null}}} state - Redux state.
 * @returns {string | null} CSRF token.
 */
export const selectCsrfToken = (state) => state.auth.csrfToken;

/**
 * Returns the current user shell.
 *
 * @param {{auth: {user: Record<string, unknown> | null}}} state - Redux state.
 * @returns {Record<string, unknown> | null} User shell.
 */
export const selectCurrentUser = (state) => state.auth.user;

/**
 * Returns the effective permission list.
 *
 * @param {{auth: {permissions: string[]}}} state - Redux state.
 * @returns {string[]} Permission list.
 */
export const selectPermissions = (state) => state.auth.permissions;

/**
 * Returns whether the app currently has an authenticated session.
 *
 * @param {{auth: {status: string, accessToken: string | null}}} state - Redux state.
 * @returns {boolean} `true` when the shell should behave as authenticated.
 */
export const selectIsAuthenticated = (state) =>
  state.auth.status === "authenticated" && Boolean(state.auth.accessToken);
