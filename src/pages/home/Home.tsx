import React from 'react';
import classes from './Home.module.scss';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/auth/auth.selectors';

function Home() {
  const authData = useSelector(selectAuth)

  return (
    <div className={classes.Home}>
      <h2>Home</h2>
      <p>{authData.isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
    </div>
  )
}

export default Home;
