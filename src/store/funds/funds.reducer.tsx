import { GET_CURRENT_FUNDS_SUCCESS } from "./funds.actions";

export interface FundsState {
  loaded: boolean,
  funds: number
}

export const initialFunds: FundsState = {
  loaded: false,
  funds: 0
};

export const fundsReducer = (state = initialFunds, action: any) => {
  switch (action.type) {
    case GET_CURRENT_FUNDS_SUCCESS:
      return { loaded: true, funds: action.payload }
    default:
      return state
  }
}