import { createSelector } from 'reselect'
import { AuthState } from './auth.reducer';

export const selectAuth = (state: any): AuthState => state.auth;

export const selectUserState = createSelector(selectAuth, state => state.user)

export const selectTokenState = createSelector(selectAuth, state => state.token)

export const selectUser = createSelector(selectUserState, userState => userState?.data)

export const selectIsLoaded = createSelector(selectTokenState, (userState): boolean => !!userState?.loaded)

export const selectUserId = createSelector(selectUser, user => user?.id)

export const selectIsLoggedIn = createSelector(selectUser, (user): boolean => !!user)

export const selectAccessToken = createSelector(selectTokenState, tokenState => tokenState?.data)

export const selectIsLoadedToken = createSelector(selectTokenState, (tokenState): boolean => !!tokenState?.loaded)