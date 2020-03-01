import React from 'react';
import classes from './Main.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWishItemsLoaded, selectWishItems } from '../../store/wish-item/wish-item.selectors';
import { getWishItems } from '../../store/wish-item/wish-item.actions';
import { useCookies } from 'react-cookie';
import { WishItem } from '../../graphql/graphql.types';
import WishItemForm from './wish-item-form/WishItemForm';
import { MICRO_AMOUNT } from '../../functions/global.constants';

function Main() {
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);

  if (!isWishItemsLoaded) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken))
  }

  return (
    <div className={classes.Main}>
      <h2>Main</h2>
      <div>
        <h3>Wish Items</h3>
        <div>
          {
            wishItems.map(
              (wishItem: WishItem) => <div key={wishItem.id}>
                <div>
                  {wishItem.description}
                </div>
                <div>
                  {wishItem.price / MICRO_AMOUNT}
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
      </div>
      <div>
        <WishItemForm />
      </div>
    </div>
  );
}

export default Main;
