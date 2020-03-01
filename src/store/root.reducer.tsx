import { combineReducers } from "redux"
import { authReducer } from "./user/auth.reducer"

export const rootReducer = combineReducers({
  auth: authReducer
})