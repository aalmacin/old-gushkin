import React, { useState } from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from './store/auth/auth.selectors';
import { getUserData } from './store/auth/auth.actions';
import { getCurrentTimestamp } from './functions/utils.functions';
import { getAccessTokenUsingRefreshToken, isToken } from './functions/cognito.functions';
import { first } from 'rxjs/operators';
import MainNav from './MainNav/MainNav';
import ExpiredMessage from './component-lib/ExpiredMessage/ExpiredMessage';

function App() {
  const [expired, setExpired] = useState(false);
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch()
  const [cookies, setCookie] = useCookies(['gushkinTokens']);

  if (!authState.isLoggedIn && cookies.gushkinTokens && cookies.gushkinTokens.accessToken) {
    const currTimestamp = getCurrentTimestamp();
    if (cookies.gushkinTokens.expireTime <= currTimestamp) {
      setExpired(true);
      const refreshToken = cookies.gushkinTokens.refreshToken;
      getAccessTokenUsingRefreshToken(refreshToken).pipe(first()).subscribe(tokenData => {
        if (isToken(tokenData)) {
          setCookie('gushkinTokens', { ...tokenData, refreshToken, expireTime: currTimestamp + 3600 })
          dispatch(getUserData(cookies.gushkinTokens.accessToken))
        }
      });
    } else {
      dispatch(getUserData(cookies.gushkinTokens.accessToken))
    }
  }


  return (
    <div className={classes.App}>
      <BrowserRouter>
        <ExpiredMessage isExpired={expired} />
        <MainNav />
        <Switch>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
