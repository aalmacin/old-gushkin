import React, { createContext, useState } from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter, Switch, Route, Link,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';
import { getUserDataFromAccessToken, isUser, getAccessTokenUsingRefreshToken, isToken } from './functions/cognito.functions';
import { first } from 'rxjs/operators';
import { useCookies } from 'react-cookie';
import { getCurrentTimestamp } from './functions/utils.functions';

export interface User {
  id: string,
  verified: boolean,
  email: string
}

export interface AuthState {
  isLoggedIn: boolean,
  user?: User
}

const defaultAuth: AuthState = { isLoggedIn: false }
export const UserContext = createContext(defaultAuth)

function App() {
  const [cookies, setCookie] = useCookies(['gushkinTokens']);
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false
  });

  const setUserDataFromAccessToken = () => {
    getUserDataFromAccessToken(cookies.gushkinTokens.accessToken).pipe(first()).subscribe(
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

  const currTimestamp = getCurrentTimestamp();
  if (!authState.isLoggedIn && cookies.gushkinTokens && cookies.gushkinTokens.accessToken) {
    if (cookies.gushkinTokens.expireTime <= currTimestamp) {
      const refreshToken = cookies.gushkinTokens.refreshToken;
      getAccessTokenUsingRefreshToken(refreshToken).pipe(first()).subscribe(tokenData => {
        if (isToken(tokenData)) {
          setCookie('gushkinTokens', { ...tokenData, refreshToken, expireTime: currTimestamp + 3600 })
          setUserDataFromAccessToken()
        }
      });
    } else {
      setUserDataFromAccessToken()
    }
  }

  return (
    <div className={classes.App}>
      <UserContext.Provider value={authState}>
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
      </UserContext.Provider>
    </div >
  );
}

export default App;
