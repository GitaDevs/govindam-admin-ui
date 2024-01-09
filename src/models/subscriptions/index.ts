import { Subscription } from "@/redux/types/user";
import { SubscriptionOptions } from "./types";

class SubscritionsModel {
  public subscriptions: Subscription[];

  constructor(subOptions: SubscriptionOptions) {
    this.subscriptions = [];

    if(!subOptions) return;

    this.subscriptions = this.parseSubscriptions(subOptions);
  }

  private parseSubscriptions(subOptions: SubscriptionOptions): Subscription[] {
    return subOptions.data.map(subs => {
      return {
        id: subs.id,
        name: subs.attributes.name,
        description: subs.attributes.description,
        type: subs.attributes.type,
        breakfast: subs.attributes.breakfast,
        lunch: subs.attributes.lunch,
        dinner: subs.attributes.dinner,
        price: subs.attributes.price,
        validDays: subs.attributes.valid_days
      } as Subscription;
    })
  }
}

export { SubscritionsModel };