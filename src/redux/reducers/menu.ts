import { Menu } from "@/models/menu";
import { MENU } from "../actions/menu";
import { initialState } from "../store/menu";
import { MenuInitialState } from "../types/menu";

export function menuReducer(state = initialState, action: any) {
  switch (action.type) {
    case MENU.MENU_LOADING: {
      const payload = action.payload;
      return { ...state, loading: payload } as MenuInitialState;
    }

    case MENU.SET_UPCOMING_MEALS: {
      const payload = action.payload as Menu;
      const menus = payload.menus;
      return { ...state, upcomingMeals: menus } as MenuInitialState;
    }

    case MENU.SET_SERVED_ORDERS: {
      const payload = action.payload as Menu;
      const menus = payload.menus;
      return { ...state, servedOrders: menus } as MenuInitialState;
    }

    case MENU.SET_SEVEN_DAYS_MENU: {
      const payload = action.payload as Menu;
      const menus = payload.menus;
      return { ...state, sevenDaysMenu: menus } as MenuInitialState;
    }

    default:
      return state
  }
}