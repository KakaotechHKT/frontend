import { API_ROUTES } from '@lib/constants/endpoint'
import { attachQuery, QueriesType } from '@lib/HTTP'
import { customFetch, SuccessResponse } from '@lib/HTTP/Fetch'

export interface SettlementListType {
  pageNumber: number
  accessToken: string
}

export const SettlementList = async ({ pageNumber, accessToken }: SettlementListType) => {
  const ROUTE = API_ROUTES.MYPAGE.SETTLEMENT_LIST

  const Queries: QueriesType = []
  Queries.push({
    key: 'page',
    value: pageNumber - 1 /** 0이 첫번쨰 페이지임을 감안 */,
  })

  const URL = attachQuery(ROUTE.url, Queries)
  const res = await customFetch(
    URL,
    {
      method: ROUTE.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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

export interface SettlementAlarmListType {
  accessToken: string
}

export const SettlementAlarmList = async ({ accessToken }: SettlementAlarmListType) => {
  const ROUTE = API_ROUTES.MYPAGE.ALARM_LIST

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
