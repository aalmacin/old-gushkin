import React from 'react';
import classes from './WishItem.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWishItemsLoaded, selectWishItems, selectTotalWishItemPrice } from '../../../store/wish-item/wish-item.selectors';
import { useCookies } from 'react-cookie';
import { getWishItems } from '../../../store/wish-item/wish-item.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import WishItemForm from './wish-item-form/WishItemForm';
import { WishItem as WishItemType } from '../../../graphql/graphql.types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCoins } from '@fortawesome/free-solid-svg-icons'
import Button, { ButtonType } from '../../../component-lib/Button/Button';
import { selectFunds } from '../../../store/funds/funds.selectors';

function WishItem() {
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);
  const totalPrice = useSelector(selectTotalWishItemPrice);
  const funds = useSelector(selectFunds);

  if (!isWishItemsLoaded) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken))
  }

  return (
    <div className={classes.WishItem}>
      <h3>Wish Items</h3>
      <div>
        {
          wishItems.map(
            (wishItem: WishItemType) => <div key={wishItem.id}>
              <div>
                {wishItem.description}
              </div>
              <div>
                {displayNormalMoney(wishItem.price)}
              </div>
              <div>
                {wishItem.source}
              </div>
              <div>
                {wishItem.priority}
              </div>
              <div>
                {wishItem.status}
              </div>
            </div>
          )
        }
      </div>
      <div>
        {displayNormalMoney(totalPrice)}
      </div>
      <div className={classes.Cart}>
        <h2><FontAwesomeIcon icon={faShoppingCart} /> Cart</h2>
        <p>Funds: <Button clickHandler={() => { }} icon={faCoins} buttonType={ButtonType.gold}>${displayNormalMoney(funds)}</Button></p>
      </div>
      <div>
        <WishItemForm />
      </div>
    </div>
  );
}

export default WishItem;
