import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { getTokenUsingCode, isToken } from '../../functions/cognito.functions';
import { first } from 'rxjs/operators';
import { getCurrentTimestamp } from '../../functions/utils.functions';
import { addToken } from '../../functions/token-management.functions';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../../store/auth/auth.actions';
import Loading from '../../component-lib/Loading/Loading';

export const Callback = () => {
  const [error, setError] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  let query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch()
  const history = useHistory()

  const code = query.get('code');
  if (!code) {
    return null;
  }

  const currTimestamp = getCurrentTimestamp();

  const tokenSubscription = getTokenUsingCode(code).pipe(first()).subscribe(tokenData => {
    if (isToken(tokenData)) {
      addToken({ ...tokenData, expireTime: currTimestamp + 3600 })
    } else {
      setError(true)
    }
    setLoaded(true);
  });

  if (error) {
    return <p>Log in error</p>
  }

  if (loaded && !error) {
    tokenSubscription.unsubscribe();
    dispatch(getAccessToken())
    history.replace('/')
  }

  return <Loading />
}

export default Callback;
