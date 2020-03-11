import { WishItem } from "../../graphql/graphql.types";
import { createSelector } from "reselect";

export const selectCart = (state: any): WishItem[] => state.cart;

export const selectGetCartTotal = createSelector(selectCart, cartItems => cartItems.reduce((a, b) => a + b.price, 0))
