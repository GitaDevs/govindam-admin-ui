import { User } from "../actions/user";
import { initialState } from "../store/user";
import { UserInfo, UserInitialState } from "../types/user";

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

    case User.USER_LOGOUT: {
      return { ...state } as UserInitialState;
    }

    case User.SET_USER_ROLE: {
      const payload = action.payload as UserInfo;
      return { ...state, userRole: { ...payload } } as UserInitialState;
    }

    default:
      return state as UserInitialState;
  }
}