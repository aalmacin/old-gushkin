import { createSelector } from "reselect";
import { ActivityState } from "./activity.reducer";

export const selectActivityState = (state: any): ActivityState => state.activities;

export const selectActivitiesInfo = createSelector(selectActivityState, activityState => activityState.activities)

export const selectActivities = createSelector(selectActivitiesInfo, activities => activities.data)

export const selectIsActivitiesLoaded = createSelector(selectActivitiesInfo, activities => activities.loaded)

export const selectTodaysActivitiesInfo = createSelector(selectActivityState, activityState => activityState.todaysActivities)

export const selectTodaysActivities = createSelector(selectTodaysActivitiesInfo, activities => activities.data)

export const selectIsTodaysActivitiesLoaded = createSelector(selectTodaysActivitiesInfo, activities => activities.loaded)

export const selectTodaysActivitiesFundChange = createSelector(selectTodaysActivities, activities => activities.reduce((total, activity) => total + (activity.positive ? activity.fundAmt : activity.fundAmt * -1), 0))