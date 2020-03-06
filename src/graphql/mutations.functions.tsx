import { Priority, Status } from "./graphql.types"
import axios from "axios";
import { from, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

const appSyncUrl: any = process.env.REACT_APP_APP_SYNC_URL;

const CreateWishItem = `mutation CreateWishItem(
    $accessToken: String!
    $userId: String!,
    $description: String!,
    $price: Int!,
    $source: String,
    $priority: Priority!,
    $status: Status!
  ) {
    createWishItem(
      accessToken: $accessToken, 
      userId: $userId,
      description: $description,
      price: $price,
      source: $source,
      priority: $priority,
      status: $status
    ) {
      success
      error
    }
  }
`

const CreateActivity = `mutation CreateActivity(
    $accessToken: String!
    $userId: String!,
    $description: String!,
    $fundAmt: Int!,
    $positive: Boolean
  ) {
    createActivity(
      accessToken: $accessToken, 
      userId: $userId,
      description: $description,
      fundAmt: $fundAmt,
      positive: $positive
    ) {
      success
      error
    }
  }
`

const PerformActivity = `mutation PerformActivity($accessToken: String!, $userId: String!, $activityId: Int!) {
    performActivity(
      accessToken: $accessToken, 
      userId: $userId,
      activityId: $activityId
    ) {
      success
      error
    }
  }
`

interface CreateWishItemParams {
  accessToken: any,
  description: string,
  price: number,
  source?: string,
  priority: Priority,
  status: Status
}

interface CreateActivityParams {
  accessToken: any,
  description: string,
  fundAmt: number,
  positive: boolean
}

interface PerformActivityParams {
  accessToken: any,
  activityId: number
}

const mutation = (data: any, mutationInstance: string, mutationTypeName: string) => {
  return from(axios.post(appSyncUrl, {
    query: mutationInstance,
    variables: data
  }, {
    headers: {
      authorization: data.accessToken
    }
  })).pipe(
    map((res) => {
      const result = res.data.data[mutationTypeName];
      if (result.success) {
        return { success: true }
      }
      return { success: false, error: result.error }
    }),
    catchError(() => {
      return of({ success: false, error: "An error occured" })
    })
  ).toPromise()
}

export const createWishItem = (params: CreateWishItemParams) => {
  let data: any = { ...params };

  return mutation(data, CreateWishItem, 'createWishItem')
}

export const createActivity = (params: CreateActivityParams) => {
  let data: any = { ...params };

  return mutation(data, CreateActivity, 'createActivity')
}

export const performActivity = (params: PerformActivityParams) => {
  let data: any = { ...params };

  return mutation(data, PerformActivity, 'performActivity')
}