import React from 'react';
import classes from './Home.module.scss';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../store/user/auth.selectors';
// import { UserContext } from '../../App';

function Home() {
  const authData = useSelector(selectAuth)

  return (
    <div className={classes.Home}>
      <h2>Home</h2>
      <p>{authData.isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
      <p>Welcome {authData.user && authData.user.email}!</p>
    </div>
  )
}

export default Home;
