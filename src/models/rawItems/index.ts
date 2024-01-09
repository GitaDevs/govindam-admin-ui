import { RawItem } from "@/redux/types/rawItem";
import { RawItemsOptions } from "../menu/types";

class RawItemsModel {
  public rawItems: RawItem[];

  constructor(rawItemsOptions: RawItemsOptions[]) {
    this.rawItems = [];

    this.parseRawItems(rawItemsOptions);
  }

  private parseRawItems(rawItemsOptions: RawItemsOptions[]) {
    this.rawItems = rawItemsOptions.map((rawItem) => {
      return {
        id: rawItem.id,
        name: rawItem.name,
        currentPrice: rawItem.current_price,
        converstionRatio: rawItem.converstion_ratio
      } as RawItem
    })
  }
}

export { RawItemsModel };