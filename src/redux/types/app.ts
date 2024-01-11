import { ModalProps } from "antd/es/modal"

export interface Snackbar {
  open: boolean;
  message: string;
  type: string;
}

export interface ModalInterface {
  open: boolean;
  data?: ModalData;
}

export type ModalData = Omit<ModalProps, "open"> & { content?: React.ReactNode, renderData?: Object };

export interface AppInitialState {
  snackbar: Snackbar;
  loading: boolean;
  sideDrawerOpen: boolean;
  modal: ModalInterface;
  toast: ToastInterface;
}

export interface ToastInterface {
  open: boolean;
  message?: string | null;
  description?: string | null;
  type?: "success" | "error" | "warning" | "info" | null
}