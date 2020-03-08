import { createSelector } from 'reselect'
import { getCurrentTimestamp } from '../../functions/utils.functions';

export const selectTokenState = (state: any) => state.token;

export const selectAccessToken = createSelector(selectTokenState, tokenState => tokenState.accessToken)

export const selectExpireTime = createSelector(selectTokenState, tokenState => tokenState.expireTime)

export const selectIsExpired = createSelector(selectExpireTime, expireTime => {
  const currTimestamp = getCurrentTimestamp();
  return expireTime <= currTimestamp;
})