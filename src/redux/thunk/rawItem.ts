import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { rawItemsLoading, setRawItems } from "../actions/rawItem";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";
import { RawItemsModel } from "@/models/rawItems";

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const fetchAllRawItems = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(rawItemsLoading({ loading : true }));

    apiEndPoint.setToken(window.localStorage.getItem('jwt') || "");

    const { response } = await apiEndPoint.get(API_ENDPOINTS.RAW_ITEMS);

    if(response && response.data) {
      const rawItem = new RawItemsModel(response.data);
      dispatch(setRawItems(rawItem))
    } else {
      dispatch(updateToast({ type: 'error', message: `Unable to fetch raw items!`, open: true}))
    }

    dispatch(rawItemsLoading({ loading : false }));
  }
}

interface IAlertCreateBody {
  rawItemsId: number | string;
  description?: string;
}

export const createAlertForRawItem = (body: IAlertCreateBody) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(rawItemsLoading({ loading : true }));

    apiEndPoint.setToken(window.localStorage.getItem('jwt') || "");
    const { response } = await apiEndPoint.post(API_ENDPOINTS.INVENTORY_ALERT, body || {});

    if(response && response.data) {
      dispatch(updateToast({ type: 'success', message: `Critical alert raised!`, open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: `Unable raise alert!`, open: true}))
    }

    dispatch(rawItemsLoading({ loading : false }));
  }
}