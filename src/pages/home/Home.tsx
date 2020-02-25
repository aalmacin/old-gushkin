import React from 'react';
import classes from './Home.module.scss';
import { UserContext } from '../../App';

function Home() {
  return (
    <div className={classes.Home}>
      <h2>Home</h2>
      <UserContext.Consumer>
        {({ user, isLoggedIn }) => <div>
          <p>{isLoggedIn ? 'Logged in' : 'Not logged in'}</p>
          <p>Welcome {user && user.email}!</p>
        </div>}
      </UserContext.Consumer>
    </div>
  );
}

export default Home;
