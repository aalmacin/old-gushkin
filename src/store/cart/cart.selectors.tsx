import { WishItem } from "../../graphql/graphql.types";

export const selectCart = (state: any): WishItem[] => state.cart;
