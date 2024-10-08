import { AnyAction } from "redux";
import { RootState } from "..";
import { Dispatch } from "react";
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { setAllSubs, setSubPurchaseDetails, setUerRole, setUserInfo, setUserSubs, userLoading } from "../actions/user";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";
import { PaymentDetails, UserRole, UserSubs } from "../types/user";
import { SubscritionsModel } from "@/models/subscriptions";

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

    const apiEndPointLocal = new ApiEndpoints(process.env.apiHost || "", null);
    const { response } = await apiEndPointLocal.post(API_ENDPOINTS.USER_AUTH, userParams);

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
    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");

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

    apiEndPoint.setToken(null);
    const { response } = await apiEndPoint.post(API_ENDPOINTS.USER_REGISTER, user);

    if(response && response.data) {
      dispatch(updateToast({ type: 'success', message: 'A Confirmation email has been sent!', open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to register user!', open: true}))
    }

    dispatch(userLoading({ loading : false }));

  }
}

export const getUserActiveSubscription = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");

    const { response } = await apiEndPoint.get(API_ENDPOINTS.USER_SUBS);

    if(response && response.data) {
      const userSub: UserSubs = {
        id: response.data.id,
        isActive: response.data.is_active,
        starts: response.data.starts,
        ends: response.data.ends
      };

      dispatch(setUserSubs(userSub));
    } else {
      dispatch(setUserSubs({}));
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const getSubscriptionList = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");

    const { response } = await apiEndPoint.get(API_ENDPOINTS.SUBS);

    if(response && response.data) {
      dispatch(setAllSubs(new SubscritionsModel(response.data)));
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to fetch subscriptions!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const validateSubPaymentDetails = (subId: string | number) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");
    const { response } = await apiEndPoint.post(API_ENDPOINTS.SUB_PURCHASE_VALIDATE, { subId });

    if(response && response.data) {
      dispatch(setSubPurchaseDetails(response.data as PaymentDetails));
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to fetch subsscription purchase details!', open: true}))
    }

    dispatch(userLoading({ loading : false }));
  }
}

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    const apiEndPointLocal = new ApiEndpoints(process.env.apiHost || "", null);
    const { response } = await apiEndPointLocal.post(API_ENDPOINTS.USER_FORGOT_PSWD, { email });

    if(response && response?.data?.ok) {
      // save success
      dispatch(updateToast({ type: 'success', message: 'An email has been sent to you!', open: true}))

    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to reset password!', open: true}))
      // save error
    }

    dispatch(userLoading({ loading : false }));    
  }
}

export interface IUpdatePassword {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export const updatePassword = (body: IUpdatePassword) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(userLoading({ loading : true }));

    const apiEndPointLocal = new ApiEndpoints(process.env.apiHost || "", null);
    const { response } = await apiEndPointLocal.post(API_ENDPOINTS.USER_RESET_PSWD, body);

    if(response && response?.data) {
      // save success
      const jwt = response.data.jwt;

      dispatch(setUserInfo({ ...response.data.user, jwt }));
      dispatch(updateToast({ type: 'success', message: 'Your password has been updated!', open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to reset password!', open: true}))
      // save error
    }

    dispatch(userLoading({ loading : false }));        
  }
}