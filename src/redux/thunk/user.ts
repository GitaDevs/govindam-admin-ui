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

export interface UserRegisterParams {
  name: string;
  email: string;
  password: string;
  username: string;
}

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const authenticateUser = (userParams: UserParams) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    const { response } = await apiEndPoint.post(API_ENDPOINTS.USER_AUTH, userParams);

    if(response && response?.data.user) {
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

    if(response && response.data) {
      const userRole = response.data.role as UserRole;
      dispatch(setUerRole(userRole));
      dispatch(setUserInfo({ ...getState().user.userinfo, ...response.data }));
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to get user role!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const registerNewUser = (user: UserRegisterParams) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    const { response } = await apiEndPoint.post(API_ENDPOINTS.USER_REGISTER, user);

    if(response && response.data) {
      const jwt = response.data.jwt;
      const userRole = response.data?.user?.role as UserRole;

      dispatch(setUserInfo({ ...response.data.user, jwt }));
      dispatch(setUerRole(userRole));
      dispatch(updateToast({ type: 'success', message: 'User Registered!', open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to register user!', open: true}))
    }

    dispatch(userLoading({ loading : false }));

  }
}