import apiClient from "../../services/api/client.js";

/**
 * Auth API endpoints.
 */
export const authApi = {
  login: (data) => apiClient.post("/auth/login", data),
  register: (data) => apiClient.post("/auth/register", data),
  refresh: () => apiClient.post("/auth/refresh"),
  logout: () => apiClient.delete("/auth/logout"),
  logoutAll: () => apiClient.delete("/auth/sessions"),
  getMe: () => apiClient.get("/auth/me"),
  updateMe: (data) => apiClient.patch("/auth/me", data),
  changePassword: (data) => apiClient.patch("/auth/me/password", data),
  forgotPassword: (data) => apiClient.post("/auth/forgot-password", data),
  resetPassword: (data) => apiClient.post("/auth/reset-password", data),
  listSessions: () => apiClient.get("/auth/sessions"),
  revokeSession: (id) => apiClient.delete(`/auth/sessions/${id}`),
  getPermissions: () => apiClient.get("/auth/permissions"),
};
