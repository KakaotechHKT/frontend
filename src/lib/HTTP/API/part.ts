import { format } from 'date-fns'

import { FilterType } from '@components/main/PartCards/PartCardList'
import { API_ROUTES } from '@lib/constants/endpoint'
import { SpeedType } from '@lib/types/part/part'

import { customFetch, SuccessResponse } from '../Fetch'

import { attachQuery, QueriesType } from '..'

export interface PartCreateType {
  leaderID: number
  placeID: number
  date: Date
  time: string
  headCount: number
  comment: string
  mealSpeed: SpeedType | null
}

export const PartCreate = async ({ leaderID, placeID, date, time, headCount, comment, mealSpeed }: PartCreateType) => {
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

export interface PartListType {
  filters: Partial<FilterType>
  searchInput: string
  pageNumber: number
}

export const PartList = async ({ filters, searchInput, pageNumber }: PartListType) => {
  const { mainCategory, track, capacity } = filters

  const Queries: QueriesType = []
  /** 쿼리 붙이기 */
  mainCategory?.forEach(category =>
    Queries.push({
      key: 'foodCond',
      value: category,
    }),
  )

  capacity?.forEach(cap =>
    Queries.push({
      key: 'peopleCond',
      value: cap,
    }),
  )
  /** TODO: 검색값이 없는 경우는 어떻게 전달? */
  if (searchInput.length !== 0)
    Queries.push({
      key: 'keywordCond',
      value: searchInput,
    })

  Queries.push({
    key: 'page',
    value: pageNumber - 1 /** 0이 첫번쨰 페이지임을 감안 */,
  })

  const ROUTE = API_ROUTES.PART.LIST

  const URL = attachQuery(ROUTE.url, Queries)

  const res = await customFetch(
    URL,
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
