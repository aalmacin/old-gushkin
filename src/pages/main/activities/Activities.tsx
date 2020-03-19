import React, { useState } from "react";
import classes from "./Activities.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsActivitiesLoaded,
  selectActivities,
  selectActivityActionCount,
  selectIsActivityActionCountLoaded
} from "../../../store/activity/activity.selectors";
import {
  getActivities,
  performActivity,
  getActivityActionCount
} from "../../../store/activity/activity.actions";
import { displayNormalMoney } from "../../../functions/utils.functions";
import ActivityForm from "./activity-form/ActivityForm";
import { Activity as ActivityType } from "../../../graphql/graphql.types";
import {
  faPlus,
  faMinus,
  faRunning,
  faCoins,
  faDollarSign,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonType } from "../../../component-lib/Button/Button";
import Funds from "../shared/Funds";
import {
  selectTotalWishItemPrice,
  selectIsWishItemsLoaded
} from "../../../store/wish-item/wish-item.selectors";
import { getWishItems } from "../../../store/wish-item/wish-item.actions";
import Loading from "../../../component-lib/Loading/Loading";
import Modal from "../../../component-lib/Modal/Modal";
import HeaderIcon from "../shared/HeaderIcon";
import TodaysActivities from "./TodaysActivities/TodaysActivities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Streaks from "./streaks/Streaks";
import { selectIsLoggedIn } from "../../../store/auth/auth.selectors";

function Activity() {
  const isActivitiesLoaded = useSelector(selectIsActivitiesLoaded);
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const dispatch = useDispatch();
  const activities = useSelector(selectActivities);
  const [isShowActivityForm, setShowActivityForm] = useState(false);
  const totalPrice = useSelector(selectTotalWishItemPrice);
  const [isShowStreak, setIsShowStreak] = useState(false);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const activityStreaks = useSelector(selectActivityActionCount)
  const isLoadedActivityStreaks = useSelector(selectIsActivityActionCountLoaded)

  if (!isLoadedActivityStreaks && isLoggedIn) {
    dispatch(getActivityActionCount())
  }

  if (!isActivitiesLoaded && isLoggedIn) {
    dispatch(getActivities());
  }

  if (!isWishItemsLoaded && isLoggedIn) {
    dispatch(getWishItems());
  }

  const addActivity = (activityId: string) => () => {
    dispatch(
      performActivity({
        activityId: parseInt(`${activityId}`)
      })
    );
  };

  const showActivityForm = () => {
    setShowActivityForm(true);
  };

  const closeForm = () => {
    setShowActivityForm(false);
  };

  const toggleIsShowStreaks = () => {
    setIsShowStreak(!isShowStreak);
  }

  const getActivityStreaks = (id: any) => {
    return activityStreaks.find(t => `${t.activityId}` === `${id}`)?.days || []
  }

  return (
    <div className={classes.ActivityPage}>
      <div className={classes.ActivitiesSection}>
        {isShowActivityForm && (
          <Modal>
            <ActivityForm closeHandler={closeForm} />
          </Modal>
        )}
        <div className={classes.Heading}>
          <HeaderIcon icon={faRunning} text="Activities" />
          <div>
            <Button
              clickHandler={showActivityForm}
              buttonType={ButtonType.primary}
              icon={faPlus}
            />
          </div>
        </div>
        <div className={classes.ShowStreakToggle}>
          <div className={classes.StreakToggler} onClick={toggleIsShowStreaks}>{!isShowStreak ? 'Show' : 'Hide'} Streaks {isShowStreak && <span className={classes.Close}><FontAwesomeIcon icon={faTimes} /></span>}</div>
        </div>
        {isActivitiesLoaded ? (
          <ul className={classes.ActivityList}>
            {activities.map((activity: ActivityType) => (
              <li key={activity.id} className={classes.Activity}>
                <div className={classes.ActivityAction}>
                  <Button
                    isSquare
                    buttonType={activity.positive ? ButtonType.secondary : ButtonType.red}
                    clickHandler={addActivity(activity.id)}
                    icon={activity.positive ? faPlus : faMinus}
                  >
                    <span className={classes.ActivityAmt}>
                      $ {displayNormalMoney(activity.fundAmt)}
                    </span>
                  </Button>
                  <span className={classes.ActivityText}>
                    {activity.description}
                  </span>
                </div>
                {isShowStreak && <Streaks activityStreaks={getActivityStreaks(activity.id)} positive={activity.positive} />}
              </li>
            ))}
          </ul>
        ) : (
            <Loading isLoading />
          )}
      </div>
      <div className={classes.ActivityDetailsSection}>
        <div className={classes.Funds}>
          <HeaderIcon icon={faCoins} text="Current Funds" />
          <Funds />
        </div>
        <div className={classes.TotalPrice}>
          <HeaderIcon icon={faDollarSign} text="Total Funds Needed" />

          {isWishItemsLoaded ? (
            <>
              <p className={classes.Description}>
                Total Funds needed to buy all wish items:
              </p>

              <p className={classes.Money}>
                $ {displayNormalMoney(totalPrice)}
              </p>
            </>
          ) : (
              <Loading isLoading />
            )}
        </div>
        <TodaysActivities />
      </div>
    </div>
  );
}

export default Activity;
