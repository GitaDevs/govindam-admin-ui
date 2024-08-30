import { EVENING, MORNING, NOON } from "@/redux/types/menu"

export const CDN_IMAGES = {
  loginBg: `https://ik.imagekit.io/4ra39kuu7/govindam-assets/bg_vertical.jpg`,
}

export const mealDisappearTimingLimits: {[key: string]: string} = {
  [MORNING]: "12:00 PM",
  [NOON]: "03:00 PM",
  [EVENING]: "09:00 PM"
}

export const MEAL_TIMING_WINDOW = 5; // in hours