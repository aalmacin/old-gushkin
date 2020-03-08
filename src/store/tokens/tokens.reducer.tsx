import { SET_TOKEN_DATA } from "./tokens.actions";

export interface TokenState {
  refreshing: boolean,
  accessToken?: string,
  expireTime?: number
}

export const initialTokenState: TokenState = { refreshing: false };

export const tokenReducer = (state = initialTokenState, action: any) => {
  switch (action.type) {
    case SET_TOKEN_DATA:
      const { accessToken, expireTime } = action.payload;
      return { ...state, accessToken, expireTime }
    default:
      return state
  }
}