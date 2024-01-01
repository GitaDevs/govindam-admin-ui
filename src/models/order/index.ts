import { SpecialOrder } from "@/redux/types/order";
import { OrderOptions } from "./types";

class Order {
  public specialOrders: SpecialOrder[];

  constructor(orderOptions: OrderOptions[]) {
    this.specialOrders = [];

    this.parseSpecialOrders(orderOptions);
  }

  private parseSpecialOrders(orderOptions: OrderOptions[]) {
    this.specialOrders = orderOptions.map(order => {
      return {
        id: order.id,
        createdAt: order.createdAt,
        processedAt: order.processed_at,
        isAccepted: order.is_accepted,
        healthIssue: order.health_issue,
        mealInstructions: order.meal_instructions,
        meal: {
          id: order.meals[0].id,
          name: order.meals[0].name,
          price: order.meals[0].price,
          isSpecial: order.meals[0].is_special,
          rating: order.meals[0].rating,
          servingDate: order.meals[0].serving_date,
          servingTime: order.meals[0].serving_time
        },
        user: {
          ...order.users[0]
        }
      } as SpecialOrder;
    })
  }
}

export { Order }