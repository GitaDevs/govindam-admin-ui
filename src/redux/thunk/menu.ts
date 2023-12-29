import { Dispatch } from "react"
import { RootState } from ".."
import { AnyAction } from "redux"
import { menuLoading, setServedOrders, setSevenDaysMenu, setUpcomingMeals } from "../actions/menu"
import { ApiEndpoints, Params } from "@/lib/apiEndpoints";
import { API_ENDPOINTS } from "@/lib/apiConstants";
import { Menu } from "@/models/menu";
import { updateToast } from "../actions/app";
import { DateTime } from "luxon";

const apiEndPoint = new ApiEndpoints(process.env.apiHost || "", null);

const UPCOMING = "upcoming";
const SERVED = "served";
const SEVEN_DAYS = "sevenDays";

type FetchMealType = typeof UPCOMING | typeof SERVED | typeof SEVEN_DAYS;

export const fetchMenuAndMeals = (fetchMealType?: FetchMealType, mealParams?: Params) => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch(menuLoading({ loading : true }));

    apiEndPoint.setToken(getState().user.userinfo.jwt || "");

    const params =  mealParams || getMealParams(fetchMealType);
    const { response } = await apiEndPoint.get(API_ENDPOINTS.MENUS, params);

    if(response && response.data) {
      const menu = new Menu(response.data);
      dispatchMenuActions(dispatch, fetchMealType || UPCOMING, menu);
    } else {
      dispatch(updateToast({ type: 'error', message: `Unable to fetch menus!`, open: true}))
    }

    dispatch(menuLoading({ loading : false }));
  }
}

export const dispatchMenuActions = (dispatch: Dispatch<AnyAction>, mealType: FetchMealType, menu: Menu) => {
  switch(mealType) {
    case UPCOMING:
      dispatch(setUpcomingMeals(menu))
      break;
    case SERVED:
      dispatch(setServedOrders(menu))
      break;
    case SEVEN_DAYS:
      dispatch(setSevenDaysMenu(menu));
      break;
  }
}

function getMealParams(type?: FetchMealType): Params {
  switch(type) {
    case UPCOMING:
      return {
        pagination: {
          page: 1,
          pageSize: 3
        },
        populate: {
          meals: {
            sort: ["serving_date:asc"],
            filters: {
              serving_date: {
                $gt: DateTime.local().startOf('day')
              }
            },
            populate: {
              dishes: {
                populate: {
                  unit: true
                }
              }
            }
          }
        }
    };
    case SERVED:
      return {
        populate: {
          pagination: {
            page: 1,
            pageSize: 7
          },
          meals: {
            sort: ["serving_date:desc"],
            filters: {
              serving_date: {
                $lte: DateTime.local().startOf('day')
              }
            },
            populate: {
              dishes: {
                populate: {
                  unit: true
                }
              }
            }
          }
        }
      };
    case SEVEN_DAYS:
      return {
        pagination: {
          page: 1,
          pageSize: 7
        },
        populate: {
          meals: {
            sort: ["serving_date:asc"],
            filters: {
              serving_date: {
                $gt: DateTime.local().startOf('day')
              }
            },
            populate: {
              dishes: {
                populate: {
                  unit: true
                }
              }
            }
          }
        }
      };
    default:
      return {};
  }
}