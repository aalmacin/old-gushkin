import React from "react";
import classes from "./TodaysActivities.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsTodaysActivitiesLoaded, selectTodaysActivities, selectTodaysActivitiesFundChange
} from "../../../../store/activity/activity.selectors";
import { useCookies } from "react-cookie";
import HeaderIcon from "../../shared/HeaderIcon";
import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { getTodaysActivities } from "../../../../store/activity/activity.actions";
import { displayNormalMoney, convertEpochToHour, getNumberFromMicroAmount } from "../../../../functions/utils.functions";
import Loading from "../../../../component-lib/Loading/Loading";

function TodaysActivities() {
  const isTodaysActivitiesLoaded = useSelector(selectIsTodaysActivitiesLoaded);
  const totalFundChanges = useSelector(selectTodaysActivitiesFundChange);
  const todaysActivities = useSelector(selectTodaysActivities);

  const dispatch = useDispatch();
  const [cookies] = useCookies(["gushkinTokens"]);

  if (!isTodaysActivitiesLoaded && cookies.gushkinTokens) {
    dispatch(getTodaysActivities(cookies.gushkinTokens.accessToken));
  }

  if (!isTodaysActivitiesLoaded) {
    return <Loading />
  }

  return (
    <div className={classes.TodaysActivities}>
      <HeaderIcon icon={faListAlt} text="Today's Activities" />

      <ul className={classes.ActivityHistoryList}>
        <li className={`${classes.ActivityHistoryItem} ${classes.ActivityHistoryHeading}`}>
          <span>Time</span>
          <span>Activity</span>
          <span className={classes.Value}>Amount</span>
        </li>
        {todaysActivities.map(todayActivity =>
          <li key={todayActivity.timestamp} className={classes.ActivityHistoryItem}>
            <span className={classes.Time}>{convertEpochToHour(todayActivity.timestamp)}</span>
            <span>{todayActivity.description}</span>
            <span className={`${classes.Value} ${todayActivity.positive ? classes.PositiveVal : classes.NegativeVal}`}>{`${todayActivity.positive ? '+' : '-'} $${displayNormalMoney(todayActivity.fundAmt)}`}</span>
          </li>
        )}
      </ul>
      <div className={classes.FundChange}>
        <span>Fund Change: </span>
        <span className={getNumberFromMicroAmount(totalFundChanges) > 0 ? classes.PositiveVal : classes.NegativeVal}>${displayNormalMoney(totalFundChanges)}</span>
      </div>
    </div>
  );
}

export default TodaysActivities;
