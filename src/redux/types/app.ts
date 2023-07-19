import { ModalProps } from "antd";

export interface Snackbar {
  open: boolean;
  message: string;
  type: string;
}

export interface ModalInterface {
  open: boolean;
  data?: ModalData;
}

export type ModalData = Omit<ModalProps, "open"> & { content?: React.ReactNode};

export interface AppInitialState {
  snackbar: Snackbar;
  loading: boolean;
  sideDrawerOpen: boolean;
  modal: ModalInterface;
}