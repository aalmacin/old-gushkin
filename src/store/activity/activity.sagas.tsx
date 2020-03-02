import { put, takeLatest, select, all } from 'redux-saga/effects'
import { getAllActivities } from '../../graphql/queries.functions';
import { selectUserId } from '../auth/auth.selectors';
import { getActivitiesSuccess, getActivitiesFailure, GET_ACTIVITIES, CREATE_ACTIVITY, createActivityFailure, createActivitySuccess } from './activity.actions';
import { createActivity } from '../../graphql/mutations.functions';

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


function* watchActivities() {
  yield all([takeLatest(GET_ACTIVITIES, getActivitiesSaga), takeLatest(CREATE_ACTIVITY, createActivitySaga)])
}

export default watchActivities;