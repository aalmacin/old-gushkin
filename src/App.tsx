import React from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';

function App() {
  return (
    <div className={classes.App}>
      <div>
        <a href={process.env.REACT_APP_LOGIN_URL}>Click to Login</a>
      </div>
      <BrowserRouter>
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
