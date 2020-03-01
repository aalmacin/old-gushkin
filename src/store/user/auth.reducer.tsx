import { GET_USER_DATA_SUCCESS, LOGOUT_USER } from "./auth.actions";

export interface User {
  id: string,
  verified: boolean,
  email: string
}

export interface AuthState {
  isLoggedIn: boolean,
  user?: User
}

export const initialUserState: AuthState = { isLoggedIn: false };

export const authReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
      return { ...state, isLoggedIn: true, user: action.payload }
    case LOGOUT_USER:
      return { ...initialUserState }
    default:
      return state
  }
}