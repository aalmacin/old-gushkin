import React from 'react';
import classes from './App.module.scss';
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from './store/auth/auth.selectors';
import { getUserData } from './store/auth/auth.actions';
import MainNav from './MainNav/MainNav';
import useAccessToken from './hooks/useAccessToken';


function App() {
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch()

  const accessToken = useAccessToken();

  if (!authState.isLoggedIn && accessToken) {
    dispatch(getUserData(accessToken))
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
