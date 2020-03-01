import { put, takeLatest, select, all } from 'redux-saga/effects'
import { getAllWishItems } from '../../graphql/queries.functions';
import { selectUserId } from '../auth/auth.selectors';
import { getWishItemsSuccess, getWishItemsFailure, GET_WISH_ITEMS, CREATE_WISH_ITEM, createWishItemFailure, createWishItemSuccess } from './wish-item.actions';
import { createWishItem } from '../../graphql/mutations.functions';

function* getWishItemsSaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const wishItemResult = yield getAllWishItems(
      action.payload,
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
    const userId = yield select(selectUserId);
    const result = yield createWishItem({ ...action.payload, userId })

    if (result.success) {
      const wishItemResult = yield getAllWishItems(
        action.payload.accessToken,
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


function* watchWishItems() {
  yield all([takeLatest(GET_WISH_ITEMS, getWishItemsSaga), takeLatest(CREATE_WISH_ITEM, createWishItemSaga)])
}

export default watchWishItems;