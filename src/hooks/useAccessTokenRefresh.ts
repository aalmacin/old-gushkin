import { interval } from "rxjs";
import { refreshAccessToken } from "../store/auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectExpireTime } from "../store/auth/auth.selectors";
import { getCurrentTimestamp } from "../functions/utils.functions";

export default function useAccessTokenRefresh() {
  const dispatch = useDispatch();
  const expireTime = useSelector(selectExpireTime);

  const refresh = () => {
    const currentTimestamp = getCurrentTimestamp();
    if (expireTime && currentTimestamp > expireTime) {
      dispatch(refreshAccessToken());
    }
  };

  refresh();

  useEffect(() => {
    const fiveMins = 5 * 1000 * 60;
    const subscription = interval(fiveMins).subscribe(() => {
      refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  });
}
