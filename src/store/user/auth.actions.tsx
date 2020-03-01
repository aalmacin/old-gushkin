import { User } from "./auth.reducer";

export const GET_USER_DATA = '[Auth] Get User Data';
export const GET_USER_DATA_SUCCESS = '[Auth] Get User Data Success';
export const GET_USER_DATA_FAILURE = '[Auth] Get User Data Failure';
export const LOGOUT_USER = '[Auth] Logout User';

export const getUserData = (accessToken: string) => ({
  type: GET_USER_DATA,
  payload: accessToken
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