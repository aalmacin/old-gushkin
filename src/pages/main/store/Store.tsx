import React, { useState } from "react";
import classes from "./Store.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsWishItemsLoaded,
  selectStoreItems,
  selectStoreArchiveItems
} from "../../../store/wish-item/wish-item.selectors";
import { useCookies } from "react-cookie";
import { getWishItems } from "../../../store/wish-item/wish-item.actions";
import { displayNormalMoney } from "../../../functions/utils.functions";
import WishItemForm from "./wish-item-form/WishItemForm";
import {
  WishItem as WishItemType,
  WishItem
} from "../../../graphql/graphql.types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCartPlus,
  faMinus,
  faStore,
  faCoins,
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import Funds from "../shared/Funds";
import { Redirect } from "react-router-dom";
import Loading from "../../../component-lib/Loading/Loading";
import Button, { ButtonType } from "../../../component-lib/Button/Button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  addItemToCart,
  removeItemFromCart,
  checkoutCart
} from "../../../store/cart/cart.actions";
import {
  selectCart,
  selectGetCartTotal
} from "../../../store/cart/cart.selectors";
import useAccessToken from "../../../hooks/useAccessToken";
import Modal from "../../../component-lib/Modal/Modal";
import FormClose from "../shared/FormClose/FormClose";
import HeaderIcon from "../shared/HeaderIcon";

function Store() {
  const [isShowForm, setIsShowForm] = useState(false);
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(["gushkinTokens"]);
  const dispatch = useDispatch();
  const storeItems = useSelector(selectStoreItems);
  const storeArchiveItems = useSelector(selectStoreArchiveItems);
  const cartItems = useSelector(selectCart);
  const cartTotal = useSelector(selectGetCartTotal);
  const accessToken = useAccessToken();

  if (!cookies.gushkinTokens) {
    return <Redirect to="/" />;
  }

  if (!isWishItemsLoaded && cookies.gushkinTokens) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken));
  }

  const isItemInCart = (item: WishItem) =>
    cartItems.find(cartItem => cartItem.id === item.id);

  const showForm = () => {
    setIsShowForm(!isShowForm);
  };

  const addToCart = (wishItem: WishItem) => () => {
    dispatch(addItemToCart(wishItem));
  };

  const removeFromCart = (wishItem: WishItem) => () => {
    dispatch(removeItemFromCart(wishItem.id));
  };

  const checkout = () => {
    if (accessToken) {
      dispatch(checkoutCart(accessToken));
    }
  };

  const closeHandler = () => {
    setIsShowForm(false);
  };

  return (
    <div className={classes.Store}>
      {isShowForm && (
        <Modal>
          <FormClose onClose={closeHandler} />
          <WishItemForm />
        </Modal>
      )}
      <div className={classes.StoreItemSection}>
        <div className={classes.Head}>
          <HeaderIcon text="Store" icon={faStore} />
          <div className={classes.ButtonContainer}>
            <Button
              clickHandler={showForm}
              buttonType={ButtonType.secondary}
              icon={faPlus}
            />
          </div>
        </div>
        {isWishItemsLoaded ? (
          <>
            <div className={classes.StoreItemList}>
              {storeItems.map((wishItem: WishItemType) => (
                <div
                  className={classes.WishItem}
                  key={wishItem.id}
                  onClick={
                    isItemInCart(wishItem)
                      ? removeFromCart(wishItem)
                      : addToCart(wishItem)
                  }
                >
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
                    {!isItemInCart(wishItem) ? (
                      <div className={classes.AddCart}>
                        <FontAwesomeIcon icon={faCartPlus} />
                      </div>
                    ) : (
                        <div className={classes.AddedCart}>
                          <FontAwesomeIcon icon={faMinus} />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <HeaderIcon text="Your Funds" icon={faShoppingBag} />
              {storeArchiveItems.map(wishItem => (
                <p key={wishItem.id}>{wishItem.description}</p>
              ))}
            </div>
          </>
        ) : (
            <Loading isLoading />
          )}
      </div>
      <div className={classes.SideBar}>
        <div className={classes.Cart}>
          <HeaderIcon text="Cart" icon={faShoppingCart} />
          {cartItems.map(item => (
            <div key={item.id} className={classes.CartItem}>
              <span className={classes.Description}>{item.description}</span>
              <span className={classes.Dot}></span> $
              <span className={classes.Price}>{displayNormalMoney(item.price)}</span>
            </div>
          ))}
        </div>
        <div className={classes.CartTotal}>
          <p>Cart Total: ${displayNormalMoney(cartTotal)}</p>
          <Button buttonType={ButtonType.primary} clickHandler={checkout}>
            Checkout
          </Button>
        </div>
        <div className={classes.CurrentFunds}>
          <HeaderIcon text="Your Funds" icon={faCoins} />
          <Funds />
        </div>
      </div>
    </div>
  );
}

export default Store;
