export const GET_CURRENT_FUNDS = '[Fund] Get Current Funds';
export const GET_CURRENT_FUNDS_SUCCESS = '[Fund] Get Current Funds Success';
export const GET_CURRENT_FUNDS_FAILURE = '[Fund] Get Current Funds Failure';

export const getCurrentFunds = () => ({
  type: GET_CURRENT_FUNDS
})

export const getCurrentFundsSuccess = (currentFunds: number) => ({
  type: GET_CURRENT_FUNDS_SUCCESS,
  payload: currentFunds
})

export const getCurrentFundsFailure = (error: string) => ({
  type: GET_CURRENT_FUNDS_FAILURE,
  payload: error
})