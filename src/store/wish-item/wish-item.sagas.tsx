import { put, takeLatest, select, all } from 'redux-saga/effects'
import { getAllWishItems } from '../../graphql/queries.functions';
import { selectUserId, selectAccessToken } from '../auth/auth.selectors';
import { getWishItemsSuccess, getWishItemsFailure, GET_WISH_ITEMS, CREATE_WISH_ITEM, createWishItemFailure, createWishItemSuccess, purchaseWishItemSuccess, purchaseWishItemFailure, PURCHASE_WISH_ITEM, purchaseWishItem } from './wish-item.actions';
import { createWishItem, updateWishItem } from '../../graphql/mutations.functions';
import { Status, WishItem } from '../../graphql/graphql.types';
import { selectCart } from '../cart/cart.selectors';
import { CHECKOUT_CART } from '../cart/cart.actions';

function* getWishItemsSaga() {
  try {
    const accessToken = yield select(selectAccessToken);
    const userId = yield select(selectUserId);
    const wishItemResult = yield getAllWishItems(
      accessToken,
      userId
    )
    if (wishItemResult.success) {
      yield put(getWishItemsSuccess(wishItemResult.data))
    } else {
      yield put(getWishItemsFailure(wishItemResult.error))
    }
  } catch (e) {
    yield put(getWishItemsFailure("Something went wrong while getting wish items"))
  }
}

function* createWishItemSaga(action: any) {
  try {
    const accessToken = yield select(selectAccessToken);
    const userId = yield select(selectUserId);
    const result = yield createWishItem({ ...action.payload, userId })

    if (result.success) {
      const wishItemResult = yield getAllWishItems(
        accessToken,
        userId
      )
      yield put(createWishItemSuccess(wishItemResult.data))
    } else {
      yield put(createWishItemFailure('Something went wrong while creating wish item'))
    }
  } catch (e) {
    yield put(createWishItemFailure('Something went wrong while creating wish item'))
  }
}

function* checkoutCartSaga() {
  const cartItems = yield select(selectCart);
  const nextActions = cartItems.map((cartItem: WishItem) => {
    return put(purchaseWishItem({ id: cartItem.id }))
  })
  yield all(nextActions)
}

function* purchaseWishItemSaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const { id } = action.payload;

    const accessToken = yield select(selectAccessToken);
    const result = yield updateWishItem({
      id,
      accessToken,
      userId,
      status: Status.bought
    })

    if (result.success) {
      const wishItemResult = yield getAllWishItems(
        accessToken,
        userId
      )
      yield put(purchaseWishItemSuccess(wishItemResult.data))
    } else {
      yield put(purchaseWishItemFailure('Something went wrong while purchasing wish item'))
    }
  } catch (e) {
    yield put(purchaseWishItemFailure('Something went wrong while purchasing wish item'))
  }
}


function* watchWishItems() {
  yield all([takeLatest(GET_WISH_ITEMS, getWishItemsSaga), takeLatest(CREATE_WISH_ITEM, createWishItemSaga), takeLatest(PURCHASE_WISH_ITEM, purchaseWishItemSaga), takeLatest(CHECKOUT_CART, checkoutCartSaga)])
}

export default watchWishItems;