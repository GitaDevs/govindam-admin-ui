import { Meal } from "./menu";
import { UserInfo } from "./user";

export interface OrderInitialState {
  loading: boolean;
  specialOrders: SpecialOrder[];
}

export interface SpecialOrder {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  isAccepted: boolean;
  healthIssue: string;
  mealInstructions: string;
  processedAt: Date;
  meal: Omit<Meal, "Dish">;
  user: Pick<UserInfo, "id" | "username" | "address" | "phone_number">;
}