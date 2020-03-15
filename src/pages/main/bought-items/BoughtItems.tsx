import React from "react";
import classes from "./BoughtItems.module.scss";
import {
  faShoppingBag
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { selectStoreArchiveItems, selectIsWishItemsLoaded } from "../../../store/wish-item/wish-item.selectors";
import HeaderIcon from "../shared/HeaderIcon";
import { displayNormalMoney } from "../../../functions/utils.functions";
import { selectAccessToken } from "../../../store/auth/auth.selectors";
import { getWishItems } from "../../../store/wish-item/wish-item.actions";
import Loading from "../../../component-lib/Loading/Loading";

function BoughtItems() {
  const storeArchiveItems = useSelector(selectStoreArchiveItems);

  const accessToken = useSelector(selectAccessToken);
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const dispatch = useDispatch();

  if (!isWishItemsLoaded && accessToken) {
    dispatch(getWishItems(accessToken));
  }

  return (
    isWishItemsLoaded ?
      <div className={classes.BoughtItems}>
        <HeaderIcon text="Bought Items" icon={faShoppingBag} />
        <div className={classes.ArchiveItemList}>
          <div className={`${classes.ArchiveItem} ${classes.ArchiveItemHeading}`}>
            <p>Description</p>
            <p>Priority</p>
            <p>Price</p>
          </div>

          {storeArchiveItems.map(wishItem => (
            <div key={wishItem.id} className={classes.ArchiveItem}>
              <p>{wishItem.description}</p>
              <p>{wishItem.priority}</p>
              <p>${displayNormalMoney(wishItem.price)}</p>
            </div>
          ))}
        </div>
      </div>
      :
      <Loading />
  )
}

export default BoughtItems;
