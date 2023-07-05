import { App } from "../actions/app";
import { initialState } from "../store/app";

export function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case App.APP_LOADING: {
      const payload = action.payload;
      return Object.assign({}, state, { loading: payload });
    }

    default:
      return state
  }  
}