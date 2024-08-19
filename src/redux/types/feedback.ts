import { Meal } from "./menu";

export interface FeedbackInitialState {
  loading: boolean;
  feedbacks: IFeedback[];
}

export interface IFeedback {
  id: number;
  comment: string;
  rating: number;
  meal: Meal
}