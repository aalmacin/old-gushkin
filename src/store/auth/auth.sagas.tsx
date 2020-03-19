import { put, takeLatest, all, select } from 'redux-saga/effects'
import { GET_USER_DATA, getUserDataSuccess, getUserDataFailure, GET_ACCESS_TOKEN, getAccessTokenFailure, getAccessTokenSuccess, REFRESH_ACCESS_TOKEN, refreshAccessToken, refreshAccessTokenSuccess, refreshAccessTokenFailure, setUserNotLoggedIn } from './auth.actions';
import { getUserDataFromAccessToken, getAccessTokenUsingRefreshToken } from '../../functions/cognito.functions';
import { getCurrentTimestamp } from '../../functions/utils.functions';
import { selectAccessToken } from './auth.selectors';
import { getTokens, removeTokens, addToken } from '../../functions/token-management.functions';

function* getAccessTokenSaga() {
  try {
    const gushkinTokens = getTokens();
    if (gushkinTokens) {
      const accessToken: any = gushkinTokens.accessToken;
      const expireTime: any = gushkinTokens.expireTime;
      const refreshToken: any = gushkinTokens.refreshToken;

      if (!refreshToken) {
        removeTokens()
      }

      const currTimestamp = getCurrentTimestamp();
      if (expireTime <= currTimestamp) {
        yield put(refreshAccessToken())
      }
      yield put(getAccessTokenSuccess({ accessToken, expireTime }))
    } else {
      yield put(setUserNotLoggedIn())
    }
  } catch (e) {
    console.log('e', e)
    yield put(getAccessTokenFailure("Something went wrong"))
  }
}

function* refreshAccessTokenSaga() {
  try {
    const gushkinTokens = getTokens();

    const expireTime: any = gushkinTokens.expireTime;
    const currTimestamp = getCurrentTimestamp();

    if (expireTime <= currTimestamp) {
      const refreshToken: any = gushkinTokens.refreshToken;

      const tokenData = yield getAccessTokenUsingRefreshToken(refreshToken).toPromise()
      const newExpireTime = currTimestamp + 1800;

      const newTokenData = {
        accessToken: tokenData.accessToken,
        idToken: tokenData.idToken,
        refreshToken,
        expireTime: newExpireTime
      }
      addToken(newTokenData)
      yield put(refreshAccessTokenSuccess({ accessToken: tokenData.accessToken, expireTime: newExpireTime }))
    }
  } catch (e) {
    yield put(refreshAccessTokenFailure("Something went wrong"))
  }
}

function* getUserDataSaga() {
  try {
    const accessToken = yield select(selectAccessToken);
    const userData = yield getUserDataFromAccessToken(accessToken)

    if (userData && userData.error) {
      yield put(getUserDataFailure("API return error"))
    } else {
      yield put(getUserDataSuccess(userData))
    }
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