import { combineReducers } from "redux";
import eventSliceReducer from "../slices/eventSlice";
import accountSliceReducer from "../slices/accountSlice";

const rootReducer = combineReducers({
    eventGrab: eventSliceReducer,
    accountInfo: accountSliceReducer,
});

export default rootReducer;
