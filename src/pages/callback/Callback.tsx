import React, { useState } from 'react';
import classes from './Callback.module.scss';
import { useLocation, Redirect } from 'react-router-dom';
import { getTokenUsingCode, isToken, getAccessTokenUsingRefreshToken, getUserDataFromAccessToken, isUser } from '../../functions/cognito.functions';
import { useCookies } from 'react-cookie'
import { first } from 'rxjs/operators';
import { getCurrentTimestamp } from '../../functions/utils.functions';

export const Callback = () => {
  const [cookies, setCookie] = useCookies(['gushkinTokens']);
  const [error, setError] = useState<boolean>(false);
  let query = new URLSearchParams(useLocation().search);

  const code = query.get('code');
  if (!code) {
    return null;
  }

  const currTimestamp = getCurrentTimestamp();

  if (cookies && cookies.gushkinTokens) {
    if (cookies.gushkinTokens.expireTime <= currTimestamp) {
      const refreshToken = cookies.gushkinTokens.refreshToken;
      getAccessTokenUsingRefreshToken(refreshToken).pipe(first()).subscribe(tokenData => {
        if (isToken(tokenData)) {
          setCookie('gushkinTokens', { ...tokenData, refreshToken, expireTime: currTimestamp + 3600 })
        } else {
          setError(true);
        }
      });
    }
  } else {
    getTokenUsingCode(code).pipe(first()).subscribe(tokenData => {
      if (isToken(tokenData)) {
        setCookie('gushkinTokens', { ...tokenData, expireTime: currTimestamp + 3600 })
      }
    });
  }

  return !error ? (
    <div className={classes.Callback}>
      <Redirect to="/" />
    </div>
  ) : <p>Error logging in.</p>;
}

export default Callback;
