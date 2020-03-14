import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import classes from "./Loading.module.scss";

interface LoadingProps {
  isLoading?: boolean
}

const Loading: React.FC<LoadingProps> = ({ isLoading = true }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <span className={classes.LoadingContainer}>
      <span className={classes.Loading}>
        <FontAwesomeIcon icon={faSpinner} />
      </span>
    </span>
  );
}

export default Loading;