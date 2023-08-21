import { App } from "../actions/app";
import { initialState } from "../store/app";
import { AppInitialState, ModalInterface, ToastInterface } from "../types/app";

export function appReducer(state = initialState, action: any) {
  switch (action.type) {
    // case App.APP_LOADING: {
    //   const payload = action.payload;
    //   return { ...state, loading: payload } as AppInitialState;
    // }

    // case App.SET_MODAL: {
    //   const payload = action.payload as ModalInterface;
    //   return { ...state, modal: payload } as AppInitialState;
    // }

    // case App.SET_TOAST: {
    //   const payload = action.payload as ToastInterface;
    //   return { ...state, toast: payload } as AppInitialState;
    // }

    default:
      return state
  }
}