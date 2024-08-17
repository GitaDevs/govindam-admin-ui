import { SubscritionsModel } from "@/models/subscriptions";
import { User } from "../actions/user";
import { initialState } from "../store/user";
import { PaymentDetails, UserInfo, UserInitialState, UserSubs } from "../types/user";

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case User.USER_AUTH_LOADING: {
      const payload = action.payload as { loading: boolean };
      return { ...state, loading: payload.loading } as UserInitialState;
    }

    case User.USER_SET_INFO: {
      const payload = action.payload as UserInfo;
      return { ...state, userinfo: { ...payload } } as UserInitialState;
    }

    case User.SET_USER_ROLE: {
      const payload = action.payload as UserInfo;
      return { ...state, userRole: { ...payload } } as UserInitialState;
    }

    case User.SET_USER_SUBS: {
      const payload = action.payload as UserSubs;
      return { ...state, userSubs: payload } as UserInitialState;
    }

    case User.SET_ALL_SUBS: {
      const payload = action.payload as SubscritionsModel;
      return { ...state, allSubs: payload.subscriptions } as UserInitialState;
    }

    case User.SUB_PURCHASE_DETAILS: {
      const payload = action.payload as PaymentDetails;
      return { ...state, subPurchaseDetails: payload } as UserInitialState;
    }

    case User.USER_LOGOUT: {
      return { ...initialState } as UserInitialState;
    }

    default:
      return state as UserInitialState;
  }
}