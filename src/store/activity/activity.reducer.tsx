import { Activity, ActivityToday, ActivityActionCount } from "../../graphql/graphql.types";
import { GET_ACTIVITIES_SUCCESS, CREATE_ACTIVITY_SUCCESS, GET_TODAYS_ACTIVITIES_SUCCESS, GET_ACTIVITY_ACTION_COUNT_SUCCESS } from "./activity.actions";
import { LOGOUT_USER } from "../auth/auth.actions";

export interface ActivityState {
  activities: { loaded: boolean, data: Activity[] },
  todaysActivities: { loaded: boolean, data: ActivityToday[] },
  activityActionCount: { loaded: boolean, data: ActivityActionCount[] }
}

export const initialActivities: ActivityState = {
  activities: { loaded: false, data: [] },
  todaysActivities: { loaded: false, data: [] },
  activityActionCount: { loaded: false, data: [] },
};

export const activitiesReducer = (state = initialActivities, action: any): ActivityState => {
  switch (action.type) {
    case GET_ACTIVITIES_SUCCESS:
      return { ...state, activities: { loaded: true, data: [...action.payload] } }
    case CREATE_ACTIVITY_SUCCESS:
      return { ...state, activities: { loaded: true, data: [...action.payload] } }
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