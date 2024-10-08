import { Dish } from "@/redux/types/menu";

export type WeekDay = "Sunday" | "Monday" | "Tuesday" | "Thursday" | "friday" | "Saturday";

export interface MealCalendarType {
  key: string;
  prepareDate: string;
  mealName: string;
  dishes?: Dish[];
}
