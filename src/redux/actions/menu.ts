import { Menu } from "@/models/menu"

export enum MENU {
  MENU_LOADING = "menu/MENU_LOADING",
  SET_UPCOMING_MEALS = "menu/SET_UPCOMING_MEALS",
  SET_SERVED_ORDERS = "menu/SET_SERVED_ORDERS",
  SET_SEVEN_DAYS_MENU = "menu/SET_SERVED_MENU"
}

export const menuLoading = (payload: any) => {
  return { type: MENU.MENU_LOADING, payload }
}

export const setUpcomingMeals = (payload: Menu) =>{
  return { type: MENU.SET_UPCOMING_MEALS, payload }
}

export const setServedOrders = (payload: Menu) =>{
  return { type: MENU.SET_SERVED_ORDERS, payload }
}

export const setSevenDaysMenu = (payload: Menu) =>{
  return { type: MENU.SET_SEVEN_DAYS_MENU, payload }
}