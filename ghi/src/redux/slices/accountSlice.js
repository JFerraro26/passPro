import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
};

export const AccountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    setAccountInfo: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAccountInfo } = AccountSlice.actions;

export default AccountSlice.reducer;
