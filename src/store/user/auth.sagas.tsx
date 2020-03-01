import { put, takeLatest } from 'redux-saga/effects'
import { GET_USER_DATA, getUserDataSuccess, getUserDataFailure } from './auth.actions';
import { getUserDataFromAccessToken } from '../../functions/cognito.functions';

function* getUserData(action: any) {
  try {
    const userData = yield getUserDataFromAccessToken(action.payload)
    yield put(getUserDataSuccess(userData))
  } catch (e) {
    yield put(getUserDataFailure("Something went wrong"))
  }
}


function* watchUserData() {
  yield takeLatest(GET_USER_DATA, getUserData);
}

export default watchUserData;