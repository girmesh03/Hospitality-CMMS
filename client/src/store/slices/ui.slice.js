import { createSlice } from "@reduxjs/toolkit";

const initialState = Object.freeze({
  sidebarOpen: true,
  filterDrawerOpen: false,
  gridDensity: "standard",
  columnPreferences: {},
});

/**
 * Shared UI-state slice for layout and list-state persistence.
 */
export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen(state, action) {
      state.sidebarOpen = Boolean(action.payload);
    },
    setFilterDrawerOpen(state, action) {
      state.filterDrawerOpen = Boolean(action.payload);
    },
    setGridDensity(state, action) {
      state.gridDensity = action.payload || "standard";
    },
    setColumnPreference(state, action) {
      const { key, value } = action.payload || {};
      if (!key) {
        return;
      }

      state.columnPreferences[key] = value;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setFilterDrawerOpen, setGridDensity, setColumnPreference } =
  uiSlice.actions;

export default uiSlice.reducer;
