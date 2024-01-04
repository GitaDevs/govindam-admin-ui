import { UserInfo, UserRole } from "../types/user";

export enum User {
  USER_AUTH_LOADING = "user/USER_AUTH_LOADING",
  USER_SET_INFO = "user/USER_SET_INFO",
  USER_TOKEN = "user/USER_TOKEN",
  USER_LOGOUT = "user/USER_LOGOUT",
  SET_USER_LIST = "user/SET_USER_LIST",
  SET_USER_ROLE = "user/SET_USER_ROLE",
}

export const userLoading = (payload: any) => {
  return { type: User.USER_AUTH_LOADING, payload }
}

export const setUserInfo = (payload: UserInfo) => {
  return { type: User.USER_SET_INFO, payload };
}

export const setUserToken = (payload: string) => {
  return { type: User.USER_TOKEN, payload };
}

export const setUerRole = (payload: UserRole) => {
  return { type: User.SET_USER_ROLE, payload }
}

export const logoutUser = () => {
  return { type: User.USER_LOGOUT }
}