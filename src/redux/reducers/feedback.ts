import { Feedback } from "@/models/feedback";
import { FEEDBACK } from "../actions/feedback";
import { initialState } from "../store/feedback";
import { FeedbackInitialState } from "../types/feedback";

export function feedbackReducer(state = initialState, action: any) {
  switch (action.type) {
    case FEEDBACK.FEEDBACK_LOADING: {
      const payload = action.payload;
      return { ...state, loading: payload } as FeedbackInitialState;
    }

    case FEEDBACK.SET_FEEDBACK_LIST: {
      const payload = action.payload as Feedback;
      const feedbacks = payload.feedbacks;
      return { ...state, feedbacks } as FeedbackInitialState;
    }
    
    case FEEDBACK.CREATE_NEW_FEEDBACK: {
      const payload = action.payload as Feedback;
      const feedbacks = payload.feedbacks;
      return { ...state, feedbacks: [ ...state.feedbacks, ...feedbacks ] } as FeedbackInitialState;
    }

    default:
      return state
  }
}