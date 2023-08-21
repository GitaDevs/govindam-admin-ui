import { RootState } from ".."

export const selectUserInfo = () => {
  return (state: RootState) => state.user?.userinfo
}

export const selectUserId = () => {
  return (state: RootState) => state.user?.userinfo?.id
}

export const selectUserToken = () => {
  return (state: RootState) => state.user?.userinfo?.jwt
}

export const selectUserRoleType = () => {
  return (state: RootState) => state.user?.userRole?.type
}