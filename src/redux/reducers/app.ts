import { App } from "../actions/app";
import { initialState } from "../store/app";
import { ModalInterface, ToastInterface } from "../types/app";

export function appReducer(state = initialState, action: any) {
  switch (action.type) {
    case App.APP_LOADING: {
      const payload = action.payload;
      return Object.assign({}, state, { loading: payload });
    }

    case App.SET_MODAL: {
      const payload = action.payload as ModalInterface;
      return Object.assign({}, state, { modal: payload });
    }

    case App.SET_TOAST: {
      const payload = action.payload as ToastInterface;
      return Object.assign({}, state, { toast: payload })
    }

    default:
      return state
  }
}