import { combineReducers } from "redux";
import eventsReducer from "./eventsReducer";
import eventReducer from "./eventReducer";
import authReducer from "./authReducer";

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
  auth: authReducer
})