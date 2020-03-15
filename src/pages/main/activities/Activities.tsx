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
import {
  faPlus,
  faMinus,
  faRunning,
  faCoins,
  faDollarSign
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
import Modal from "../../../component-lib/Modal/Modal";
import HeaderIcon from "../shared/HeaderIcon";
import TodaysActivities from "./TodaysActivities/TodaysActivities";

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
        {isActivitiesLoaded ? (
          <ul className={classes.ActivityList}>
            {activities.map((activity: ActivityType) => (
              <li key={activity.id} className={classes.Activity}>
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
