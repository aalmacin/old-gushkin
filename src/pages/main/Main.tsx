import React from 'react';
import classes from './Main.module.scss';
import WishItem from './wish-item/WishItem';
import Activities from './activities/Activities';

function Main() {
  return (
    <div className={classes.Main}>
      <h2>Main</h2>
      <WishItem />
      <Activities />
    </div>
  );
}

export default Main;
