import { combineReducers } from "redux"
import { appReducer } from "./app";
import { userReducer } from "./user";
import { menuReducer } from "./menu";
import { orderReducer } from "./order";
import { rawItemsReducer } from "./rawItem";
import { feedbackReducer } from "./feedback";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  menu: menuReducer,
  rawItems: rawItemsReducer,
  order: orderReducer,
  feedback: feedbackReducer
})

export default rootReducer;