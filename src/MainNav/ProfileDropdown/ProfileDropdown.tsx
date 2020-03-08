import React, { useState } from 'react';
import classes from './ProfileDropdown.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faHistory, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { selectAuth } from '../../store/auth/auth.selectors';
import { useCookies } from 'react-cookie';
import { logoutUser } from '../../store/auth/auth.actions';

function ProfileDropdown() {
  const [isShowList, setIsShowList] = useState(false);
  const authState = useSelector(selectAuth);
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
      <div className={`${classes.CurrentUser}  ${isShowList && classes.IsShowList}`} onClick={toggleIsShowList}>
        <span className={classes.Email}>
          {<p>{authState.user ? authState.user?.email : 'Not logged in'}</p>}
        </span>
        <FontAwesomeIcon icon={isShowList ? faAngleUp : faAngleDown} />
      </div>
      {
        isShowList &&
        <ul className={classes.LinkList}>
          <li className={classes.LinkListItem}>
            <a>
              <span className={classes.Icon}>
                <FontAwesomeIcon icon={faHistory} />
              </span>
              History
              </a>
          </li>
          {
            !authState.isLoggedIn &&
            <li className={classes.LinkListItem}>
              <a href={process.env.REACT_APP_LOGIN_URL}>
                <span className={classes.Icon}>
                  <FontAwesomeIcon icon={faSignInAlt} />
                </span>
                Login
                </a>
            </li>
          }
          {
            authState.isLoggedIn &&
            <li className={classes.LinkListItem}>
              <a href="/logout" onClick={logout}>
                <span className={classes.Icon}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
                Logout
                </a>
            </li>
          }
        </ul>
      }
    </ div>
  );
}

export default ProfileDropdown;
