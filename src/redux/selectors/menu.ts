import { RootState } from ".."

export const selectUpcomingMeals = () => {
  return (state: RootState) => state.menu?.upcomingMeals
}

export const selectServedOrders = () => {
  return (state: RootState) => state.menu?.servedOrders
}

export const selectSevenDaysMeals = () => {
  return (state: RootState) => state.menu?.sevenDaysMenu
}

export const selectMenuLoading = () => {
  return (state: RootState) => state.menu?.loading
}