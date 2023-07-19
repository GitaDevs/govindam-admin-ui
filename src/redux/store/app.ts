import { AppInitialState } from "../types/app";

export const initialState: AppInitialState = {
  snackbar: {
    open: false,
    message: "",
    type: ""  
  },
  loading: false,
  sideDrawerOpen: false,
  modal: {
    open: false,
    data: {}
  },
};

export const previousState = {};