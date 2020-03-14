
export enum Priority {
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  VERY_LOW = 'VERY_LOW',
}

export enum Status {
  bought = 'bought',
  not_bought = 'not_bought',
  disabled = 'disabled',
}

export type ApiResult<T> = { success: boolean, error?: string, data?: T }

export interface WishItem {
  readonly id: string,
  readonly description: string,
  readonly userId: string,
  readonly price: number,
  readonly source?: string,
  readonly priority: string,
  readonly status: string
}

export interface Activity {
  readonly id: string,
  readonly description: string,
  readonly fundAmt: number,
  readonly positive: boolean,
  readonly userId: string
}

export interface ActivityToday {
  readonly activityId: number,
  readonly description: string,
  readonly fundAmt: number,
  readonly positive: boolean,
  readonly timestamp: number
}