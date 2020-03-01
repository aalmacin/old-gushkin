import { WishItem } from "../../graphql/graphql.types";

export const GET_WISH_ITEMS = '[Wish Item] Get Wish Items';
export const GET_WISH_ITEMS_SUCCESS = '[Wish Item] Get Wish Items Success';
export const GET_WISH_ITEMS_FAILURE = '[Wish Item] Get Wish Items Failure';

export const getWishItems = (accessToken: string) => ({
  type: GET_WISH_ITEMS,
  payload: accessToken
})

export const getWishItemsSuccess = (wishItems: WishItem) => ({
  type: GET_WISH_ITEMS_SUCCESS,
  payload: wishItems
})

export const getWishItemsFailure = (error: string) => ({
  type: GET_WISH_ITEMS_FAILURE,
  payload: error
})