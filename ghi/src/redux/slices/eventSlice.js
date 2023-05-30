import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalEvent: null,
};

export const EventSlice = createSlice({
  name: "eventGrab",
  initialState,
  reducers: {
    setEvent: (state, action) => {
      state.globalEvent = action.payload;
    },
    clearEvent: (state) => {
      state.globalEvent = null;
    },
  },
});

export const { setEvent, clearEvent } = EventSlice.actions;

export default EventSlice.reducer;
