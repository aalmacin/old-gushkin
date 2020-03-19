import { WishItem } from "../../graphql/graphql.types";
import { GET_WISH_ITEMS_SUCCESS, CREATE_WISH_ITEM_SUCCESS, PURCHASE_WISH_ITEM_SUCCESS } from "./wish-item.actions";
import { LOGOUT_USER } from "../auth/auth.actions";

export interface WishItemState {
  loaded: boolean,
  wishItems: WishItem[]
}

export const initialWishItems: WishItemState = {
  loaded: false,
  wishItems: []
};

export const wishItemsReducer = (state = initialWishItems, action: any) => {
  switch (action.type) {
    case GET_WISH_ITEMS_SUCCESS:
      return { loaded: true, wishItems: [...action.payload] }
    case PURCHASE_WISH_ITEM_SUCCESS:
    case CREATE_WISH_ITEM_SUCCESS:
      return { loaded: true, wishItems: [...action.payload] }
    case LOGOUT_USER:
      return { ...initialWishItems }
    default:
      return state
  }
}