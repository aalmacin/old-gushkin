import React, { useState } from 'react';
import classes from './Callback.module.scss';
import { UserContext, AuthState } from '../../App';
import { useLocation, Redirect } from 'react-router-dom';
import { getTokenUsingCode, isToken, getAccessTokenUsingRefreshToken, getUserDataFromAccessToken, isUser } from '../../functions/cognito.functions';
import { useCookies } from 'react-cookie'
import { first } from 'rxjs/operators';
import { getCurrentTimestamp } from '../../functions/utils.functions';

export const Callback = () => {
  const [cookies, setCookie] = useCookies(['gushkinTokens']);
  const [error, setError] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false
  });
  let query = new URLSearchParams(useLocation().search);

  if (!authState.isLoggedIn) {
    const code = query.get('code');
    if (!code) {
      return null;
    }

    const currTimestamp = getCurrentTimestamp();

    const updateAuthFromAccessToken = (accessToken: string) => {
      getUserDataFromAccessToken(accessToken).pipe(first()).subscribe(
        (userData) => {
          if (isUser(userData)) {
            setAuthState({
              isLoggedIn: true,
              user: userData
            })
          }
        }
      )
    }


    if (cookies && cookies.gushkinTokens) {
      if (cookies.gushkinTokens.expireTime <= currTimestamp) {
        const refreshToken = cookies.gushkinTokens.refreshToken;
        getAccessTokenUsingRefreshToken(refreshToken).pipe(first()).subscribe(tokenData => {
          if (isToken(tokenData)) {
            setCookie('gushkinTokens', { ...tokenData, refreshToken, expireTime: currTimestamp + 3600 })
            updateAuthFromAccessToken(tokenData.accessToken)
          } else {
            setError(true);
          }
        });
      } else {
        updateAuthFromAccessToken(cookies.gushkinTokens.accessToken)
      }
    } else {
      getTokenUsingCode(code).pipe(first()).subscribe(tokenData => {
        if (isToken(tokenData)) {
          setCookie('gushkinTokens', { ...tokenData, expireTime: currTimestamp + 3600 })
          updateAuthFromAccessToken(tokenData.accessToken)
        }
      });
    }

    return <p>{error ? 'Error loading token' : 'Loading...'}</p>
  }

  return (
    <div className={classes.Callback}>
      <UserContext.Provider value={authState}>
        <Redirect to="/" />
      </UserContext.Provider>
    </div>
  );
}

export default Callback;
