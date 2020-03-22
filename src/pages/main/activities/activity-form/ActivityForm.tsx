import React, { useState } from "react";
import classes from "./ActivityForm.module.scss";
import ErrorList from "../../../error/ErrorList";
import { useDispatch, useSelector } from "react-redux";
import { createActivity } from "../../../../store/activity/activity.actions";
import { MICRO_AMOUNT } from "../../../../functions/global.constants";
import Button, { ButtonType } from "../../../../component-lib/Button/Button";
import TextField from "../../../../component-lib/TextField/TextField";
import NumberField from "../../../../component-lib/NumberField/NumberField";
import FormClose from "../../shared/FormClose/FormClose";
import { selectIsActivitiesActionLoading } from "../../../../store/activity/activity.selectors";
import Loading from "../../../../component-lib/Loading/Loading";

interface ActivityFormState {
  description: string;
  fundAmt: number;
  positive: boolean;
}

interface ActivityFormProps {
  closeHandler: () => void;
}

const ActivityForm: React.FC<ActivityFormProps> = ({ closeHandler }) => {
  const initialFormState = {
    description: "",
    fundAmt: 0,
    positive: true
  }
  const [activity, setActivity] = useState<ActivityFormState>(initialFormState);

  const [errors, setErrors] = useState<string[]>([]);

  const isActivitesActionLoading = useSelector(selectIsActivitiesActionLoading);

  const dispatch = useDispatch();

  const getErrors = () => {
    const errorList = [];

    if (!activity.description) {
      errorList.push("Description is required.");
    }

    if (!activity.fundAmt) {
      errorList.push("Price is required.");
    }

    return errorList;
  };

  const updateFormControl = (key: "description" | "fundAmt") => (
    event: any
  ) => {
    setActivity({
      ...activity,
      [key]: event.target.value
    });
    setErrors(getErrors());
  };

  const updatePositive = () => {
    setActivity({
      ...activity,
      positive: !activity.positive
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const fundAmt = parseFloat(`${activity.fundAmt}`) * MICRO_AMOUNT;
      dispatch(
        createActivity({
          ...activity,
          fundAmt
        })
      );

      setActivity({ ...initialFormState });
    }
  };

  return (
    <div className={classes.ActivityForm}>
      <ErrorList errors={errors} />
      <div className={classes.FormContainer}>
        <FormClose onClose={closeHandler} />
        {isActivitesActionLoading ? <Loading /> : <form
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className={classes.FormGroup}>
            <TextField
              label="Description"
              value={activity.description}
              onChange={updateFormControl("description")}
            />
          </div>
          <div className={classes.FormGroup}>
            <NumberField
              label="Fund Amount"
              value={activity.fundAmt}
              onChange={updateFormControl("fundAmt")}
            />
          </div>
          <div className={classes.FormGroup}>
            <label>Positive</label>
            <input
              type="checkbox"
              checked={activity.positive}
              onChange={updatePositive}
            />
          </div>
          <div className={classes.ButtonContainer}>
            <Button
              buttonType={ButtonType.primary}
              clickHandler={submitFormHandler}
            >
              Submit
            </Button>
          </div>
        </form>
        }
      </div>
    </div>
  );
};

export default ActivityForm;
