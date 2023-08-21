import { RootState } from ".."

export const selectModalData = () => {
  return (state: RootState) => state.app.modal.data
}

export const isModalOpen = () => {
  return (state: RootState) => state.app.modal.open;
}

export const isToastOpen = () => {
  return (state: RootState) => state.app.toast.open
}

export const selectToastData = () => {
  return (state: RootState) => state.app.toast
}