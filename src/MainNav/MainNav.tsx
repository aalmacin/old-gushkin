import React from 'react';
import classes from './MainNav.module.scss';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faHome, faStore } from '@fortawesome/free-solid-svg-icons'

function MainNav() {
  return (
    <div className={classes.MainNav}>
      <div className={classes.LogoSection}>
        <div className={classes.Logo}>

        </div>
      </div>
      <ul className={classes.LinkList}>
        <li className={classes.LinkListItem}>
          <Link to="/home">
            <span className={classes.Icon}>
              <FontAwesomeIcon icon={faHome} />
            </span>
            Home</Link></li>
        <li className={classes.LinkListItem}>
          <Link to="/main">
            <span className={classes.Icon}>
              <FontAwesomeIcon icon={faRunning} />
            </span>

            Activities</Link></li>
        <li className={classes.LinkListItem}>
          <Link to="/main/store">
            <span className={classes.Icon}>
              <FontAwesomeIcon icon={faStore} />
            </span>
            Store</Link></li>
      </ul>
      <div className={classes.ProfileSection}>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default MainNav;
