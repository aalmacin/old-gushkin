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
  faStore
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
          <h2>
            <span className={classes.Icon}>
              <FontAwesomeIcon icon={faStore} />
            </span>{" "}
            Store
          </h2>
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
              <h2>Bought</h2>
              {storeArchiveItems.map(wishItem => (
                <p key={wishItem.id}>{wishItem.description}</p>
              ))}
            </div>
          </>
        ) : (
          <Loading isLoading />
        )}
      </div>
      <div className={classes.Cart}>
        <h2>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
        </h2>
        {cartItems.map(item => (
          <div key={item.id} className={classes.CartItem}>
            {item.description} {item.id}
            <span className={classes.Dot}></span> $
            {displayNormalMoney(item.price)}
          </div>
        ))}
        <p>Cart Total: ${displayNormalMoney(cartTotal)}</p>
        <div>
          <Button buttonType={ButtonType.primary} clickHandler={checkout}>
            Checkout
          </Button>
        </div>
        <h3>Your Funds</h3>
        <p>
          <Funds />
        </p>
      </div>
    </div>
  );
}

export default Store;
