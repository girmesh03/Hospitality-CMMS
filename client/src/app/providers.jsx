import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./store.js";
import AppTheme from "./theme/AppTheme.jsx";
import { router } from "./router.jsx";
import { LoadingState } from "../components/feedback/LoadingState.jsx";
import { ErrorState } from "../components/feedback/ErrorState.jsx";

const emotionCache = createCache({ key: "mui" });

/**
 * Default error fallback rendered by ErrorBoundary on uncaught exceptions.
 * @param {{ error: Error, resetErrorBoundary: () => void }} props
 * @returns {JSX.Element}
 */
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <ErrorState
      title="Something went wrong"
      message={error.message}
      onRetry={resetErrorBoundary}
    />
  );
}

/**
 * Root provider composition — Emotion Cache, ErrorBoundary, Redux, Persist, Theme, Router.
 * @returns {JSX.Element}
 */
export function AppProviders() {
  return (
    <CacheProvider value={emotionCache}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Provider store={store}>
          <PersistGate loading={<LoadingState />} persistor={persistor}>
            <AppTheme>
              <RouterProvider router={router} />
              <ToastContainer
                position="bottom-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </AppTheme>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </CacheProvider>
  );
}


