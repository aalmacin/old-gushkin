import React from 'react';
import classes from './Main.module.scss';
import WishItem from './wish-item/WishItem';
import Activities from './activities/Activities';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsFundsLoaded, selectFunds } from '../../store/funds/funds.selectors';
import { useCookies } from 'react-cookie';
import { getCurrentFunds } from '../../store/funds/funds.actions';
import { displayNormalMoney } from '../../functions/utils.functions';
import { Switch, Route, Link, useRouteMatch, Router } from 'react-router-dom';
import MainNav from '../../MainNav/MainNav';

function Main() {
  const isActivitiesLoaded = useSelector(selectIsFundsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const funds = useSelector(selectFunds);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  if (!isActivitiesLoaded) {
    dispatch(getCurrentFunds(cookies.gushkinTokens.accessToken))
  }

  return (
    <div className={classes.Main}>
      <div className={classes.SubNavSection}>
        <h2>Main</h2>
        <p>Funds: ${displayNormalMoney(funds)}</p>
        <ul className={classes.SubNav}>
          <li className={classes.SubNavItem}><Link to={`${match.url}`}>Activities</Link></li>
          <li className={classes.SubNavItem}><Link to={`${match.url}/store`}>Store</Link></li>
        </ul>
      </div>
      <div className={classes.SubPages}>
        <MainNav />
        <Switch>
          <Route path={`${match.path}/store`}>
            <WishItem />
          </Route>
          <Route path={`${match.path}`}>
            <Activities />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Main;
