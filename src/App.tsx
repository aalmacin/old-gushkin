import React from 'react';
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
import MainNav from './MainNav/MainNav';
import { selectIsExpired, selectAccessToken } from './store/tokens/tokens.selectors';
import { refreshAccessToken } from './store/tokens/tokens.actions';

function App() {
  const isExpired = useSelector(selectIsExpired);
  const accessToken = useSelector(selectAccessToken);

  const authState = useSelector(selectAuth);
  const dispatch = useDispatch()
  const [cookies] = useCookies(['gushkinTokens']);

  if (!authState.isLoggedIn && cookies.gushkinTokens.refreshToken) {
    console.log('here 2')
    if (accessToken) {
      console.log('here 3')
      if (!isExpired) {
        console.log('here 4')
        dispatch(getUserData(accessToken))
      } else {
        console.log('here 5')
        dispatch(refreshAccessToken(cookies.gushkinTokens.refreshToken))
      }
    }
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
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
