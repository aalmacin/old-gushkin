import React from 'react';
import classes from './Activities.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsActivitiesLoaded, selectActivities } from '../../../store/activity/activity.selectors';
import { useCookies } from 'react-cookie';
import { getActivities, performActivity } from '../../../store/activity/activity.actions';
import { displayNormalMoney } from '../../../functions/utils.functions';
import ActivityForm from './activity-form/ActivityForm';
import { Activity as ActivityType } from '../../../graphql/graphql.types';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import Button from '../../../component-lib/Button/Button';

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
    <div className={classes.ActivityPage}>
      <div className={classes.ActivitiesSection}>
        <h2>Activities</h2>
        <ul className={classes.ActivityList}>
          {
            activities.map(
              (activity: ActivityType) => <li key={activity.id} className={classes.Activity}>
                <Button clickHandler={addActivity(activity.id)} icon={activity.positive ? faPlus : faMinus}>
                  <span className={classes.ActivityAmt}>
                    $ {displayNormalMoney(activity.fundAmt)}
                  </span>
                </Button>
                <span className={classes.ActivityText}>{activity.description}</span>
              </li>
            )
          }
        </ul>
        <ActivityForm />
      </div>
      <div className={classes.ActivityHistorySection}>
        <h2>Today's Activities</h2>
        <ul className={classes.ActivityHistoryList}>
          <li className={classes.ActivityHistoryItem}>
            <span>Activity 1</span>
            <span>Mar 6, 2020</span>
            <span>+ $3.00</span>
          </li>
          <li className={classes.ActivityHistoryItem}>
            <span>Activity 1</span>
            <span>Mar 6, 2020</span>
            <span>+ $3.00</span>
          </li>
          <li className={classes.ActivityHistoryItem}>
            <span>Activity 1</span>
            <span>Mar 6, 2020</span>
            <span>+ $3.00</span>
          </li>
          <li className={classes.ActivityHistoryItem}>
            <span>Activity 2</span>
            <span>Mar 6, 2020</span>
            <span>+ $3.00</span>
          </li>
          <li className={classes.ActivityHistoryItem}>
            <span>Activity 4</span>
            <span>Mar 6, 2020</span>
            <span>- $30.00</span>
          </li>
        </ul>
        <div className={classes.FundChange}>
          Fund Change: + $20.00
        </div>
      </div>
    </div >
  );
}

export default Activity;
