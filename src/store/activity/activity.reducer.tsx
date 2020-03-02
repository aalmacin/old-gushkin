import { Activity } from "../../graphql/graphql.types";
import { GET_ACTIVITIES_SUCCESS, CREATE_ACTIVITY_SUCCESS } from "./activity.actions";

export interface ActivityState {
  loaded: boolean,
  activities: Activity[]
}

export const initialActivities: ActivityState = {
  loaded: false,
  activities: []
};

export const activitiesReducer = (state = initialActivities, action: any) => {
  switch (action.type) {
    case GET_ACTIVITIES_SUCCESS:
      return { loaded: true, activities: [...action.payload] }
    case CREATE_ACTIVITY_SUCCESS:
      return { loaded: true, activities: [...action.payload] }
    default:
      return state
  }
}