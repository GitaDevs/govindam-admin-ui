import { DateTime } from "luxon";
import { RawItem } from "./rawItem";

export const MORNING = "morning";
export const NOON = "noon";
export const EVENING = "evening";

export const RAW_ITEM = "RAW_ITEM";
export const DISH = "DISH";
export const MAIN = "MAIN";
export const SUB = "SUB";

export type ServingTime = typeof MORNING | typeof NOON | typeof EVENING;

export const mealTimingLimits: {[key: string]: string} = {
  [MORNING]: "09:00 AM",
  [NOON]: "03:00 PM",
  [EVENING]: "09:00 PM"
}

export interface MenuInitialState {
  loading: boolean;
  upcomingMeals: Partial<Menu>[]; // today's orders
  servedOrders: Partial<Menu>[];
  sevenDaysMenu: Partial<Menu>[];
}

export interface Menu {
  id: number;
  validFrom: DateTime;
  validTill: DateTime;
  name?: string;
  description?: string;
  meals: Meal[];
}

export interface Meal {
  id: number;
  name: string;
  price: number;
  isSpecial: boolean;
  servingDate: string;
  servingTime: ServingTime;
  rating: number;
  peopleDining: number;
  dishes: Dish[];
}

export interface Unit {
  id?: number;
  name?: string;
  abbreviation?: string;
  hintMessage?: string;
}

export interface Dish {
  id: number;
  name: string;
  alias?: string;
  servingSize: number;
  price: number;
  textInstructions: string;
  videoLink: string;
  categories: Categories[];
  unit: Unit;
  rawItems?: RawItem[];
}

export type CategorieType = typeof RAW_ITEM | typeof DISH;
export type CategoryMainSub = typeof MAIN | typeof SUB;

export interface Categories {
  id: number;
  name: string;
  categoryType: CategorieType;
  type: CategoryMainSub;
}

export interface Units {
  id: number;
  name: string;
  abbreviation?: string;
  hintMessage?: string;
}