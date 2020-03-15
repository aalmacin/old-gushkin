import React from 'react';
import classes from './MainNav.module.scss';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

import { faRunning, faHome, faStore } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';
import IconLink from '../component-lib/IconLink/IconLink';
import Logo from './Logo.png'

function MainNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={classes.MainNav}>
      <div className={classes.LogoSection}>
        <div className={classes.Logo}>
          <img src={Logo} alt="Main Gushkin Logo" />
        </div>
      </div>
      <ul className={classes.LinkList}>
        <li className={classes.LinkListItem}>
          <IconLink icon={faHome} to="/home">Home</IconLink>
        </li>
        {isLoggedIn &&
          <li className={classes.LinkListItem}>
            <IconLink icon={faRunning} to="/main">Activities</IconLink>
          </li>
        }
        {isLoggedIn &&
          <li className={classes.LinkListItem}>
            <IconLink icon={faStore} to="/main/store">Store</IconLink>
          </li>
        }
      </ul>
      <div className={classes.ProfileSection}>
        <ProfileDropdown />
      </div>
    </div>
  );
}

export default MainNav;
