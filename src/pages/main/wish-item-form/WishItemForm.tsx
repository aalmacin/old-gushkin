import React, { useState } from 'react';
import classes from './WishItemForm.module.scss';
import { Priority, Status } from '../../../graphql/graphql.types';
import ErrorList from '../../error/ErrorList';
import { useDispatch } from 'react-redux';
import { createWishItem } from '../../../store/wish-item/wish-item.actions';
import { useCookies } from 'react-cookie';

function WishItemForm() {
  const [wishItem, setWishItem] = useState<{ description: string, price: number, source?: string, priority: Priority, status: Status }>({
    description: '',
    price: 0,
    source: '',
    priority: Priority.VERY_HIGH,
    status: Status.not_bought,
  })

  const [errors, setErrors] = useState<string[]>([]);
  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const getErrors = () => {
    const errorList = [];

    if (!wishItem.description) {
      errorList.push('Description is required.')
    }

    if (!wishItem.price) {
      errorList.push('Price is required.')
    }

    if (!wishItem.priority) {
      errorList.push('Priority is required.')
    }

    if (!wishItem.status) {
      errorList.push('Status is required.')
    }

    return errorList;
  }

  const updateFormControl = (key: 'description' | 'price' | 'source' | 'priority' | 'status') => (event: any) => {
    setWishItem({
      ...wishItem,
      [key]: event.target.value
    })
    setErrors(getErrors())
  }

  const submitFormHandler = (event: any) => {
    const errorList = getErrors();
    setErrors(errorList)

    if (errorList.length === 0) {
      dispatch(createWishItem({ ...wishItem, accessToken: cookies.gushkinTokens.accessToken }))
    }
    event.preventDefault();
  }

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
    },
  ]

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
    },
  ]

  return (
    <div className={classes.WishItemForm}>
      <ErrorList errors={errors} />
      <form onSubmit={submitFormHandler}>
        <div>
          <label>Description</label>
          <input value={wishItem.description} onChange={updateFormControl('description')} />
        </div>
        <div>
          <label>Price</label>
          <input value={wishItem.price} type="number" onChange={updateFormControl('price')} />
        </div>
        <div>
          <label>Source</label>
          <textarea value={wishItem.source} onChange={updateFormControl('source')} />
        </div>
        <div>
          <label>Priority</label>
          <select onChange={updateFormControl('priority')} value={wishItem.priority}>
            {
              priorityOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.desc}</option>)
            }
          </select>
        </div>
        <div>
          <label>Status</label>
          <select onChange={updateFormControl('status')} value={wishItem.status}>
            {
              statusOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.desc}</option>)
            }
          </select>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default WishItemForm;
