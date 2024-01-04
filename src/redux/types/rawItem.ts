import { Categories, Unit } from "./menu";

export interface RawItemInitialState {
  items: RawItem[];
  loading: boolean;
};

export type RawItem = {
  id: number;
  name: string;
  currentPrice: number;
  purchasingUnit: Unit;
  consumptionUnit: Unit;
  converstionRatio: number;
  categories?: Categories[];
  subCategories?: Categories[];
  quantity: number;
}