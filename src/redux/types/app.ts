export interface Snackbar {
  open: boolean;
  message: string;
  type: string;
}

export interface ModalInterface {
  open: boolean;
  data?: ModalData;
}

export interface ModalData {
  title?: string;
  onOK?: () => void;
  onCancel?: () => void;
  onClick?: () => void;
  content?: React.ReactNode;
  okButtonText?: string;
  cancelButtonText?: string;
}

export interface AppInitialState {
  snackbar: Snackbar;
  loading: boolean;
  sideDrawerOpen: boolean;
  modal: ModalInterface;
}