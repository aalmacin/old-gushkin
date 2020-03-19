import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectIsFundsLoaded,
  selectFunds
} from "../../../../store/funds/funds.selectors";
import { getCurrentFunds } from "../../../../store/funds/funds.actions";
import Button, { ButtonType } from "../../../../component-lib/Button/Button";
import { displayNormalMoney } from "../../../../functions/utils.functions";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../../component-lib/Loading/Loading";
import { selectIsLoggedIn } from "../../../../store/auth/auth.selectors";

function Funds() {
  const dispatch = useDispatch();
  const isFundsLoaded = useSelector(selectIsFundsLoaded);
  const funds = useSelector(selectFunds);
  const isLoggedIn = useSelector(selectIsLoggedIn)

  if (!isFundsLoaded && isLoggedIn) {
    dispatch(getCurrentFunds());
  }

  return isFundsLoaded ? (
    <Button clickHandler={() => { }} icon={faCoins} buttonType={ButtonType.gold}>
      {" "}
      ${displayNormalMoney(funds)}
    </Button>
  ) : (
      <Loading isLoading />
    );
}

export default Funds;
