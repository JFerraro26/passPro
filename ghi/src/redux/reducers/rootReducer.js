import { combineReducers } from "redux";
import eventSliceReducer from "../slices/eventSlice";
import accountSliceReducer from "../slices/accountSlice";
import cartSliceReducer from "../slices/cartSlice";
import eventsSliceReducer from "../slices/eventsSlice";

const rootReducer = combineReducers({
  eventGrab: eventSliceReducer,
  accountInfo: accountSliceReducer,
  cart: cartSliceReducer,
  eventList: eventsSliceReducer,
});

export default rootReducer;
