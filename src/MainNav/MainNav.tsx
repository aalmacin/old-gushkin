import React from 'react';
import classes from './MainNav.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '../store/auth/auth.selectors';
import { useCookies } from 'react-cookie';
import { logoutUser } from '../store/auth/auth.actions';
import { Link } from 'react-router-dom';

function MainNav() {
  const authState = useSelector(selectAuth);
  const dispatch = useDispatch()
  const [, , removeCookie] = useCookies(['gushkinTokens']);

  const logout = (e: any) => {
    removeCookie('gushkinTokens')
    dispatch(logoutUser())
    e.preventDefault();
  }

  return (
    <div className={classes.MainNav}>
      <ul className={classes.LinkList}>
        <li className={classes.LinkListItem}><Link to="/home">Home</Link></li>
        <li className={classes.LinkListItem}><Link to="/main">App</Link></li>
        {
          !authState.isLoggedIn &&
          <li className={classes.LinkListItem}>
            <a href={process.env.REACT_APP_LOGIN_URL}>Login</a>
          </li>
        }
        {
          authState.isLoggedIn &&
          <li className={classes.LinkListItem}>
            <a href="/logout" onClick={logout}>Logout</a>
          </li>
        }
      </ul>
      {authState.user && <p>Welcome {authState.user?.email}</p>}
    </div>
  );
}

export default MainNav;
