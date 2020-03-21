import React, { useState } from 'react';
import classes from './MainNav.module.scss';
import ProfileDropdown from './ProfileDropdown/ProfileDropdown';

import { faRunning, faHome, faStore, faList } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/auth/auth.selectors';
import IconLink from '../component-lib/IconLink/IconLink';
import Logo from './Logo.png'
import Button, { ButtonType } from '../component-lib/Button/Button';

function MainNav() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isShow, setIsShow] = useState(false)

  const toggleShow = () => {
    setIsShow(!isShow)
  }

  return (
    <div className={classes.MainNav}>
      <div className={classes.LogoSection}>
        <div className={classes.Logo}>
          <img src={Logo} alt="Main Gushkin Logo" />
        </div>
      </div>
      <Button buttonType={ButtonType.icon} clickHandler={toggleShow} icon={faList} />
      <ul className={`${classes.LinkList} ${isShow ? classes.IsShow : classes.IsNotShow}`}>
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
