import { format } from 'date-fns'

import { Speed } from '@app/part/page'
import { API_ROUTES } from '@lib/constants/endpoint'

import { customFetch, SuccessResponse } from '../Fetch'

export interface PartCreateType {
  leaderID: number
  placeID: number
  date: Date
  time: string
  headCount: number
  comment: string
  mealSpeed: Speed | null
}

export const PartCreate = async ({ leaderID, placeID, date, time, headCount, comment, mealSpeed }: PartCreateType) => {
  console.log('entered part create12312312')

  const ROUTE = API_ROUTES.PART.CREATE

  const body = {
    leader: leaderID,
    place: placeID,
    date: format(date, 'yyyy-MM-dd'),
    time,
    headCount,
    comment,
    mealSpeed,
  }

  console.log('body')
  console.log(body)

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  // const data: SuccessResponse = await res.json()
  // 204 응답으로 반환 데이터가 없습니다
  return null
}

export interface PartListType {}

export const PartList = async ({}: PartListType) => {
  const ROUTE = API_ROUTES.PART.LIST

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()
  return data
}

export interface RecommendPartListType {}

export const RecommendPartList = async ({}: RecommendPartListType) => {
  const ROUTE = API_ROUTES.PART.RECOMMEND_LIST

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()
  return data
}

export interface PartApplyType {
  ID: number
  babpatID: number
}

export const PartApply = async ({ ID, babpatID }: PartApplyType) => {
  const ROUTE = API_ROUTES.PART.APPLY

  const body = {
    userId: ID,
    babpatId: babpatID,
  }
  console.log('part apply')

  console.log(body)
  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
    },
    'WebServer',
  )

  if (!res.ok) {
    const error = new Error()
    const data = await res.json()
    error.message = data.message
    throw error
  }

  const data: SuccessResponse = await res.json()
  return data
}
