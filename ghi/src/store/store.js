import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { accountsApi } from "./accountsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const resetSlice = createSlice({
  name: "reset",
  initialState: null,
  reducers: {
    resetStore: () => null,
  },
});

const reducer = combineReducers({
  [accountsApi.reducerPath]: accountsApi.reducer,
  reset: resetSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const { resetStore } = resetSlice.actions;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      accountsApi.middleware
    ),
});

setupListeners(store.dispatch);

export default store;
