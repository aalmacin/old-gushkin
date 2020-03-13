import React from "react";
import classes from "./InputField.module.scss";

interface InputFieldProps {
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, children }) => {
  return (
    <div className={classes.InputField}>
      {label && <label>{label}</label>}
      {children}
    </div>
  );
};

export default InputField;
