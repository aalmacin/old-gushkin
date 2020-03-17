import axios from 'axios';
import { of, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResult, WishItem, ActivityToday } from './graphql.types';

const appSyncUrl: any = process.env.REACT_APP_APP_SYNC_URL;

const GetWishItems = `
  query WishItems($accessToken: String! $userId: String!, $filter: String) {
    getWishItemsForUser(accessToken: $accessToken, userId: $userId, filter: $filter) {
      success
      error
      data {
        id
        userId
        description
        price
        source
        priority
        status
      }
    }
  }
`

const GetActivities = `
  query Activities($accessToken: String!, $userId: String!) {
    getActivitiesForUser(accessToken: $accessToken, userId: $userId) {
      success
      error
      data {
        id
        description
        positive
        fundAmt
      }
    }
  }
`

const GetTodaysActivities = `
  query TodaysActivities($accessToken: String!, $userId: String!) {
    getTodaysActivities(accessToken: $accessToken, userId: $userId) {
      success
      error
      data {
        activityId
        description
        positive
        fundAmt
        timestamp
      }
    }
  }
`

const GetCurrentFunds = `
  query GetCurrentFunds($accessToken: String!, $userId: String!) {
    getCurrentFunds(accessToken: $accessToken, userId: $userId) {
      success
      error
      data
    }
  }
`

const GetActivityActionCount = `
  query ActivityActionCount($accessToken: String!, $userId: String!) {
    getActivityActionCount(accessToken: $accessToken, userId: $userId) {
      success
      error
      data {
        activityId
        count
        day
      }
    }
  }
`

const query = (data: any, queryInstance: string, queryTypeName: string) => {
  return from(axios.post(appSyncUrl, {
    query: queryInstance,
    variables: data
  }, {
    headers: {
      authorization: data.accessToken
    }
  })).pipe(
    map((res) => {
      const result = res.data.data[queryTypeName];
      if (result.success) {
        return { success: true, data: result.data }
      }
      return { success: false, error: result.error }
    }),
    catchError(() => {
      return of({ success: false, error: "An error occured" })
    })
  ).toPromise()
}

export const getAllWishItems = (accessToken: string, userId: string, filter?: string): Promise<ApiResult<WishItem[]>> => {
  let data: any = { accessToken, userId }
  if (filter) {
    data.filter = filter;
  }

  return query(data, GetWishItems, 'getWishItemsForUser')
}

export const getAllActivities = (accessToken: string, userId: string): Promise<ApiResult<WishItem[]>> => {
  let data: any = { accessToken, userId }

  return query(data, GetActivities, 'getActivitiesForUser')
}

export const getTodaysActivities = (accessToken: string, userId: string): Promise<ApiResult<ActivityToday[]>> => {
  let data: any = { accessToken, userId }

  return query(data, GetTodaysActivities, 'getTodaysActivities')
}

export const getCurrentFunds = (accessToken: string, userId: string): Promise<ApiResult<number>> => {
  let data: any = { accessToken, userId }

  return query(data, GetCurrentFunds, 'getCurrentFunds')
}

export const getActivityActionCount = (accessToken: string, userId: string): Promise<ApiResult<number>> => {
  let data: any = { accessToken, userId }

  return query(data, GetActivityActionCount, 'getActivityActionCount')
}