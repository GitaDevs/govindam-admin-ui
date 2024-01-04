import { RootState } from ".."

export const selectAllRawItems = () => {
  return (state: RootState) => state.rawItems.items
}