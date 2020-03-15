import { put, takeLatest, all } from 'redux-saga/effects'
import { GET_USER_DATA, getUserDataSuccess, getUserDataFailure, GET_ACCESS_TOKEN, getAccessTokenFailure, getAccessTokenSuccess, REFRESH_ACCESS_TOKEN, refreshAccessToken, refreshAccessTokenSuccess, refreshAccessTokenFailure } from './auth.actions';
import { getUserDataFromAccessToken, getAccessTokenUsingRefreshToken } from '../../functions/cognito.functions';
import { Cookies } from 'react-cookie';
import { getCurrentTimestamp } from '../../functions/utils.functions';

function* getAccessTokenSaga() {
  try {
    const cookies = new Cookies();
    const gushkinTokens = cookies.get('gushkinTokens');
    if (gushkinTokens) {
      const accessToken: any = gushkinTokens.accessToken;
      const expireTime: any = gushkinTokens.expireTime;
      const refreshToken: any = gushkinTokens.refreshToken;

      if (!refreshToken) {
        cookies.remove('gushkinTokens')
      }

      const currTimestamp = getCurrentTimestamp();
      if (expireTime <= currTimestamp) {
        yield put(refreshAccessToken())
      }
      yield put(getAccessTokenSuccess({ accessToken, expireTime }))
    }
  } catch (e) {
    yield put(getAccessTokenFailure("Something went wrong"))
  }
}

function* refreshAccessTokenSaga() {
  try {
    const cookies = new Cookies();
    const gushkinTokens = cookies.get('gushkinTokens');

    const expireTime: any = gushkinTokens.expireTime;
    const currTimestamp = getCurrentTimestamp();

    if (expireTime <= currTimestamp) {
      const refreshToken: any = gushkinTokens.refreshToken;

      const tokenData = yield getAccessTokenUsingRefreshToken(refreshToken).toPromise()
      const newExpireTime = currTimestamp + 1800;
      cookies.set('gushkinTokens', {
        ...tokenData,
        refreshToken,
        expireTime: newExpireTime
      })
      yield put(refreshAccessTokenSuccess({ accessToken: tokenData.accessToken, expireTime: newExpireTime }))
    }
  } catch (e) {
    yield put(refreshAccessTokenFailure("Something went wrong"))
  }
}

function* getUserDataSaga(action: any) {
  try {
    const userData = yield getUserDataFromAccessToken(action.payload)
    yield put(getUserDataSuccess(userData))
  } catch (e) {
    yield put(getUserDataFailure("Something went wrong"))
  }
}


function* watchUserData() {
  yield all([
    takeLatest(GET_USER_DATA, getUserDataSaga),
    takeLatest(GET_ACCESS_TOKEN, getAccessTokenSaga),
    takeLatest(REFRESH_ACCESS_TOKEN, refreshAccessTokenSaga)
  ]);
}

export default watchUserData;