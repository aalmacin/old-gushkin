import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from "./cart.actions";
import { WishItem } from "../../graphql/graphql.types";

export const initialCart: WishItem[] = [];

export const cartReducer = (state = initialCart, action: any) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return [...state, action.payload]
    case REMOVE_ITEM_FROM_CART:
      return [...state].filter(item => item.id !== action.payload)
    default:
      return state
  }
}