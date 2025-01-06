import { combineReducers } from "redux";
import { akrreducer } from "./Reducer"; 

const rootReducer = combineReducers({
  akr: akrreducer,
});

export default rootReducer;
