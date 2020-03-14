import { GET_USER_DATA_SUCCESS, LOGOUT_USER, GET_USER_DATA, GET_USER_DATA_FAILURE } from "./auth.actions";

export interface User {
  id: string,
  verified: boolean,
  email: string
}

export interface AuthState {
  loading: boolean,
  isLoggedIn: boolean,
  user?: User
}

export const initialUserState: AuthState = { loading: false, isLoggedIn: false };

export const authReducer = (state = initialUserState, action: any) => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, loading: true }
    case GET_USER_DATA_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true, user: action.payload }
    case GET_USER_DATA_FAILURE:
      return { ...state, loading: false }
    case LOGOUT_USER:
      return { ...initialUserState }
    default:
      return state
  }
}