import { all } from "redux-saga/effects";
import watchUserData from "./auth/auth.sagas";

export default function* rootSaga() {
  yield all([watchUserData()])
}