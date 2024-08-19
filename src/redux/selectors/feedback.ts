import { RootState } from ".."

export const selectFeedbackList = () => {
  return (state: RootState) => state.feedback.feedbacks;
}

export const selectFeedbackLoading = () => {
  return (state: RootState) => state.feedback.loading;
}