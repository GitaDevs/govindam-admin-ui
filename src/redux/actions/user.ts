import { SubscritionsModel } from "@/models/subscriptions";
import { UserInfo, UserRole, UserSubs } from "../types/user";

export enum User {
  USER_AUTH_LOADING = "user/USER_AUTH_LOADING",
  USER_SET_INFO = "user/USER_SET_INFO",
  USER_TOKEN = "user/USER_TOKEN",
  USER_LOGOUT = "user/USER_LOGOUT",
  SET_USER_LIST = "user/SET_USER_LIST",
  SET_USER_ROLE = "user/SET_USER_ROLE",
  SET_USER_SUBS = "user/SET_USER_SUBS",
  SET_ALL_SUBS = "user/SET_ALL_SUBS"
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

export const setUserSubs = (payload: Partial<UserSubs>) => {
  return { type: User.SET_USER_SUBS, payload }
}

export const setAllSubs = (payload: SubscritionsModel) => {
  return { type: User.SET_ALL_SUBS, payload };
}

export const logoutUser = () => {
  return { type: User.USER_LOGOUT }
}