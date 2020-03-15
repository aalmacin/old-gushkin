import React from "react";
import classes from "./Streaks.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface StreaksProps {
  activity: { positive: boolean }
}

const Streaks: React.FC<StreaksProps> = ({ activity }) => {

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
        <div className={classes.Icon}>
          <span className={classes.Left}><FontAwesomeIcon icon={faChevronLeft} /></span>
          <span className={classes.Right}><FontAwesomeIcon icon={faChevronRight} /></span>
        </div>
      </div>
      <div className={`${classes.DayCount} ${getActivityClass(5, activity.positive)}`}><span className={classes.Count}>5</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(0, activity.positive)}`}><span className={classes.Count}>0</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(5, activity.positive)}`}><span className={classes.Count}>5</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(5, activity.positive)}`}><span className={classes.Count}>5</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(5, activity.positive)}`}><span className={classes.Count}>5</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(0, activity.positive)}`}><span className={classes.Count}>0</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(0, activity.positive)}`}><span className={classes.Count}>0</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(5, activity.positive)}`}><span className={classes.Count}>5</span></div>
      <div className={`${classes.DayCount} ${getActivityClass(0, activity.positive)}`}><span className={classes.Count}>0</span></div>
      <div className={`${classes.DayCount} ${classes.Today} ${getActivityClass(5, activity.positive)}`}>
        <span className={classes.Count}>5</span>
      </div>
    </div>
  )
}

export default Streaks;
