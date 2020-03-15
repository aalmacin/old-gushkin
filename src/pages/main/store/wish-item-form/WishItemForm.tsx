import React, { useState } from "react";
import classes from "./WishItemForm.module.scss";
import { Priority, Status } from "../../../../graphql/graphql.types";
import ErrorList from "../../../error/ErrorList";
import { useDispatch } from "react-redux";
import { createWishItem } from "../../../../store/wish-item/wish-item.actions";
import { MICRO_AMOUNT } from "../../../../functions/global.constants";
import TextField from "../../../../component-lib/TextField/TextField";
import NumberField from "../../../../component-lib/NumberField/NumberField";
import Button, { ButtonType } from "../../../../component-lib/Button/Button";

interface WishItemFormState {
  description: string;
  price: number;
  source?: string;
  priority: Priority;
  status: Status;
}
function WishItemForm() {
  const [wishItem, setWishItem] = useState<WishItemFormState>({
    description: "",
    price: 0,
    source: "",
    priority: Priority.VERY_HIGH,
    status: Status.not_bought
  });

  const [errors, setErrors] = useState<string[]>([]);

  const dispatch = useDispatch();

  const getErrors = () => {
    const errorList = [];

    if (!wishItem.description) {
      errorList.push("Description is required.");
    }

    if (!wishItem.price) {
      errorList.push("Price is required.");
    }

    if (!wishItem.priority) {
      errorList.push("Priority is required.");
    }

    if (!wishItem.status) {
      errorList.push("Status is required.");
    }

    return errorList;
  };

  const updateFormControl = (
    key: "description" | "price" | "source" | "priority" | "status"
  ) => (event: any) => {
    setWishItem({
      ...wishItem,
      [key]: event.target.value
    });
    setErrors(getErrors());
  };

  const submitFormHandler = () => {
    const errorList = getErrors();
    setErrors(errorList);

    if (errorList.length === 0) {
      const price = parseFloat(`${wishItem.price}`) * MICRO_AMOUNT;
      dispatch(
        createWishItem({
          ...wishItem,
          price
        })
      );
    }
  };

  const priorityOptions = [
    {
      value: Priority.VERY_HIGH,
      desc: "Very High"
    },
    {
      value: Priority.HIGH,
      desc: "High"
    },
    {
      value: Priority.MEDIUM,
      desc: "Medium"
    },
    {
      value: Priority.LOW,
      desc: "Low"
    },
    {
      value: Priority.VERY_LOW,
      desc: "Very Low"
    }
  ];

  const statusOptions = [
    {
      value: Status.not_bought,
      desc: "Not bought"
    },
    {
      value: Status.bought,
      desc: "Bought"
    },
    {
      value: Status.disabled,
      desc: "Disabled"
    }
  ];

  return (
    <div className={classes.WishItemForm}>
      <ErrorList errors={errors} />
      <form onSubmit={e => e.preventDefault()}>
        <div>
          <TextField
            label="Description"
            value={wishItem.description}
            onChange={updateFormControl("description")}
          />
        </div>
        <div>
          <NumberField
            label="Price"
            value={wishItem.price}
            onChange={updateFormControl("price")}
          />
        </div>
        <div>
          <TextField
            label="Source"
            value={wishItem.source}
            onChange={updateFormControl("source")}
          />
        </div>
        <div>
          <label>Priority</label>
          <select
            onChange={updateFormControl("priority")}
            value={wishItem.priority}
          >
            {priorityOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select
            onChange={updateFormControl("status")}
            value={wishItem.status}
          >
            {statusOptions.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.desc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Button
            buttonType={ButtonType.primary}
            clickHandler={submitFormHandler}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default WishItemForm;
