import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsFundsLoaded, selectFunds } from '../../../store/funds/funds.selectors';
import { useCookies } from 'react-cookie';
import { getCurrentFunds } from '../../../store/funds/funds.actions';
import Button, { ButtonType } from '../../../component-lib/Button/Button';
import { displayNormalMoney } from '../../../functions/utils.functions';
import { faCoins } from '@fortawesome/free-solid-svg-icons'

function Funds() {
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const isFundsLoaded = useSelector(selectIsFundsLoaded);
  const funds = useSelector(selectFunds);
  if (!isFundsLoaded && cookies.gushkinTokens) {
    dispatch(getCurrentFunds(cookies.gushkinTokens.accessToken))
  }

  return <Button clickHandler={() => { }} icon={faCoins} buttonType={ButtonType.gold}>${displayNormalMoney(funds)}</Button>
}

export default Funds;