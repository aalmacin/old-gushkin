import React, { Suspense } from 'react';
import classes from './App.module.scss';
import {
  Switch, Route, BrowserRouter as Router,
} from "react-router-dom";
import Callback from './pages/callback/Callback';
import MainNav from './MainNav/MainNav';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getUserData } from './store/auth/auth.actions';
import { selectIsLoadedToken, selectAccessToken, selectIsLoadedUser } from './store/auth/auth.selectors';
import useAccessTokenRefresh from './hooks/useAccessTokenRefresh';
import Loading from './component-lib/Loading/Loading';

const Main = React.lazy(() => import('./pages/main/Main'));
const Home = React.lazy(() => import('./pages/home/Home'));

function App() {
  const isLoadedToken = useSelector(selectIsLoadedToken)
  const isLoadedUser = useSelector(selectIsLoadedUser)
  const accessToken = useSelector(selectAccessToken);

  const dispatch = useDispatch();

  useAccessTokenRefresh();

  if (!isLoadedToken) {
    dispatch(getAccessToken())
  }

  if (!isLoadedUser && accessToken) {
    dispatch(getUserData())
  }

  return (
    <div className={classes.App}>
      <Router>
        <MainNav />
        <Switch>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/main">
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
