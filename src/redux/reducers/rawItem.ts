import { initialState } from "../store/rawItem";
import { RAW_ITEMS } from "../actions/rawItem";
import { RawItemInitialState } from "../types/rawItem";

export function rawItemsReducer(state = initialState, action: any) {
  switch (action.type) {
    case RAW_ITEMS.RAW_ITEM_LOADING: {
      const payload = action.payload as boolean;
      return { ...state, loading: payload } as RawItemInitialState;
    }

    case RAW_ITEMS.SET_RAW_ITEMS: {
      const payload = action.payload;
      return { ...state, items: payload } as RawItemInitialState;
    }

    case RAW_ITEMS.ALERT_RAW_ITEMS: {
      const payload = action.payload;
      return { ...state, items: payload } as RawItemInitialState;
    }

    default:
      return state
  }
}