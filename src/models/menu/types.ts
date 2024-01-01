import { CategorieType, CategoryMainSub, ServingTime } from "@/redux/types/menu";
import { DateTime } from "luxon";

export type UnitOptions = {
  id: number;
  name: string;
  abbreviation: string;
  hint_message: string;
}

export type DishesOptions = {
  id: number;
  name: string;
  alias?: string;
  serving_size: number;
  price: number;
  text_intructions: string;
  video_link: string;
  unit: UnitOptions;
  raw_items: RawItemsOptions[];
}

export type MealOptions = {
  id: number;
  name: string;
  price: number;
  is_special: boolean;
  serving_date: string;
  serving_time: ServingTime;
  rating: number;
  dishes: DishesOptions[];
};

export type MenuOptions = {
  data: Array<{
    id: number;
    valid_from: DateTime;
    valid_till: DateTime;
    name?: string;
    description?: string;
    meals: MealOptions[];
  }>;
}

export type CategoriesOptions = {
  id: number;
  name: string;
  type: CategoryMainSub,
  category_type: CategorieType;
};

export interface RawItemsOptions {
  id: number;
  name: string;
  current_price: number;
  converstion_ratio: number;
  categories: CategoriesOptions[];
  sub_categories: CategoriesOptions[];
  purchasing_unit: UnitOptions;
  consumption_unit: UnitOptions;
  quantity: number;
};