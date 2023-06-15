import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventList: [],
};

export const EventsSlice = createSlice({
  name: "eventList",
  initialState,
  reducers: {
    setEventList: (state, action) => {
      state.eventList = action.payload;
    },
    addEventToList: (state, action) => {
      state.eventList.push(action.payload);
    },
    removeEventFromList: (state, action) => {
      const { eventId } = action.payload;
      const eventIndex = state.eventList.findIndex(
        (event) => event.id === eventId
      );
      if (eventIndex >= 0) {
        state.eventList.splice(eventIndex, 1);
      }
    },
    editEventInList: (state, action) => {
      const { eventId, updatedEvent } = action.payload;
      const eventIndex = state.eventList.findIndex(
        (event) => event.id === eventId
      );
      if (eventIndex >= 0) {
        state.eventList[eventIndex] = updatedEvent;
      }
    },
  },
});

export const {
  setEventList,
  addEventToList,
  removeEventFromList,
  editEventInList,
} = EventsSlice.actions;

export default EventsSlice.reducer;
