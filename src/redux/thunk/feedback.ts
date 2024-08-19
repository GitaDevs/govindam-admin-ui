import { AnyAction, Dispatch } from "redux";
import { RootState } from "..";
import { ApiEndpoints } from "@/lib/apiEndpoints";
import { createNewFeedback, feedbackLoading, setFeedbackList } from "../actions/feedback";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { updateToast } from "../actions/app";
import { Feedback } from "@/models/feedback";
import { fetchMenuAndMeals } from "./menu";
import { setMealRating } from "../actions/menu";

export interface ICreateFeedbackBody {
  mealId: string | number;
  comment?: string;
  rating: number;
}

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

export const fetchFeedbacks = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");

    dispatch(feedbackLoading({ loading : true }));

    const { response } = await apiEndPoint.get(API_ENDPOINTS.RATINGS, { populate: { meals: true } });

    if(response && response.data) {
      const feedback = new Feedback(response.data);
      dispatch(setFeedbackList(feedback));
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to get user feedbacks!', open: true}))
    }

    dispatch(feedbackLoading({ loading : false }));
  }
}

export const createFeedback = (body: ICreateFeedbackBody) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    apiEndPoint.setToken(getState().user.userinfo?.jwt || "");

    dispatch(feedbackLoading({ loading : true }));

    const { response } = await apiEndPoint.post(API_ENDPOINTS.RATINGS, { data: body });

    if(response && response.data) {
      const feedback = new Feedback([response.data]);
      dispatch(createNewFeedback(feedback));

      const newFeedback = feedback.feedbacks[0];
      dispatch(setMealRating({ mealId: newFeedback.meal.id, rating: newFeedback.meal.rating }));
      dispatch(updateToast({ type: 'success', message: 'Thankyou for your feedback!', open: true}))
    } else {
      dispatch(updateToast({ type: 'error', message: 'Unable to post your feedback!', open: true}))
    }

    dispatch(feedbackLoading({ loading : false }));
  }
}