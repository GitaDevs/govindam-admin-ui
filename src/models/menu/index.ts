import { Meal as IMeal, Menu as IMenu, Dish as IDish, Unit as IUnit } from "@/redux/types/menu";
import { DishesOptions, MealOptions, MenuOptions, RawItemsOptions, UnitOptions } from "./types";
import { RawItem } from "@/redux/types/rawItem";

class Menu {
  public menus: IMenu[]; //array of meals

  constructor(menuOptions?: MenuOptions) {
    this.menus = [];

    if(!menuOptions) return;

    this.menus = this.parseMenus(menuOptions || {}) || [];
  }

  getMealDishes(mealId: number) {}

  getMealItems(mealId: number) {}

  isSpecialMeal(mealId: number) {}

  private parseUnit(unitOptions: UnitOptions): IUnit {
    if(!unitOptions) return {};

    const unitAttr = unitOptions;

    return {
      id: unitOptions.id,
      name: unitAttr.name,              
      abbreviation: unitAttr.abbreviation,              
      hintMessage: unitAttr.hint_message,
    } as IUnit;
  }

  private parseRawItems(rawItemsOptions: RawItemsOptions[]): RawItem[] {
    return rawItemsOptions.map(item => ({
      id: item.id,
      currentPrice: item.current_price,
      converstionRatio: item.converstion_ratio,
      quantity: item.quantity,
      categories: item.categories.map(categ => ({
        id: categ.id,
        name: categ.name,
        categoryType: categ.category_type,
        type: categ.type
      })),
      subCategories: item.sub_categories.map(categ => ({
        id: categ.id,
        name: categ.name,
        categoryType: categ.category_type,
        type: categ.type
      })),
      purchasingUnit: {
        id: item.purchasing_unit.id,
        name: item.purchasing_unit.name,
        hintMessage: item.purchasing_unit.hint_message,
        abbreviation: item.purchasing_unit.abbreviation
      },
      consumptionUnit: {
        id: item.consumption_unit.id,
        name: item.consumption_unit.name,
        hintMessage: item.consumption_unit.hint_message,
        abbreviation: item.consumption_unit.abbreviation
      },
      name: item.name
    } as RawItem))
  }

  private parseDishes(dishesOptions: DishesOptions[]): IDish[] {
    if(!dishesOptions || !dishesOptions.length) return [];

    return dishesOptions.map(dish => {
      const dishAttr = dish || {};
      const unit: IUnit = this.parseUnit(dish?.unit || {});
      const rawItems: RawItem[] = this.parseRawItems(dish.raw_items || []);

      return {
        id: dish.id,
        name: dishAttr.name,
        alias: dishAttr.alias,
        servingSize: dishAttr.serving_size,
        price: dishAttr.price,
        textInstructions: dishAttr.text_intructions,
        videoLink: dishAttr.video_link,
        unit,
        rawItems
      } as IDish;      
    })
  }

  private parseMeals(mealsOptions: MealOptions[]): IMeal[] {
    if(!mealsOptions || !mealsOptions.length) return [];

    return mealsOptions.map(meal => {
      const newDishes: IDish[] = this.parseDishes(meal?.dishes || []);
      const mealAttr = meal || {};

      return {
        id: meal.id,
        name: mealAttr.name,
        isSpecial: mealAttr.is_special,
        servingDate: mealAttr.serving_date,
        servingTime: mealAttr.serving_time,
        rating: mealAttr.rating || 0,
        price: mealAttr.price,
        dishes: newDishes,
        peopleDining: mealAttr.people_dining
      } as IMeal;
    })
  }

  private parseMenus(menuOptions: MenuOptions): IMenu[] {
    if(!menuOptions) return [];

    return menuOptions.data.map(menu => {
      const newMeals: IMeal[] = this.parseMeals(menu?.meals || []);

      return {
        id: menu.id,
        validFrom: menu.valid_from,
        validTill: menu.valid_till,
        name: menu.name,
        description: menu.description || "",
        meals: newMeals
      } as IMenu;
    });
  }
}

export { Menu };