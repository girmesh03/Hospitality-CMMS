import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import themeReducer from "../store/slices/themeSlice";
import authReducer from "../store/slices/authSlice";

const storage = {
  getItem: (key) => {
    try { return Promise.resolve(localStorage.getItem(key)); }
    catch { return Promise.resolve(null); }
  },
  setItem: (key, value) => {
    try { localStorage.setItem(key, value); return Promise.resolve(); }
    catch { return Promise.resolve(); }
  },
  removeItem: (key) => {
    try { localStorage.removeItem(key); return Promise.resolve(); }
    catch { return Promise.resolve(); }
  },
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * @type {import("@reduxjs/toolkit").Store}
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

/**
 * @type {import("redux-persist").Persistor}
 */
export const persistor = persistStore(store);
