import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { interval } from "rxjs";
import { getCurrentTimestamp } from "../functions/utils.functions";
import {
  getAccessTokenUsingRefreshToken,
  isToken
} from "../functions/cognito.functions";
import { first } from "rxjs/operators";

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(["gushkinTokens"]);

  const checkExpired = () => {
    if (cookies && cookies.gushkinTokens) {
      const currTimestamp = getCurrentTimestamp();
      if (cookies.gushkinTokens.expireTime <= currTimestamp) {
        const refreshToken = cookies.gushkinTokens.refreshToken;
        getAccessTokenUsingRefreshToken(refreshToken)
          .pipe(first())
          .subscribe(tokenData => {
            if (isToken(tokenData)) {
              setCookie("gushkinTokens", {
                ...tokenData,
                refreshToken,
                expireTime: currTimestamp + 3600
              });
              setAccessToken(cookies.gushkinTokens.expireTime);
            } else {
              setAccessToken(null);
            }
          });
      } else {
        if (cookies.gushkinTokens.accessToken !== accessToken) {
          setAccessToken(cookies.gushkinTokens.accessToken);
        }
      }
    } else {
      if (accessToken !== null) {
        setAccessToken(null);
      }
    }
  };

  checkExpired();

  useEffect(() => {
    const fiveMins = 5 * 1000 * 60;
    const subscription = interval(fiveMins).subscribe(() => {
      checkExpired();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
  return accessToken;
}
