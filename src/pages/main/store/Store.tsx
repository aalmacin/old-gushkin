import React from 'react';
import classes from './Store.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWishItemsLoaded, selectWishItems } from '../../../store/wish-item/wish-item.selectors';
import { useCookies } from 'react-cookie';
import { getWishItems } from '../../../store/wish-item/wish-item.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import WishItemForm from './wish-item-form/WishItemForm';
import { WishItem as WishItemType } from '../../../graphql/graphql.types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Funds from '../shared/Funds';

function Store() {
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);

  if (!isWishItemsLoaded && cookies.gushkinTokens) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken))
  }

  return (
    <div className={classes.Store}>
      <WishItemForm />
      <div className={classes.StoreItemList}>
        <h2>Wish Items</h2>
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
      <div className={classes.Cart}>
        <h2><FontAwesomeIcon icon={faShoppingCart} /> Cart</h2>
        <p>Funds: <Funds /></p>
      </div>
    </div>
  );
}

export default Store;
