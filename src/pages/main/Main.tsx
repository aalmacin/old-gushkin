import React, { useContext } from 'react';
import classes from './Main.module.scss';
import { useCookies } from 'react-cookie';
import { getAllWishItems } from '../../graphql/queries.functions';
import { UserContext } from '../../App';

function Main() {
  const [cookies] = useCookies(['gushkinTokens']);
  const auth = useContext(UserContext)

  if (cookies && cookies.gushkinTokens && cookies.gushkinTokens.accessToken) {
    if (auth.isLoggedIn && auth.user) {
      getAllWishItems(cookies.gushkinTokens.accessToken, auth.user.id).subscribe(a => {
        console.log(a)
      })
    }
  }

  return (
    <div className={classes.Main}>
      Main
    </div>
  );
}

export default Main;
