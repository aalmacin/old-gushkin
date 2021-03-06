import { createSelector } from 'reselect'
import { AuthState } from './auth.reducer';

export const selectAuth = (state: any): AuthState => state.auth;

export const selectUserState = createSelector(selectAuth, state => state.user)

export const selectTokenState = createSelector(selectAuth, state => state.token)

export const selectUser = createSelector(selectUserState, userState => userState?.data)

export const selectIsLoadedUser = createSelector(selectUserState, (userState): boolean => !!userState?.loaded)

export const selectUserId = createSelector(selectUser, user => user?.id)

export const selectIsLoggedIn = createSelector(selectUser, (user): boolean => !!user)

export const selectTokenInfo = createSelector(selectTokenState, tokenState => tokenState?.data)

export const selectAccessToken = createSelector(selectTokenInfo, tokenState => tokenState?.accessToken)

export const selectExpireTime = createSelector(selectTokenInfo, tokenState => tokenState?.expireTime)

export const selectIsLoadedToken = createSelector(selectTokenState, (tokenState): boolean => !!tokenState?.loaded)