import { createSelector } from "reselect";

export const selectWishItemState = (state: any) => state.wishItems;

export const selectWishItems = createSelector(selectWishItemState, wishItemState => wishItemState.wishItems)

export const selectIsWishItemsLoaded = createSelector(selectWishItemState, wishItemState => wishItemState.loaded)