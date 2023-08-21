import { combineReducers } from "redux"
import { appReducer } from "./app";
import { userReducer } from "./user";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
})

export default rootReducer;