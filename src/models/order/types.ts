import { UserInfo } from "@/redux/types/user";
import { MealOptions } from "../menu/types";

export type OrderOptions = {
  id: string;
  createdAt: Date;
  is_accepted: boolean;
  health_issue: string;
  meal_instructions: string;
  is_cancelled: boolean;
  processed_at: Date;
  meals: Omit<MealOptions, "dishes">[];
  users: Pick<UserInfo, "id" | "username" | "address" | "phone_number">[];
}