import React, { useState } from 'react';
import classes from './ActivityForm.module.scss';
import ErrorList from '../../../error/ErrorList';
import { useDispatch } from 'react-redux';
import { createActivity } from '../../../../store/activity/activity.actions';
import { useCookies } from 'react-cookie';
import { MICRO_AMOUNT } from '../../../../functions/global.constants'

interface ActivityFormState {
  description: string,
  fundAmt: number,
  positive: boolean
}

function ActivityForm() {
  const [activity, setActivity] = useState<ActivityFormState>({
    description: '',
    fundAmt: 0,
    positive: true
  })

  const [errors, setErrors] = useState<string[]>([]);
  const [cookies] = useCookies();

  const dispatch = useDispatch();

  const getErrors = () => {
    const errorList = [];

    if (!activity.description) {
      errorList.push('Description is required.')
    }

    if (!activity.fundAmt) {
      errorList.push('Price is required.')
    }

    return errorList;
  }

  const updateFormControl = (key: 'description' | 'fundAmt') => (event: any) => {
    setActivity({
      ...activity,
      [key]: event.target.value
    })
    setErrors(getErrors())
  }

  const updatePositive = () => {
    setActivity({
      ...activity,
      positive: !activity.positive
    })
    setErrors(getErrors())
  }

  const submitFormHandler = (event: any) => {
    const errorList = getErrors();
    setErrors(errorList)

    if (errorList.length === 0) {
      const fundAmt = parseFloat(`${activity.fundAmt}`) * MICRO_AMOUNT
      dispatch(createActivity({ ...activity, fundAmt, accessToken: cookies.gushkinTokens.accessToken }))
    }
    event.preventDefault();
  }

  return (
    <div className={classes.ActivityForm}>
      <ErrorList errors={errors} />
      <form onSubmit={submitFormHandler}>
        <div>
          <label>Description</label>
          <input value={activity.description} onChange={updateFormControl('description')} />
        </div>
        <div>
          <label>Fund Weight</label>
          <input value={activity.fundAmt} type="number" onChange={updateFormControl('fundAmt')} />
        </div>
        <div>
          <label>Positive</label>
          <input type="checkbox" checked={activity.positive} onChange={updatePositive} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ActivityForm;
