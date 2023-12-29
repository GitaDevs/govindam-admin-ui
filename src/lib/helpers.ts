import { DateTime } from "luxon";

export const getMealDay = (mealDateTime: string): string => {
  if(!mealDateTime) return "";
  const mealTime = DateTime.fromISO(mealDateTime);

  return mealTime.weekdayLong || "";
}

export const getMealDate = (mealDateTime: string): string => {
  if(!mealDateTime) return "";
  const mealTime = DateTime.fromISO(mealDateTime);

  return mealTime.toFormat("dd LLL yyyy")
}