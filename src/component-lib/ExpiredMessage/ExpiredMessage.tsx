import React from "react";
import classes from "./ExpiredMessage.module.scss";

interface ExpiredMessageProps {
  isExpired?: boolean
}

const ExpiredMessage: React.FC<ExpiredMessageProps> = ({ isExpired }) => {
  if (!isExpired) {
    return null;
  }
  return (
    isExpired && <div className={classes.ExpiredMessage}>
      <span className={classes.Message}>Your session expired.</span>
      <a href='/'>Click here to refresh</a>
    </div>
  );
}

export default ExpiredMessage;