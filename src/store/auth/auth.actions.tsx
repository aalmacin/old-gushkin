import { User, Token } from "./auth.reducer";

export const GET_ACCESS_TOKEN = '[Auth] Get Access Token';
export const GET_ACCESS_TOKEN_SUCCESS = '[Auth] Get Access Token Success';
export const SET_USER_NOT_LOGGED_IN = '[Auth] Set User Not Logged In';
export const GET_ACCESS_TOKEN_FAILURE = '[Auth] Get Access Token Failure';

export const REFRESH_ACCESS_TOKEN = '[Auth] Refresh Access Token';
export const REFRESH_ACCESS_TOKEN_SUCCESS = '[Auth] Refresh Access Token Success';
export const REFRESH_ACCESS_TOKEN_FAILURE = '[Auth] Refresh Access Token Failure';

export const GET_USER_DATA = '[Auth] Get User Data';
export const GET_USER_DATA_SUCCESS = '[Auth] Get User Data Success';
export const GET_USER_DATA_FAILURE = '[Auth] Get User Data Failure';
export const LOGOUT_USER = '[Auth] Logout User';

export const getAccessToken = () => ({
  type: GET_ACCESS_TOKEN,
})

export const getAccessTokenSuccess = (token: Token) => ({
  type: GET_ACCESS_TOKEN_SUCCESS,
  payload: token
})

export const setUserNotLoggedIn = () => ({
  type: SET_USER_NOT_LOGGED_IN,
})

export const getAccessTokenFailure = (error: string) => ({
  type: GET_ACCESS_TOKEN_FAILURE,
  payload: error
})

export const refreshAccessToken = () => ({
  type: REFRESH_ACCESS_TOKEN,
})

export const refreshAccessTokenSuccess = (token: Token) => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS,
  payload: token
})

export const refreshAccessTokenFailure = (error: string) => ({
  type: REFRESH_ACCESS_TOKEN_FAILURE,
  payload: error
})

export const getUserData = () => ({
  type: GET_USER_DATA
})

export const getUserDataSuccess = (userData: User) => ({
  type: GET_USER_DATA_SUCCESS,
  payload: userData
})

export const getUserDataFailure = (error: string) => ({
  type: GET_USER_DATA_FAILURE,
  payload: error
})

export const logoutUser = () => ({
  type: LOGOUT_USER
})