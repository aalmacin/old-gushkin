import React from 'react';
import classes from './Main.module.scss';
import Store from './store/Store';
import Activities from './activities/Activities';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectIsLoadedToken } from '../../store/auth/auth.selectors';
import BoughtItems from './bought-items/BoughtItems';

function Main() {
  const match = useRouteMatch();
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isLoadedToken = useSelector(selectIsLoadedToken)

  if (isLoadedToken && !isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.Main}>
      <Switch>
        <Route path={`${match.path}/store`}>
          <Store />
        </Route>
        <Route path={`${match.path}/history`}>
          <BoughtItems />
        </Route>
        <Route path={`${match.path}`}>
          <Activities />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
