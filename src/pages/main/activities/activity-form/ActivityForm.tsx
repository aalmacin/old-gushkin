import React, { useState } from 'react';
import classes from './ActivityForm.module.scss';
import { Priority, Status } from '../../../../graphql/graphql.types';
import ErrorList from '../../../error/ErrorList';
import { useDispatch } from 'react-redux';
import { createActivity } from '../../../../store/activity/activity.actions';
import { useCookies } from 'react-cookie';
import { MICRO_AMOUNT } from '../../../../functions/global.constants'

function ActivityForm() {
  const [wishItem, setActivity] = useState<{ description: string, fundAmt: number, source?: string, priority: Priority, status: Status }>({
    description: '',
    fundAmt: 0,
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

    if (!wishItem.fundAmt) {
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

  const updateFormControl = (key: 'description' | 'fundAmt' | 'source' | 'priority' | 'status') => (event: any) => {
    setActivity({
      ...wishItem,
      [key]: event.target.value
    })
    setErrors(getErrors())
  }

  const submitFormHandler = (event: any) => {
    const errorList = getErrors();
    setErrors(errorList)

    if (errorList.length === 0) {
      const fundAmt = parseFloat(`${wishItem.fundAmt}`) * MICRO_AMOUNT
      dispatch(createActivity({ ...wishItem, fundAmt, accessToken: cookies.gushkinTokens.accessToken }))
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
    <div className={classes.ActivityForm}>
      <ErrorList errors={errors} />
      <form onSubmit={submitFormHandler}>
        <div>
          <label>Description</label>
          <input value={wishItem.description} onChange={updateFormControl('description')} />
        </div>
        <div>
          <label>Price</label>
          <input value={wishItem.fundAmt} type="number" onChange={updateFormControl('fundAmt')} />
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

export default ActivityForm;
