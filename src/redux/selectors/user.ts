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

export const selectUserSubs = () => {
  return (state: RootState) => state.user?.userSubs
}

export const isUserSubscribed = () => {
  return (state: RootState) => Boolean(state.user?.userSubs?.id)
}

export const selectAllSubs = () => {
  return (state: RootState) => state.user?.allSubs;
}

export const selectUserLoading = () => {
  return (state: RootState) => state.user?.loading;
}

export const selectSubPurchaseDetails = () => {
  return (state: RootState) => state.user?.subPurchaseDetails;
}