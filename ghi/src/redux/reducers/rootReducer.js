import { combineReducers } from "redux";
import eventSliceReducer from "../slices/eventSlice";

const rootReducer = combineReducers({
  eventGrab: eventSliceReducer,
});

export default rootReducer;
