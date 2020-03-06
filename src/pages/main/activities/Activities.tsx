import React from 'react';
import classes from './Activities.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsActivitiesLoaded, selectActivities } from '../../../store/activity/activity.selectors';
import { useCookies } from 'react-cookie';
import { getActivities, performActivity } from '../../../store/activity/activity.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import ActivityForm from './activity-form/ActivityForm';
import { Activity as ActivityType } from '../../../graphql/graphql.types';

function Activity() {
  const isActivitiesLoaded = useSelector(selectIsActivitiesLoaded);
  const [cookies] = useCookies(['gushkinTokens'])
  const dispatch = useDispatch();
  const activities = useSelector(selectActivities);

  if (!isActivitiesLoaded) {
    dispatch(getActivities(cookies.gushkinTokens.accessToken))
  }

  const addActivity = (activityId: string) => () => {
    dispatch(performActivity({ accessToken: cookies.gushkinTokens.accessToken, activityId: parseInt(`${activityId}`) }))
  }

  return (
    <div className={classes.Activity}>
      <h3>Activities</h3>
      <div>
        {
          activities.map(
            (activity: ActivityType) => <div key={activity.id}>
              <div>
                {activity.description}
              </div>
              <div>
                {displayNormalMoney(activity.fundAmt)}
              </div>
              <div>
                <button onClick={addActivity(activity.id)}>{activity.positive ? '+' : '-'}</button>
              </div>
            </div>
          )
        }
      </div>
      <div>
        <ActivityForm />
      </div>
    </div>
  );
}

export default Activity;
