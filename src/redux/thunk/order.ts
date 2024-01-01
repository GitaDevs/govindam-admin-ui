import { Dispatch } from "react"
import { AnyAction } from "redux"
import { RootState } from ".."
import { orderLoading, setSpecialOrders, updateSpecialOrder } from "../actions/order"
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";
import { Order } from "@/models/order";

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const fetchSpecialOrders = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(orderLoading({ loading: true }));

    apiEndPoint.setToken(getState().user.userinfo.jwt || "");

    const { response } = await apiEndPoint.get(API_ENDPOINTS.SPECIAL_ORDERS);

    if(response && response.data) {
      const order = new Order(response.data);
      dispatch(setSpecialOrders(order));
    } else {
      dispatch(setSpecialOrders(new Order([])));
      // dispatch(updateToast({ type: 'error', message: `Unable to fetch special orders!`, open: true}))
    }

    dispatch(orderLoading({ loading : false }));
  }
}

export interface IOrderUpdate {
  isAccepted?: boolean;
  healthIssue?: string;
  mealInstructions?: string;  
}

export const updateSpecialOrderThunk = (id: string, updateOrder: IOrderUpdate) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(orderLoading({ loading: true }));

    apiEndPoint.setToken(getState().user.userinfo.jwt || "");
    const { response } = await apiEndPoint.put(`${API_ENDPOINTS.SPECIAL_ORDERS}/${id}`, { data: updateOrder });

    if(response && response.data) {
      const order = new Order([response.data]);
      dispatch(updateSpecialOrder(order));
    } else {
      dispatch(updateToast({ type: 'error', message: `Unable to update special order!`, open: true}))
    }

    dispatch(orderLoading({ loading: false }));
  }
}