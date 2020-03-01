import { createSelector } from 'reselect'

export const selectAuth = (state: any) => state.auth;

export const selectUser = createSelector(selectAuth, auth => auth.user)

export const selectUserId = createSelector(selectUser, user => user && user.id)

export const selectIsLoggedIn = createSelector(selectAuth, auth => auth.isLoggedIn)

export const selectUserData = createSelector(selectAuth, auth => auth.isLoggedIn && auth.user)