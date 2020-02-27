import React from 'react';
import classes from './Main.module.scss';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function Main() {
  const [cookies] = useCookies(['gushkinTokens']);

  if (cookies && cookies.gushkinTokens && cookies.gushkinTokens.accessToken) {
    const url: any = process.env.REACT_APP_APP_SYNC_URL;
    axios.post(url, {
      query: `
      query WishItems {
        getWishItemsForUser(userId: "1") {
          id
          status
        }
      }
    `
    }, {
      headers: {
        authorization: cookies.gushkinTokens.accessToken
      }
    }).then(r => {
      console.log('here', r);
    }).catch(err => {
      console.log('err', err);
    })
  }

  return (
    <div className={classes.Main}>
      Main
    </div>
  );
}

export default Main;
