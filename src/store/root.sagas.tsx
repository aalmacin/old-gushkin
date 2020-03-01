import { all } from "redux-saga/effects";
import watchUserData from "./user/auth.sagas";

export default function* rootSaga() {
  yield all([watchUserData()])
}