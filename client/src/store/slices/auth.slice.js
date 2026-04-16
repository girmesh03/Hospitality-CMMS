import { createSlice } from "@reduxjs/toolkit";

const initialState = Object.freeze({
  status: "anonymous",
  accessToken: null,
  csrfToken: null,
  user: null,
  roleKeys: [],
  permissions: [],
  sessionId: null,
});

/**
 * Shared authentication/session slice shell.
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      const payload = action.payload || {};

      state.status = payload.status || "authenticated";
      state.accessToken = payload.accessToken || null;
      state.csrfToken = payload.csrfToken || null;
      state.user = payload.user || null;
      state.roleKeys = payload.roleKeys || [];
      state.permissions = payload.permissions || [];
      state.sessionId = payload.sessionId || null;
    },
    clearSession(state) {
      state.status = "anonymous";
      state.accessToken = null;
      state.csrfToken = null;
      state.user = null;
      state.roleKeys = [];
      state.permissions = [];
      state.sessionId = null;
    },
    markSessionExpired(state) {
      state.status = "expired";
      state.accessToken = null;
      state.csrfToken = null;
      state.sessionId = null;
    },
  },
});

export const { setSession, clearSession, markSessionExpired } = authSlice.actions;

export default authSlice.reducer;
