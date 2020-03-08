import { combineReducers } from "redux"
import { authReducer } from "./auth/auth.reducer"
import { wishItemsReducer } from "./wish-item/wish-item.reducer"
import { activitiesReducer } from "./activity/activity.reducer"
import { fundsReducer } from "./funds/funds.reducer"
import { tokenReducer } from "./tokens/tokens.reducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  wishItems: wishItemsReducer,
  activities: activitiesReducer,
  funds: fundsReducer,
  token: tokenReducer
})