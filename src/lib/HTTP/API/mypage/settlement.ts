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

export interface RequestSettlementAlarmType {
  babpatId: number
  totalPrice: number
  perPrice: number
  memberCount: number
  accountNumber: string
  bankName: string
  accountHolder: string
  accessToken: string
}

export const RequestSettlementAlarm = async ({
  babpatId,
  totalPrice,
  perPrice,
  memberCount,
  accountNumber,
  bankName,
  accountHolder,
  accessToken,
}: RequestSettlementAlarmType) => {
  const ROUTE = API_ROUTES.MYPAGE.REQUEST_ALARM

  const body = {
    babpatId,
    totalPrice,
    perPrice,
    memberCount,
    accountNumber,
    bankName,
    accountHolder,
  }

  const res = await customFetch(
    ROUTE.url,
    {
      method: ROUTE.method,
      body: JSON.stringify(body),
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

  // 204로 리턴값이 없음
  return null
}

export interface FinishSettlementType {
  settlementId: number
  accessToken: string
}

export const FinishSettlement = async ({ settlementId, accessToken }: FinishSettlementType) => {
  const ROUTE = API_ROUTES.MYPAGE.FINISH_SETTLEMENT(settlementId)

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

  // 204로 리턴값이 없음
  return null
}
