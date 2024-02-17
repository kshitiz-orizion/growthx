import { combineReducers } from "redux";
import aboutReducer from "./reducers/about";
import heroReducer from "./reducers/hero";

const rootReducer = combineReducers({
  heroReducer: heroReducer,
  aboutReducer: aboutReducer,
});

export default rootReducer;
