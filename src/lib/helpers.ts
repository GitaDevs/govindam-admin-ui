import { EVENING, MORNING, NOON } from "@/redux/types/menu";
import { DateTime } from "luxon";

export const mealTimingLimits: {[key: string]: string} = {
  [MORNING]: "09:00 AM",
  [NOON]: "03:00 PM",
  [EVENING]: "09:00 PM"
}

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

export const capitalize = (str: string): string => {
  if(!str) return "";

  return str.charAt(0).toUpperCase() + str.slice(1);
}