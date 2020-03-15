import React from 'react';
import classes from './Home.module.scss';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/auth.selectors';

function Home() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return (
    <div className={classes.Home}>
      <h2>Home</h2>
      <p>{isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
    </div>
  )
}

export default Home;
