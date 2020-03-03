import { createSelector } from "reselect";

export const selectActivityState = (state: any) => state.activities;

export const selectActivities = createSelector(selectActivityState, activityState => activityState.activities)

export const selectIsActivitiesLoaded = createSelector(selectActivityState, activityState => activityState.loaded)
