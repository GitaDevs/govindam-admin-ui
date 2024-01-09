import { Order } from "@/models/order"

export enum ORDER {
  ORDER_LOADING = "order/ORDER_LOADING",
  SET_SPECIAL_ORDERS = "order/SET_SPECIAL_ORDERS",
  UPDATE_SPECIAL_ORDER = "order/UPDATE_SPECIAL_ORDER",
  PUSH_SPECIAL_ORDER = "order/PUSH_SPECIAL_ORDER"
}

export const orderLoading = (payload: any) => {
  return { type: ORDER.ORDER_LOADING, payload }
}

export const setSpecialOrders = (payload: Order) => {
  return { type: ORDER.SET_SPECIAL_ORDERS, payload }
}

export const pushSpecialOrders = (payload: Order) => {
  return { type: ORDER.PUSH_SPECIAL_ORDER, payload }
}

export const updateSpecialOrder = (payload: Order) => {
  return { type: ORDER.UPDATE_SPECIAL_ORDER, payload };
}