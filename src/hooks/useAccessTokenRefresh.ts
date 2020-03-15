import { interval } from "rxjs";
import { refreshAccessToken } from "../store/auth/auth.actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function useAccessTokenRefresh() {
  const dispatch = useDispatch();

  const refresh = () => {
    dispatch(refreshAccessToken());
  };

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
