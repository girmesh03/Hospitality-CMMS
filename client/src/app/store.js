import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "../store/slices/auth.slice.js";
import uiReducer from "../store/slices/ui.slice.js";

/**
 * Creates a storage shim for non-browser environments.
 *
 * @returns {{getItem: () => Promise<null>, setItem: (_key: string, value: string) => Promise<string>, removeItem: () => Promise<void>}} Noop storage.
 */
const createNoopStorage = () => ({
  getItem: () => Promise.resolve(null),
  setItem: (_key, value) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
});

/**
 * Creates a Redux Persist-compatible adapter around `window.localStorage`.
 *
 * Package-level storage helpers from `redux-persist` can resolve differently
 * under the current Vite/ESM setup, so this keeps the runtime contract
 * explicit: `getItem`, `setItem`, and `removeItem` must all be callable.
 *
 * @returns {{getItem: (key: string) => Promise<string | null>, setItem: (key: string, value: string) => Promise<string>, removeItem: (key: string) => Promise<void>}} Browser storage adapter.
 */
const createBrowserStorage = () => {
  if (typeof window === "undefined") {
    return createNoopStorage();
  }

  try {
    const browserStorage = window.localStorage;
    const probeKey = "__hospitality_cmms_persist_probe__";

    browserStorage.setItem(probeKey, probeKey);
    browserStorage.removeItem(probeKey);

    return {
      getItem: (key) => Promise.resolve(browserStorage.getItem(key)),
      setItem: (key, value) => {
        browserStorage.setItem(key, value);
        return Promise.resolve(value);
      },
      removeItem: (key) => {
        browserStorage.removeItem(key);
        return Promise.resolve();
      },
    };
  } catch {
    return createNoopStorage();
  }
};

const storage = createBrowserStorage();

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: "hospitality-cmms",
  storage,
  whitelist: ["ui"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Shared Redux store for the frontend app shell.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
  devTools: import.meta.env.DEV,
});

/**
 * Shared Redux Persist persistor instance.
 */
export const persistor = persistStore(store);

export default store;
