import { AnyAction } from "redux";
import { RootState } from "..";
import { Dispatch } from "react";
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { setUerRole, setUserInfo, userLoading } from "../actions/user";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";
import { UserRole } from "../types/user";

export interface UserParams {
  identifier: string | null;
  password: string | null;
}

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const authenticateUser = (userParams: UserParams) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    const { response } = await apiEndPoint.post(API_ENDPOINTS.USER_AUTH, userParams);

    if(response && response?.data.user) {
      console.log(response.data)

      // save success
      const jwt = response.data.jwt;

      dispatch(setUserInfo({ ...response.data.user, jwt }));
      dispatch(updateToast({ type: 'success', message: 'Logged In!', open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to authenticate user!', open: true}))
      // save error
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const fetchUserRole = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    apiEndPoint.setToken(getState().user.userinfo.jwt || "");

    dispatch(userLoading({ loading : true }));

    const { response } = await apiEndPoint.get(API_ENDPOINTS.USER_ME, { populate: "*" });

    console.log("====", response)
    if(response && response.data) {

      const userRole = response.data.role as UserRole;
      dispatch(setUerRole(userRole));
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to get user role!', open: true}))
    }

    dispatch(userLoading({ loading : true }));
  }
}