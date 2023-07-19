import { RootState } from ".."

export const selectModalData = () => {
  return (state: RootState) => state.app.modal.data
}

export const isModalOpen = () => {
  return (state: RootState) => state.app.modal.open;
}