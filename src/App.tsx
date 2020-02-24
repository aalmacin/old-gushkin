import React, { createContext } from 'react';
import classes from './App.module.scss';
import {
  BrowserRouter, Switch, Route,
} from "react-router-dom";
import Main from './pages/main/Main';
import Home from './pages/home/Home';
import Callback from './pages/callback/Callback';

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
  return (
    <div className={classes.App}>
      <UserContext.Consumer>
        {({ user }) =>
          <>
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
          </>
        }
      </UserContext.Consumer>
    </div >
  );
}

export default App;
