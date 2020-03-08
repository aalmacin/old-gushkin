import { put, takeLatest } from 'redux-saga/effects'
import { getAccessTokenUsingRefreshToken } from '../../functions/cognito.functions';
import { REFRESH_ACCESS_TOKEN, refreshAccessTokenSuccess, refreshAccessTokenFailure, setTokenData } from './tokens.actions';
import { getCurrentTimestamp } from '../../functions/utils.functions';
import { Cookies } from 'react-cookie';

function* refreshAccessToken(action: any) {
  try {
    const tokenData = yield getAccessTokenUsingRefreshToken(action.payload)

    if (tokenData.accessToken) {
      const cookie = new Cookies('gushkinTokens');
      cookie.set('accessToken', tokenData.accessToken);
      cookie.set('refreshToken', tokenData.refreshToken);
      cookie.set('idToken', tokenData.idToken);

      const expireTime = getCurrentTimestamp() + 3600;
      yield put(setTokenData(tokenData.accessToken, expireTime));
      yield put(refreshAccessTokenSuccess())
    } else {
      yield put(refreshAccessTokenFailure("Something went wrong while refreshing access token"))
    }
  } catch (e) {
    yield put(refreshAccessTokenFailure("Something went wrong while refreshing access token"))
  }
}


function* watchTokenState() {
  yield takeLatest(REFRESH_ACCESS_TOKEN, refreshAccessToken);
}

export default watchTokenState;