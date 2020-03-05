import React from 'react';
import classes from './Main.module.scss';
import WishItem from './wish-item/WishItem';
import Activities from './activities/Activities';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsFundsLoaded, selectFunds } from '../../store/funds/funds.selectors';
import { useCookies } from 'react-cookie';
import { getCurrentFunds } from '../../store/funds/funds.actions';
import { displayNormalMoney } from '../../functions/utils.functions';

function Main() {
  const isActivitiesLoaded = useSelector(selectIsFundsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const funds = useSelector(selectFunds);
  const dispatch = useDispatch();

  if (!isActivitiesLoaded) {
    dispatch(getCurrentFunds(cookies.gushkinTokens.accessToken))
  }

  return (
    <div className={classes.Main}>
      <h2>Main</h2>
      <p>Funds: ${displayNormalMoney(funds)}</p>
      <WishItem />
      <Activities />
    </div>
  );
}

export default Main;
