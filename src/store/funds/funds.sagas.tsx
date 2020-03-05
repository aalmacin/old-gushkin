import { put, takeLatest, select, all } from 'redux-saga/effects'
import { selectUserId } from '../auth/auth.selectors';
import { getCurrentFundsFailure, getCurrentFundsSuccess, GET_CURRENT_FUNDS } from './funds.actions';
import { getCurrentFunds } from '../../graphql/queries.functions'

function* getCurrentFundsSaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const fundResult = yield getCurrentFunds(
      action.payload,
      userId
    )
    if (fundResult.success) {
      yield put(getCurrentFundsSuccess(fundResult.data))
    } else {
      yield put(getCurrentFundsFailure(fundResult.error))
    }
  } catch (e) {
    yield put(getCurrentFundsFailure("Something went wrong while getting current funds"))
  }
}

function* watchFunds() {
  yield all([takeLatest(GET_CURRENT_FUNDS, getCurrentFundsSaga)])
}

export default watchFunds;