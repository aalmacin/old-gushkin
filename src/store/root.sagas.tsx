import { all } from "redux-saga/effects";
import watchUserData from "./auth/auth.sagas";
import watchWishItems from "./wish-item/wish-item.sagas";
import watchActivities from "./activity/activity.sagas";

export default function* rootSaga() {
  yield all([watchUserData(), watchWishItems(), watchActivities()])
}