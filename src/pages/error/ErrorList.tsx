import React from 'react';
import classes from './ErrorList.module.scss';

interface ErrorListProps {
  errors: string[]
}

function ErrorList({ errors }: ErrorListProps) {
  return (
    <div className={classes.ErrorList}>
      {errors.map(err => <p key={err}>{err}</p>)}
    </div>
  )
}

export default ErrorList;
