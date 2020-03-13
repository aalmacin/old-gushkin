import React, { useState } from "react";
import classes from "./Activities.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsActivitiesLoaded,
  selectActivities
} from "../../../store/activity/activity.selectors";
import { useCookies } from "react-cookie";
import {
  getActivities,
  performActivity
} from "../../../store/activity/activity.actions";
import { displayNormalMoney } from "../../../functions/utils.functions";
import ActivityForm from "./activity-form/ActivityForm";
import { Activity as ActivityType } from "../../../graphql/graphql.types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faRunning,
  faListAlt
} from "@fortawesome/free-solid-svg-icons";
import Button, { ButtonType } from "../../../component-lib/Button/Button";
import Funds from "../shared/Funds";
import {
  selectTotalWishItemPrice,
  selectIsWishItemsLoaded
} from "../../../store/wish-item/wish-item.selectors";
import { getWishItems } from "../../../store/wish-item/wish-item.actions";
import { Redirect } from "react-router-dom";
import Loading from "../../../component-lib/Loading/Loading";

function Activity() {
  const isActivitiesLoaded = useSelector(selectIsActivitiesLoaded);
  const isWishItemsLoaded = useSelector(selectIsWishItemsLoaded);
  const [cookies] = useCookies(["gushkinTokens"]);
  const dispatch = useDispatch();
  const activities = useSelector(selectActivities);
  const [isShowActivityForm, setShowActivityForm] = useState(false);
  const totalPrice = useSelector(selectTotalWishItemPrice);

  if (!cookies.gushkinTokens) {
    return <Redirect to="/" />;
  }

  if (!isActivitiesLoaded && cookies.gushkinTokens) {
    dispatch(getActivities(cookies.gushkinTokens.accessToken));
  }

  if (!isWishItemsLoaded && cookies.gushkinTokens) {
    dispatch(getWishItems(cookies.gushkinTokens.accessToken));
  }

  const addActivity = (activityId: string) => () => {
    dispatch(
      performActivity({
        accessToken: cookies.gushkinTokens.accessToken,
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

  return (
    <div className={classes.ActivityPage}>
      <div className={classes.ActivitiesSection}>
        {isShowActivityForm && <ActivityForm closeHandler={closeForm} />}
        <div className={classes.Heading}>
          <h2>
            <FontAwesomeIcon icon={faRunning} /> Activities
          </h2>
          <div>
            <Button
              clickHandler={showActivityForm}
              buttonType={ButtonType.secondary}
              icon={faPlus}
            />
          </div>
        </div>
        {isActivitiesLoaded ? (
          <ul className={classes.ActivityList}>
            {activities.map((activity: ActivityType) => (
              <li key={activity.id} className={classes.Activity}>
                <Button
                  isSquare
                  buttonType={ButtonType.tertiary}
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
              </li>
            ))}
          </ul>
        ) : (
          <Loading isLoading />
        )}
      </div>
      <div className={classes.ActivityDetailsSection}>
        <div className={classes.Funds}>
          <h2>Current Funds</h2>
          <Funds />
        </div>
        <div className={classes.TotalPrice}>
          <h2>Total Funds Needed</h2>

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
        <div className={classes.TodaysActivities}>
          <h2>
            <span className={classes.Icon}>
              <FontAwesomeIcon icon={faListAlt} />
            </span>{" "}
            Today's Activities
          </h2>
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
          <div className={classes.FundChange}>Fund Change: + $20.00</div>
        </div>
      </div>
    </div>
  );
}

export default Activity;
