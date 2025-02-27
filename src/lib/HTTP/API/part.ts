import { format } from 'date-fns'

import { Speed } from '@app/part/page'
import { API_ROUTES } from '@lib/constants/endpoint'

import { customFetch } from '../Fetch'

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
