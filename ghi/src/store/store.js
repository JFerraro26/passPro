import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { accountsApi } from "./accountsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(accountsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
