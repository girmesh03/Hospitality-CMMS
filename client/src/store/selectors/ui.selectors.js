/**
 * Returns the UI slice.
 *
 * @param {{ui: Record<string, unknown>}} state - Redux state.
 * @returns {Record<string, unknown>} UI slice.
 */
export const selectUiState = (state) => state.ui;

/**
 * Returns the sidebar state for the app shell.
 *
 * @param {{ui: {sidebarOpen: boolean}}} state - Redux state.
 * @returns {boolean} Sidebar visibility state.
 */
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;

/**
 * Returns the filter drawer state for compact layouts.
 *
 * @param {{ui: {filterDrawerOpen: boolean}}} state - Redux state.
 * @returns {boolean} Filter drawer state.
 */
export const selectFilterDrawerOpen = (state) => state.ui.filterDrawerOpen;

/**
 * Returns the preferred grid density.
 *
 * @param {{ui: {gridDensity: string}}} state - Redux state.
 * @returns {string} Grid density token.
 */
export const selectGridDensity = (state) => state.ui.gridDensity;
