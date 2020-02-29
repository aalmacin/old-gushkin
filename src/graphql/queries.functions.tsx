import axios from 'axios';
import { of, Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiResult, WishItem } from './graphql.types';

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

export const getAllWishItems = (accessToken: string, userId: string, filter?: string): Observable<ApiResult<WishItem[]>> => {
  let data: any = { accessToken, userId }
  if (filter) {
    data.filter = filter;
  }

  return from(axios.post(appSyncUrl, {
    query: GetWishItems,
    variables: data
  }, {
    headers: {
      authorization: accessToken
    }
  })).pipe(
    map((res) => {
      const result = res.data.data.getWishItemsForUser;
      if (result.success) {
        return { success: true, data: result.data }
      }
      return { success: false, error: result.error }
    }),
    catchError(() => {
      return of({ success: false, error: "An error occured" })
    })
  )
}