export type WeekDay = "Sunday" | "Monday" | "Tuesday" | "Thursday" | "friday" | "Saturday";

export interface MealCalendarType {
  key: string;
  prepareDate: Date;
  day: WeekDay;
  mealName: string;
}
