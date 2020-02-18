import React from 'react';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <div>
        <a href={process.env.REACT_APP_LOGIN_URL}>Click to Login</a>
      </div>
    </div>
  );
}

export default App;
