import React from "react";
import classes from "./Streaks.module.scss";
import { ActivityActionCount } from "../../../../graphql/graphql.types";


interface StreaksProps {
  readonly positive: boolean,
  activityStreaks: ActivityActionCount[]
}

const Streaks: React.FC<StreaksProps> = ({ positive, activityStreaks }) => {
  const getActivityClass = (count: number, positive: boolean) => {
    if (positive) {
      return count > 0 ? classes.Positive : classes.Negative;
    } else {
      return count > 0 ? classes.Negative : classes.Positive;
    }
  }

  return (
    <div className={classes.ActivityStreak}>
      <div className={classes.StreakMsg}>
        <h3 className={classes.Heading}>Streak</h3>
      </div>
      <div className={classes.StreakList}>
        {
          activityStreaks.map(activityStreak =>
            <div className={classes.StreakListItem} key={activityStreak.day} >
              <span className={classes.Day}>{activityStreak.day}</span>
              <div className={`${classes.DayCount} ${getActivityClass(activityStreak.count, positive)}`}>
                <span className={classes.Count}>{activityStreak.count}</span>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Streaks;
