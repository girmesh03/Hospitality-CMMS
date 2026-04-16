import axios from "axios";
import { normalizeApiError } from "./request.js";

const API_BASE_URL = `${import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:4000"}/api/v1`;

let accessTokenReader = () => null;
let csrfTokenReader = () => null;
let unauthorizedHandler = () => undefined;

/**
 * Shared Axios client for the Hospitality CMMS frontend.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
});

/**
 * Registers shell callbacks for auth-bound request behavior.
 *
 * @param {{getAccessToken?: () => string | null, getCsrfToken?: () => string | null, onUnauthorized?: (error: unknown) => void}} [config={}] - Shell callback configuration.
 * @returns {typeof apiClient} Configured Axios instance.
 */
export const configureApiClient = (config = {}) => {
  accessTokenReader = typeof config.getAccessToken === "function" ? config.getAccessToken : accessTokenReader;
  csrfTokenReader = typeof config.getCsrfToken === "function" ? config.getCsrfToken : csrfTokenReader;
  unauthorizedHandler = typeof config.onUnauthorized === "function" ? config.onUnauthorized : unauthorizedHandler;

  return apiClient;
};

apiClient.interceptors.request.use((config) => {
  const accessToken = accessTokenReader();
  const csrfToken = csrfTokenReader();
  const method = String(config.method || "get").toLowerCase();

  config.headers = config.headers || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (csrfToken && !["get", "head", "options"].includes(method)) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      unauthorizedHandler(error);
    }

    return Promise.reject(normalizeApiError(error));
  },
);

export default apiClient;
