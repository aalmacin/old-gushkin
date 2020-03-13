import { createSelector } from "reselect";
import { WishItem, Status } from "../../graphql/graphql.types";

export const selectWishItemState = (state: any) => state.wishItems;

export const selectWishItems = createSelector(selectWishItemState, (wishItemState): WishItem[] => wishItemState.wishItems)
export const selectStoreItems = createSelector(selectWishItems, wishItems => wishItems.filter(wishItem => wishItem.status === Status.not_bought))
export const selectStoreArchiveItems = createSelector(selectWishItems, wishItems => wishItems.filter(wishItem => wishItem.status === Status.bought))

export const selectIsWishItemsLoaded = createSelector(selectWishItemState, wishItemState => wishItemState.loaded)

export const selectTotalWishItemPrice = createSelector(selectWishItems, wishItems => wishItems.reduce((acc: number, w: WishItem) => acc + w.price, 0))