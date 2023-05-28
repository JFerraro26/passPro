import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { accountsApi } from "./accountsApi";
import clearStoreSlice from "./clearStore";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    Emptystore: clearStoreSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      accountsApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
