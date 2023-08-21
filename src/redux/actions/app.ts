import { ModalInterface, ToastInterface } from "../types/app";

export enum App {
  APP_LOADING = "app/APP_LOADING",
  SET_MODAL = "app/SET_MODAL",
  SET_TOAST = "app/SET_TOAST"
}

export const updateModal = (payload: ModalInterface) => {
  return { type: App.SET_MODAL, payload };
}

export const updateToast = (payload: ToastInterface) => {
  return { type: App.SET_TOAST, payload };
}