import { IFeedback } from "@/redux/types/feedback";
import { FeedbackOptions } from "./type";

export class Feedback {
  public feedbacks: IFeedback[];

  constructor(feedbackOptions?: FeedbackOptions[]) {
    this.feedbacks = [];

    if(!feedbackOptions) return;

    this.feedbacks = this.parseFeedback(feedbackOptions) || [];
  }

  parseFeedback(feedbackOptions?: FeedbackOptions[]): IFeedback[] {
    return (feedbackOptions || []).map(feedback => {
      const meal = feedback.meals[0];      

      return {
        id: feedback.id,
        comment: feedback.comment,
        rating: feedback.rating,
        meal: {
          id: meal.id,
          name: meal.name,
          rating: meal.rating,
          price: meal.price,
          servingDate: meal.serving_date,
          servingTime: meal.serving_time
        }
      } as IFeedback
    });
  }
}