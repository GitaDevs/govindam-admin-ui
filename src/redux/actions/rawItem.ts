import { Menu } from "@/models/menu"

export enum RAW_ITEMS {
  RAW_ITEM_LOADING = "raw/RAW_ITEM_LOADING",
  SET_RAW_ITEMS = "raw/SET_RAW_ITEMS",
  ALERT_RAW_ITEMS = "raw/ALERT_RAW_ITEMS",
}

export const rawItemsLoading = (payload: any) => {
  return { type: RAW_ITEMS.RAW_ITEM_LOADING, payload }
}

export const setRawItems = (payload: Menu) =>{
  return { type: RAW_ITEMS.SET_RAW_ITEMS, payload }
}

export const setAlertRawItems = (payload: Menu) =>{
  return { type: RAW_ITEMS.ALERT_RAW_ITEMS, payload }
}