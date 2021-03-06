import { Activity, ActivityToday, ActivityActionCount } from "../../graphql/graphql.types";
import { GET_ACTIVITIES_SUCCESS, CREATE_ACTIVITY_SUCCESS, GET_TODAYS_ACTIVITIES_SUCCESS, GET_ACTIVITY_ACTION_COUNT_SUCCESS, CREATE_ACTIVITY, PERFORM_ACTIVITY, PERFORM_ACTIVITY_SUCCESS } from "./activity.actions";
import { LOGOUT_USER } from "../auth/auth.actions";

export interface ActivityState {
  activities: { loaded: boolean, actionLoading: boolean, data: Activity[] },
  todaysActivities: { loaded: boolean, data: ActivityToday[] },
  activityActionCount: { loaded: boolean, data: ActivityActionCount[] }
}

export const initialActivities: ActivityState = {
  activities: { loaded: false, actionLoading: false, data: [] },
  todaysActivities: { loaded: false, data: [] },
  activityActionCount: { loaded: false, data: [] },
};

export const activitiesReducer = (state = initialActivities, action: any): ActivityState => {
  switch (action.type) {
    case GET_ACTIVITIES_SUCCESS:
      return { ...state, activities: { ...state.activities, loaded: true, data: [...action.payload] } }
    case CREATE_ACTIVITY:
      return { ...state, activities: { ...state.activities, actionLoading: true } }

    case PERFORM_ACTIVITY:
      return { ...state, activities: { ...state.activities, actionLoading: true } }
    case PERFORM_ACTIVITY_SUCCESS:
      return { ...state, activities: { ...state.activities, actionLoading: false } }

    case CREATE_ACTIVITY_SUCCESS:
      return { ...state, activities: { ...state.activities, actionLoading: false, loaded: true, data: [...action.payload] } }
    case GET_TODAYS_ACTIVITIES_SUCCESS:
      return { ...state, todaysActivities: { loaded: true, data: [...action.payload] } }
    case GET_ACTIVITY_ACTION_COUNT_SUCCESS:
      return { ...state, activityActionCount: { loaded: true, data: [...action.payload] } }
    case LOGOUT_USER:
      return { ...initialActivities }
    default:
      return state
  }
}