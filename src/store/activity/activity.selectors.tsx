import { createSelector } from "reselect";
import { Activity } from "../../graphql/graphql.types";

export const selectActivityState = (state: any) => state.activities;

export const selectActivities = createSelector(selectActivityState, activityState => activityState.activities)

export const selectIsActivitiesLoaded = createSelector(selectActivityState, activityState => activityState.loaded)

export const selectTotalActivityPrice = createSelector(selectActivities, activities => activities.reduce((acc: number, w: Activity) => acc + w.price, 0))