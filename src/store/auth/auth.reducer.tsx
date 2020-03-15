import { GET_USER_DATA_SUCCESS, LOGOUT_USER, GET_USER_DATA, GET_USER_DATA_FAILURE, GET_ACCESS_TOKEN, GET_ACCESS_TOKEN_SUCCESS, GET_ACCESS_TOKEN_FAILURE, REFRESH_ACCESS_TOKEN_SUCCESS } from "./auth.actions";

export interface User {
  id: string,
  verified: boolean,
  email: string
}

export interface UserState {
  loaded: boolean,
  data?: User
}

export interface Token {
  accessToken?: string,
  expireTime?: number,
}

export interface TokenState {
  data?: Token
  loaded: boolean
}

export interface AuthState {
  token?: TokenState,
  user?: UserState
}

export const initialUserState: AuthState = {};

export const authReducer = (state = initialUserState, action: any): AuthState => {
  switch (action.type) {
    case GET_USER_DATA:
      return { ...state, user: { loaded: false } }
    case GET_USER_DATA_SUCCESS:
      return { ...state, user: { loaded: true, data: action.payload } }
    case GET_USER_DATA_FAILURE:
      return { ...state, user: { loaded: false } }
    case GET_ACCESS_TOKEN:
      return { ...state, token: { loaded: false } }
    case REFRESH_ACCESS_TOKEN_SUCCESS:
    case GET_ACCESS_TOKEN_SUCCESS:
      return { ...state, token: { loaded: true, data: action.payload } }
    case GET_ACCESS_TOKEN_FAILURE:
      return { ...state, token: { loaded: false } }
    case LOGOUT_USER:
      return { ...initialUserState }
    default:
      return state
  }
}