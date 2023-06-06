import { combineReducers } from "redux";
import eventSliceReducer from "../slices/eventSlice";
import accountSliceReducer from "../slices/accountSlice";
import cartSliceReducer from "../slices/cartSlice";

const rootReducer = combineReducers({
    eventGrab: eventSliceReducer,
    accountInfo: accountSliceReducer,
  cart: cartSliceReducer,
});

export default rootReducer;
