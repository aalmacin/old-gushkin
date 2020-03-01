import { createSelector } from "reselect";
import { WishItem } from "../../graphql/graphql.types";

export const selectWishItemState = (state: any) => state.wishItems;

export const selectWishItems = createSelector(selectWishItemState, wishItemState => wishItemState.wishItems)

export const selectIsWishItemsLoaded = createSelector(selectWishItemState, wishItemState => wishItemState.loaded)

export const selectTotalWishItemPrice = createSelector(selectWishItems, wishItems => wishItems.reduce((acc: number, w: WishItem) => acc + w.price, 0))