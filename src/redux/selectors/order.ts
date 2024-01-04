import { RootState } from ".."

export const selectSpecialOrders = () => {
  return (state: RootState) => state.order.specialOrders
}