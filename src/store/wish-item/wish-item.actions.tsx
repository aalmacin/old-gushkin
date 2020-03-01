import { WishItem, Priority, Status } from "../../graphql/graphql.types";

export const GET_WISH_ITEMS = '[Wish Item] Get Wish Items';
export const GET_WISH_ITEMS_SUCCESS = '[Wish Item] Get Wish Items Success';
export const GET_WISH_ITEMS_FAILURE = '[Wish Item] Get Wish Items Failure';

export const CREATE_WISH_ITEM = '[Wish Item] Create Wish Item';
export const CREATE_WISH_ITEM_SUCCESS = '[Wish Item] Create Wish Item Success';
export const CREATE_WISH_ITEM_FAILURE = '[Wish Item] Create Wish Item Failure';

export const getWishItems = (accessToken: string) => ({
  type: GET_WISH_ITEMS,
  payload: accessToken
})

export const getWishItemsSuccess = (wishItems: WishItem[]) => ({
  type: GET_WISH_ITEMS_SUCCESS,
  payload: wishItems
})

export const getWishItemsFailure = (error: string) => ({
  type: GET_WISH_ITEMS_FAILURE,
  payload: error
})

interface CreateWishItemPayload {
  accessToken: any,
  description: string,
  price: number,
  source?: string,
  priority: Priority,
  status: Status
}

export const createWishItem = (payload: CreateWishItemPayload) => ({
  type: CREATE_WISH_ITEM,
  payload
})

export const createWishItemSuccess = (wishItems: WishItem[]) => ({
  type: CREATE_WISH_ITEM_SUCCESS,
  payload: wishItems
})

export const createWishItemFailure = (error: string) => ({
  type: CREATE_WISH_ITEM_FAILURE,
  payload: error
})