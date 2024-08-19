import { MealOptions } from "../menu/types";

export interface FeedbackOptions {
  id: number;
  comment?: string;
  rating: number;
  meals: MealOptions[];
}