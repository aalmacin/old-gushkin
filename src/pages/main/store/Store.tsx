import React, { useState } from 'react';
import classes from './Store.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsWishItemsLoaded, selectWishItems } from '../../../store/wish-item/wish-item.selectors';
import { useCookies } from 'react-cookie';
import { getWishItems } from '../../../store/wish-item/wish-item.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import WishItemForm from './wish-item-form/WishItemForm';
import { WishItem as WishItemType } from '../../../graphql/graphql.types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faCartPlus, faStore } from '@fortawesome/free-solid-svg-icons'
import Funds from '../shared/Funds';
import { Redirect } from 'react-router-dom';
import Loading from '../../../component-lib/Loading/Loading';
import Button, { ButtonType } from '../../../component-lib/Button/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function Store() {
  const [isShowForm, setIsShowForm] = useState(false);
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const wishItems = useSelector(selectWishItems);

  if (!cookies.gushkinTokens) {
    return <Redirect to="/" />
  }

  if (!isWishItemsLoaded && cookies.gushkinTokens) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken))
  }

  const showForm = () => {
    setIsShowForm(!isShowForm)
  }

  return (
    <div className={classes.Store}>
      {isShowForm && <WishItemForm />}
      <div className={classes.StoreItemSection}>
        <h2><span className={classes.Icon}><FontAwesomeIcon icon={faStore} /></span> Store</h2>
        <div>
          <Button clickHandler={showForm} buttonType={ButtonType.secondary} icon={faPlus} />
        </div>
        {isWishItemsLoaded ? <div className={classes.StoreItemList}>
          {
            wishItems.map(
              (wishItem: WishItemType) => <div className={classes.WishItem} key={wishItem.id}>
                <div className={classes.Description}>
                  {wishItem.description}
                </div>
                {/* <div className={classes.Source}>
                  {wishItem.source}
                </div> */}
                {/* <div className={classes.Priority}>
                  {wishItem.priority}
                </div>
                <div className={classes.Status}>
                  {wishItem.status}
                </div> */}
                <div className={classes.Price}>
                  $ {displayNormalMoney(wishItem.price)}
                  <div className={classes.AddCart}>
                    <FontAwesomeIcon icon={faCartPlus} />
                  </div>
                </div>
              </div>
            )
          }
        </div>
          : <Loading isLoading />
        }
      </div>
      <div className={classes.Cart}>
        <h2><FontAwesomeIcon icon={faShoppingCart} /> Cart</h2>
        <h3>Your Funds</h3>
        <p><Funds /></p>
      </div>
    </div>
  );
}

export default Store;
