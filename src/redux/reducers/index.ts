import { combineReducers } from "redux"
import { appReducer } from "./app";
import { userReducer } from "./user";
import { menuReducer } from "./menu";
import { orderReducer } from "./order";
import { rawItemsReducer } from "./rawItem";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  menu: menuReducer,
  rawItems: rawItemsReducer,
  order: orderReducer
})

export default rootReducer;