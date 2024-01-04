import { Order } from "@/models/order";
import { ORDER } from "../actions/order";
import { initialState } from "../store/order";
import { OrderInitialState, SpecialOrder } from "../types/order";

export function orderReducer(state = initialState, action: any) {
  switch (action.type) {
    case ORDER.ORDER_LOADING: {
      const payload = action.payload;
      return { ...state, loading: payload } as OrderInitialState;
    }

    case ORDER.SET_SPECIAL_ORDERS: {
      const payload = (action?.payload?.specialOrders || []) as SpecialOrder[];
      return { ...state, specialOrders: payload } as OrderInitialState;
    }

    case ORDER.PUSH_SPECIAL_ORDER: {
      const payload = (action?.payload?.specialOrders || []) as SpecialOrder[];
      return { ...state, specialOrders: [...state.specialOrders, ...payload] } as OrderInitialState;
    }

    case ORDER.UPDATE_SPECIAL_ORDER: {
      const payload = (action?.payload?.specialOrders[0] || null) as SpecialOrder;
      return { 
        ...state,
        specialOrders: state.specialOrders.map((order) => {
          if(order.id !== payload?.id) {
            return { ...order };
          }

          return { ...payload };
        }) 
      } as OrderInitialState;
    }

    default:
      return state
  }
}