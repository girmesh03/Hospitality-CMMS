import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider, useSelector } from "react-redux";
import { RouterProvider } from "react-router";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import AppErrorFallback from "../components/feedback/AppErrorFallback.jsx";
import LoadingState from "../components/feedback/LoadingState.jsx";
import { selectAccessToken, selectCsrfToken, selectIsAuthenticated } from "../store/selectors/auth.selectors.js";
import { markSessionExpired } from "../store/slices/auth.slice.js";
import appTheme from "./theme/index.js";
import { appRouter } from "./router.jsx";
import { persistor, store } from "./store.js";
import { configureApiClient } from "../services/api/apiClient.js";
import { configureSocketClient, connectSocket, disconnectSocket } from "../services/sockets/socketClient.js";

configureApiClient({
  getAccessToken: () => selectAccessToken(store.getState()),
  getCsrfToken: () => selectCsrfToken(store.getState()),
  onUnauthorized: () => {
    store.dispatch(markSessionExpired());
  },
});

configureSocketClient({
  getAccessToken: () => selectAccessToken(store.getState()),
});

/**
 * Connects or disconnects the socket layer as auth state changes.
 *
 * @returns {JSX.Element} Router provider.
 */
const AppRuntimeBridge = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      disconnectSocket();
      return;
    }

    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [accessToken, isAuthenticated]);

  return <RouterProvider router={appRouter} />;
};

/**
 * Shared provider tree for the frontend application shell.
 *
 * @returns {JSX.Element} Provider-backed application tree.
 */
export const AppProviders = () => (
  <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      <Provider store={store}>
        <PersistGate loading={<LoadingState title="Loading app shell" description="Rehydrating persisted UI state." />} persistor={persistor}>
          <AppRuntimeBridge />
          <ToastContainer position="bottom-right" newestOnTop limit={4} pauseOnFocusLoss={false} />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </ThemeProvider>
);

export default AppProviders;
