import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { rawItemsLoading, setRawItems } from "../actions/rawItem";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const fetchAllRawItems = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(rawItemsLoading({ loading : true }));

    apiEndPoint.setToken(getState().user.userinfo.jwt || "");

    const { response } = await apiEndPoint.get(API_ENDPOINTS.RAW_ITEMS);

    if(response && response.data) {
      // const menu = new Menu(response.data);
      // dispatchMenuActions(dispatch, fetchMealType || "upcoming", menu);
      // dispatch(setRawItems())
    } else {
      dispatch(updateToast({ type: 'error', message: `Unable to fetch raw items!`, open: true}))
    }

    dispatch(rawItemsLoading({ loading : false }));
  }
}