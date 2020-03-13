import React from "react";
import classes from "./Modal.module.scss";

const Modal: React.FC = ({ children }) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalContent}>{children}</div>
    </div>
  );
};

export default Modal;
