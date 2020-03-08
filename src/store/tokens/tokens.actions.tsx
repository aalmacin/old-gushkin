export const SET_TOKEN_DATA = '[Token] Set Token Data';
export const REFRESH_ACCESS_TOKEN = '[Token] Refresh Access Token';
export const REFRESH_ACCESS_TOKEN_SUCCESS = '[Token] Refresh Access Token Success';
export const REFRESH_ACCESS_TOKEN_FAILURE = '[Token] Refresh Access Token Failure';

export const setTokenData = (accessToken: string, expireTime: number) => ({
  type: SET_TOKEN_DATA,
  payload: { accessToken, expireTime }
})

export const refreshAccessToken = (refreshToken: string) => ({
  type: REFRESH_ACCESS_TOKEN,
  payload: refreshToken
})

export const refreshAccessTokenSuccess = () => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS
})

export const refreshAccessTokenFailure = (error: string) => ({
  type: REFRESH_ACCESS_TOKEN_FAILURE,
  payload: error
})