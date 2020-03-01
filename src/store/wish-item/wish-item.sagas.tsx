import { put, takeLatest, select } from 'redux-saga/effects'
import { getAllWishItems } from '../../graphql/queries.functions';
import { selectUserId } from '../auth/auth.selectors';
import { getWishItemsSuccess, getWishItemsFailure, GET_WISH_ITEMS } from './wish-item.actions';

function* getWishItems(action: any) {
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
    yield put(getWishItemsFailure("Something went wrong"))
  }
}


function* watchWishItems() {
  yield takeLatest(GET_WISH_ITEMS, getWishItems);
}

export default watchWishItems;