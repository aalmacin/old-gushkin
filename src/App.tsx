import React from 'react';
import classes from './App.module.scss';
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';
import MainNav from './MainNav/MainNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUserData } from './store/auth/auth.actions';
import { selectIsLoadedToken, selectAccessToken, selectIsLoadedUser } from './store/auth/auth.selectors';
import useAccessTokenRefresh from './hooks/useAccessTokenRefresh';


function App() {
  const isLoadedToken = useSelector(selectIsLoadedToken)
  const isUserLoaded = useSelector(selectIsLoadedUser)
  const accessToken = useSelector(selectAccessToken);

  const dispatch = useDispatch();

  useAccessTokenRefresh();

  if (!isLoadedToken) {
    dispatch(getAccessToken())
  }

  if (!isUserLoaded && accessToken) {
    dispatch(getUserData())
  }

  return (
    <div className={classes.App}>
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
