import React from "react";
import classes from "./HeaderIcon.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface HeaderIconProps {
  icon: any
  text: string
}

const HeaderIcon: React.FC<HeaderIconProps> = ({ icon, text }) => {
  return (
    <h2 className={classes.HeaderIcon}>
      <span className={classes.Icon}>
        <FontAwesomeIcon icon={icon} />
      </span>
      {text}
    </h2>
  );
};

export default HeaderIcon;
