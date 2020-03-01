import { createSelector } from 'reselect'

export const selectAuth = (state: any) => state.auth;

export const selectUserData = createSelector(selectAuth, auth => auth.isLoggedIn && auth.user)