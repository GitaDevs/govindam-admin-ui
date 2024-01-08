export interface SubscriptionOptions {
  data: Array<{
    id: number;
    attributes: {
      name: string;
      description: string;
      type: string;
      breakfast: boolean;
      lunch: boolean;
      dinner: boolean;
      price: number;
      valid_days: number;
    }
  }>;
}