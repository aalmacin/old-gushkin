import React from 'react';
import classes from './WishItem.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWishItemsLoaded, selectWishItems, selectTotalWishItemPrice } from '../../../store/wish-item/wish-item.selectors';
import { useCookies } from 'react-cookie';
import { getWishItems } from '../../../store/wish-item/wish-item.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import WishItemForm from './wish-item-form/WishItemForm';
import { WishItem as WishItemType } from '../../../graphql/graphql.types';

function WishItem() {
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);
  const totalPrice = useSelector(selectTotalWishItemPrice);

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
      <div>
        <WishItemForm />
      </div>
    </div>
  );
}

export default WishItem;
