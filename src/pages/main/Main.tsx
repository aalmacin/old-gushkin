import React from 'react';
import classes from './Main.module.scss';
import Store from './store/Store';
import Activities from './activities/Activities';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import useAccessToken from '../../hooks/useAccessToken';

function Main() {
  const match = useRouteMatch();

  const accessToken = useAccessToken();

  if (!accessToken) {
    return <Redirect to='/' />
  }
  return (
    <div className={classes.Main}>
      <Switch>
        <Route path={`${match.path}/store`}>
          <Store />
        </Route>
        <Route path={`${match.path}`}>
          <Activities />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
