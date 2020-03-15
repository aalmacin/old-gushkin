import { WishItem } from "../../graphql/graphql.types";

export const ADD_ITEM_TO_CART = '[Cart] Add Item To Cart';
export const REMOVE_ITEM_FROM_CART = '[Cart] Remove Item From Cart';
export const CHECKOUT_CART = '[Cart] Checkout Cart';

export const addItemToCart = (wishItem: WishItem) => ({
  type: ADD_ITEM_TO_CART,
  payload: wishItem
})

export const removeItemFromCart = (id: string) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: id
})

export const checkoutCart = () => ({
  type: CHECKOUT_CART
})