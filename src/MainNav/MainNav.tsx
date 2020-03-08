import React from 'react';
import classes from './MainNav.module.scss';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

function MainNav() {
  return (
    <div className={classes.MainNav}>
      <div className={classes.LogoSection}>
        <div className={classes.Logo}>

        </div>
      </div>
      <ul className={classes.LinkList}>
        <li className={classes.LinkListItem}><Link to="/home">Home</Link></li>
        <li className={classes.LinkListItem}><Link to="/main">Activities</Link></li>
        <li className={classes.LinkListItem}><Link to="/main/store">Store</Link></li>
      </ul>
      <div className={classes.ProfileSection}>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default MainNav;
