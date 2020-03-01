import React from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter, Switch, Route, Link,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from './store/user/auth.selectors';
import { getUserData, logoutUser } from './store/user/auth.actions';
import { getCurrentTimestamp } from './functions/utils.functions';
import { getAccessTokenUsingRefreshToken, isToken } from './functions/cognito.functions';
import { first } from 'rxjs/operators';

function App() {
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch()
  const [cookies, setCookie, removeCookie] = useCookies(['gushkinTokens']);

  if (!authState.isLoggedIn && cookies.gushkinTokens && cookies.gushkinTokens.accessToken) {
    console.log(authState, cookies)
    const currTimestamp = getCurrentTimestamp();
    if (cookies.gushkinTokens.expireTime <= currTimestamp) {
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

  const logout = (e: any) => {
    removeCookie('gushkinTokens')
    dispatch(logoutUser())
    e.preventDefault();
  }

  return (
    <div className={classes.App}>
      <>
        <BrowserRouter>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/main">App</Link></li>
            {
              !authState.isLoggedIn &&
              <li>
                <a href={process.env.REACT_APP_LOGIN_URL}>Login</a>
              </li>
            }
            {
              authState.isLoggedIn &&
              <li>
                <a href="/logout" onClick={logout}>Logout</a>
              </li>
            }
          </ul>
          {authState.user && <p>Welcome {authState.user?.email}</p>}
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
      </>
    </div>
  );
}

export default App;
