import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./Button.module.scss";

export enum ButtonType {
  primary = "Primary",
  secondary = "Secondary",
  tertiary = "Tertiary",
  gold = "Gold"
}

interface ButtonProps {
  clickHandler: () => void;
  icon?: any;
  isSquare?: boolean;
  buttonType: ButtonType;
}

const Button: React.FC<ButtonProps> = ({
  clickHandler,
  icon,
  buttonType,
  isSquare,
  children
}) => {
  return (
    <button
      onClick={clickHandler}
      className={`${classes.Button} ${classes[buttonType]} ${isSquare &&
        classes.Square}`}
    >
      <span className={classes.Icon}>
        {icon && <FontAwesomeIcon icon={icon} />}
      </span>
      {icon && children && <span className={classes.IconChildrenMargin}></span>}
      {children && <span className={classes.Children}>{children}</span>}
    </button>
  );
};

export default Button;
