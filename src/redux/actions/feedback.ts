import { Feedback } from "@/models/feedback"
import { IFeedback } from "../types/feedback"

export enum FEEDBACK {
  FEEDBACK_LOADING = "feedback/FEEDBACK_LOADING",
  SET_FEEDBACK_LIST = "feedback/SET_FEEDBACK_LIST",
  CREATE_NEW_FEEDBACK = "feedback/CREATE_NEW_FEEDBACK",
}

export const feedbackLoading = (payload: any) => {
  return { type: FEEDBACK.FEEDBACK_LOADING, payload }
}

export const setFeedbackList = (payload: Feedback) => {
  return { type: FEEDBACK.SET_FEEDBACK_LIST, payload }
}

export const createNewFeedback = (payload: Feedback) => {
  return { type: FEEDBACK.CREATE_NEW_FEEDBACK, payload }
}