import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Button.module.scss";

interface ButtonProps {
  clickHandler: () => void,
  icon: any
}

const Button: React.FC<ButtonProps> = ({ clickHandler, icon, children }) => {
  return (
    <button onClick={clickHandler} className={classes.Button}>
      <span className={classes.Icon}>
        {icon && <FontAwesomeIcon icon={icon} />}
      </span>
      {children}
    </button>
  );
}

export default Button;