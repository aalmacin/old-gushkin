import { createSelector } from "reselect";

export const selectFundState = (state: any) => state.funds;

export const selectFunds = createSelector(selectFundState, fundState => fundState.funds)

export const selectIsFundsLoaded = createSelector(selectFundState, fundState => fundState.loaded)
