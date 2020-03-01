import { WishItem } from "../../graphql/graphql.types";
import { GET_WISH_ITEMS_SUCCESS } from "./wish-item.actions";

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
    default:
      return state
  }
}