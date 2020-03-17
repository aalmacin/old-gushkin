import { put, takeLatest, select, all } from 'redux-saga/effects'
import { getAllActivities, getTodaysActivities, getActivityActionCount } from '../../graphql/queries.functions';
import { selectUserId, selectAccessToken } from '../auth/auth.selectors';
import { getActivitiesSuccess, getActivitiesFailure, GET_ACTIVITIES, CREATE_ACTIVITY, createActivityFailure, createActivitySuccess, performActivityFailure, PERFORM_ACTIVITY, performActivitySuccess, getTodaysActivities as todaysActivities, getTodaysActivitiesSuccess, getTodaysActivitiesFailure, GET_TODAYS_ACTIVITIES, GET_ACTIVITY_ACTION_COUNT, getActivityActionCountSuccess, getActivityActionCountFailure } from './activity.actions';
import { createActivity, performActivity } from '../../graphql/mutations.functions';
import { getCurrentFunds } from '../funds/funds.actions';

function* getActivitiesSaga() {
  try {
    const userId = yield select(selectUserId);
    const accessToken = yield select(selectAccessToken);
    const activityResult = yield getAllActivities(
      accessToken,
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

function* getActivityActionCountSaga() {
  try {
    const userId = yield select(selectUserId);
    const accessToken = yield select(selectAccessToken);
    const activityResult = yield getActivityActionCount(
      accessToken,
      userId
    )
    if (activityResult.success) {
      yield put(getActivityActionCountSuccess(activityResult.data))
    } else {
      yield put(getActivityActionCountFailure(activityResult.data))
    }
  } catch (e) {
    yield put(getActivityActionCountFailure("Something went wrong while getting activities"))
  }
}

function* getTodaysActivitiesSaga() {
  try {
    const userId = yield select(selectUserId);
    const accessToken = yield select(selectAccessToken);
    const activityResult = yield getTodaysActivities(
      accessToken,
      userId
    )
    if (activityResult.success) {
      yield put(getTodaysActivitiesSuccess(activityResult.data))
    } else {
      yield put(getTodaysActivitiesFailure(activityResult.error))
    }
  } catch (e) {
    yield put(getActivitiesFailure("Something went wrong while getting activities"))
  }
}

function* createActivitySaga(action: any) {
  try {
    const userId = yield select(selectUserId);
    const accessToken = yield select(selectAccessToken);
    const result = yield createActivity({ accessToken, userId, ...action.payload })

    if (result.success) {
      const activityResult = yield getAllActivities(
        accessToken,
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
    const accessToken = yield select(selectAccessToken);
    const result = yield performActivity({ ...action.payload, accessToken, userId })

    if (result.success) {
      yield getAllActivities(
        accessToken,
        userId
      )
      yield put(performActivitySuccess())
      yield put(getCurrentFunds())
      yield put(todaysActivities())
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
    takeLatest(PERFORM_ACTIVITY, performActivitySaga),
    takeLatest(GET_TODAYS_ACTIVITIES, getTodaysActivitiesSaga),
    takeLatest(GET_ACTIVITY_ACTION_COUNT, getActivityActionCountSaga),
  ])
}

export default watchActivities;