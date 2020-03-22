import { createSelector } from "reselect";
import { ActivityState } from "./activity.reducer";
import { getLast14Days } from "../../functions/utils.functions";

export const selectActivityState = (state: any): ActivityState => state.activities;

export const selectActivitiesInfo = createSelector(selectActivityState, activityState => activityState.activities)

export const selectActivities = createSelector(selectActivitiesInfo, activities => activities.data)

export const selectIsActivitiesLoaded = createSelector(selectActivitiesInfo, activities => activities.loaded)

export const selectIsActivitiesActionLoading = createSelector(selectActivitiesInfo, activities => activities.actionLoading)

export const selectTodaysActivitiesInfo = createSelector(selectActivityState, activityState => activityState.todaysActivities)

export const selectTodaysActivities = createSelector(selectTodaysActivitiesInfo, activities => activities.data)

export const selectIsTodaysActivitiesLoaded = createSelector(selectTodaysActivitiesInfo, activities => activities.loaded)

export const selectTodaysActivitiesFundChange = createSelector(selectTodaysActivities, activities => activities.reduce((total, activity) => total + (activity.positive ? activity.fundAmt : activity.fundAmt * -1), 0))

export const selectActivityActionCountInfo = createSelector(selectActivityState, activityState => activityState.activityActionCount)

export const selectActivityActionCount = createSelector(selectActivityActionCountInfo, activities => {
  const activityActionData = activities.data;
  const activityIds = [...Array.from(new Set(activityActionData.map(activity => activity.activityId)))]
  return activityIds.map(activityId => {
    const activityIdData = activityActionData.filter(activity => activity.activityId === activityId)
    return {
      activityId, days: getLast14Days().map((day: string) => {
        return { day, count: activityIdData.find(activity => activity.day === day)?.count || 0 }
      })
    }
  })
})

export const selectIsActivityActionCountLoaded = createSelector(selectActivityActionCountInfo, activities => activities.loaded)