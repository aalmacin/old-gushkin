import { put, takeLatest, select, all } from 'redux-saga/effects'
import { getAllActivities } from '../../graphql/queries.functions';
import { selectUserId } from '../auth/auth.selectors';
import { getActivitiesSuccess, getActivitiesFailure, GET_ACTIVITIES, CREATE_ACTIVITY, createActivityFailure, createActivitySuccess, performActivityFailure, PERFORM_ACTIVITY, performActivitySuccess } from './activity.actions';
import { createActivity, performActivity } from '../../graphql/mutations.functions';
import { getCurrentFunds } from '../funds/funds.actions';

function* getActivitiesSaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const activityResult = yield getAllActivities(
      action.payload,
      userId
    )
    if (activityResult.success) {
      yield put(getActivitiesSuccess(activityResult.data))
    } else {
      yield put(getActivitiesFailure(activityResult.error))
    }
  } catch (e) {
    yield put(getActivitiesFailure("Something went wrong while getting activities"))
  }
}

function* createActivitySaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const result = yield createActivity({ ...action.payload, userId })

    if (result.success) {
      const activityResult = yield getAllActivities(
        action.payload.accessToken,
        userId
      )
      yield put(createActivitySuccess(activityResult.data))
    } else {
      yield put(createActivityFailure('Something went wrong while creating activity'))
    }
  } catch (e) {
    yield put(createActivityFailure('Something went wrong while creating activity'))
  }
}

function* performActivitySaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const result = yield performActivity({ ...action.payload, userId })

    if (result.success) {
      yield getAllActivities(
        action.payload.accessToken,
        userId
      )
      yield put(performActivitySuccess())
      yield put(getCurrentFunds(action.payload.accessToken))
    } else {
      yield put(performActivityFailure('Something went wrong while performing activity'))
    }
  } catch (e) {
    yield put(performActivityFailure('Something went wrong while performing activity'))
  }
}


function* watchActivities() {
  yield all([
    takeLatest(GET_ACTIVITIES, getActivitiesSaga),
    takeLatest(CREATE_ACTIVITY, createActivitySaga),
    takeLatest(PERFORM_ACTIVITY, performActivitySaga)
  ])
}

export default watchActivities;