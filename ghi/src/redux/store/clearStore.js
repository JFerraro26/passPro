import { createSlice } from "@reduxjs/toolkit";
import { accountsApi } from "./accountsApi";

const clearStoreSlice = createSlice({
  name: "store",
  initialState: {}, // Initial state of store
  reducers: {
    clearStore: (state) => {
      state.authentication = null;
      state[accountsApi.reducerPath] = accountsApi.reducer(undefined, {});
      state[accountsApi.reducerPath].mutations = {};
      state[accountsApi.reducerPath].queries = {};
    }, // Action creator function that returns an empty object to clear the store
  },
  extraReducers: (builder) => {
    builder.addCase(accountsApi.endpoints.logout, () => ({}));
  },
});

export const { clearStore } = clearStoreSlice.actions;
export default clearStoreSlice;
