import React from 'react';
import classes from './Main.module.scss';
import WishItem from './wish-item/WishItem';
import Activities from './activities/Activities';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function Main() {
  const match = useRouteMatch();

  return (
    <div className={classes.Main}>
      <Switch>
        <Route path={`${match.path}/store`}>
          <WishItem />
        </Route>
        <Route path={`${match.path}`}>
          <Activities />
        </Route>
      </Switch>
    </div>
  );
}

export default Main;
