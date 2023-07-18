import { ModalInterface } from "../types/app";

export enum App {
  APP_LOADING = "app/APP_LOADING",
  SET_MODAL = "app/SET_MODAL"
}

export const updateModal = (payload: ModalInterface) => {
  return { type: App.SET_MODAL, payload };
}