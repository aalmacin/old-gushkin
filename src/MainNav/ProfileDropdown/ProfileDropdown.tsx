import React, { useState } from 'react';
import classes from './ProfileDropdown.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faHistory, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie';
import { logoutUser } from '../../store/auth/auth.actions';
import IconLink from '../../component-lib/IconLink/IconLink';
import { selectIsLoggedIn, selectUser } from '../../store/auth/auth.selectors';

function ProfileDropdown() {
  const [isShowList, setIsShowList] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  const [, , removeCookie] = useCookies(['gushkinTokens']);

  const logout = (e: any) => {
    removeCookie('gushkinTokens')
    dispatch(logoutUser())
    e.preventDefault();
  }

  const toggleIsShowList = () => {
    setIsShowList(!isShowList);
  }

  return (
    <div className={classes.Profile} >
      {
        !isLoggedIn ?
          <IconLink icon={faSignInAlt} isExternal to={process.env.REACT_APP_LOGIN_URL as string}>
            Login
          </IconLink>
          :
          <>
            <div className={`${classes.CurrentUser}  ${isShowList && classes.IsShowList}`} onClick={toggleIsShowList}>
              <span className={classes.Email}>
                {<p>{user ? user?.email : 'Not logged in'}</p>}
              </span>
              <FontAwesomeIcon icon={isShowList ? faAngleUp : faAngleDown} />
            </div>
            {
              isShowList &&
              <ul className={classes.LinkList}>
                <li className={classes.LinkListItem}>
                  <IconLink to="/main/history" icon={faHistory}>History</IconLink>
                </li>
                <li className={classes.LinkListItem}>
                  <IconLink icon={faSignOutAlt} to="/logout" onClick={logout}>
                    Logout
                  </IconLink>
                </li>
              </ul>
            }
          </>
      }
    </ div>
  );
}

export default ProfileDropdown;
