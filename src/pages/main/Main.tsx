import React from 'react';
import classes from './Main.module.scss';
import WishItem from './wish-item/WishItem';
import Activities from './activities/Activities';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsFundsLoaded, selectFunds } from '../../store/funds/funds.selectors';
import { useCookies } from 'react-cookie';
import { getCurrentFunds } from '../../store/funds/funds.actions';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

function Main() {
  const isActivitiesLoaded = useSelector(selectIsFundsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const funds = useSelector(selectFunds);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  if (!isActivitiesLoaded && cookies.gushkinTokens) {
    dispatch(getCurrentFunds(cookies.gushkinTokens.accessToken))
  }

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
